'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signUp, signIn, useSession } from '@/lib/auth-client'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

interface AuthFormProps {
  mode: 'sign-in' | 'sign-up'
}

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user) {
      router.push('/')
      router.refresh()
    }
  }, [session, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'sign-up') {
        await signUp.email({
          email,
          password,
          name,
        })
      } else {
        await signIn.email({
          email,
          password,
        })
      }

      router.push('/')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
            {error}
          </div>
        )}

        {mode === 'sign-up' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            minLength={8}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {mode === 'sign-up' ? 'Minimum 8 characters' : ''}
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {mode === 'sign-up' ? 'Create Account' : 'Sign In'}
        </Button>

        <div className="text-center text-sm">
          {mode === 'sign-up' ? (
            <>
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign In
              </Link>
            </>
          ) : (
            <>
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </form>
    </div>
  )
}
