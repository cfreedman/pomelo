import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addMealPlan, fetchAllMealPlans, MealPlan } from "@/lib/meal_plan";

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
