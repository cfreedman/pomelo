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

const getDateString = (date: Date): string => {
  return date.toISOString().slice(0, 10);
};

export const getLastSunday = (date: Date): Date => {
  const currentDay = date.getDay();

  // Sunday is 0, so need to subtract away any currentDay in 1-6
  const newDate = new Date(date);
  newDate.setDate(date.getDate() - currentDay);
  return newDate;
};

export const fetchMealPlanById = async (
  weekStart: Date
): Promise<MealPlan[]> => {
  const serializedDate = getDateString(weekStart);
  const response = await fetch(`${BASE_URL}/meal-plans/${serializedDate}`);

  return await response.json();
};

export const fetchAllMealPlans = async (): Promise<MealPlan[]> => {
  const response = await fetch(`${BASE_URL}/meal-plans`);

  return await response.json();
};

export const addMealPlan = async (
  calendar: FoodCalendar
): Promise<MealPlan> => {
  const response = await fetch(`${BASE_URL}/meal-plans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(calendar),
  });

  return await response.json();
};

export const updateMealPlanById = async (
  weekStart: Date,
  calendar: FoodCalendar
): Promise<MealPlan> => {
  const serializedDate = getDateString(weekStart);
  const response = await fetch(`${BASE_URL}/MealPlans/${serializedDate}`, {
    method: "POST",
    headers: {
      "Content-Type": "application.json",
    },
    body: JSON.stringify(calendar),
  });

  return await response.json();
};

export const deleteMealPlanById = async (weekStart: Date): Promise<void> => {
  const serializedDate = getDateString(weekStart);
  await fetch(`${BASE_URL}/MealPlans/${serializedDate}`, {
    method: "DELETE",
  });

  return;
};
