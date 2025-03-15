import "./App.css";
import AppSidebar from "./components/AppSidebar";
import Login from "./components/Login";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <Login />
    </SidebarProvider>
  );
}

export default App;
