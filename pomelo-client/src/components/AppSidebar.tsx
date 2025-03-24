import { JSX } from "react";
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
              <SidebarMenuItem>Home</SidebarMenuItem>
              <SidebarMenuItem>Recipes</SidebarMenuItem>
              <SidebarMenuItem>Ingredients</SidebarMenuItem>
              <SidebarMenuItem>Grocery Stores</SidebarMenuItem>
              <SidebarMenuItem>Weekly Meals</SidebarMenuItem>
              <SidebarMenuItem>Settings</SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
