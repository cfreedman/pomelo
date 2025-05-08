import { BASE_URL } from "@/config/constants";
import { IngredientWithAmount, IngredientWithAmountCreate } from "./recipes";

export interface ShoppingList {
  weekState: string;
  items: IngredientWithAmount[];
}

export interface ShoppingListCreate {
  weekStart: string;
  items: IngredientWithAmountCreate[];
}

export const fetchRecipeById = async (id: string): Promise<ShoppingList> => {
  const response = await fetch(`${BASE_URL}/shopping-lists/${id}`);

  return await response.json();
};

export const fetchAllRecipes = async (): Promise<ShoppingList[]> => {
  const response = await fetch(`${BASE_URL}/recipes`);

  return await response.json();
};

export const addRecipe = async (
  shoppingList: ShoppingListCreate
): Promise<ShoppingList> => {
  const response = await fetch(`{BASE_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shoppingList),
  });

  return await response.json();
};

export const updateRecipeById = async (
  id: string,
  shoppingList: ShoppingListCreate
): Promise<ShoppingList> => {
  const response = await fetch(`{BASE_URL}/shopping-lists/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shoppingList),
  });

  return await response.json();
};

export const deleteRecipeById = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/shopping-lists/${id}`, {
    method: "DELETE",
  });

  return;
};
