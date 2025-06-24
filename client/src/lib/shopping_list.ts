import { BASE_URL } from "@/config/constants";
import {
  IngredientWithAmount,
  IngredientWithAmountCreate,
  ShoppingIngredient,
} from "./recipes";

export interface ShoppingList {
  weekStart: Date;
  items: ShoppingIngredient[];
}

export interface ShoppingListCreate {
  weekStart: Date;
  items: IngredientWithAmountCreate[];
}

export const fetchShoppingListById = async (
  id: string
): Promise<ShoppingList> => {
  const response = await fetch(`${BASE_URL}/shopping-lists/${id}`);

  return await response.json();
};

export const fetchAllShoppingLists = async (): Promise<ShoppingList[]> => {
  const response = await fetch(`${BASE_URL}/shopping-lists`);

  return await response.json();
};

export const addShoppingList = async (
  shoppingList: ShoppingListCreate
): Promise<ShoppingList> => {
  const response = await fetch(`{BASE_URL}/shopping-lists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shoppingList),
  });

  return await response.json();
};

export const updateShoppingListById = async (
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

export const deleteShoppingListById = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/shopping-lists/${id}`, {
    method: "DELETE",
  });

  return;
};
