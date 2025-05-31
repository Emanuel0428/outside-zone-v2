import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  title: string
  price: string
  image: string
  slug: string
}

export default function ProductCard({ title, price, image, slug }: ProductCardProps) {
  return (
    <Link 
      href={`/product/${slug}`} 
      className="group block relative overflow-hidden rounded-xl bg-zinc-900"
    >
      <div className="absolute inset-0 z-10 rounded-xl ring-1 ring-inset ring-white/10 transition-all group-hover:ring-2 group-hover:ring-blue-600" />
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-500 will-change-transform group-hover:scale-105"
          sizes="250px"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/60 to-transparent p-4">
        <h3 className="text-sm font-medium text-white line-clamp-1">
          {title}
        </h3>
        <p className="mt-1 text-sm font-medium text-white/70">
          {price}
        </p>
      </div>
    </Link>
  )
} 