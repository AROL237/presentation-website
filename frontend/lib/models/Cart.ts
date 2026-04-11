/**
 * Shopping Cart Model
 * Represents shopping cart state and operations
 */

import type { TransformedProduct } from "./Product";

/**
 * Individual cart item
 */
export interface CartItem extends TransformedProduct {
  quantity: number;
}

/**
 * Shopping cart state
 */
export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

/**
 * Cart operations payload
 */
export interface AddToCartPayload {
  product: TransformedProduct;
  quantity: number;
}

/**
 * Update cart item payload
 */
export interface UpdateCartItemPayload {
  productId: string;
  quantity: number;
}

/**
 * Cart summary for checkout
 */
export interface CartSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
}
