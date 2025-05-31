const STORE_NAME = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN || '';

export async function storefront(query: string, variables = {}) {
  try {
    if (!STORE_NAME || !ACCESS_TOKEN) {
      throw new Error('Shopify domain or access token is missing');
    }

    console.log('Making request to:', `https://${STORE_NAME}/api/2025-04/graphql.json`);
    console.log('With token:', ACCESS_TOKEN);
    console.log('Query:', query);
    console.log('Variables:', variables);

    const response = await fetch(
      `https://${STORE_NAME}/api/2025-04/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN
        },
        body: JSON.stringify({
          query,
          variables
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response not OK:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    console.log('Response:', json);

    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      throw new Error(
        Array.isArray(json.errors)
          ? json.errors.map(e => e.message).join(', ')
          : 'GraphQL query failed'
      );
    }

    return json;
  } catch (error) {
    console.error('Error in storefront call:', error);
    throw error;
  }
}

export async function getProducts() {
  try {
    console.log('Store name:', STORE_NAME);
    console.log('Access token:', ACCESS_TOKEN);
    
    const response = await fetch(
      `https://${STORE_NAME}/api/2025-04/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN
        },
        body: JSON.stringify({
          query: `
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
          `
        })
      }
    );

    const responseData = await response.json();
    console.log('Full Shopify Response:', JSON.stringify(responseData, null, 2));

    if (responseData.errors) {
      console.error('Shopify GraphQL Errors:', responseData.errors);
      throw new Error(`Shopify GraphQL Error: ${JSON.stringify(responseData.errors)}`);
    }

    return responseData;
  } catch (error) {
    console.error('Error in getProducts:', error);
    throw error;
  }
}

export async function getProductByHandle(handle: string) {
  const query = `
    query ProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        priceRangeV2 {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        media(first: 5) {
          edges {
            node {
              preview {
                image {
                  url
                  altText
                  width
                  height
                }
                status
              }
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `;

  return storefront(query, { handle });
} 