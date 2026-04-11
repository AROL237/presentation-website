/**
 * Collection/Category Model
 * Represents product categories and collections
 */

/**
 * Collection Attributes from Strapi
 */
export interface CollectionAttributes {
  name: string;
  slug?: string;
  description?: string;
  image?: {
    url: string;
    [key: string]: unknown;
  };

  products?: {
    data: Array<{
      id: string;
      attributes: Record<string, unknown>;
    }>;
  };
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  [key: string]: unknown;
}

/**
 * Collection Model - Full collection with ID and attributes
 */
export interface Collection {
  id: string;
  attributes: CollectionAttributes;
}

/**
 * Transformed Collection for frontend use
 */
export interface TransformedCollection {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  productCount?: number;
}
