import { BASE_URL } from "@/config/constants";
import { BaseStore } from "./stores";
import {
  Tag,
  Ingredient,
  IngredientWithAmount,
  IngredientWithAmountCreate,
  IngredientCreate,
} from "./ingredients";

export interface Recipe {
  id: string;
  name: string;
  cuisine?: string;
  mealType?: string;
  servings: number;
  tags: Tag[];
  ingredients: IngredientWithAmount[];
}

export function hasCuisine(
  recipe: Recipe
): recipe is Recipe & { cuisine: string } {
  return typeof recipe.cuisine === "string";
}

export function hasMealType(
  recipe: Recipe
): recipe is Recipe & { mealType: string } {
  return typeof recipe.mealType === "string";
}

export type RecipeCreate = Omit<Recipe, "id" | "ingredients" | "tags"> & {
  tags: string[];
  ingredients: IngredientWithAmountCreate[];
};

export type BaseRecipe = Pick<Recipe, "id" | "name">;

// API calls for recipes

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const response = await fetch(`${BASE_URL}/recipes/${id}`);

  return await response.json();
};

export const fetchAllRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch(`${BASE_URL}/recipes`);

  return await response.json();
};

export const addRecipe = async (recipe: RecipeCreate): Promise<Recipe> => {
  const response = await fetch(`{BASE_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  return await response.json();
};

export const updateRecipeById = async (
  id: string,
  recipe: RecipeCreate
): Promise<Recipe> => {
  const response = await fetch(`{BASE_URL}/recipes/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  return await response.json();
};

export const deleteRecipeById = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/recipes/${id}`, {
    method: "DELETE",
  });

  return;
};
