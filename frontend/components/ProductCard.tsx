"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/models";
import { useCartStore } from "@/lib/cart.store";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const host = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const image = product.image
    ? product.image.startsWith("http")
      ? product.image
      : host.concat(product.image)
    : "/placeholder-product.png";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const productId = product.documentId || product.id || product.documentId;
      addItem({
        id: productId,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link href={`/products/${product.documentId}`}>
      <div className="group h-full flex flex-col rounded-lg overflow-hidden bg-card hover:shadow-lg transition-all duration-300 border border-border">
        <div className="relative w-full h-72 bg-muted overflow-hidden shrink-0">
          <Image
            src={image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-product.png";
            }}
          />
          {product.stock === 0 && (
            <div className="absolute top-3 right-3 bg-destructive text-white px-3 py-1 rounded-full text-xs font-semibold">
              Out of Stock
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
            />
          </button>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>

        <div className="flex-1 flex flex-col p-4 space-y-3">
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
              {product.description}
            </p>
          )}
          <div className="text-xs">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">✓ In Stock</span>
            ) : (
              <span className="text-destructive font-medium">Out of Stock</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.sku && (
              <span className="text-xs text-muted-foreground">
                {product.sku}
              </span>
            )}
          </div>
          <Button
            disabled={product.stock === 0 || isAdding}
            className="w-full gap-2 mt-auto"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </Link>
  );
}
