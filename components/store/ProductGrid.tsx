import React from 'react'
import ProductCard from './ProductCard'

interface Product {
  id: string
  title: string
  price: string
  image: string
  slug: string
}

interface ProductGridProps {
  title: string
  products: Product[]
}

export default function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <div className="bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {title}
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              slug={product.slug}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 