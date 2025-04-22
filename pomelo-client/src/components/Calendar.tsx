import { JSX } from "react";
import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

import { BaseRecipe, BASE_RECIPE_DATA } from "@/lib/recipes";
import {
  BLANK_CALENDAR,
  FoodCalendar,
  Weekday,
  WEEKDAYS,
} from "@/lib/calendar";

const RecipeItem = (recipe: BaseRecipe): React.ReactNode => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${recipe.id}-${recipe.name}`,
  });

  const positionStyle = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <li
      className="text-blue-600 font-bold"
      style={positionStyle}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      key={recipe.id}
    >
      {recipe.name}
    </li>
  );
};

const CalendarRecipeCard = (recipe: BaseRecipe): React.ReactNode => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${recipe.id}-${recipe.name}`,
  });

  const positionStyle = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;
  return (
    <div
      className="my-3 py-3 px-2 w-full bg-blue-500 rounded-md"
      style={positionStyle}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <h3 className="text-white font-bold">{recipe.name}</h3>
    </div>
  );
};

interface CalendarDayProps {
  weekday: Weekday;
  date: string;
  recipes: BaseRecipe[];
}

const CalendarDay = ({
  weekday,
  date,
  recipes,
}: CalendarDayProps): React.ReactNode => {
  const { setNodeRef } = useDroppable({
    id: weekday,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col px-2 grow shrink basis-[0px] h-[600px] items-center border-r-2 border-solid border-gray-100 first:border-l-2"
    >
      <div className="flex flex-col items-center justify-center bg-blue-500 rounded-full w-10 h-10 my-2">
        <h3 className="text-white font-bold">{date}</h3>
      </div>
      <h3 className="calendarHeader text-blue-500">{weekday}</h3>
      {recipes.map((recipe) => (
        <CalendarRecipeCard {...recipe} />
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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const currentRecipe = {
      id: (active.id as string).split("-")[0],
      name: (active.id as string).split("-")[1],
    } as BaseRecipe;
    const currentDay = over.id as Weekday;

    setFoodCalendar((prevFoodCalendar) => {
      const updatedFoodCalendar = { ...prevFoodCalendar };

      updatedFoodCalendar[currentDay].push(currentRecipe);
      return updatedFoodCalendar;
    });
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex w-[1800px] my-10">
        {WEEKDAYS.map((day, index) => (
          <CalendarDay
            key={day}
            weekday={day as Weekday}
            date={currentWeekdays[index].getDate().toString()}
            recipes={foodCalendar[day as Weekday]}
          />
        ))}
      </div>
      <ul>
        {BASE_RECIPE_DATA.map(({ name, id }) => (
          <RecipeItem name={name} id={id} />
        ))}
      </ul>
    </DndContext>
  );
}
