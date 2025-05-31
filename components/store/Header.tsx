import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCart } from '../../context/CartContext'
import Cart from './Cart'

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [itemCount, setItemCount] = useState(0)
  const router = useRouter()
  const cart = useCart()

  useEffect(() => {
    if (cart?.state) {
      setItemCount(cart.state.itemCount)
    }
  }, [cart?.state])

  const navigationItems = [
    { name: 'Home', href: '/store' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => {
    return router.pathname === href
  }

  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-purple-500/20 shadow-lg shadow-purple-500/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/store" className="text-xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent hover:from-purple-300 hover:to-blue-400 transition-all duration-300">
            Outside-Zone
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-all duration-300 relative group ${
                isActive(item.href)
                  ? 'text-purple-400 shadow-lg shadow-purple-500/20'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.name}
              {/* Animated underline */}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ${
                isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Button */}
          <Link
            href="/products"
            className="hidden sm:flex items-center space-x-2 rounded-lg bg-gradient-to-r from-purple-600/80 to-blue-600/80 px-3 py-2 text-sm text-white hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105"
          >
            <svg
              className="h-4 w-4"
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
            <span>Search</span>
          </Link>

          {/* Cart Button */}
          <button
            type="button"
            className="relative p-2 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 group"
            onClick={() => setIsCartOpen(true)}
          >
            <span className="absolute -inset-0.5" />
            <span className="sr-only">View cart</span>
            <div className="relative">
              <svg
                className="h-6 w-6 group-hover:text-purple-400 transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-medium text-white shadow-lg animate-pulse">
                  {itemCount}
                </span>
              )}
            </div>
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-300 hover:text-purple-400 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-purple-500/20">
          <div className="px-4 py-4 space-y-3">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block text-base font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-purple-400 bg-purple-500/10 px-3 py-2 rounded-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
} 