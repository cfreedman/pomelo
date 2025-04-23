import { JSX } from "react";

import { GroceryListIngredient } from "@/lib/grocerylist";
import { Store } from "@/lib/stores";

export interface GroceryListProps {
  groceryList: GroceryListIngredient[];
}

export default function GroceryList({
  groceryList,
}: GroceryListProps): JSX.Element {
  const storeToIngredientMap = new Map<Store, GroceryListIngredient[]>();

  const anyStoreIngredients: GroceryListIngredient[] = [];

  for (const ingredient of groceryList) {
    if (!ingredient.store) {
      anyStoreIngredients.push(ingredient);
    } else {
      if (!storeToIngredientMap.has(ingredient.store)) {
        storeToIngredientMap.set(ingredient.store, []);
      }
      storeToIngredientMap.get(ingredient.store)?.push(ingredient);
    }
  }

  console.log(storeToIngredientMap);

  return (
    <div>
      <h1>Grocery List</h1>
      <div>
        <h3>Any Store</h3>
        <ul>
          {anyStoreIngredients.map((ingredient) => (
            <li key={ingredient.name}>
              <p>{`${ingredient.quantity} ${ingredient.units}`}</p>
              <p>{ingredient.name}</p>
            </li>
          ))}
        </ul>
      </div>
      {Array.from(storeToIngredientMap.keys()).map((store) => {
        const associatedIngredients = storeToIngredientMap.get(store);

        return (
          <div key={store.name}>
            <h3>{store.name}</h3>
            <ul>
              {associatedIngredients?.map((ingredient) => (
                <li key={ingredient.name}>
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
