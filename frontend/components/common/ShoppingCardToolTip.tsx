import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ShoppingCartToolTip() {
  const cartCount = 3; // dynamic later

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-accent transition"
          >
            <ShoppingCartIcon className="h-5 w-5" />

            {/* Cart Badge */}
            {cartCount > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs"
                variant="destructive"
              >
                {cartCount}
              </Badge>
            )}
          </Button>
        </TooltipTrigger>

        <TooltipContent
          side="bottom"
          className="rounded-xl px-4 py-2 shadow-lg bg-popover text-popover-foreground"
        >
          <p className="text-sm font-medium">
            {cartCount > 0
              ? `${cartCount} items in cart`
              : "Your cart is empty"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
