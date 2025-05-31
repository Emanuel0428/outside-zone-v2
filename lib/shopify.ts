import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// Configuración del cliente de Storefront API
const storefrontClient = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN || '',
  apiVersion: '2024-07',  // Actualizado a una versión soportada
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN || '',
});

interface ShopifyGraphQLResponse<T> {
  data: T;
}

interface ProductsResponse {
  products: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        handle: string;
        description: string;
        images: {
          edges: Array<{
            node: {
              url: string;
              altText: string;
            };
          }>;
        };
        priceRange: {
          minVariantPrice: {
            amount: string;
            currencyCode: string;
          };
        };
      };
    }>;
  };
}

// Helper function to transform Shopify response
function transformShopifyResponse<T>(response: any): ShopifyGraphQLResponse<T> {
  if (!response || !response.data) {
    throw new Error('Invalid Shopify response');
  }
  
  return {
    data: response.data,
  };
}

// Función helper para obtener productos
export async function getProducts(): Promise<ShopifyGraphQLResponse<ProductsResponse>> {
  try {
    const response = await storefrontClient.request(`
      query {
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
              description
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `);

    return transformShopifyResponse<ProductsResponse>(response);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Helper function to query Shopify
export async function queryShopify<T>(query: string): Promise<ShopifyGraphQLResponse<T>> {
  try {
    const response = await storefrontClient.request(query);
    return transformShopifyResponse<T>(response);
  } catch (error) {
    console.error('Error querying Shopify:', error);
    throw error;
  }
} 