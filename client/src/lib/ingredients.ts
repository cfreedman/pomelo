import { BASE_URL } from "@/config/constants";
import { BaseStore } from "./stores";

// Data structures for data types coming in from backend

export interface Tag {
  id: string;
  name: string;
}

export interface Ingredient {
  id: string;
  name: string;
  units: string | null;
  foodType: string | null;
}

export interface IngredientWithAmount extends Ingredient {
  quantity: number;
}

export interface ShoppingIngredient extends IngredientWithAmount {
  store: BaseStore;
}

// Data type to send to backend for creating ingredients or updating them in recipes

export type IngredientCreate = Omit<Ingredient, "id">;
export type IngredientWithAmountCreate = Omit<IngredientWithAmount, "id">;

// API calls for ingredients

export const fetchIngredientById = async (id: string): Promise<Ingredient> => {
  const response = await fetch(`${BASE_URL}/ingredients/${id}`);

  return await response.json();
};

export const fetchAllIngredients = async (): Promise<Ingredient[]> => {
  const response = await fetch(`${BASE_URL}/ingredients`);

  return await response.json();
};

export const addIngredient = async (
  ingredient: IngredientCreate
): Promise<Ingredient> => {
  const response = await fetch(`{BASE_URL}/ingredients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingredient),
  });

  return await response.json();
};

export const updateIngredientsById = async (
  id: string,
  ingredient: IngredientCreate
): Promise<Ingredient> => {
  const response = await fetch(`{BASE_URL}/ingredients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingredient),
  });

  return await response.json();
};

export const deleteIngredientById = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/ingredients/${id}`, {
    method: "DELETE",
  });

  return;
};
