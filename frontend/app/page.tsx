"use client";
import { useEffect, useState } from "react";
import Hero from "./sections/Hero";
import MarketingBanner from "./sections/MarketingBanner";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { getProducts } from "@/lib/strapi";
import { useTheme } from "next-themes";
import { TransformedProduct } from "@/lib/models";
import { formatProductsResponse } from "@/lib/utils";

export default function HomePage() {
  const [myProducts, setmyProducts] = useState<TransformedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const { theme } = useTheme();
  // const myProducts = use(getProducts({limit:12}))

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts({ limit: 12 });
        // setFeaturedProducts(data.data || []);
        const products = formatProductsResponse(data);
        setmyProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []); // empty array = runs once only

  return (
    <div className="w-full">
      {/* feature to review its use case. [hero section ] first [DISABLE] */}
      {/* <Hero /> */}

      <MarketingBanner />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover our bestselling hair care collection
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(6)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : myProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {myProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available yet</p>
            </div>
          )}

          <div className="text-center mt-12">
            <a
              href="/collections"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                description:
                  "High-quality ingredients carefully selected for optimal results",
              },
              {
                title: "Fast Shipping",
                description: "Quick and reliable delivery to your doorstep",
              },
              {
                title: "30-Day Returns",
                description:
                  "Satisfaction guaranteed with our hassle-free return policy",
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
