import { JSX } from "react";

import ShoppingList from "@/components/ShoppingList";
import { shoppingListDummy } from "@/dummy/shopping_list";

export default function ShoppingListPage(): JSX.Element {
  return (
    <div>
      <ShoppingList shoppingList={shoppingListDummy} />
    </div>
  );
}
