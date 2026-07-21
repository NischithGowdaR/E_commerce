'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, LogOut, User, Search, ChevronDown, ShoppingBag, Settings } from 'lucide-react'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useCart } from '@/context/cart-context'
import { useSession, signOut } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

export function Navbar() {
  return (
    <Suspense fallback={
      <div className="w-full bg-background border-b border-border h-24 animate-pulse flex items-center justify-between px-8">
        <div className="w-24 h-8 bg-muted rounded" />
        <div className="w-64 h-8 bg-muted rounded-full" />
        <div className="w-32 h-8 bg-muted rounded" />
      </div>
    }>
      <NavbarContent />
    </Suspense>
  )
}

function NavbarContent() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [promoIndex, setPromoIndex] = useState(0)
  
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { getTotalItems } = useCart()
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const totalItems = getTotalItems()

  // Rotating Promo Banner Messages
  const promos = [
    '🚚 Free Standard Shipping on all orders above ₹5,000!',
    '⚡ Limited Time: Use code SHOP10 for 10% off your purchase!',
    '📦 Hassle-free 14-day returns & exchanges'
  ]

  useEffect(() => {
    setMounted(true)
    
    // Rotate promos every 4 seconds
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promos.length)
    }, 4000)

    // Sync search query with URL search param
    const currentSearch = searchParams?.get('search') || ''
    setSearchQuery(currentSearch)

    return () => clearInterval(interval)
  }, [searchParams])

  // Close user profile dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await signOut()
    setUserDropdownOpen(false)
    router.push('/')
    router.refresh()
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/')
    }
  }

  // Get user initials for avatar
  const getUserInitials = (name?: string, email?: string) => {
    const text = name || email || 'U'
    return text.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ⚡ Rotating Announcement Promo Bar */}
      {mounted && (
        <div className="w-full bg-primary text-primary-foreground text-xs py-2 px-4 transition-all duration-500 text-center font-medium overflow-hidden h-8 flex items-center justify-center">
          <div className="animate-fade-in-down key-index-update">
            {promos[promoIndex]}
          </div>
        </div>
      )}

      {/* Main Glassmorphism Navbar */}
      <nav className="w-full bg-background/85 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-primary-foreground font-black text-xl">S</span>
              </div>
              <span className="font-extrabold text-xl tracking-tight hidden sm:inline">ShopHub</span>
            </Link>

            {/* Global Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search brands, products, collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-muted hover:bg-muted/80 focus:bg-background border border-border focus:border-primary rounded-full text-sm outline-none transition"
                />
              </div>
            </form>

            {/* Nav & Action Links */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Desktop links */}
              <div className="hidden lg:flex items-center gap-6 mr-2">
                <Link href="/" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition">
                  Shop All
                </Link>
                <Link href="/?category=Electronics" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition">
                  Electronics
                </Link>
                <Link href="/?category=Clothing" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition">
                  Clothing
                </Link>
              </div>

              {/* Cart Button */}
              <Link href="/cart" className="relative group p-2 hover:bg-muted rounded-full transition">
                <ShoppingCart className="w-5.5 h-5.5 text-foreground group-hover:text-primary transition" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-background animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User Dropdown / Login actions */}
              {mounted && session?.user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 focus:outline-none p-1 hover:bg-muted rounded-full transition"
                  >
                    <div className="w-8 h-8 bg-primary/10 text-primary border border-primary/20 rounded-full flex items-center justify-center font-bold text-xs">
                      {getUserInitials(session.user.name, session.user.email)}
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:inline" />
                  </button>

                  {/* Dropdown Card */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2.5 w-60 bg-popover border border-border rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                      <div className="px-4 py-2 border-b border-border mb-1">
                        <p className="text-xs text-muted-foreground">Signed in as</p>
                        <p className="text-sm font-bold truncate text-foreground">{session.user.name || 'User'}</p>
                        <p className="text-xs truncate text-muted-foreground">{session.user.email}</p>
                      </div>
                      
                      <Link
                        href="/"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-muted transition"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                        My Orders
                      </Link>
                      
                      <Link
                        href="/"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-muted transition"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4 text-muted-foreground" />
                        Account Settings
                      </Link>

                      <div className="border-t border-border mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                mounted && (
                  <div className="hidden sm:flex items-center gap-2">
                    <Link href="/login">
                      <Button variant="ghost" size="sm" className="font-semibold">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button size="sm" className="font-semibold">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )
              )}

              {/* Mobile Menu Icon */}
              <button
                className="md:hidden p-2 hover:bg-muted rounded-full"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden border-t border-border px-4 py-4 bg-background flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-full text-sm outline-none"
              />
            </form>

            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium rounded-lg text-foreground hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                Shop All
              </Link>
              <Link
                href="/?category=Electronics"
                className="block px-3 py-2 text-base font-medium rounded-lg text-foreground hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                Electronics
              </Link>
              <Link
                href="/?category=Clothing"
                className="block px-3 py-2 text-base font-medium rounded-lg text-foreground hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                Clothing
              </Link>
            </div>

            {/* Mobile Auth actions */}
            {mounted && !session?.user && (
              <div className="grid grid-cols-2 gap-2 border-t border-border pt-4">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
