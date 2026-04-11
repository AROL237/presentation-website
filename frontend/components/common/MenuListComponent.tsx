import React from "react";
import { NavigationMenuLink } from "../ui/navigation-menu";
import data from "@/steps.json";
import { Label } from "../ui/label";
import CustomLink from "./CustomLink";

const menuList = data.navigation_tab;
const MenuListComponent = () => {
  return menuList.map((menuItem) => (
    <CustomLink
      href={menuItem.link}
      className="hover:text-amber-900 underline underline-offset-2"
    >
      {menuItem.title}
    </CustomLink>
  ));
};

export default MenuListComponent;
