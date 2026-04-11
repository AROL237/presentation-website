/**
 * Product Model
 * Represents a product in the inventory
 */

import { CollectionAttributes } from "./Collection";

/**
 * Product Image structure from Strapi
 */
export interface ProductImage {
  data: {
    id: string;
    attributes: {
      name: string;
      alternativeText?: string;
      caption?: string;
      width: number;
      height: number;
      formats?: Record<string, unknown>;
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl?: string;
      provider: string;
      [key: string]: unknown;
    };
  };
}

/**
 * Product Attributes from Strapi
 */
export interface ProductAttributes {
  name: string;
  price: number;
  description?: string;
  longDescription?: string;
  sku?: string;
  stock?: number;
  featured?: boolean;
  collection: CollectionAttributes;
  category?: {
    data: {
      id: string;
      attributes: {
        name: string;
        slug: string;
        [key: string]: unknown;
      };
    };
  };
  image?: ProductImage;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  [key: string]: unknown;
}

/**
 * Product Model - Full product with ID and attributes
 */
export interface Product {
  id: string;
  attributes: ProductAttributes;
}

/**
 * Transformed Product for frontend use
 * Flattened structure for easier component consumption
 */
export interface TransformedProduct {
  id: string;
  documentId: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  slug: string;
  sku?: string;
  stock?: number;
  featured?: boolean;
}

/**
 * Product with extended details for product pages
 */
export interface ProductDetail extends TransformedProduct {
  longDescription?: string;
  category?: string;
}
