'use client'

import Link from 'next/link'
import { ShoppingCart, ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CartItemComponent } from '@/components/cart-item'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'

export default function CartPage() {
  const { items, getTotalPrice } = useCart()
  const total = getTotalPrice()
  const subtotal = total
  const tax = subtotal * 0.1
  const shipping = subtotal > 5000 ? 0 : 500

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-background border border-border rounded-lg p-6">
                  <div className="space-y-2">
                    {items.map((item) => (
                      <CartItemComponent key={item.id} item={item} />
                    ))}
                  </div>
                </div>

                {/* Continue Shopping */}
                <div className="mt-6">
                  <Link href="/">
                    <Button variant="outline" className="gap-2">
                      <ArrowRight className="w-4 h-4 rotate-180" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-muted border border-border rounded-lg p-6 sticky top-20">
                  <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax (10%)</span>
                      <span>₹{Math.round(tax).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-primary font-semibold">Free</span>
                        ) : (
                          `₹${shipping.toLocaleString('en-IN')}`
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between">
                      <span className="font-bold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{Math.round(subtotal + tax + shipping).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full gap-2" size="lg">
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Free shipping on orders over ₹5,000
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <ShoppingCart className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground text-center mb-8 max-w-md">
                Looks like you haven&apos;t added any items yet. Start shopping to fill your cart!
              </p>
              <Link href="/">
                <Button size="lg">Start Shopping</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
