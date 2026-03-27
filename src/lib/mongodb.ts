const ENDPOINT = import.meta.env.VITE_MONGODB_DATA_API_URL as string
const API_KEY = import.meta.env.VITE_MONGODB_DATA_API_KEY as string
const DATA_SOURCE = import.meta.env.VITE_MONGODB_DATA_SOURCE as string || 'Cluster0'
const DATABASE = import.meta.env.VITE_MONGODB_DATABASE as string || 'wemake-drivers'

interface DataAPIRequest {
  collection: string
  filter?: Record<string, unknown>
  document?: Record<string, unknown>
  documents?: Record<string, unknown>[]
  update?: Record<string, unknown>
  sort?: Record<string, number>
  limit?: number
  projection?: Record<string, number>
}

interface DataAPIResponse<T = unknown> {
  document?: T
  documents?: T[]
  insertedId?: string
  matchedCount?: number
  modifiedCount?: number
  deletedCount?: number
}

async function dataApi<T = unknown>(action: string, body: DataAPIRequest): Promise<DataAPIResponse<T>> {
  const res = await fetch(`${ENDPOINT}/action/${action}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      dataSource: DATA_SOURCE,
      database: DATABASE,
      ...body,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`MongoDB Data API error: ${res.status} ${text}`)
  }

  return res.json()
}

export const db = {
  findOne: <T>(collection: string, filter: Record<string, unknown>) =>
    dataApi<T>('findOne', { collection, filter }),

  find: <T>(collection: string, filter: Record<string, unknown> = {}, sort?: Record<string, number>, limit?: number) =>
    dataApi<T>('find', { collection, filter, sort, limit }),

  insertOne: (collection: string, document: Record<string, unknown>) =>
    dataApi('insertOne', { collection, document }),

  updateOne: (collection: string, filter: Record<string, unknown>, update: Record<string, unknown>) =>
    dataApi('updateOne', { collection, filter, update }),

  deleteOne: (collection: string, filter: Record<string, unknown>) =>
    dataApi('deleteOne', { collection, filter }),
}
