import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '../components/store/Header'
import Hero from '../components/store/Hero'
import ProductGrid from '../components/store/ProductGrid'

// Sample data - you can replace this with your actual data later
const products = [
  {
    id: '1',
    title: 'Acme Circles T-Shirt',
    price: '$20.00 USD',
    image: '/images/products/tshirt.jpg',
    slug: 'acme-circles-tshirt',
  },
  {
    id: '2',
    title: 'Acme Drawstring cap',
    price: '$12.00 USD',
    image: '/images/products/cap.jpg',
    slug: 'acme-drawstring-cap',
  },
  {
    id: '3',
    title: 'Acme Cargo Pants',
    price: '$15.00 USD',
    image: '/images/products/cargo.jpg',
    slug: 'acme-cargo-pants',
  },
  {
    id: '4',
    title: 'Acme Hoodie',
    price: '$50.00 USD',
    image: '/images/products/hoodie.jpg',
    slug: 'acme-hoodie',
  },
]

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/store')
  }, [router])

  return null
} 