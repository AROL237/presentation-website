import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";
import { ShoppingCartIcon, Trash2, Plus, Minus } from "lucide-react";
import { Badge } from "../ui/badge";
import { useCartStore } from "@/lib/cart.store";
import Link from "next/link";

export default function ShoppingCartDrawer() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  return (
    <Drawer>
      {/* Trigger Button */}
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-accent"
        >
          <ShoppingCartIcon className="h-5 w-5 bottom-0" />

          {/* Badge */}
          {getTotalItems() > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs"
              variant="destructive"
            >
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>

      {/* Drawer Content */}
      <DrawerContent className="rounded-t-2xl">
        <DrawerHeader>
          <DrawerTitle>Shopping Cart</DrawerTitle>
        </DrawerHeader>

        {/* Cart Items */}
        <div className="px-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 border-b pb-4"
              >
                {item.image && (
                  <img
                    src={item.image.startsWith("http") ? item.image : `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${item.image}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-product.png";
                    }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ${item.price.toFixed(2)} each
                  </p>
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1 mt-2 border border-border rounded w-fit">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="p-1 hover:bg-muted-foreground/10"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 py-0.5 text-xs">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-1 hover:bg-muted-foreground/10"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 hover:bg-destructive hover:text-white rounded transition-colors mt-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <DrawerFooter className="border-t space-y-3">
          {items.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <Link href="/cart" className="w-full block">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
