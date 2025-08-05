import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addIngredient,
  fetchAllIngredients,
  IngredientCreate,
  Ingredient,
  updateIngredientsById,
  deleteIngredientById,
} from "@/lib/ingredients";

const buildOptimisticIngredient = (
  base: IngredientCreate,
  id: string
): Ingredient => ({
  ...base,
  id,
});

export const useIngredients = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ingredients"],
    queryFn: fetchAllIngredients,
  });

  return {
    ingredients: data || [],
    isLoading,
    isError,
  };
};

export const useAddIngredient = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addIngredient,
    onMutate: async (newIngredient: IngredientCreate) => {
      await queryClient.cancelQueries({ queryKey: ["ingredients"] });

      const previousIngredients = queryClient.getQueryData<Ingredient[]>([
        "ingredients",
      ]);

      queryClient.setQueryData<Ingredient[]>(
        ["ingredients"],
        (oldIngredients) => {
          const tempId = crypto.randomUUID();
          const newIngredientWithId = buildOptimisticIngredient(
            newIngredient,
            tempId
          );
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
    addIngredient: mutation.mutate,
    isAdding: mutation.isPending,
  };
};

export const useUpdateIngredient = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      id,
      updatedIngredient,
    }: {
      id: string;
      updatedIngredient: IngredientCreate;
    }) => updateIngredientsById(id, updatedIngredient),
    onMutate: async ({ id, updatedIngredient }) => {
      await queryClient.cancelQueries({ queryKey: ["ingredients"] });

      const previousIngredients = queryClient.getQueryData<Ingredient[]>([
        "ingredients",
      ]);

      queryClient.setQueryData<Ingredient[]>(
        ["ingredients"],
        (oldIngredients) => {
          return oldIngredients
            ? oldIngredients.map((ingredient) =>
                ingredient.id === id
                  ? { ...ingredient, ...updatedIngredient }
                  : ingredient
              )
            : [];
        }
      );

      return { previousIngredients };
    },

    onError: (_err, _updatedIngredient, context) => {
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
    updateIngredient: mutation.mutate,
    isUpdating: mutation.isPending,
  };
};

export const useDeleteIngredient = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteIngredientById,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["ingredients"] });

      const previousIngredients = queryClient.getQueryData<Ingredient[]>([
        "ingredients",
      ]);

      queryClient.setQueryData<Ingredient[]>(
        ["ingredients"],
        (oldIngredients) => {
          return oldIngredients
            ? oldIngredients.filter((ingredient) => ingredient.id !== id)
            : [];
        }
      );

      return { previousIngredients };
    },

    onError: (_err, _deletedIngredient, context) => {
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
    deleteIngredient: mutation.mutate,
    isDeleting: mutation.isPending,
  };
};
