import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addIngredient,
  fetchAllIngredients,
  IngredientCreate,
  Ingredient,
} from "@/lib/recipes";

export const useIngredients = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["ingredients"],
    queryFn: fetchAllIngredients,
  });

  const addIngredientMutation = useMutation({
    mutationFn: addIngredient,
    onMutate: async (newStore: IngredientCreate) => {
      await queryClient.cancelQueries({ queryKey: ["stores"] });

      const previousIngredients = queryClient.getQueryData<Ingredient[]>([
        "ingredients",
      ]);

      queryClient.setQueryData<Ingredient[]>(
        ["ingredients"],
        (oldIngredients) => {
          const tempId = crypto.randomUUID();
          const newIngredientWithId = { ...newStore, id: tempId } as Ingredient;
          return oldIngredients
            ? [...oldIngredients, newIngredientWithId]
            : [newIngredientWithId];
        }
      );

      return { previousIngredients };
    },

    onError: (_err, _newIngredient, context) => {
      queryClient.setQueryData<Ingredient[]>(
        ["ingredients"],
        context?.previousIngredients
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
  });

  return {
    ingredients: data || [],
    isLoading,
    addIngredient: addIngredientMutation.mutate,
    isAdding: addIngredientMutation.isPending,
  };
};
