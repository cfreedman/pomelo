import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addShoppingList,
  fetchAllShoppingLists,
  ShoppingList,
} from "@/lib/shopping_list";

export const useShoppingLists = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["shopping-lists"],
    queryFn: fetchAllShoppingLists,
  });

  const addShoppingListMutation = useMutation({
    mutationFn: addShoppingList,
    onMutate: async (newShoppingList: ShoppingList) => {
      await queryClient.cancelQueries({ queryKey: ["shopping-lists"] });

      const previousShoppingLists = queryClient.getQueryData<ShoppingList[]>([
        "shopping-lists",
      ]);

      queryClient.setQueryData<ShoppingList[]>(
        ["shopping-lists"],
        (oldShoppingLists) => {
          return oldShoppingLists
            ? [...oldShoppingLists, newShoppingList]
            : [newShoppingList];
        }
      );

      return { previousShoppingLists };
    },

    onError: (_err, _newShoppingList, context) => {
      queryClient.setQueryData<ShoppingList[]>(
        ["ingredients"],
        context?.previousShoppingLists
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shopping-lists"] });
    },
  });

  return {
    ingredients: data || [],
    isLoading,
    addIngredient: addShoppingListMutation.mutate,
    isAdding: addShoppingListMutation.isPending,
  };
};
