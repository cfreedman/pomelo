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
