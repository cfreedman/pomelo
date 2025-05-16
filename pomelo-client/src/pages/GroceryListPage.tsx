import { JSX } from "react";

import GroceryList from "@/components/ShoppingList";
import { GroceryListIngredient } from "@/lib/shopping_list";

const groceryList: GroceryListIngredient[] = [
  {
    name: "Apples",
    quantity: 5,
    units: "pcs",
    store: { name: "Walmart", address: "" },
  },
  {
    name: "Bananas",
    quantity: 6,
    units: "pcs",
    store: { name: "Target", address: "" },
  },
  {
    name: "Chicken Breast",
    quantity: 2,
    units: "lbs",
    store: { name: "Costco", address: "" },
  },
  {
    name: "Milk",
    quantity: 1,
    units: "gallon",
  },
  {
    name: "Eggs",
    quantity: 12,
    units: "pcs",
  },
  {
    name: "Bread",
    quantity: 1,
    units: "loaf",
    store: { name: "Safeway", address: "" },
  },
  {
    name: "Carrots",
    quantity: 2,
    units: "lbs",
    store: { name: "Walmart", address: "" },
  },
  {
    name: "Rice",
    quantity: 5,
    units: "lbs",
    store: { name: "Walmart", address: "" },
  },
  {
    name: "Cheese",
    quantity: 1,
    units: "block",
    store: { name: "Target", address: "" },
  },
  {
    name: "Tomatoes",
    quantity: 4,
    units: "pcs",
    store: { name: "Whole Foods", address: "" },
  },
];

export default function GroceryListPage(): JSX.Element {
  return (
    <div>
      <GroceryList groceryList={groceryList} />
    </div>
  );
}
