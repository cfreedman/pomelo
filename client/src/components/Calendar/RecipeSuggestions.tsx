import { BaseRecipe } from "@/lib/recipes";
import { Badge } from "../ui/badge";

interface RecipeSuggestionsProps {
  recipes: BaseRecipe[];
  handleDragItem: (e: React.DragEvent, recipe: BaseRecipe) => void;
}

const RecipeSuggestions = ({
  recipes,
  handleDragItem,
}: RecipeSuggestionsProps) => {
  const [recipeSearch, setRecipeSearch] = useState<string | undefined>(
    undefined
  );

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(recipeSearch?.toLowerCase() || "")
  );

  return (
    <div className="flex flex-col h-[300px] relative">
      <div className="w-full h-[200px] mt-3 mb-5 pb-1 flex flex-wrap gap-2 overflow-scroll items-start content-start">
        {filteredRecipes.map((recipe) => (
          <Badge
            className="brutal-badge text-md bg-white text-black rounded-sm h-[32px]"
            draggable
            onDragStart={(e) => handleDragItem(e, recipe)}
            key={recipe.id}
          >
            {recipe.name}
          </Badge>
        ))}
      </div>
      <Input
        className="absolute bottom-0 h-[60px] text-xl border-3 border-black md:text-xl font-bold"
        placeholder="Search for suggested recipes here..."
        type="text"
        value={recipeSearch}
        onChange={(e) => setRecipeSearch(e.target.value)}
      />
    </div>
  );
};
