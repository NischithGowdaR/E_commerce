'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { Product } from '@/lib/products'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Loader2 } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center flex flex-col items-center gap-2">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading ShopHub Storefront...</span>
        </div>
      </div>
    }>
      <StorefrontPageContent />
    </Suspense>
  )
}

function StorefrontPageContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const urlSearch = searchParams?.get('search') || ''
  const urlCategory = searchParams?.get('category') || null

  const [searchQuery, setSearchQuery] = useState(urlSearch)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(urlCategory)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
        const res = await fetch(`${apiUrl}/api/products`)
        if (res.ok) {
          const data = await res.json()
          setProducts(data)
        }
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Sync state with URL parameter updates
  useEffect(() => {
    setSearchQuery(urlSearch)
  }, [urlSearch])

  useEffect(() => {
    setSelectedCategory(urlCategory)
  }, [urlCategory])

  const handleSearchChange = (val: string) => {
    setSearchQuery(val)
    const params = new URLSearchParams(window.location.search)
    if (val) {
      params.set('search', val)
    } else {
      params.delete('search')
    }
    router.push(`/?${params.toString()}`)
  }

  const handleCategorySelect = (cat: string | null) => {
    setSelectedCategory(cat)
    const params = new URLSearchParams(window.location.search)
    if (cat) {
      params.set('category', cat)
    } else {
      params.delete('category')
    }
    router.push(`/?${params.toString()}`)
  }

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))]
    return cats.sort()
  }, [products])

  const filteredProducts = useMemo(() => {
    let result = products

    // Filter by search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerQuery) ||
          product.description.toLowerCase().includes(lowerQuery)
      )
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory)
    }

    return result
  }, [products, searchQuery, selectedCategory])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted to-background py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Welcome to ShopHub
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover amazing products at unbeatable prices. Shop from our carefully curated collection.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 py-3 h-auto text-base"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => handleCategorySelect(null)}
                className="rounded-full"
              >
                All Products
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => handleCategorySelect(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-foreground mb-2">No products found</h2>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you&apos;re looking for.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}

