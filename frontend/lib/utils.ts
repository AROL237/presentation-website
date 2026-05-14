import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product, TransformedProduct, TransfromedProductImage } from "./models";
import { getProductImages } from "./strapi";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatProductsResponse(list: {
  data: any;
}): TransformedProduct[] {
  const products = list.data.map((product: any) => {
    return {
      id: product.id,
      documentId: product.documentId,
      name: product.name || "Unknown Product",
      price: product.price || 0,
      description: product.description || "",
      image: product.image?.url || "",
      images: product.images,
      slug: product.slug,
    };
  });

  return products;
}

export function formatListImages({ data }: any): TransfromedProductImage[] {

  return data.map((image: any) => {
    return {
      ...image,
      url: image.url?.url,
    };
  });
}

export function formatSingleProduct(data: any): TransformedProduct {
  return {
    ...data,
    image: data.image?.url,
    img: data.image,
  } as TransformedProduct;
}
