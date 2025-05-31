export interface Product {
  id: string
  title: string
  price: string
  image: string
  slug: string
  description: string
  category: string
  featured?: boolean
  inStock: boolean
  tags: string[]
}

export const products: Product[] = [
  // Clothing
  {
    id: '1',
    title: 'Outside-Zone Tech T-Shirt',
    price: '$29.99 USD',
    image: '/images/products/tshirt.jpg',
    slug: 'outside-zone-tech-tshirt',
    description: 'Premium cotton t-shirt with moisture-wicking technology. Perfect for active lifestyles and everyday wear.',
    category: 'Clothing',
    featured: true,
    inStock: true,
    tags: ['cotton', 'tech', 'casual', 'streetwear'],
  },
  {
    id: '2',
    title: 'Outside-Zone Cargo Pants',
    price: '$79.99 USD',
    image: '/images/products/cargo.jpg',
    slug: 'outside-zone-cargo-pants',
    description: 'Durable tactical cargo pants with multiple pockets. Designed for functionality and style.',
    category: 'Clothing',
    featured: false,
    inStock: true,
    tags: ['tactical', 'cargo', 'utility', 'durable'],
  },
  {
    id: '3',
    title: 'Outside-Zone Tech Hoodie',
    price: '$89.99 USD',
    image: '/images/products/hoodie.jpg',
    slug: 'outside-zone-tech-hoodie',
    description: 'Ultra-soft fleece hoodie with tech-inspired design. Features kangaroo pocket and adjustable hood.',
    category: 'Clothing',
    featured: true,
    inStock: true,
    tags: ['hoodie', 'fleece', 'tech', 'comfort'],
  },
  
  // Accessories
  {
    id: '4',
    title: 'Outside-Zone Snapback Cap',
    price: '$34.99 USD',
    image: '/images/products/cap.jpg',
    slug: 'outside-zone-snapback-cap',
    description: 'Premium snapback cap with embroidered logo. Adjustable fit for maximum comfort.',
    category: 'Accessories',
    featured: true,
    inStock: true,
    tags: ['cap', 'snapback', 'logo', 'adjustable'],
  },
  
  // Technology (using placeholder images for now)
  {
    id: '5',
    title: 'Wireless Gaming Headset',
    price: '$149.99 USD',
    image: '/images/products/tshirt.jpg', // Placeholder
    slug: 'wireless-gaming-headset',
    description: 'Professional wireless gaming headset with 7.1 surround sound and noise cancellation.',
    category: 'Technology',
    featured: false,
    inStock: true,
    tags: ['gaming', 'wireless', 'audio', 'headset'],
  },
  {
    id: '6',
    title: 'Mechanical Gaming Keyboard',
    price: '$199.99 USD',
    image: '/images/products/hoodie.jpg', // Placeholder
    slug: 'mechanical-gaming-keyboard',
    description: 'RGB mechanical gaming keyboard with customizable switches and macro keys.',
    category: 'Technology',
    featured: false,
    inStock: true,
    tags: ['gaming', 'mechanical', 'rgb', 'keyboard'],
  },
  {
    id: '7',
    title: 'Precision Gaming Mouse',
    price: '$79.99 USD',
    image: '/images/products/cap.jpg', // Placeholder
    slug: 'precision-gaming-mouse',
    description: 'High-precision gaming mouse with adjustable DPI and programmable buttons.',
    category: 'Technology',
    featured: false,
    inStock: true,
    tags: ['gaming', 'mouse', 'precision', 'dpi'],
  },
  {
    id: '8',
    title: 'USB-C Hub Pro',
    price: '$59.99 USD',
    image: '/images/products/cargo.jpg', // Placeholder
    slug: 'usb-c-hub-pro',
    description: '7-in-1 USB-C hub with 4K HDMI, USB 3.0, SD card slots, and fast charging.',
    category: 'Technology',
    featured: false,
    inStock: true,
    tags: ['usb-c', 'hub', 'connectivity', 'charging'],
  },
]

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured)
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category)
}

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug)
}

export const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Clothing', slug: 'clothing' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Accessories', slug: 'accessories' },
] 