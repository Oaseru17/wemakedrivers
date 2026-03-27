import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGODB_URI!
const dbName = process.env.MONGODB_DATABASE || 'wemake-drivers'

let cached: MongoClient | null = null

export async function getDb(): Promise<Db> {
  if (!cached) {
    cached = await new MongoClient(uri).connect()
  }
  return cached.db(dbName)
}
