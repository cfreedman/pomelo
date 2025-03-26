import "./App.css";
import AppSidebar from "./components/AppSidebar";
import Recipe, { greenCurry } from "./components/Recipe";
import RecipeList, { recipeList } from "./components/RecipeList";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className="flex justify-between w-full">
        <RecipeList recipes={recipeList} />
        <div className="w-[30%]">
          <Recipe name={greenCurry.name} ingredients={greenCurry.ingredients} />
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
