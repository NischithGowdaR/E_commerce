import { getSession } from '@/lib/auth-utils'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AuthForm } from '@/components/auth-form'

export const metadata = {
  title: 'Sign In - ShopHub',
  description: 'Sign in to your ShopHub account',
}

export default async function LoginPage() {
  const session = await getSession()
  if (session?.user) {
    redirect('/')
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground mb-8">
              Sign in to your ShopHub account to continue shopping
            </p>

            <AuthForm mode="sign-in" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
