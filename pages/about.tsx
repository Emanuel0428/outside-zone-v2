import React from 'react'
import Header from '../components/store/Header'
import Image from 'next/image'
import { CartProvider } from '../context/CartContext'

export default function AboutPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-black">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-b from-zinc-900 to-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                About Outside-Zone
              </h1>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                Born from the streets, inspired by technology, and driven by culture.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                <p className="text-lg text-gray-300 mb-6">
                  Outside-Zone was founded in 2024 with a simple mission: to bridge the gap between street culture and cutting-edge technology. We started as a small collective of designers, tech enthusiasts, and culture creators who saw the need for a brand that truly understood the modern generation.
                </p>
                <p className="text-lg text-gray-300 mb-6">
                  What began as a passion project in a small studio has grown into a global brand that represents authenticity, innovation, and quality. We believe that style isn't just about what you wear—it's about how you express your identity and values.
                </p>
                <p className="text-lg text-gray-300">
                  Today, Outside-Zone serves customers worldwide, offering carefully curated products that reflect our commitment to excellence and our understanding of contemporary culture.
                </p>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src="/images/hero.png"
                  alt="Outside-Zone Story"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-zinc-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
              <p className="text-lg text-gray-300">
                These principles guide everything we do
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Authenticity</h3>
                <p className="text-gray-300">
                  We stay true to our roots and never compromise on our values. Every product we create reflects genuine culture and authentic expression.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
                <p className="text-gray-300">
                  We constantly push boundaries and embrace new technologies to create products that are ahead of their time.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Community</h3>
                <p className="text-gray-300">
                  We believe in building meaningful connections and supporting the communities that inspire us every day.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-300">
                The creative minds behind Outside-Zone
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Rivera",
                  role: "Founder & Creative Director",
                  description: "Visionary leader with 10+ years in streetwear design and brand development."
                },
                {
                  name: "Jordan Kim",
                  role: "Head of Technology",
                  description: "Tech innovator focused on integrating cutting-edge solutions into lifestyle products."
                },
                {
                  name: "Sam Chen",
                  role: "Community Manager",
                  description: "Culture enthusiast dedicated to building authentic connections with our community."
                }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 bg-zinc-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-300">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Join the Outside-Zone Community
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Be part of a movement that celebrates creativity, innovation, and authentic self-expression.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="inline-block bg-white px-8 py-3 rounded-lg font-medium text-black transition-colors hover:bg-gray-100"
              >
                Shop Collection
              </a>
              <a
                href="/contact"
                className="inline-block border-2 border-white px-8 py-3 rounded-lg font-medium text-white transition-colors hover:bg-white hover:text-blue-600"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </div>
    </CartProvider>
  )
} 