import "./App.css";
import AppSidebar from "./components/AppSidebar";
import Recipe from "./components/Recipe";
import RecipeList, { recipeList } from "./components/RecipeList";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <RecipeList recipes={recipeList} />
    </SidebarProvider>
  );
}

export default App;
