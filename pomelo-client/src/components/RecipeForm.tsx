import { JSX, useState } from "react";

import { RecipeCreate, IngredientWithAmountCreate } from "@/lib/recipes";
import RemoveIcon from "@/assets/remove.png";

const IngredientInput: React.FC<{
  ingredient: IngredientWithAmountCreate;
  handleChange: (
    value: string,
    field: keyof IngredientWithAmountCreate
  ) => void;
  deleteIngredient: () => void;
}> = ({ ingredient, handleChange, deleteIngredient }) => {
  const { name, units, quantity } = ingredient;

  const [quantityInput, setQuantityInput] = useState(quantity.toString());

  const handleQuantityBlur = () => {
    const parsedQuantity = parseFloat(quantityInput);

    if (!isNaN(parsedQuantity)) {
      handleChange(quantityInput, "quantity");
    }
  };

  return (
    <div className="flex flex-row gap-1">
      <input
        className="recipeInput"
        type="text"
        name="name"
        placeholder="Ingredient"
        value={name}
        onChange={(event) => handleChange(event.target.value, "name")}
      />
      <input
        className="recipeInput"
        type="text"
        name="quantity"
        placeholder="Quantity"
        value={quantityInput}
        onChange={(event) => setQuantityInput(event.target.value)}
        onBlur={() => handleQuantityBlur()}
      />
      <input
        className="recipeInput"
        type="text"
        name="units"
        placeholder="Units"
        value={units}
        onChange={(event) => handleChange(event.target.value, "units")}
      />
      <button onClick={() => deleteIngredient()}>
        <img className="w-4 h-4" src={RemoveIcon} alt="Remove" />
      </button>
    </div>
  );
};

export default function RecipeForm(): JSX.Element {
  const [recipe, setRecipe] = useState<RecipeCreate>({
    name: "",
    cuisine: "",
    ingredients: [
      {
        name: "",
        quantity: 0,
        units: "",
      },
    ],
  } as RecipeCreate);

  const handleIngredientChange = (
    value: string,
    field: keyof IngredientWithAmountCreate,
    index: number
  ) => {
    const updatedIngredients: IngredientWithAmountCreate[] = [
      ...recipe.ingredients,
    ];

    if (field === "quantity") {
      updatedIngredients[index][field] = Number(value);
    } else {
      updatedIngredients[index][field] = value;
    }

    setRecipe({
      ...recipe,
      ingredients: updatedIngredients,
    });
  };

  const handleSubmit = () => {};

  const deleteIngredient = (index: number) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients.splice(index, 1);
    setRecipe({
      ...recipe,
      ingredients: updatedIngredients,
    } as RecipeCreate);
  };

  const addIngredient = () => {
    const newEmptyIngredient = {
      name: "",
      quantity: 0,
      units: "",
    };

    const updatedIngredients = [...recipe.ingredients, newEmptyIngredient];

    setRecipe({
      ...recipe,
      ingredients: updatedIngredients,
    } as RecipeCreate);
  };

  return (
    <form className="flex flex-col gap-1" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-row gap-1">
        <input
          className="recipeInput"
          type="text"
          placeholder="Recipe Name"
          value={recipe?.name}
          onChange={(e) =>
            setRecipe({ ...recipe, name: e.target.value } as RecipeCreate)
          }
        />
        <input
          className="recipeInput"
          type="text"
          placeholder="Cuisine"
          value={recipe?.cuisine}
          onChange={(e) =>
            setRecipe({ ...recipe, cuisine: e.target.value } as RecipeCreate)
          }
        />
        <p>Tags</p>
      </div>
      {recipe.ingredients?.map((ingredient, index) => (
        <IngredientInput
          key={index} // Add a unique key for each ingredient
          ingredient={ingredient}
          handleChange={(value, field) =>
            handleIngredientChange(value, field, index)
          }
          deleteIngredient={() => deleteIngredient(index)}
        />
      ))}
      <div className="flex flex-row gap-1">
        <button type="button" onClick={() => addIngredient()}>
          Add Ingredient
        </button>
        <button type="submit" onClick={() => handleSubmit()}>
          Submit
        </button>
      </div>
    </form>
  );
}
