'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubscribed(true)
      setEmail('')
    }, 1200)
  }

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-900 mt-16 font-sans">
      {/* Upper Grid Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* Brand & Socials Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-md">
                <span className="text-primary-foreground font-black text-xl">S</span>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">ShopHub</span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
              Experience the finest curated collection of technology, apparel, and lifestyle accessories. Designed for modern living.
            </p>
            
            {/* Social Icons (using inline SVGs for standard brand logos) */}
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-zinc-900 hover:bg-primary hover:text-primary-foreground text-zinc-400 rounded-full transition-all duration-300" aria-label="Facebook">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-zinc-900 hover:bg-primary hover:text-primary-foreground text-zinc-400 rounded-full transition-all duration-300" aria-label="Twitter">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-zinc-900 hover:bg-primary hover:text-primary-foreground text-zinc-400 rounded-full transition-all duration-300" aria-label="Instagram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-zinc-900 hover:bg-primary hover:text-primary-foreground text-zinc-400 rounded-full transition-all duration-300" aria-label="LinkedIn">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-zinc-900 hover:bg-primary hover:text-primary-foreground text-zinc-400 rounded-full transition-all duration-300" aria-label="YouTube">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="font-semibold text-white mb-4 tracking-wider text-sm uppercase">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-white transition duration-200">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/?category=Electronics" className="text-zinc-400 hover:text-white transition duration-200">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/?category=Clothing" className="text-zinc-400 hover:text-white transition duration-200">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/?category=Accessories" className="text-zinc-400 hover:text-white transition duration-200">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 tracking-wider text-sm uppercase">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-zinc-400 hover:text-white transition duration-200">
                  FAQ & Help
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-white transition duration-200">
                  Shipping Rates
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-white transition duration-200">
                  Returns & Exchange
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-white transition duration-200">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div className="lg:col-span-1 min-w-[200px]">
            <h3 className="font-semibold text-white mb-4 tracking-wider text-sm uppercase">Subscribe</h3>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            
            {subscribed ? (
              <div className="flex items-center gap-2 text-primary bg-primary/10 border border-primary/20 p-3 rounded-lg text-sm">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-white">Subscribed! 🎉</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-primary text-white text-xs px-3 py-2.5 rounded-lg outline-none pr-10 transition"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-primary transition"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                {error && <p className="text-[11px] text-red-400">{error}</p>}
              </form>
            )}
          </div>

        </div>

        {/* Bottom Area */}
        <div className="border-t border-zinc-900 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <p className="text-zinc-500 text-xs text-center md:text-left">
              &copy; {currentYear} ShopHub. Made with passion for high quality commerce.
            </p>
            <div className="flex gap-4 text-[11px] text-zinc-500 justify-center">
              <a href="#" className="hover:text-zinc-300 transition">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-300 transition">Terms of Service</a>
              <a href="#" className="hover:text-zinc-300 transition">Sitemap</a>
            </div>
          </div>

          {/* Payment Badges (Clean SVG layouts) */}
          <div className="flex items-center gap-3 bg-zinc-900/50 px-4 py-2 rounded-xl border border-zinc-900">
            {/* Visa */}
            <svg className="h-4 w-auto text-zinc-500 fill-current hover:text-white transition" viewBox="0 0 24 15" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v15H0z" fill="none"/>
              <path d="M10.2 12.3l.8-4.9h1.3l-.8 4.9H10.2zm5.7-4.6c-.3-.2-.8-.4-1.3-.4-.7 0-1.2.3-1.2.8 0 .4.4.6.8.8.4.2.6.4.6.6 0 .3-.4.5-.9.5-.6 0-1-.2-1.3-.3l-.2.9c.3.1.8.3 1.4.3.7 0 1.3-.3 1.3-.8 0-.4-.4-.6-.8-.8-.4-.2-.5-.3-.5-.5 0-.2.3-.4.8-.4.5 0 .8.1 1.1.3l.1-.9zm2.4 1.3c0-.1 0-.1-.1-.2l-.8-2h-.9c-.2 0-.3.1-.4.3l-1.6 3.7h1.4l.3-.8h1.7c0 .4.1.6.1.6h1.3l-1-1.6zm-1.8-1.2l.5 1.4h-1.1l.6-1.4zM7.5 7.4L6.2 11c-.1.3-.4.6-.8.6H3.6l-.1-.2c.4-.2.8-.5 1.1-.8.2-.2.3-.4.4-.7l1.1-4.1h1.4z" />
            </svg>
            {/* Mastercard */}
            <svg className="h-4 w-auto text-zinc-500 fill-current hover:text-white transition" viewBox="0 0 24 15" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="7.5" r="5" fillOpacity="0.75" />
              <circle cx="14" cy="7.5" r="5" fillOpacity="0.75" />
            </svg>
            {/* Apple Pay */}
            <span className="text-[10px] font-black tracking-widest text-zinc-500 hover:text-white transition uppercase"> PAY</span>
            {/* Google Pay */}
            <span className="text-[10px] font-black tracking-wider text-zinc-500 hover:text-white transition uppercase">G Pay</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
