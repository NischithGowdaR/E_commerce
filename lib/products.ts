export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
  rating: number
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 7499,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    category: 'Electronics',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Stainless Steel Water Bottle',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e9?w=500&h=500&fit=crop',
    description: 'Durable and eco-friendly water bottle that keeps drinks cold for 24 hours.',
    category: 'Accessories',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Minimalist Desk Lamp',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=500&fit=crop',
    description: 'Modern LED desk lamp with adjustable brightness and USB charging port.',
    category: 'Home Office',
    rating: 4.6,
  },
  {
    id: 4,
    name: 'Wireless Charging Pad',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1591290619320-e4b3a85a3b5d?w=500&h=500&fit=crop',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    category: 'Electronics',
    rating: 4.3,
  },
  {
    id: 5,
    name: 'Organic Cotton T-Shirt',
    price: 899,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    description: 'Comfortable and sustainable organic cotton t-shirt in multiple colors.',
    category: 'Clothing',
    rating: 4.7,
  },
  {
    id: 6,
    name: 'Portable Bluetooth Speaker',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    description: 'Waterproof Bluetooth speaker with 12-hour battery and 360-degree sound.',
    category: 'Electronics',
    rating: 4.4,
  },
  {
    id: 7,
    name: 'Bamboo Cutting Board Set',
    price: 1699,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop',
    description: 'Set of three bamboo cutting boards made from sustainable bamboo.',
    category: 'Kitchen',
    rating: 4.5,
  },
  {
    id: 8,
    name: 'Travel Backpack',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    description: 'Spacious and comfortable travel backpack with multiple compartments and USB port.',
    category: 'Travel',
    rating: 4.6,
  },
  {
    id: 9,
    name: 'Stainless Steel Pen Set',
    price: 599,
    image: 'https://images.unsplash.com/photo-1578575437980-94d2e6f6ba2c?w=500&h=500&fit=crop',
    description: 'Premium stainless steel pen set perfect for professionals and writers.',
    category: 'Office',
    rating: 4.4,
  },
]

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getCategories(): string[] {
  const categories = [...new Set(products.map((product) => product.category))]
  return categories.sort()
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  )
}
