import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Header from '../../components/store/Header'
import { CartProvider } from '../../context/CartContext'
import { queryShopify } from '../../lib/shopify'

interface ProductResponse {
  product: {
    id: string
    title: string
    description: string
    handle: string
    images: {
      edges: {
        node: {
          url: string
          altText: string
        }
      }[]
    }
    priceRange: {
      minVariantPrice: {
        amount: string
        currencyCode: string
      }
    }
    variants: {
      edges: {
        node: {
          id: string
          title: string
          price: {
            amount: string
            currencyCode: string
          }
          availableForSale: boolean
        }
      }[]
    }
  }
}

interface ProductsHandleResponse {
  products: {
    edges: Array<{
      node: {
        handle: string
      }
    }>
  }
}

interface ProductProps {
  product: ProductResponse['product']
}

export default function ProductPage({ product }: ProductProps) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    )
  }

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(parseFloat(amount))
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-black">
        <Header />
        
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
            {/* Galería de imágenes */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-900">
              {product.images.edges[0] && (
                <Image
                  src={product.images.edges[0].node.url}
                  alt={product.images.edges[0].node.altText || product.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>

            {/* Información del producto */}
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-bold text-white">{product.title}</h1>
              
              <div className="mt-4">
                <p className="text-2xl text-white">
                  {formatPrice(
                    product.priceRange.minVariantPrice.amount,
                    product.priceRange.minVariantPrice.currencyCode
                  )}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-white">Description</h3>
                <div className="mt-2 space-y-6 text-base text-gray-300">
                  {product.description}
                </div>
              </div>

              {/* Variantes */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-white mb-4">Variants</h3>
                <div className="space-y-2">
                  {product.variants.edges.map(({ node: variant }) => (
                    <div
                      key={variant.id}
                      className="flex items-center justify-between rounded-lg bg-zinc-900 p-4"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">{variant.title}</p>
                        <p className="text-sm text-gray-300">
                          {formatPrice(variant.price.amount, variant.price.currencyCode)}
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled={!variant.availableForSale}
                        className={`rounded-md px-4 py-2 text-sm font-medium ${
                          variant.availableForSale
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {variant.availableForSale ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CartProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await queryShopify<ProductsHandleResponse>(`{
      products(first: 250) {
        edges {
          node {
            handle
          }
        }
      }
    }`);

    const paths = response.data.products.edges.map(({ node: { handle } }) => ({
      params: { handle },
    }));

    return {
      paths,
      fallback: true,
    }
  } catch (error) {
    console.error('Error fetching product paths:', error)
    return {
      paths: [],
      fallback: true,
    }
  }
}

export const getStaticProps: GetStaticProps<ProductProps> = async ({ params }) => {
  if (!params?.handle) {
    return {
      notFound: true,
    }
  }

  try {
    const response = await queryShopify<ProductResponse>(`{
      product(handle: "${params.handle}") {
        id
        title
        description
        handle
        images(first: 5) {
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
        variants(first: 250) {
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
    }`);

    if (!response.data.product) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        product: response.data.product,
      },
      revalidate: 3600, // Revalidar cada hora
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return {
      notFound: true,
    }
  }
} 