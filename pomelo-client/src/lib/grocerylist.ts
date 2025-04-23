import { RecipeIngredientCreate } from "./recipes";
import { Store } from "./stores";

export type GroceryListIngredient = RecipeIngredientCreate & {
  store?: Store;
};
