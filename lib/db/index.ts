import { MongoClient } from 'mongodb'

let client: MongoClient | null = null

export async function getMongoClient(): Promise<MongoClient> {
  if (client) {
    return client
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set')
  }

  client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()
  return client
}

export async function getDatabase() {
  const mongoClient = await getMongoClient()
  return mongoClient.db(process.env.MONGODB_DB_NAME || 'shophub')
}
