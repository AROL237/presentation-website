"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { getProducts, getCollections } from "@/lib/strapi";
import { Product, Collection } from "@/lib/models";
import { formatProductsResponse } from "@/lib/utils";

export default function CollectionsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch products
        const productsData = await getProducts();
        const formatedProductList = formatProductsResponse(productsData);

        setProducts(formatedProductList || []);

        // Fetch collections
        try {
          const collectionsData = await getCollections();
          setCollections(collectionsData.data || []);
        } catch (error) {
          console.warn("Collections endpoint not available:", error);
          setCollections([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Collections
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore our premium selection of hair care products
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className="capitalize"
          >
            All
          </Button>
          {collections.length > 0 ? (
            collections.map((collection) => (
              <Button
                key={collection.id}
                variant={
                  selectedCategory === collection.slug ? "default" : "outline"
                }
                onClick={() =>
                  setSelectedCategory(collection.slug || collection.id)
                }
                className="capitalize"
              >
                {collection.name}
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No collections available
            </p>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
