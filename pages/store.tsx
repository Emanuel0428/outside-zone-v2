import React from 'react'
import Header from '../components/store/Header'
import Image from 'next/image'
import Link from 'next/link'
import FeaturedProduct from '../components/store/FeaturedProduct'
import ProductCarousel from '../components/store/ProductCarousel'
import { CartProvider } from '../context/CartContext'
import { getFeaturedProducts, products } from '../data/products'

export default function LandingPage() {
  const featuredProducts = getFeaturedProducts()

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

          {/* Features Section */}
          <section className="py-24 bg-gradient-to-b from-zinc-900 via-purple-900/10 to-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
                  Why Choose Outside-Zone
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  We're not just a store, we're a lifestyle brand that represents quality, innovation, and culture.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">Premium Quality</h3>
                  <p className="text-gray-300">Every product is carefully selected and tested to meet our high standards.</p>
                </div>
                
                <div className="text-center p-6 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">Fast Shipping</h3>
                  <p className="text-gray-300">Free worldwide shipping on orders over $75 with express delivery options.</p>
                </div>
                
                <div className="text-center p-6 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-pink-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-pink-300 transition-colors">Customer Love</h3>
                  <p className="text-gray-300">30-day return policy and 24/7 customer support for your peace of mind.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="py-24 bg-gradient-to-b from-black via-purple-900/5 to-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">Featured Collection</h2>
                <p className="text-lg text-gray-300">
                  Discover our handpicked favorites from this season's collection
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {featuredProducts.map((product) => (
                  <FeaturedProduct key={product.id} {...product} />
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

          {/* About Section */}
          <section id="about" className="py-24 bg-gradient-to-r from-purple-900/20 via-black to-blue-900/20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
                    About Outside-Zone
                  </h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Born from the streets and inspired by technology, Outside-Zone represents the intersection of style, innovation, and culture. We curate products that speak to the modern generation.
                  </p>
                  <p className="text-lg text-gray-300 mb-8">
                    From premium streetwear that makes a statement to cutting-edge tech accessories that enhance your digital lifestyle, every item in our collection is chosen with purpose and passion.
                  </p>
                  <Link
                    href="/about"
                    className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:from-purple-500 hover:to-pink-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    Our Story
                  </Link>
                </div>
                <div className="relative h-96 rounded-lg overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300" />
                  <Image
                    src="/images/hero.png"
                    alt="About Outside-Zone"
                    fill
                    className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-24 bg-gradient-to-b from-black via-purple-900/10 to-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  What Our Customers Say
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Alex Chen",
                    text: "Outside-Zone has the best streetwear collection. The quality is unmatched and the designs are always fresh.",
                    rating: 5
                  },
                  {
                    name: "Sarah Martinez",
                    text: "Love their tech accessories! Fast shipping and everything arrived exactly as described.",
                    rating: 5
                  },
                  {
                    name: "Jordan Kim",
                    text: "Customer service is amazing. Had an issue with sizing and they sorted it out immediately.",
                    rating: 5
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="bg-gradient-to-b from-zinc-900 to-purple-900/20 p-6 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                    <p className="text-white font-semibold">- {testimonial.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section className="py-24 bg-gradient-to-r from-purple-900/40 via-black to-blue-900/40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  Stay in the Loop
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  Get the latest drops, exclusive access to new collections, and insider news.
                </p>
                <div className="max-w-md mx-auto flex gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-zinc-800/80 border border-purple-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-lg font-medium text-white hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Product Carousel */}
          <section className="py-16 border-t border-purple-500/20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Trending Now</h2>
            </div>
            <ProductCarousel products={products} direction="right" />
          </section>
        </main>
        
        <footer className="bg-black py-12 border-t border-purple-500/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-medium mb-4">Shop</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/products?category=clothing" className="hover:text-purple-400 transition-colors">Clothing</Link></li>
                  <li><Link href="/products?category=technology" className="hover:text-purple-400 transition-colors">Technology</Link></li>
                  <li><Link href="/products?category=accessories" className="hover:text-purple-400 transition-colors">Accessories</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact Us</Link></li>
                  <li><Link href="/shipping" className="hover:text-purple-400 transition-colors">Shipping Info</Link></li>
                  <li><Link href="/returns" className="hover:text-purple-400 transition-colors">Returns</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-4">Company</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
                  <li><Link href="/careers" className="hover:text-purple-400 transition-colors">Careers</Link></li>
                  <li><Link href="/blog" className="hover:text-purple-400 transition-colors">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-4">Connect</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Discord</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-purple-500/20 pt-8 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-gray-400">
                  © 2024 Outside-Zone. All rights reserved.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <Link href="/privacy" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Terms of Service</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  )
} 