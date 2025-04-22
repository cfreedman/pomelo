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

export const RECIPE_DATA: Recipe[] = [
  {
    id: "1",
    name: "Spaghetti Carbonara",
    cuisine: "Italian",
    mealType: "Dinner",
    tags: [
      { id: "1", name: "Pasta" },
      { id: "2", name: "Comfort Food" },
    ],
    ingredients: [
      { id: "1", name: "Spaghetti", quantity: 200, units: "g" },
      { id: "2", name: "Eggs", quantity: 3 },
      { id: "3", name: "Pancetta", quantity: 100, units: "g" },
      { id: "4", name: "Parmesan Cheese", quantity: 50, units: "g" },
    ],
  },
  {
    id: "2",
    name: "Chicken Tikka Masala",
    cuisine: "Indian",
    mealType: "Dinner",
    tags: [
      { id: "3", name: "Spicy" },
      { id: "4", name: "Curry" },
    ],
    ingredients: [
      { id: "5", name: "Chicken Breast", quantity: 300, units: "g" },
      { id: "6", name: "Yogurt", quantity: 100, units: "ml" },
      { id: "7", name: "Tomato Puree", quantity: 200, units: "ml" },
      { id: "8", name: "Spices", quantity: 10, units: "g" },
    ],
  },
  {
    id: "3",
    name: "Vegetable Pad Thai",
    cuisine: "Thai",
    mealType: "Lunch",
    tags: [
      { id: "5", name: "Vegetarian" },
      { id: "6", name: "Noodles" },
    ],
    ingredients: [
      { id: "9", name: "Rice Noodles", quantity: 200, units: "g" },
      { id: "10", name: "Tofu", quantity: 150, units: "g" },
      { id: "11", name: "Peanuts", quantity: 50, units: "g" },
      { id: "12", name: "Bean Sprouts", quantity: 100, units: "g" },
    ],
  },
  {
    id: "4",
    name: "Beef Tacos",
    cuisine: "Mexican",
    mealType: "Dinner",
    tags: [
      { id: "7", name: "Tacos" },
      { id: "8", name: "Quick Meal" },
    ],
    ingredients: [
      { id: "13", name: "Ground Beef", quantity: 250, units: "g" },
      { id: "14", name: "Taco Shells", quantity: 6 },
      { id: "15", name: "Cheddar Cheese", quantity: 100, units: "g" },
      { id: "16", name: "Lettuce", quantity: 50, units: "g" },
    ],
  },
  {
    id: "5",
    name: "Greek Salad",
    cuisine: "Greek",
    mealType: "Lunch",
    tags: [
      { id: "9", name: "Healthy" },
      { id: "10", name: "Salad" },
    ],
    ingredients: [
      { id: "17", name: "Cucumber", quantity: 150, units: "g" },
      { id: "18", name: "Tomatoes", quantity: 200, units: "g" },
      { id: "19", name: "Feta Cheese", quantity: 100, units: "g" },
      { id: "20", name: "Olives", quantity: 50, units: "g" },
    ],
  },
  {
    id: "6",
    name: "Blueberry Pancakes",
    cuisine: "American",
    mealType: "Breakfast",
    tags: [
      { id: "11", name: "Sweet" },
      { id: "12", name: "Breakfast" },
    ],
    ingredients: [
      { id: "21", name: "Flour", quantity: 200, units: "g" },
      { id: "22", name: "Milk", quantity: 250, units: "ml" },
      { id: "23", name: "Blueberries", quantity: 100, units: "g" },
      { id: "24", name: "Eggs", quantity: 2 },
    ],
  },
];

export type BaseRecipe = Pick<Recipe, "id" | "name">;

export const BASE_RECIPE_DATA: BaseRecipe[] = [
  { id: "1", name: "Spaghetti Bolognese" },
  { id: "2", name: "Chicken Curry" },
  { id: "3", name: "Beef Stroganoff" },
  { id: "4", name: "Vegetable Stir Fry" },
  { id: "5", name: "Fish Tacos" },
  { id: "6", name: "Margherita Pizza" },
  { id: "7", name: "Caesar Salad" },
  { id: "8", name: "Lentil Soup" },
  { id: "9", name: "Pancakes" },
  { id: "10", name: "Chocolate Brownies" },
];

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
