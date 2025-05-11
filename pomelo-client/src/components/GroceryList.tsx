import { JSX } from "react";

import { GroceryListIngredient } from "@/lib/shopping_list";

export interface GroceryListProps {
  groceryList: GroceryListIngredient[];
}

// type GrocerySortingField = "store" | "ingredientType";

export default function GroceryList({
  groceryList,
}: GroceryListProps): JSX.Element {
  // const [sortingField, setSortingField] =
  //   useState<GrocerySortingField>("store");

  const storeToIngredientMap = new Map<string, GroceryListIngredient[]>();

  const anyStoreIngredients: GroceryListIngredient[] = [];

  for (const ingredient of groceryList) {
    if (!ingredient.store) {
      anyStoreIngredients.push(ingredient);
    } else {
      if (!storeToIngredientMap.has(ingredient.store.name)) {
        storeToIngredientMap.set(ingredient.store.name, []);
      }
      storeToIngredientMap.get(ingredient.store.name)?.push(ingredient);
    }
  }

  console.log(storeToIngredientMap);

  return (
    <div>
      <h1 className="mb-5">Grocery List</h1>
      <div>
        <h3 className="mb-4 mt-6">Any Store</h3>
        <ul>
          {anyStoreIngredients.map((ingredient) => (
            <li key={ingredient.name} className="flex flex-row gap-3 my-2">
              <p>{`${ingredient.quantity} ${ingredient.units}`}</p>
              <p>{ingredient.name}</p>
            </li>
          ))}
        </ul>
      </div>
      {Array.from(storeToIngredientMap.keys()).map((storeName) => {
        const associatedIngredients = storeToIngredientMap.get(storeName);

        return (
          <div key={storeName}>
            <h3 className="mb-4 mt-6">{storeName}</h3>
            <ul>
              {associatedIngredients?.map((ingredient) => (
                <li key={ingredient.name} className="flex flex-row gap-3 my-2">
                  <p>{`${ingredient.quantity} ${ingredient.units}`}</p>
                  <p>{ingredient.name}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
