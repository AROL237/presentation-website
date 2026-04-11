"use client";
import { useCartStore } from "@/lib/cart.store";
import { Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";

export default function ShoppingCart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg text-muted-foreground mb-4">Your cart is empty</p>
        <Link
          href="/collections"
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Items List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-muted p-4 rounded-lg"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                ${item.price.toFixed(2)}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 border border-border rounded">
              <button
                onClick={() =>
                  updateQuantity(item.id, Math.max(1, item.quantity - 1))
                }
                className="p-1 hover:bg-muted-foreground/10"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-2 py-1 text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 hover:bg-muted-foreground/10"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Total Price */}
            <div className="text-right min-w-20">
              <p className="font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeItem(item.id)}
              className="p-2 hover:bg-destructive hover:text-white rounded transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} in cart
        </p>
      </div>

      {/* Checkout Button */}
      <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
        Proceed to Checkout
      </button>
    </div>
  );
}
