import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import Header from '../components/store/Header'
import Image from 'next/image'
import Link from 'next/link'
import { CartProvider } from '../context/CartContext'
import { getProducts } from '../lib/shopify'
import { GetStaticProps } from 'next'

interface ProductsResponse {
  data: {
    products: {
      edges: Array<{
        node: {
          id: string
          title: string
          handle: string
          description: string
          images: {
            edges: Array<{
              node: {
                url: string
                altText: string
              }
            }>
          }
          priceRange: {
            minVariantPrice: {
              amount: string
              currencyCode: string
            }
          }
        }
      }>
    }
  }
}

interface ProductsPageProps {
  products: ProductsResponse['data']['products']['edges']
}

// Categorías estáticas por ahora - más adelante podríamos obtenerlas de Shopify
const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Accessories', slug: 'accessories' }
]

export default function ProductsPage({ products: initialProducts }: ProductsPageProps) {
  const router = useRouter()
  const { category, search } = router.query
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('name')

  const filteredProducts = useMemo(() => {
    let filtered = initialProducts

    // Filter by search query
    const currentSearch = (search as string) || searchQuery
    if (currentSearch) {
      filtered = filtered.filter(product =>
        product.node.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
        product.node.description.toLowerCase().includes(currentSearch.toLowerCase())
      )
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => 
          parseFloat(a.node.priceRange.minVariantPrice.amount) - 
          parseFloat(b.node.priceRange.minVariantPrice.amount)
        )
        break
      case 'price-high':
        filtered.sort((a, b) => 
          parseFloat(b.node.priceRange.minVariantPrice.amount) - 
          parseFloat(a.node.priceRange.minVariantPrice.amount)
        )
        break
      case 'name':
      default:
        filtered.sort((a, b) => a.node.title.localeCompare(b.node.title))
        break
    }

    return filtered
  }, [initialProducts, search, searchQuery, sortBy])

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug)
    if (categorySlug === 'all') {
      router.push('/products', undefined, { shallow: true })
    } else {
      router.push(`/products?category=${categorySlug}`, undefined, { shallow: true })
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query) {
      router.push(`/products?search=${encodeURIComponent(query)}`, undefined, { shallow: true })
    } else {
      router.push('/products', undefined, { shallow: true })
    }
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
        
        {/* Header Section */}
        <section className="bg-gradient-to-b from-zinc-900 to-black py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                Our Products
              </h1>
              <p className="mt-4 text-lg text-gray-300">
                Discover our complete collection of premium streetwear, technology, and accessories
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="border-b border-white/10 bg-zinc-900/50 py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full rounded-lg bg-zinc-800 px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <div className="flex flex-wrap gap-4">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        (category === cat.slug || (!category && cat.slug === 'all'))
                          ? 'bg-blue-600 text-white'
                          : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg bg-zinc-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium text-white mb-2">No products found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-gray-400">
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {filteredProducts.map(({ node: product }) => (
                    <div key={product.id} className="group">
                      <Link href={`/product/${product.handle}`}>
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-900">
                          <div className="absolute inset-0 z-10 rounded-lg ring-1 ring-inset ring-white/10 transition-all group-hover:ring-2 group-hover:ring-blue-600" />
                          <Image
                            src={product.images.edges[0]?.node.url || '/placeholder.jpg'}
                            alt={product.images.edges[0]?.node.altText || product.title}
                            fill
                            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                          />
                          <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/60 to-transparent p-3">
                            <h3 className="text-sm font-medium text-white line-clamp-1">
                              {product.title}
                            </h3>
                            <p className="text-sm font-medium text-white/70">
                              {formatPrice(
                                product.priceRange.minVariantPrice.amount,
                                product.priceRange.minVariantPrice.currencyCode
                              )}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </CartProvider>
  )
}

// Implementar ISR
export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await getProducts();
    
    // If no products data in response, return empty array
    if (!response.data?.products?.edges) {
      console.log('No products data in response:', response);
      return {
        props: {
          products: [],
        },
        revalidate: 60,
      };
    }

    return {
      props: {
        products: response.data.products.edges,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: [],
      },
      revalidate: 60,
    };
  }
} 