import { JSX } from "react";
import { Link } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
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
import AnimateGroup from "./AnimationProviders/AnimateGroup";

export default function AppSidebar(): JSX.Element {
  return (
    <Sidebar className="full-background">
      <SidebarHeader>
        <div className="flex items-center">
          <img src={PomeloIcon} alt="Pomelo" width={60} height={60} />
          <h3>Pomelo</h3>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              <AnimateGroup type="slide" direction="right" offset="small">
                <SidebarMenuItem className="rounded-md text-black text-center bg-breaker-bay-500 brutal-badge   ">
                  <Link
                    className="flex items-center justify-center relative"
                    to="/"
                  >
                    <House className="absolute left-2" />
                    Home
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem className="rounded-md text-black text-center bg-amber-500 brutal-badge   ">
                  <Link
                    className="flex items-center justify-center"
                    to="/recipes"
                  >
                    <CookingPot className="absolute left-2" />
                    Recipes
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem className="rounded-md text-black text-center bg-thunderbird-500 brutal-badge   ">
                  <Link
                    className="flex items-center justify-center relative"
                    to="/shopping-list"
                  >
                    <ListCheck className="absolute left-2" />
                    Shopping List
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem className="rounded-md text-black text-center bg-breaker-bay-500 brutal-badge   ">
                  <Link
                    className="flex items-center justify-center relative"
                    to="/stores"
                  >
                    <ShoppingCart className="absolute left-2" />
                    Stores
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem className="rounded-md text-black text-center bg-amber-500 brutal-badge   ">
                  <Link
                    className="flex items-center justify-center relative"
                    to="/calendar"
                  >
                    <CalendarDays className="absolute left-2" />
                    Weekly Meals
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem className="rounded-md text-black text-center bg-thunderbird-500 brutal-badge   ">
                  <Link
                    className="flex items-center justify-center relative"
                    to="/"
                  >
                    <Settings className="absolute left-2" />
                    Settings
                  </Link>
                </SidebarMenuItem>
              </AnimateGroup>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
