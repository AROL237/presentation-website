/**
 * Simplified Unified Models
 * Single interface for all API data - kept simple and reusable
 */

/**
 * Product - Main product entity
 */
export interface Product {
  id: string;
  documentId: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  sku?: string;
  stock?: number;
  featured?: boolean;
}

/**
 * Collection - Product categories
 */
export interface Collection {
    documentId:string;
  id: string;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
}

/**
 * FAQ - Frequently Asked Questions
 */
export interface FAQ {
    documentId:string;
  id: string;
  question: string;
  answer: string;
  category?: string;
}

/**
 * Guide - Tutorials and how-to's
 */
export interface Guide {
    documentId:string;
  id: string;
  title: string;
  description?: string;
  image?: string;
  steps: {
    number: number;
    title: string;
    description: string;
  }[];
}

/**
 * Cart Item - Product in shopping cart
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * API Response - Generic wrapper for all API responses
 */
export interface ApiResponse<T> {
  data: T | T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Keep exports for backwards compatibility
export type { Product as TransformedProduct };
