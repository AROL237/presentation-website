"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getProductById, getProductImages } from "@/lib/strapi";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Bluetooth } from "lucide-react";
import { Product, ProductImageType } from "@/lib/models";
import { useCartStore } from "@/lib/cart.store";
import { formatListImages, formatSingleProduct } from "@/lib/utils";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";
import { ProductImageListType } from "@/lib/models/Product";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [productImageList, setProductImage] = useState<
    ProductImageType[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(params.id as string);
        const product = formatSingleProduct(data.data);
        setProduct(product);
        setSelectedImageUrl(product.image || "");
        setSelectedColor(null);

        if (product.images && product.images.length !== 0) {
          const imageListData = await getProductImages(product.id);
          const list = formatListImages(imageListData);
          setProductImage(list);

          if (list.length > 0) {
            setSelectedColor(list[0].color || null);
            setSelectedImageUrl(list[0].url || product.image || "");
          }
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) loadProduct();
  }, [params.id]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-6 text-center">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-accent/10">
              <ShoppingCart className="w-12 h-12 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Product Not Found</h1>
            <p className="text-muted-foreground">
              The product you're looking for doesn't exist.
            </p>
          </div>
          <Button className="w-full" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Ensure complete image URL
  // const imageUrl = product.image
  //   ? typeof product.image === "string" && product.image.startsWith("http")
  //     ? product.image
  //     : `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${product.image}`
  //   : "/placeholder-product.png";

  const getStrapiImageUrl = (imagePath?: string | null) => {
    if (!imagePath || imagePath === "") {
      return "/placeholder-product.png";
    }
    return imagePath.startsWith("http")
      ? imagePath
      : `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${imagePath}`;
  };

  const buildProductImageUrl = () => {
    if (selectedImageUrl) {
      return getStrapiImageUrl(selectedImageUrl);
    }

    if (product.image) {
      return getStrapiImageUrl(product.image);
    }

    if (product.img?.formats?.medium?.url) {
      return getStrapiImageUrl(product.img.formats.medium.url);
    }

    if (product.img?.url) {
      return getStrapiImageUrl(product.img.url);
    }

    return "/placeholder-product.png";
  };

  const imageUrl = buildProductImageUrl();
  const isLocalStrapiImage =
    imageUrl.startsWith("http://localhost") ||
    imageUrl.startsWith("http://127.0.0.1");

  const handleAddToCart = () => {
    if (!product) return;
    setIsAdding(true);
    try {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: selectedImageUrl || product.image || "",
      });
      setQuantity(1); // Reset quantity after adding
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative h-96 md:h-full bg-muted rounded-lg overflow-hidden flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={product.name}
              width={400}
              height={400}
              className="object-cover w-full h-full"
              unoptimized={isLocalStrapiImage}
              onError={(e) => {
                e.currentTarget.src = "/placeholder-product.png";
              }}
            />
          </div>

          {/* Details */}
          <div className=" space-y-2 md:space-y-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {product.name}
              </h1>
              <p className="text-muted-foreground">
                SKU: {product.sku || "N/A"}
              </p>
            </div>
            <div className="text-3xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </div>

            {/* show product color section. */}
            {productImageList && productImageList.length > 0 && (
              <div className="py-3">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Choose color
                </p>
                <div className="flex flex-wrap gap-3">
                  {productImageList.map((item) => {
                    const isActive = selectedColor === item.color;
                    return (
                      <button
                        key={`${item.documentId}-${item.color}`}
                        type="button"
                        onClick={() => {
                          setSelectedColor(item.color || null);
                          setSelectedImageUrl(item.url || product.image || "");
                        }}
                        aria-label={`Select ${item.color || "default"} color`}
                        className={`size-5 rounded-full border transition focus:outline-none focus:ring-2 focus:ring-primary ${
                          isActive
                            ? "ring-2 ring-primary border-transparent"
                            : "border-border"
                        }`}
                        style={{
                          backgroundColor: item.color || "#e5e7eb",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description || "No description available"}
            </p>
            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-l border-r border-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-muted"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stock && product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of Stock"}
                </span>
              </div>

              <div className="flex gap-4">
                <Button
                  disabled={product.stock === 0 || isAdding}
                  className="flex-1 py-3 flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isAdding ? "Adding..." : "Add to Cart"}
                </Button>
                <Button
                  variant="outline"
                  className="px-6 py-3 flex items-center justify-center"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>
            {/* Additional Info */}
            {/* <div className="border-t border-border pt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Returns</span>
                <span>30-day return policy</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
