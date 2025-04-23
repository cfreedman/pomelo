import React, { JSX } from "react";
import { useState } from "react";

import { BaseRecipe, BASE_RECIPE_DATA } from "@/lib/recipes";
import {
  BLANK_CALENDAR,
  FoodCalendar,
  Weekday,
  WEEKDAYS,
} from "@/lib/calendar";

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
  const [foodCalendar, setFoodCalendar] =
    useState<FoodCalendar>(BLANK_CALENDAR);

  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const currentWeekSunday = new Date(currentDate);
  currentWeekSunday.setDate(currentDate.getDate() - currentDay);

  const currentWeekdays: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(currentWeekSunday);
    day.setDate(currentWeekSunday.getDate() + i);
    currentWeekdays.push(day);
  }

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
    const seralizedRecipe = `${recipe.id}-${recipe.name}`;
    e.dataTransfer.setData("recipe", seralizedRecipe);

    setFoodCalendar((prevCalendar) => {
      const updatedCalendar = { ...prevCalendar };
      const remainingRecipes = updatedCalendar[prevWeekday].filter(
        (otherRecipe) => otherRecipe.id !== recipe.id
      );

      console.log(remainingRecipes);
      updatedCalendar[prevWeekday] = remainingRecipes;
      return updatedCalendar;
    });
  };

  const handleDrop = (e: React.DragEvent, weekday: Weekday) => {
    e.preventDefault();
    const recipeData = e.dataTransfer.getData("recipe");
    const [id, name] = recipeData.split("-");
    const recipe: BaseRecipe = {
      id: id,
      name: name,
    };

    setFoodCalendar((prevCalendar) => {
      const updatedCalendar = { ...prevCalendar };
      const otherRecipes = updatedCalendar[weekday].filter(
        (recipe) => recipe.id !== id
      );
      updatedCalendar[weekday] = [...otherRecipes, recipe];
      return updatedCalendar;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex w-[1800px] my-10">
        {WEEKDAYS.map((day, index) => (
          <CalendarDay
            key={day}
            weekday={day as Weekday}
            date={currentWeekdays[index].getDate().toString()}
            recipes={foodCalendar[day as Weekday]}
            handleDrop={(e: React.DragEvent) => handleDrop(e, day as Weekday)}
            handleDragOver={handleDragOver}
            handleDragRecipeCard={handleDragRecipeCard}
          />
        ))}
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
