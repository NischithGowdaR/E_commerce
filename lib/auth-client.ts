'use client'

import { useState, useEffect } from 'react'

const dispatchSessionChanged = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth-session-changed'))
  }
}

const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
}

export const signUp = {
  email: async ({ email, password, name }: any) => {
    const res = await fetch(`${getApiUrl()}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Registration failed')
    }
    localStorage.setItem('token', data.token)
    dispatchSessionChanged()
    return data
  },
}

export const signIn = {
  email: async ({ email, password }: any) => {
    const res = await fetch(`${getApiUrl()}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Login failed')
    }
    localStorage.setItem('token', data.token)
    dispatchSessionChanged()
    return data
  },
}

export const signOut = async () => {
  localStorage.removeItem('token')
  dispatchSessionChanged()
}

export function useSession() {
  const [session, setSession] = useState<{ user: { id: string; name: string; email: string } } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  const fetchSession = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (!token) {
      setSession(null)
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`${getApiUrl()}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        const data = await res.json()
        setSession({ user: data.user })
      } else {
        localStorage.removeItem('token')
        setSession(null)
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSession()

    const handleSessionChange = () => {
      setLoading(true)
      fetchSession()
    }

    window.addEventListener('auth-session-changed', handleSessionChange)
    return () => {
      window.removeEventListener('auth-session-changed', handleSessionChange)
    }
  }, [])

  return {
    data: session,
    loading,
    error,
  }
}
