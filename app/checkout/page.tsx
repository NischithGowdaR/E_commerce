'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/context/cart-context'

interface FormData {
  fullName: string
  email: string
  address: string
  city: string
  zipCode: string
}

interface FormErrors {
  [key: string]: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCart()
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string>('')

  const total = getTotalPrice()
  const subtotal = total
  const tax = subtotal * 0.1
  const shipping = subtotal > 5000 ? 0 : 500
  const finalTotal = subtotal + tax + shipping

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({
          shippingDetails: formData,
          items: items.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          })),
          totalPrice: finalTotal
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to place order')
      }

      const data = await response.json()
      setOrderNumber(data.orderNumber)
      setIsSubmitted(true)
      clearCart()
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        submit: err instanceof Error ? err.message : 'An error occurred while placing the order'
      }))
    } finally {
      setIsLoading(false)
    }
  }

  if (!items.length && !isSubmitted) {
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add items to your cart before checking out.</p>
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (isSubmitted) {
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md">
            <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-2">Order Placed!</h1>
            <p className="text-muted-foreground mb-2">Thank you for your purchase.</p>
            <div className="bg-muted p-4 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="font-bold text-lg text-foreground font-mono">{orderNumber}</p>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              A confirmation email has been sent to <span className="font-semibold">{formData.email}</span>
            </p>
            <div className="space-y-3">
              <Link href="/">
                <Button className="w-full">Continue Shopping</Button>
              </Link>
              <Link href="/cart">
                <Button variant="outline" className="w-full">
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/cart" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-8 w-fit">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-background border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">Shipping Information</h2>

                {errors.submit && (
                  <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200 mb-6">
                    {errors.submit}
                  </div>
                )}

                <div className="space-y-4 mb-8">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={errors.fullName ? 'border-destructive' : ''}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="text-destructive text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'border-destructive' : ''}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-semibold mb-2">
                      Address
                    </label>
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={errors.address ? 'border-destructive' : ''}
                      placeholder="123 Main Street"
                    />
                    {errors.address && (
                      <p className="text-destructive text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-semibold mb-2">
                        City
                      </label>
                      <Input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={errors.city ? 'border-destructive' : ''}
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="text-destructive text-sm mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-semibold mb-2">
                        Zip Code
                      </label>
                      <Input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={errors.zipCode ? 'border-destructive' : ''}
                        placeholder="10001"
                      />
                      {errors.zipCode && (
                        <p className="text-destructive text-sm mt-1">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Place Order'}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-muted border border-border rounded-lg p-6 sticky top-20">
                <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-semibold">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border space-y-3 py-4 mb-6">
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>Tax (10%)</span>
                    <span>₹{Math.round(tax).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground text-sm">
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

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{Math.round(finalTotal).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
