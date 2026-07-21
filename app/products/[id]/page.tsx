'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Star, ShoppingCart, Plus, Minus, Loader2 } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'
import { Product } from '@/lib/products'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const productId = parseInt(resolvedParams.id, 10)

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [notFoundError, setNotFoundError] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    if (isNaN(productId)) {
      setNotFoundError(true)
      setLoading(false)
      return
    }

    const fetchProductDetails = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
        const res = await fetch(`${apiUrl}/api/products/${productId}`)
        if (res.status === 404) {
          setNotFoundError(true)
          return
        }
        if (!res.ok) {
          throw new Error('Failed to fetch product')
        }
        const data = await res.json()
        setProduct(data)

        // Fetch related products
        const allRes = await fetch(`${apiUrl}/api/products`)
        if (allRes.ok) {
          const allData = await allRes.json()
          const related = allData
            .filter((p: any) => p.category === data.category && p.id !== data.id)
            .slice(0, 4)
          setRelatedProducts(related)
        }
      } catch (err) {
        console.error('Error fetching product detail:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetails()
  }, [productId])

  const handleAddToCart = () => {
    if (!product) return
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center flex flex-col items-center gap-2">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <span className="text-muted-foreground">Loading product details...</span>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (notFoundError || !product) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition w-fit">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>

        {/* Product Details */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  crossOrigin="anonymous"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full inline-block mb-4">
                  {product.category}
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-primary text-primary'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} out of 5
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-b border-border py-6">
                <div className="text-4xl font-bold text-primary mb-2">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>
                <p className="text-muted-foreground">In stock</p>
              </div>

              {/* Quantity Selector */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-semibold mb-3 block">Quantity</label>
                  <div className="flex items-center border border-border rounded-lg w-fit">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-none"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <div className="px-6 py-2 text-lg font-semibold">{quantity}</div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setQuantity(quantity + 1)}
                      className="rounded-none"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {added ? 'Added to Cart!' : 'Add to Cart'}
                </Button>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">SKU</p>
                  <p className="font-semibold">{`PROD-${String(product.id).padStart(5, '0')}`}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Availability</p>
                  <p className="font-semibold">In Stock</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </section>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
