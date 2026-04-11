import React from "react";

import img1 from "@/public/images/shop-items/20251215-5.jpg";
import img2 from "@/public/images/shop-items/product_2.jpeg";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Eye, FilterIcon, PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const data = [
  {
    name: "wigs",
    price: "73",
    image_url: img1,
    labels: ["wigs", "springs", "black"],
    description: "",
    discount: {
      type: "percentage",
      value: 30,
    },
    type: "afro",
    length: "",
    weight: "",
    category: [""],
  },
  {
    name: "rasta",
    price: "89",
    image_url: img2,
    labels: ["wigs", "springs", "black"],
    description: "",
    discount: {
      type: "percentage",
      value: 10,
    },
    type: "",
    length: "",
    weight: "",
    category: ["wigs"],
  },
  {
    name: "",
    price: "700",
    image_url: img2,
    labels: ["wigs", "springs", "black"],
    description: "",
    discount: {
      type: "fixed",
      value: 1000,
    },
    type: "",
    length: "",
    weight: "",
    category: ["human ponytail hair"],
  },
  {
    name: "ombre brown",
    price: "60",
    image_url: img2,
    labels: ["wigs", "springs", "black"],
    description: "",
    discount: {
      type: "percentage",
      value: 20,
    },
    type: "",
    length: "",
    weight: "",
    category: ["crochet hair"],
  },
  {
    name: "ombre brown",
    price: "450",
    image_url: img2,
    labels: ["wigs", "springs", "black"],
    description: "",
    discount: {
      type: "percentage",
      value: 20,
    },
    type: "",
    length: "",
    weight: "",
    category: ["hair bundle "],
  },
  {
    name: "ombre brown dsafsa  dsafjk ad jijsda fjoijdsaf ijidaf dsfadsaandsoifjdsaf dfsaaidf df ",
    price: "520",
    image_url: img2,
    labels: ["wigs", "springs", "black"],
    description: "",
    discount: {
      type: "percentage",
      value: 20,
    },
    type: "",
    length: "",
    weight: "",
    category: ["uman Afro Kinky "],
  },
];

const categories = [
  "All",
  "hair bundle",
  "braiding hair",
  "human Afro Kinky",
  "crochet hair",
  "human ponytail hair",
  "wigs",
];
export default function ShoppingComponent() {
  const theme = useTheme();

  const ProductCard = () =>
    data.map((item, index) => {
      return (
        <Card
          key={index}
          className="border-0 rounded-lg overflow-hidden p-0 hover:cursor-pointer transition-all duration-300 ease-out hover:shadow-lg hover:scale-105"
          style={{
            boxShadow:
              theme.theme === "dark"
                ? "0 0 0 1px rgba(163, 230, 53, 0.1)"
                : "0 0 0 1px rgba(217, 119, 6, 0.1)",
          }}
        >
          <div className="relative overflow-hidden bg-neutral-100 dark:bg-neutral-900">
            <Image
              alt={item.name || "product"}
              src={item.image_url}
              className="h-80 sm:h-48 md:h-56 lg:h-74 w-full object-cover hover:scale-110 transition-transform duration-300"
              priority={index < 2}
            />
            {item.discount && (
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-amber-500 dark:bg-amber-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
                -{item.discount.value}
                {item.discount.type === "percentage" ? "%" : ""}
              </div>
            )}
          </div>
          <CardAction className="flex w-full items-center justify-between px-3 sm:px-4 py-3 sm:py-4 gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm  sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                  {item.name || "Product"}
                </h3>
                {item.type && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Type: {item.type}
                  </p>
                )}
                {item.weight && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Weight: {item.weight}
                  </p>
                )}
                {item.length && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Length: {item.length}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                  Price
                </p>
              </div>
              <Label className="text-lg sm:text-xl font-bold text-amber-700 dark:text-amber-500 truncate">
                $
                {new Intl.NumberFormat("en-En", { style: "decimal" }).format(
                  Number(item.price),
                )}
              </Label>
            </div>
            <Button
              variant="default"
              size="icon"
              className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 h-9 w-9 sm:h-10 sm:w-10 shrink-0"
              title="Add to cart"
            >
              <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </CardAction>
        </Card>
      );
    });

  const CategorySection = () =>
    categories.map((item, index) => {
      return (
        <Button variant={"outline"}>
          <Label className="p-1 w-fit flex text-nowrap ">{item}</Label>
        </Button>
      );
    });

  return (
    <div>
      <div
        id="categories"
        className=" flex flex-row gap-2 w-full py-5 px-2 rounded-xl border "
      >
        <div className="  justify-center my-auto size-6 font-extralight">
          <FilterIcon />
        </div>
        <ScrollArea className="  w-full shadow-inner p-2 overflow-hidden">
          <div className="flex space-x-2 mx-auto content-center justify-center overflow-hidden ">
            <CategorySection />
          </div>
          <ScrollBar orientation="horizontal" className="" />
        </ScrollArea>
      </div>
      <div className="grid grid-cols-1 pt-5 gap-3 xs:grid-cols-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3  lg:grid-cols-4 justify-center">
        <ProductCard />
      </div>
    </div>
  );
}
