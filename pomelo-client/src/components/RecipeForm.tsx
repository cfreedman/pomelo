import { JSX, useState } from "react";

import { RecipeCreate, RecipeIngredientCreate } from "@/lib/recipes";
import RemoveIcon from "@/assets/remove.png";

const IngredientInput: React.FC<{
  ingredient: RecipeIngredientCreate;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteIngredient: () => void;
}> = ({ ingredient, onChange, deleteIngredient }) => {
  const { name, units, quantity } = ingredient;
  return (
    <div className="flex flex-row gap-1">
      <input
        className="recipeInput"
        type="text"
        name="name"
        placeholder="Ingredient"
        value={name}
        onChange={(event) => onChange(event)}
      />
      <input
        className="recipeInput"
        type="text"
        name="quantity"
        placeholder="Quantity"
        value={quantity}
        onChange={(event) => onChange(event)}
      />
      <input
        className="recipeInput"
        type="text"
        name="units"
        placeholder="Units"
        value={units}
        onChange={(event) => onChange(event)}
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
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedIngredients: RecipeIngredientCreate[] = [
      ...recipe.ingredients,
    ];

    const fieldName = event.target.name as keyof RecipeIngredientCreate;

    if (fieldName === "quantity") {
      updatedIngredients[index][fieldName] = Number(event.target.value);
    } else {
      updatedIngredients[index][fieldName] = event.target.value;
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
          onChange={(event) => handleIngredientChange(event, index)}
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
