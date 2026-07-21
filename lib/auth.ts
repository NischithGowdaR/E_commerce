import { betterAuth } from 'better-auth'

const baseURL =
  process.env.BETTER_AUTH_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.V0_RUNTIME_URL || 'http://localhost:3000')

const trustedOrigins = [
  baseURL,
  ...(process.env.VERCEL_PROJECT_PRODUCTION_URL ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`] : []),
  ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ...(process.env.V0_RUNTIME_URL ? [process.env.V0_RUNTIME_URL] : []),
]

// Initialize auth with MongoDB or mock adapter based on environment
async function initializeAuth() {
  if (process.env.MONGODB_URI) {
    // Production: Use MongoDB
    const { MongoDBAdapter } = await import('@auth/mongodb-adapter')
    const { MongoClient } = await import('mongodb')
    
    const mongoUri = process.env.MONGODB_URI
    const mongoClient = new MongoClient(mongoUri)
    
    return {
      database: new MongoDBAdapter(mongoClient.db(process.env.MONGODB_DB_NAME || 'shophub')),
    }
  } else {
    // Development/Preview: Use in-memory storage
    return {
      // Use a simple object-based storage for demo purposes
      database: undefined,
    }
  }
}

let authInstance: any = null
let initialized = false

export function getAuth() {
  if (!initialized) {
    throw new Error('Auth not initialized. Call initAuth first.')
  }
  return authInstance
}

export async function initAuth() {
  if (initialized) return
  
  const config = await initializeAuth()
  
  const authConfig: any = {
    secret: process.env.BETTER_AUTH_SECRET || 'dev-secret-key-change-in-production',
    baseURL,
    basePath: '/api/auth',
    trustedOrigins,
    advanced: {
      ...(process.env.NODE_ENV === 'development' && {
        defaultCookieAttributes: {
          sameSite: 'none',
          secure: true,
        },
      }),
    },
  }
  
  // Only add database if MongoDB is available
  if (config.database) {
    authConfig.database = config.database
  }
  
  authInstance = betterAuth(authConfig)
  initialized = true
}

// For API routes - sync export
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || 'dev-secret-key-change-in-production',
  baseURL,
  basePath: '/api/auth',
  trustedOrigins,
  advanced: {
    ...(process.env.NODE_ENV === 'development' && {
      defaultCookieAttributes: {
        sameSite: 'none',
        secure: true,
      },
    }),
  },
})
