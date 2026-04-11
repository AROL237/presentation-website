import axios, { AxiosInstance, AxiosError } from "axios";

// Strapi API Configuration
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN || "";

// Create axios instance with default configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add authorization token if available
if (API_TOKEN) {
  axiosInstance.defaults.headers.common["Authorization"] =
    `Bearer ${API_TOKEN}`;
}

// Request interceptor - for logging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`📡 Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  },
);

// Response interceptor - for logging and error handling
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✓ Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    console.error(`❌ API Error: ${error.response?.status}`);
    return Promise.reject(error);
  },
);

/**
 * Generic fetch function
 * @param path - API endpoint path (e.g., '/api/products')
 * @returns Promise with response data
 */
export async function fetchAPI<T = any>(path: string): Promise<T> {
  try {
    const response = await axiosInstance.get<T>(path);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API Error: ${error.response?.status} - ${error.message}`,
      );
    }
    throw error;
  }
}

/**
 * Products API Functions
 */

export async function getProducts(options?: {
  limit?: number;
  filters?: string;
}) {
  let query = "/api/products?populate=*";

  if (options?.filters) {
    query += `&${options.filters}`;
  }

  if (options?.limit) {
    query += `&pagination[limit]=${options.limit}`;
  }

  return fetchAPI(query);
}

export async function getProductById(id: string) {
  return fetchAPI(`/api/products/${id}?populate=*`);
}

/**
 * Collections API Functions
 */

export async function getCollections() {
  return fetchAPI("/api/collections?populate=*");
}

export async function getCollectionBySlug(slug: string) {
  return fetchAPI(`/api/collections?filters[slug][$eq]=${slug}&populate=*`);
}

/**
 * Pages API Functions
 */

export async function getPageBySlug(slug: string) {
  return fetchAPI(`/api/pages?filters[slug][$eq]=${slug}&populate=*`);
}
