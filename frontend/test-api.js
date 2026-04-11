/**
 * API Testing Script
 * Console logs all API responses from Strapi
 *
 * Run with: node test-api.js
 */
require("dotenv").config();

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN || "";

console.log("🔍 Starting API Test Script...");
console.log(`Strapi URL: ${STRAPI_URL}`);
console.log(`API Token: ${API_TOKEN ? "✓ Present" : "❌ Missing"}`);

async function fetchAPI(path, options = {}) {
  const url = new URL(path, STRAPI_URL);

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (API_TOKEN) {
    headers.Authorization = `Bearer ${API_TOKEN}`;
  }

  console.log(`\n📡 Fetching: ${url.toString()}`);
  console.log(`Headers:`, JSON.stringify(headers, null, 2));

  const response = await fetch(url.toString(), {
    method: options.method || "GET",
    headers,
    body: options.body,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

// Test all API endpoints
async function testAllAPIs() {
  console.log("🚀 Starting API Tests...\n");
  console.log(`📍 Strapi URL: ${STRAPI_URL}`);
  console.log(`🔐 API Token: ${API_TOKEN ? "✓ Present" : "❌ Missing"}\n`);

  try {
    // Test 1: Get Products
    console.log("\n\n========== TEST 1: GET ALL PRODUCTS ==========");
    const productsResponse = await fetchAPI("/api/products?populate=*");
    console.log("✓ Products Response:");
    console.log(JSON.stringify(productsResponse, null, 2));

    // Test 2: Get Collections
    console.log("\n\n========== TEST 2: GET ALL COLLECTIONS ==========");
    const collectionsResponse = await fetchAPI("/api/collections?populate=*");
    console.log("✓ Collections Response:");
    console.log(JSON.stringify(collectionsResponse, null, 2));

    // Test 3: Get First Product (if exists)
    if (productsResponse.data && productsResponse.data.length > 0) {
      const firstProductId = productsResponse.data[0].id;
      console.log(
        `\n\n========== TEST 3: GET PRODUCT BY ID (${firstProductId}) ==========`,
      );
      const productByIdResponse = await fetchAPI(
        `/api/products/${firstProductId}?populate=*`,
      );
      console.log("✓ Product by ID Response:");
      console.log(JSON.stringify(productByIdResponse, null, 2));
    }

    // Test 4: Get Pages
    console.log("\n\n========== TEST 4: GET ALL PAGES ==========");
    try {
      const pagesResponse = await fetchAPI("/api/pages?populate=*");
      console.log("✓ Pages Response:");
      console.log(JSON.stringify(pagesResponse, null, 2));
    } catch (error) {
      console.log("⚠️ Pages endpoint not available:", error.message);
    }

    console.log("\n\n✅ All tests completed!\n");
  } catch (error) {
    console.error("\n\n❌ Error during API testing:");
    console.error(error.message);
    console.error("\nMake sure Strapi is running at:", STRAPI_URL);
  }
}

// Run the tests
testAllAPIs();
