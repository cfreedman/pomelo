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

export default function AppSidebar(): JSX.Element {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1>Hello</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link to="/">Home</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to="/recipes">Recipes</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to="/">Ingredients</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to="/stores">Grocery Stores</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to="/calendar">Weekly Meals</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to="/">Settings</Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
