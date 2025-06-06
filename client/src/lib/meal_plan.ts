import { BASE_URL } from "@/config/constants";
import { BaseRecipe } from "./recipes";

export const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export type WeekdayDates = Record<Weekday, Date>;

export type FoodCalendar = Record<Weekday, BaseRecipe[]>;

export const BLANK_CALENDAR: FoodCalendar = {
  Sunday: [],
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
};

export interface MealPlan {
  weekStart: Date;
  items: FoodCalendar;
}

// [FEATURE]: Need more logic to allow for multiple copies of recipe in each day and possibly break/lunch/dinner/snack split

export const addRecipeToCalendar = (
  prevCalendar: FoodCalendar,
  landingWeekday: Weekday,
  targetRecipe: BaseRecipe
): FoodCalendar => {
  const updatedCalendar = { ...prevCalendar };
  const otherRecipes = updatedCalendar[landingWeekday].filter(
    (recipe) => recipe.id !== targetRecipe.id
  );

  updatedCalendar[landingWeekday] = [...otherRecipes, targetRecipe];
  return updatedCalendar;
};

export const deleteRecipeFromCalendar = (
  prevCalendar: FoodCalendar,
  targetWeekday: Weekday,
  targetRecipe: BaseRecipe
): FoodCalendar => {
  const updatedCalendar = { ...prevCalendar };
  updatedCalendar[targetWeekday] = updatedCalendar[targetWeekday].filter(
    (recipe) => recipe.id !== targetRecipe.id
  );

  return updatedCalendar;
};

export const moveRecipeInCalendar = (
  prevCalendar: FoodCalendar,
  sourceWeekday: Weekday,
  targetWeekday: Weekday,
  targetRecipe: BaseRecipe
): FoodCalendar => {
  const updatedCalendar = { ...prevCalendar };

  updatedCalendar[sourceWeekday] = updatedCalendar[sourceWeekday].filter(
    (recipe) => recipe.id !== targetRecipe.id
  );

  const otherRecipes = updatedCalendar[targetWeekday].filter(
    (recipe) => recipe.id !== targetRecipe.id
  );
  updatedCalendar[targetWeekday] = [...otherRecipes, targetRecipe];

  return updatedCalendar;
};

export const getDateString = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

export const validDateString = (dateString: string): boolean => {
  return /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(dateString);
};

export const parseDateString = (dateString: string): Date => {
  // Assumes "YYYY-MM-DD" format
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
};

export const getCurrentSunday = (date: Date): Date => {
  // Finds the most recent prior Sunday from the given date
  const currentDay = date.getDay();

  // Sunday is 0, so need to subtract away any currentDay in 1-6
  const newDate = new Date(date);
  newDate.setDate(date.getDate() - currentDay);
  return newDate;
};

export const getPreviousSunday = (date: Date): Date => {
  // Assumes the input date is a Sunday
  const previousSunday = new Date(date);
  previousSunday.setDate(date.getDate() - 7);
  return previousSunday;
};

export const getNextSunday = (date: Date): Date => {
  // Assumes the input date is a Sunday
  const nextSunday = new Date(date);
  nextSunday.setDate(date.getDate() + 7);
  return nextSunday;
};

export const getWeekdays = (currentDate: Date) => {
  const currentWeekSunday = getCurrentSunday(currentDate);

  const currentWeekdays: WeekdayDates = {
    Sunday: new Date(),
    Monday: new Date(),
    Tuesday: new Date(),
    Wednesday: new Date(),
    Thursday: new Date(),
    Friday: new Date(),
    Saturday: new Date(),
  };
  for (const [index, weekday] of WEEKDAYS.entries()) {
    const date = new Date(currentWeekSunday);
    date.setDate(currentWeekSunday.getDate() + index);
    currentWeekdays[weekday] = date;
  }

  return currentWeekdays;
};

export const fetchMealPlanById = async (id: string): Promise<MealPlan> => {
  const response = await fetch(`${BASE_URL}/meal-plans/${id}`);

  return await response.json();
};

export const fetchAllMealPlans = async (): Promise<MealPlan[]> => {
  const response = await fetch(`${BASE_URL}/meal-plans`);

  return await response.json();
};

export const addMealPlan = async (mealPlan: MealPlan): Promise<MealPlan> => {
  const response = await fetch(`${BASE_URL}/meal-plans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mealPlan),
  });

  return await response.json();
};

export const updateMealPlanById = async (
  id: string,
  items: FoodCalendar
): Promise<MealPlan> => {
  const response = await fetch(`${BASE_URL}/meal-plans/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(items),
  });

  return await response.json();
};

export const deleteMealPlanById = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/meal-plans/${id}`, {
    method: "DELETE",
  });

  return;
};
