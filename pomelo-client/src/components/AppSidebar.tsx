import { JSX } from "react";
import { Link } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  CalendarDays,
  CookingPot,
  House,
  ListCheck,
  Settings,
  ShoppingCart,
} from "lucide-react";
import PomeloIcon from "@/assets/icons/pomelo.png";

export default function AppSidebar(): JSX.Element {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center">
          <img src={PomeloIcon} alt="Pomelo" width={60} height={60} />
          <h3>Pomelo</h3>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              <SidebarMenuItem className="rounded-md text-white text-center bg-breaker-bay-500">
                <Link className="flex items-center justify-center" to="/">
                  <House />
                  Home
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem className="rounded-md text-white text-center bg-amber-500">
                <Link
                  className="flex items-center justify-center"
                  to="/recipes"
                >
                  <CookingPot />
                  Recipes
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem className="rounded-md text-white text-center bg-thunderbird-500">
                <Link
                  className="flex items-center justify-center"
                  to="/shopping-list"
                >
                  <ListCheck />
                  Shopping List
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem className="rounded-md text-white text-center bg-breaker-bay-500">
                <Link className="flex items-center justify-center" to="/stores">
                  <ShoppingCart />
                  Grocery Stores
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem className="rounded-md text-white text-center bg-amber-500">
                <Link
                  className="flex items-center justify-center"
                  to="/calendar"
                >
                  <CalendarDays />
                  Weekly Meals
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem className="rounded-md text-white text-center bg-thunderbird-500">
                <Link className="flex items-center justify-center" to="/">
                  <Settings />
                  Settings
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
