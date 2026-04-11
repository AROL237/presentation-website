import React, { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useTheme, UseThemeProps } from "next-themes";
import data from "@/steps.json"



export default function NavBarComponnent() {
  const [open, setOpen] = useState(false);
  function openMenu() {
    setOpen((open) => !open);
  }
  const menuList = data.navigation_tab
  const MenuListComponent = () => {
    return menuList.map((menuItem) => (
      <NavigationMenuLink className="">{menuItem.title}</NavigationMenuLink>
    ));
  };

  const theme: UseThemeProps = useTheme();
  const [currentTheme, setTheme] = useState(theme);

  function toggleTheme() {
    if (theme.theme === "inline") {
      theme.setTheme("dark");
    } else theme.setTheme("inline");
  }

  return (
    <NavigationMenu className=" inline w-full ">
      <NavigationMenuList className="hidden  sm:inline  ">
        <div className="flex w-full flex-row px-5 h-24   justify-between">
          <div className="text-3xl uppercase my-auto  ">
            <label>logo</label>
          </div>
          <div className="flex  gap-2 capitalize font-semibold">
            <MenuListComponent />
          </div>
          <div className="my-auto">
            <div className=" w-full mx-auto flex flex-row gap-1 ">
              <Switch
                onClick={toggleTheme}
                className=" border border-amber-300"
              />
              <Label className="capitalize">mode</Label>
            </div>
            {/* <label htmlFor="facebook">facebook</label>
            <label htmlFor="facebook">whatsapp</label> */}
          </div>
        </div>
      </NavigationMenuList>
      <NavigationMenuList className="px-5 h-20 sm:hidden justify-between  min-w-full ">
        <NavigationMenuItem>logo</NavigationMenuItem>
        <NavigationMenuItem>
          <Button
            onClick={openMenu}
            size={"icon-lg"}
            variant={"outline"}
            // className={`${open ? "hidden" : "flex"}`}
          >
            <Menu />
          </Button>
          <Dialog open={open} modal onOpenChange={openMenu}>
            <DialogContent>
              <DialogClose onClick={openMenu}></DialogClose>
              <div className="text-3xl uppercase  w-full mx-auto ">
                <label>logo</label>
              </div>
              <div className="p-2 font-semibold capitalize flex flex-col justify-center mx-auto ">
                <MenuListComponent />
              </div>
            </DialogContent>
          </Dialog>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
