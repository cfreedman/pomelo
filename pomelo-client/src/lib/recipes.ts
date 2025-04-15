import { BASE_URL } from "@/config/constants";

export interface Tag {
  id: string;
  name: string;
}

export interface Ingredient {
  id: string;
  name: string;
  units?: string;
}

export type RecipeIngredient = Ingredient & {
  quantity: number;
};

export interface Recipe {
  id: string;
  name: string;
  cuisine?: string;
  mealType?: string;
  tags: Tag[];
  ingredients: RecipeIngredient[];
}

export type IngredientCreate = Omit<Ingredient, "id">;
export type RecipeIngredientCreate = Omit<RecipeIngredient, "id">;
export type RecipeCreate = Omit<Recipe, "id" | "ingredients"> & {
  ingredients: RecipeIngredientCreate[];
};

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const response = await fetch(`${BASE_URL}/recipe/${id}`);

  return await response.json();
};

export const fetchAllRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch(`${BASE_URL}/recipe`);

  return await response.json();
};

export const addRecipe = async (recipe: RecipeCreate): Promise<Recipe> => {
  const response = await fetch(`{BASE_URL}/recipe`, {
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
  const response = await fetch(`{BASE_URL}/recipe/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  return await response.json();
};

export const deleteRecipeById = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/recipe/${id}`, {
    method: "DELETE",
  });

  return;
};
