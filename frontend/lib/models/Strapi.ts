/**
 * Strapi Core Models
 * Base response structures for Strapi API
 */

/**
 * Base metadata for paginated responses
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/**
 * Strapi API Response wrapper
 * T = Type of data being returned
 */
export interface StrapiResponse<T> {
  data: T | T[];
  meta?: {
    pagination?: PaginationMeta;
  };
}

/**
 * Strapi error response
 */
export interface StrapiError {
  error?: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, unknown>;
  };
}
