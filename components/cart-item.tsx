'use client'

import Image from 'next/image'
import { Trash2, Plus, Minus } from 'lucide-react'
import { CartItem } from '@/context/cart-context'
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'

interface CartItemProps {
  item: CartItem
}

export function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1)
  }

  const handleDecrement = () => {
    updateQuantity(item.id, item.quantity - 1)
  }

  const handleRemove = () => {
    removeFromCart(item.id)
  }

  return (
    <div className="flex gap-4 py-4 border-b border-border last:border-b-0">
      {/* Product Image */}
      <div className="relative w-24 h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          crossOrigin="anonymous"
        />
      </div>

      {/* Product Info */}
      <div className="flex-grow">
        <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
        <p className="text-muted-foreground text-sm mb-3">
          ₹{item.price.toLocaleString('en-IN')} each
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleDecrement}
            className="h-8 w-8 p-0"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={handleIncrement}
            className="h-8 w-8 p-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Total Price and Remove */}
      <div className="flex flex-col items-end justify-between">
        <p className="text-lg font-bold text-primary">
          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
        </p>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleRemove}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
