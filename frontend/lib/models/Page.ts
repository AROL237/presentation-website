/**
 * Page Model
 * Represents static pages and content pages
 */

/**
 * Page Attributes from Strapi
 */
export interface PageAttributes {
  title: string;
  slug: string;
  content?: string;
  description?: string;
  image?: {
    data: {
      attributes: {
        url: string;
        [key: string]: unknown;
      };
    };
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  [key: string]: unknown;
}

/**
 * Page Model - Full page with ID and attributes
 */
export interface Page {
  id: string;
  attributes: PageAttributes;
}

/**
 * Transformed Page for frontend use
 */
export interface TransformedPage {
  id: string;
  title: string;
  slug: string;
  content?: string;
  description?: string;
  image?: string;
}
