import React, { JSX, useEffect } from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { BaseRecipe } from "@/lib/recipes";
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
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useRecipes } from "@/hooks/useRecipes";

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
    <div className="flex flex-col px-2 grow shrink basis-[0px] h-[600px] items-center">
      <div className="flex-auto">
        <div className="flex flex-col items-center justify-center bg-blue-500 rounded-full w-10 h-10 my-2">
          <h3 className="text-white font-bold">{date}</h3>
        </div>
      </div>
      <h3 className="calendarHeader text-blue-500">{weekday}</h3>
      <div
        className="flex flex-col h-full w-full bg-gray-100 rounded-sm my-2 p-2"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {recipes.map((recipe) => (
          <CalendarRecipeCard
            key={recipe.id}
            recipe={recipe}
            handleDrag={(event) => handleDragRecipeCard(event, recipe, weekday)}
          />
        ))}
      </div>
    </div>
  );
};

interface RecipeSuggestionsProps {
  recipes: BaseRecipe[];
  handleDragItem: (e: React.DragEvent, recipe: BaseRecipe) => void;
}

const RecipeSuggestions = ({
  recipes,
  handleDragItem,
}: RecipeSuggestionsProps) => {
  const [recipeSearch, setRecipeSearch] = useState<string | undefined>(
    undefined
  );

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(recipeSearch?.toLowerCase() || "")
  );

  return (
    <div>
      <div className="w-full mt-3 mb-5 flex flex-wrap gap-2">
        {filteredRecipes.map((recipe) => (
          <Badge
            draggable
            onDragStart={(e) => handleDragItem(e, recipe)}
            key={recipe.id}
          >
            {recipe.name}
          </Badge>
        ))}
      </div>
      <Input
        className="mt-3"
        placeholder="Search for suggested recipes here..."
        type="text"
        value={recipeSearch}
        onChange={(e) => setRecipeSearch(e.target.value)}
      />
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

  const { recipes } = useRecipes();

  const baseRecipes: BaseRecipe[] = recipes.map((recipe) => ({
    name: recipe.name,
    id: recipe.id,
  }));

  const [foodCalendar, setFoodCalendar] =
    useState<FoodCalendar>(BLANK_CALENDAR);

  useEffect(() => {
    if (mealPlan) {
      setFoodCalendar(mealPlan.items);
    }
  }, [mealPlan]);

  const handleDragRecipeItem = (e: React.DragEvent, recipe: BaseRecipe) => {
    const serializedRecipe = `${recipe.id}-${recipe.name}`;
    e.dataTransfer.setData("recipe", serializedRecipe);
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
      <div className="flex w-full my-10">
        <div className="flex w-full">
          <button
            className="cursor-pointer"
            onClick={() => {
              navigate(`/calendar/${getDateString(previousSunday)}`);
            }}
          >
            <ChevronLeft size={65} className="text-blue-500" />
          </button>
          <div className="flex w-full divide-x divide-gray-100">
            {WEEKDAYS.map((day) => (
              <CalendarDay
                key={day}
                weekday={day as Weekday}
                date={currentWeekdays[day].getDate().toString()}
                recipes={foodCalendar[day as Weekday]}
                handleDrop={(e: React.DragEvent) =>
                  handleDrop(e, day as Weekday)
                }
                handleDragOver={handleDragOver}
                handleDragRecipeCard={handleDragRecipeCard}
              />
            ))}
          </div>
          <button
            className="cursor-pointer"
            onClick={() => {
              navigate(`/calendar/${getDateString(nextSunday)}`);
            }}
          >
            <ChevronRight size={65} className="text-blue-500" />
          </button>
        </div>
      </div>
      <div className="w-full flex flex-auto p-2">
        <div className="m-5 w-1/2">
          <RecipeSuggestions
            recipes={baseRecipes}
            handleDragItem={handleDragRecipeItem}
          />
        </div>
        <div className="m-5 w-1/2">
          <div className="w-full mt-3 mb-5 flex flex-wrap gap-2">
            {baseRecipes.map((recipe) => (
              <Badge
                key={recipe.id}
                draggable
                onDragStart={(e) => handleDragRecipeItem(e, recipe)}
              >
                {recipe.name}
              </Badge>
            ))}
          </div>
          <h3>Popular Choices</h3>
        </div>
      </div>
    </>
  );
}
