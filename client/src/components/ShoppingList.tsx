import { JSX, useMemo, useState } from "react";

import { ShoppingList as ShoppingListType } from "@/lib/shopping_list";
import { ShoppingIngredient } from "@/lib/recipes";

export interface ShoppingListProps {
  shoppingList: ShoppingListType;
}

type ShoppingListGroup = "store" | "foodType";

const groupShoppingListItems = (
  items: ShoppingIngredient[],
  group: ShoppingListGroup
): Record<string, ShoppingIngredient[]> => {
  const result: Record<string, ShoppingIngredient[]> = {};

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
      <div className="flex w-[200px] h-[50px]">
        <button
          onClick={() => setShoppingListGroup("store")}
          className={`${
            shoppingListGroup === "store"
              ? "border-1 border-black selected-shadow"
              : "gray-shadow"
          } w-1/2 flex items-center justify-center rounded-l-sm text-lg text-black bg-thunderbird-600`}
        >
          Store
        </button>
        <button
          onClick={() => setShoppingListGroup("foodType")}
          className={`${
            shoppingListGroup === "foodType"
              ? "border-1 border-black selected-shadow"
              : "gray-shadow"
          } w-1/2 flex items-center justify-center rounded-r-sm text-lg text-black bg-orange-peel-600`}
        >
          Food Type
        </button>
      </div>
      <div className="flex flex-row gap-10 flex-wrap items-start">
        {Object.entries(groupedItems).map(([group, items]) => (
          <ShoppingListGroup
            group={group}
            items={items}
            purchasedIds={purchasedIds}
            handleTogglePurchaseItem={handleTogglePurchaseItem}
          />
        ))}
      </div>
    </div>
  );
}

interface ShoppingListGroupProps {
  group: string;
  items: ShoppingIngredient[];
  purchasedIds: string[];
  handleTogglePurchaseItem: (item: string) => void;
}

const ShoppingListGroup = ({
  group,
  items,
  purchasedIds,
  handleTogglePurchaseItem,
}: ShoppingListGroupProps) => {
  return (
    <div className="p-5 pb-7 brutal-badge rounded-sm w-[400px] border-3 border-black">
      <h3 className="text-2xl mb-4">{group}</h3>
      <div className="flex flex-col items-start">
        {items.map((item) => (
          <button
            className={`${
              purchasedIds.includes(item.id) && "underline"
            } px-1 text-lg`}
            onClick={() => handleTogglePurchaseItem(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};
