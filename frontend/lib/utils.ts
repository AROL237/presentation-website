import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product, TransformedProduct } from "./models";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatProductsResponse(list: {
  data: any;
}): TransformedProduct[] {
  const products = list.data.map((product: any) => {
    console.log(product);
    return {
      id: product.id,
      documentId: product.documentId,
      name: product.name || "Unknown Product",
      price: product.price || 0,
      description: product.description || "",
      image: product.image?.url || "/placeholder-product.png",
      slug: product.slug,
    };
  });

  return products;
}

export function formatSingleProduct(data: any): TransformedProduct {
  return {
    ...data,
    image: data.image.url,
  } as TransformedProduct;
}
