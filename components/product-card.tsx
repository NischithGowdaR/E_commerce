'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, ShoppingCart } from 'lucide-react'
import { Product } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'

interface ProductCardProps {
  product: Product
  showAddToCart?: boolean
}

export function ProductCard({ product, showAddToCart = true }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full h-64 bg-muted overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            crossOrigin="anonymous"
          />
          <div className="absolute top-3 right-3 bg-background px-3 py-1 rounded-full text-xs font-semibold">
            {product.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-3 flex-grow">
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition">
            {product.name}
          </h3>

          <p className="text-muted-foreground text-sm line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
          </div>

          {/* Price and Button */}
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
            <span className="text-lg font-bold text-primary">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {showAddToCart && (
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="gap-1"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
