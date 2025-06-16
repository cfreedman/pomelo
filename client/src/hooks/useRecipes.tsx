import {
  addRecipe,
  fetchAllRecipes,
  Recipe,
  RecipeCreate,
  Tag,
} from "@/lib/recipes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRecipes = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchAllRecipes,
  });

  const addRecipeMutation = useMutation({
    mutationFn: addRecipe,
    onMutate: async (newRecipe: RecipeCreate) => {
      await queryClient.cancelQueries({ queryKey: ["recipes"] });

      const previousRecipes = queryClient.getQueryData<Recipe[]>(["recipes"]);

      queryClient.setQueryData<Recipe[]>(["recipes"], (oldRecipes) => {
        const tempId = crypto.randomUUID();
        const tempTags: Tag[] = newRecipe.tags.map((tagName) => ({
          id: crypto.randomUUID(),
          name: tagName,
        }));
        const newRecipeWithId = {
          ...newRecipe,
          id: tempId,
          tags: tempTags,
        } as Recipe;
        return oldRecipes
          ? [...oldRecipes, newRecipeWithId]
          : [newRecipeWithId];
      });

      return { previousRecipes };
    },

    onError: (_err, _newRecipe, context) => {
      queryClient.setQueryData<Recipe[]>(["recipes"], context?.previousRecipes);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });

  return {
    recipes: data || [],
    isLoading,
    addRecipe: addRecipeMutation.mutate,
    isAdding: addRecipeMutation.isPending,
  };
};
