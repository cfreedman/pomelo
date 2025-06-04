import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addShoppingList,
  deleteShoppingListById,
  fetchAllShoppingLists,
  fetchShoppingListById,
  ShoppingList,
  ShoppingListCreate,
  updateShoppingListById,
} from "@/lib/shopping_list";
import { getDateString } from "@/lib/meal_plan";

export const useShoppingList = () => {
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
    shoppingLists: data || [],
    isLoading,
    addShoppingList: addShoppingListMutation.mutate,
    isAdding: addShoppingListMutation.isPending,
  };
};

export const useShoppingListById = (weekStart: Date) => {
  const queryClient = useQueryClient();
  const serializedWeekStart = getDateString(weekStart);

  const { data, isLoading } = useQuery({
    queryKey: ["shopping-lists", serializedWeekStart],
    queryFn: () => fetchShoppingListById(serializedWeekStart),
  });

  const updateShoppingListMutation = useMutation({
    mutationFn: (shoppingList: ShoppingListCreate) =>
      updateShoppingListById(serializedWeekStart, shoppingList),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["shopping-lists", serializedWeekStart],
      });
    },
  });

  const deleteShoppingListMutation = useMutation({
    mutationFn: () => deleteShoppingListById(serializedWeekStart),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shopping-lists"] });
    },
  });

  return {
    shoppingList: data || [],
    isLoading,
    updateShoppingList: updateShoppingListMutation.mutate,
    isUpdating: updateShoppingListMutation.isPending,
    deleteShoppingList: deleteShoppingListMutation.mutate,
    isDeleting: deleteShoppingListMutation.isPending,
  };
};
