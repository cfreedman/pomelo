import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import CalendarPage from "./pages/CalendarPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import RecipesPage from "./pages/RecipesPage";
import StoresPage from "./pages/StoresPage";
import TestPage from "./pages/TestPage";
import SidebarWrapper from "./pages/SidebarWrapper";
import HomePage from "./pages/HomePage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SidebarWrapper />}>
            <Route path="home" element={<HomePage />} />
            <Route path="recipes" element={<RecipesPage />} />
            <Route path="stores" element={<StoresPage />} />
            <Route path="calendar/:weekStart?" element={<CalendarPage />} />
            <Route path="shopping-list" element={<ShoppingListPage />} />
            <Route path="test" element={<TestPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
