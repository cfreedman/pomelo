import { JSX, useMemo, useState } from "react";

import { ShoppingList as ShoppingListType } from "@/lib/shopping_list";
import { IngredientWithAmount } from "@/lib/recipes";

export interface ShoppingListProps {
  shoppingList: ShoppingListType;
}

type ShoppingListGroup = "store" | "foodType";

const groupShoppingListItems = (
  items: IngredientWithAmount[],
  group: ShoppingListGroup
): Record<string, IngredientWithAmount[]> => {
  const result: Record<string, IngredientWithAmount[]> = {};

  for (const item of items) {
    if (group === "store") {
      const itemStore = item.store?.name ?? "Other";
      if (!result[itemStore]) {
        result[itemStore] = [];
      }
      result[itemStore].push(item);
    } else {
      const itemType = item.foodType ?? "Other";
      if (!result[itemType]) {
        result[itemType] = [];
      }
      result[itemType].push(item);
    }
  }

  return result;
};

export default function ShoppingList({
  shoppingList,
}: ShoppingListProps): JSX.Element {
  const [shoppingListGroup, setShoppingListGroup] =
    useState<ShoppingListGroup>("store");

  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

  const groupedItems = useMemo(() => {
    return groupShoppingListItems(shoppingList.items, shoppingListGroup);
  }, [shoppingList, shoppingListGroup]);

  const handleTogglePurchaseItem = (toggleId: string) => {
    let updatedPurchasedIds = [...purchasedIds];
    if (purchasedIds.includes(toggleId)) {
      updatedPurchasedIds = updatedPurchasedIds.filter((id) => id !== toggleId);
    } else {
      updatedPurchasedIds.push(toggleId);
    }

    setPurchasedIds(updatedPurchasedIds);
  };

  return (
    <div>
      <h1 className="mb-5">Shopping List</h1>
      <label>
        <input
          type="radio"
          value="store"
          checked={shoppingListGroup === "store"}
          onChange={() => setShoppingListGroup("store")}
        />
        <span>Store</span>
      </label>
      <label>
        <input
          type="radio"
          value="foodType"
          checked={shoppingListGroup === "foodType"}
          onChange={() => setShoppingListGroup("foodType")}
        />
        <span>Food Type</span>
      </label>
      <div className="flex flex-col gap-10">
        {Object.entries(groupedItems).map(([group, items]) => (
          <div>
            <h3>{group}</h3>
            {items.map((item) => (
              <button
                className={`${
                  purchasedIds.includes(item.id) && "underline"
                } px-1`}
                onClick={() => handleTogglePurchaseItem(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
