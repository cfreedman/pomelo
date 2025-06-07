import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addMealPlan,
  deleteMealPlanById,
  fetchAllMealPlans,
  fetchMealPlanById,
  FoodCalendar,
  getDateString,
  MealPlan,
  updateMealPlanById,
} from "@/lib/meal_plan";

export const useMealPlans = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["meal-plans"],
    queryFn: fetchAllMealPlans,
  });

  const addMealPlanMutation = useMutation({
    mutationFn: addMealPlan,
    onMutate: async (newMealPlan: MealPlan) => {
      await queryClient.cancelQueries({ queryKey: ["meal-plans"] });

      const previousMealPlans = queryClient.getQueryData<MealPlan[]>([
        "meal-plans",
      ]);

      queryClient.setQueryData<MealPlan[]>(["meal-plans"], (oldMealPlans) => {
        return oldMealPlans ? [...oldMealPlans, newMealPlan] : [newMealPlan];
      });

      return { previousMealPlans };
    },

    onError: (_err, _newMealPlan, context) => {
      queryClient.setQueryData<MealPlan[]>(
        ["meal-plans"],
        context?.previousMealPlans
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["meal-plans"] });
    },
  });

  return {
    mealPlans: data || [],
    isLoading,
    addMealPlan: addMealPlanMutation.mutate,
    isAdding: addMealPlanMutation.isPending,
  };
};

export const useMealPlanById = (weekStart: Date) => {
  const queryClient = useQueryClient();
  const serializedWeekStart = getDateString(weekStart);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["meal-plans", serializedWeekStart],
    queryFn: () => fetchMealPlanById(serializedWeekStart),
  });

  const updateMealPlanMutation = useMutation({
    mutationFn: (items: FoodCalendar) =>
      updateMealPlanById(serializedWeekStart, items),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["meal-plans", serializedWeekStart],
      });
    },
  });

  const deleteMealPlanMutation = useMutation({
    mutationFn: () => deleteMealPlanById(serializedWeekStart),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["meal-plans", serializedWeekStart],
      });
    },
  });

  return {
    mealPlan: data,
    isLoading,
    isError,
    updateMealPlan: updateMealPlanMutation.mutate,
    isUpdating: updateMealPlanMutation.isPending,
    deleteMealPlan: deleteMealPlanMutation.mutate,
    isDeleting: deleteMealPlanMutation.isPending,
  };
};
