import React from 'react'
import Header from '../components/store/Header'
import Image from 'next/image'
import Link from 'next/link'
import ProductCarousel from '../components/store/ProductCarousel'
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

interface HomePageProps {
  products: ProductsResponse['data']['products']['edges']
}

export default function Home({ products }: HomePageProps) {
  // Format products for carousel
  const formattedProducts = products.map(({ node }) => ({
    id: node.id,
    title: node.title,
    price: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: node.priceRange.minVariantPrice.currencyCode,
    }).format(parseFloat(node.priceRange.minVariantPrice.amount)),
    image: node.images.edges[0]?.node.url || '/placeholder.jpg',
    slug: node.handle,
    category: 'Featured'
  }))

  return (
    <CartProvider>
      <div className="min-h-screen bg-black">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative h-screen w-full overflow-hidden">
            <Image
              src="/images/hero.png"
              alt="Hero"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-black/50 to-black/70" />
            
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
              <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-5xl mx-auto px-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-float">
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-glow">
                    Outside-Zone
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                  Your destination for premium streetwear, cutting-edge technology, and lifestyle accessories that define the culture.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/products"
                    className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-lg font-medium text-white transition-all duration-300 hover:from-purple-500 hover:to-pink-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                  >
                    Shop Now
                  </Link>
                  <Link
                    href="#about"
                    className="inline-block border-2 border-purple-500 px-8 py-4 rounded-lg font-medium text-white transition-all duration-300 hover:bg-purple-500 hover:border-purple-400 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </section>

          {/* Trending Now Section */}
          <section className="py-24 bg-gradient-to-b from-black via-purple-900/5 to-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Trending Now
                </h2>
              </div>
            </div>
            <ProductCarousel products={formattedProducts} direction="left" />
          </section>

          {/* Featured Collection */}
          <section className="py-24 bg-gradient-to-b from-black via-purple-900/5 to-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  Featured Collection
                </h2>
                <p className="text-lg text-gray-300">
                  Discover our handpicked favorites from this season's collection
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {formattedProducts.slice(0, 4).map((product) => (
                  <Link 
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="group block relative overflow-hidden rounded-xl bg-zinc-900"
                  >
                    <div className="absolute inset-0 z-10 rounded-xl ring-1 ring-inset ring-white/10 transition-all group-hover:ring-2 group-hover:ring-blue-600" />
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover object-center transition-transform duration-500 will-change-transform group-hover:scale-105"
                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="text-sm font-medium text-white line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-white/70">
                        {product.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/products"
                  className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:from-purple-500 hover:to-blue-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </CartProvider>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await getProducts()
    
    if (!response.data?.products?.edges) {
      console.log('No products data in response:', response)
      return {
        props: {
          products: [],
        },
        revalidate: 60,
      }
    }

    return {
      props: {
        products: response.data.products.edges,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      props: {
        products: [],
      },
      revalidate: 60,
    }
  }
} 