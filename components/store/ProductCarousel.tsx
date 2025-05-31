import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  title: string
  price: string
  image: string
  slug: string
  category: string
}

interface ProductCarouselProps {
  products: Product[]
  direction?: 'left' | 'right'
}

export default function ProductCarousel({ products, direction = 'right' }: ProductCarouselProps) {
  // Triple the products to create seamless loop
  const duplicatedProducts = [...products, ...products, ...products]
  const cardWidth = 208 + 24 // 208px card + 24px gap
  const totalWidth = products.length * cardWidth

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-black to-blue-900 py-8">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-blue-600/10" />
      
      <div 
        className="flex space-x-6"
        style={{
          width: `${duplicatedProducts.length * cardWidth}px`,
          animation: direction === 'right' 
            ? `scroll-right-dynamic 60s linear infinite`
            : `scroll-left-dynamic 60s linear infinite`,
          animationFillMode: 'forwards'
        }}
      >
        {duplicatedProducts.map((product, index) => (
          <div key={`${product.id}-${index}`} className="flex-shrink-0 group">
            <Link href={`/product/${product.slug}`}>
              <div className="relative w-52 h-52 overflow-hidden rounded-xl bg-zinc-900 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                <div className="absolute inset-0 z-10 rounded-xl ring-1 ring-inset ring-white/10 transition-all group-hover:ring-2 group-hover:ring-purple-500" />
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  sizes="208px"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Purple glow effect */}
                <div className="absolute inset-0 z-20 bg-gradient-to-r from-purple-600/0 via-purple-500/20 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category badge */}
                <div className="absolute top-3 right-3 z-30">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    {product.category}
                  </span>
                </div>
                
                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 z-30 p-4">
                  <h3 className="text-sm font-bold text-white line-clamp-2 mb-1 group-hover:text-purple-200 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-lg font-bold text-purple-300 group-hover:text-purple-200 transition-colors">
                    {product.price}
                  </p>
                </div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 z-30 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
      
      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes scroll-right-dynamic {
          0% {
            transform: translateX(0px);
          }
          100% {
            transform: translateX(-${totalWidth}px);
          }
        }
        
        @keyframes scroll-left-dynamic {
          0% {
            transform: translateX(-${totalWidth}px);
          }
          100% {
            transform: translateX(0px);
          }
        }
      `}</style>
    </div>
  )
} 