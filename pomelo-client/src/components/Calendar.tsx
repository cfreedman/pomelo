import React, { JSX, useEffect } from "react";
import { useState } from "react";

import { BaseRecipe, BASE_RECIPE_DATA } from "@/lib/recipes";
import {
  addRecipeToCalendar,
  BLANK_CALENDAR,
  FoodCalendar,
  getDateString,
  getNextSunday,
  getPreviousSunday,
  getWeekdays,
  moveRecipeInCalendar,
  parseDateString,
  validDateString,
  Weekday,
  WEEKDAYS,
} from "@/lib/meal_plan";
import { useNavigate, useParams } from "react-router";
import { useMealPlanById, useMealPlans } from "@/hooks/useMealPlans";

interface RecipeItemProps {
  name: string;
  handleDrag: React.DragEventHandler<HTMLLIElement>;
}

const RecipeItem = ({ name, handleDrag }: RecipeItemProps): JSX.Element => {
  return (
    <li className="text-blue-600 font-bold" draggable onDragStart={handleDrag}>
      {name}
    </li>
  );
};

interface CalendarRecipeCardProps {
  recipe: BaseRecipe;
  handleDrag: React.DragEventHandler<HTMLDivElement>;
}

const CalendarRecipeCard = ({
  recipe,
  handleDrag,
}: CalendarRecipeCardProps): React.ReactNode => {
  return (
    <div
      className="my-3 py-3 px-2 w-full bg-blue-500 rounded-md"
      draggable
      onDragStart={handleDrag}
    >
      <h3 className="text-white font-bold">{recipe.name}</h3>
    </div>
  );
};

interface CalendarDayProps {
  weekday: Weekday;
  date: string;
  recipes: BaseRecipe[];
  handleDrop: React.DragEventHandler<HTMLDivElement>;
  handleDragOver: React.DragEventHandler<HTMLDivElement>;
  handleDragRecipeCard: (
    e: React.DragEvent,
    recipe: BaseRecipe,
    prevWeekday: Weekday
  ) => void;
}

const CalendarDay = ({
  weekday,
  date,
  recipes,
  handleDrop,
  handleDragOver,
  handleDragRecipeCard,
}: CalendarDayProps): React.ReactNode => {
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="flex flex-col px-2 grow shrink basis-[0px] h-[600px] items-center border-r-2 border-solid border-gray-100 first:border-l-2"
    >
      <div className="flex flex-col items-center justify-center bg-blue-500 rounded-full w-10 h-10 my-2">
        <h3 className="text-white font-bold">{date}</h3>
      </div>
      <h3 className="calendarHeader text-blue-500">{weekday}</h3>
      {recipes.map((recipe) => (
        <CalendarRecipeCard
          key={recipe.id}
          recipe={recipe}
          handleDrag={(event) => handleDragRecipeCard(event, recipe, weekday)}
        />
      ))}
      <div></div>
    </div>
  );
};

export default function Calendar(): JSX.Element {
  const { weekStart } = useParams();
  const currentDate =
    weekStart && validDateString(weekStart)
      ? parseDateString(weekStart)
      : new Date();
  const currentWeekdays = getWeekdays(currentDate);
  const currentSunday = currentWeekdays["Sunday"];
  const serializedCurrentSunday = getDateString(currentWeekdays["Sunday"]);

  const previousSunday = getPreviousSunday(currentWeekdays["Sunday"]);
  const nextSunday = getNextSunday(currentWeekdays["Sunday"]);

  const navigate = useNavigate();

  if (weekStart !== serializedCurrentSunday) {
    navigate(`/calendar/${serializedCurrentSunday}`);
  }

  const { mealPlan, isError, updateMealPlan } = useMealPlanById(currentSunday);
  const { addMealPlan } = useMealPlans();

  const [foodCalendar, setFoodCalendar] =
    useState<FoodCalendar>(BLANK_CALENDAR);

  useEffect(() => {
    if (mealPlan) {
      setFoodCalendar(mealPlan.items);
    }
  }, [mealPlan]);

  const handleDragRecipeItem = (
    e: React.DragEvent,
    seralizedRecipe: string
  ) => {
    e.dataTransfer.setData("recipe", seralizedRecipe);
  };

  const handleDragRecipeCard = (
    e: React.DragEvent,
    recipe: BaseRecipe,
    prevWeekday: Weekday
  ) => {
    const seralizedRecipe = `${recipe.id}-${recipe.name}-${prevWeekday}`;
    e.dataTransfer.setData("recipe", seralizedRecipe);
  };

  const handleDrop = (e: React.DragEvent, weekday: Weekday) => {
    e.preventDefault();
    const recipeData = e.dataTransfer.getData("recipe");
    if (recipeData.split("-").length === 2) {
      const [id, name] = recipeData.split("-");
      const recipe: BaseRecipe = {
        id: id,
        name: name,
      };

      const updatedCalendar = addRecipeToCalendar(
        foodCalendar,
        weekday,
        recipe
      );

      setFoodCalendar(updatedCalendar);
      if (!isError) {
        updateMealPlan(updatedCalendar);
      } else {
        addMealPlan({ weekStart: currentSunday, items: updatedCalendar });
      }
    } else if (recipeData.split("-").length === 3) {
      const [id, name, day] = recipeData.split("-");
      const recipe: BaseRecipe = {
        id: id,
        name: name,
      };
      const prevWeekday = day as Weekday;

      const updatedCalendar = moveRecipeInCalendar(
        foodCalendar,
        prevWeekday,
        weekday,
        recipe
      );

      setFoodCalendar(updatedCalendar);
      updateMealPlan(updatedCalendar);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex w-[1800px] my-10">
        <div className="flex">
          <button
            onClick={() => {
              navigate(`/calendar/${getDateString(previousSunday)}`);
            }}
          >
            Previous
          </button>
          {WEEKDAYS.map((day) => (
            <CalendarDay
              key={day}
              weekday={day as Weekday}
              date={currentWeekdays[day].getDate().toString()}
              recipes={foodCalendar[day as Weekday]}
              handleDrop={(e: React.DragEvent) => handleDrop(e, day as Weekday)}
              handleDragOver={handleDragOver}
              handleDragRecipeCard={handleDragRecipeCard}
            />
          ))}
          <button
            onClick={() => {
              navigate(`/calendar/${getDateString(nextSunday)}`);
            }}
          >
            Next
          </button>
        </div>
      </div>
      <ul>
        {BASE_RECIPE_DATA.map(({ id, name }) => (
          <RecipeItem
            key={id}
            name={name}
            handleDrag={(e: React.DragEvent) =>
              handleDragRecipeItem(e, `${id}-${name}`)
            }
          />
        ))}
      </ul>
    </>
  );
}
