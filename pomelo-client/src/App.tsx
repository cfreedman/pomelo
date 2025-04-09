import { BrowserRouter, Routes, Route } from "react-router";

import "./App.css";
import CalendarPage from "./pages/CalendarPage";
import RecipesPage from "./pages/RecipesPage";
import StoresPage from "./pages/StoresPage";
import SidebarWrapper from "./pages/SidebarWrapper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SidebarWrapper />}>
          <Route path="recipes" element={<RecipesPage />} />
          <Route path="stores" element={<StoresPage />} />
          <Route path="calendar" element={<CalendarPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
