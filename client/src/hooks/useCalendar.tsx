import {
  addRecipeToCalendar,
  FoodCalendar,
  moveRecipeInCalendar,
  Weekday,
} from "@/lib/meal_plan";
import { BaseRecipe } from "@/lib/recipes";
import { createContext, useContext, useReducer } from "react";

interface ActiveRecipe {
  weekday: Weekday;
  id: string;
}

interface DraggingRecipe {
  recipe: BaseRecipe;
  prevWeekday?: Weekday;
}

export interface CalendarState {
  foodCalendar: FoodCalendar | null;
  activeRecipeCard: ActiveRecipe | null;

  draggingRecipe: DraggingRecipe | null;
}

export type CalendarAction =
  | { type: "INITIALIZE_STATE"; foodCalendar: FoodCalendar }
  | { type: "START_DRAG"; recipe: DraggingRecipe }
  | { type: "COMPLETE_DRAG"; weekdayDrop?: Weekday }
  | { type: "ACTIVATE_RECIPE"; recipe: ActiveRecipe }
  | { type: "DEACTIVATE_RECIPE" };

export function calendarReducer(
  state: CalendarState,
  action: CalendarAction
): CalendarState {
  switch (action.type) {
    case "INITIALIZE_STATE":
      return { ...state, foodCalendar: action.foodCalendar };
    case "START_DRAG":
      return { ...state, draggingRecipe: action.recipe };
    case "COMPLETE_DRAG": {
      if (!state.draggingRecipe || !state.foodCalendar) {
        return state;
      }

      if (!action.weekdayDrop) {
        return { ...state, draggingRecipe: null };
      }

      if (state.draggingRecipe?.prevWeekday) {
        const updatedCalendar = moveRecipeInCalendar(
          state.foodCalendar,
          state.draggingRecipe.prevWeekday,
          action.weekdayDrop,
          state.draggingRecipe.recipe
        );

        return { ...state, foodCalendar: updatedCalendar };
      }

      const updatedCalendar = addRecipeToCalendar(
        state.foodCalendar,
        action.weekdayDrop,
        state.draggingRecipe?.recipe
      );
      return { ...state, foodCalendar: updatedCalendar };
    }
    case "ACTIVATE_RECIPE":
      return { ...state, activeRecipeCard: action.recipe };
    case "DEACTIVATE_RECIPE":
      return { ...state, activeRecipeCard: null };
  }
}

export type CalendarContextType = {
  state: CalendarState;
  dispatch: React.Dispatch<CalendarAction>;
};

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

const initialCalendarState: CalendarState = {
  foodCalendar: null,
  activeRecipeCard: null,
  draggingRecipe: null,
};

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(calendarReducer, initialCalendarState);

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error(
      "useCalendarContext needs to be used inside a CalendarProvider"
    );
  }

  return context;
};
