import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface FeaturedProductProps {
  id: string
  title: string
  price: string
  image: string
  slug: string
  category: string
}

export default function FeaturedProduct({ id, title, price, image, slug, category }: FeaturedProductProps) {
  return (
    <div className="group relative">
      <Link href={`/product/${slug}`}>
        <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-900 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/30">
          {/* Border effect */}
          <div className="absolute inset-0 z-10 rounded-xl ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:ring-2 group-hover:ring-purple-500/50" />
          
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Purple glow effect */}
          <div className="absolute inset-0 z-20 bg-gradient-to-r from-purple-600/0 via-purple-500/30 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category badge */}
          <div className="absolute top-3 right-3 z-30">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
              {category}
            </span>
          </div>
          
          {/* Featured badge */}
          <div className="absolute top-3 left-3 z-30">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-2 py-1 text-xs font-bold text-white shadow-lg">
              ⭐ Featured
            </span>
          </div>
          
          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 z-30 p-4">
            <h3 className="text-lg font-bold text-white line-clamp-2 mb-2 group-hover:text-purple-200 transition-colors duration-300">
              {title}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                {price}
              </p>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 z-30 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 z-25 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </Link>
    </div>
  )
} 