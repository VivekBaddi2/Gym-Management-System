import 'server-only'
import { Pool } from 'pg'

const globalForDb = globalThis

console.log(process.env.DATABASE_URL)
console.log(Date.now())
export const pool =
  // Only create a new connection if there isn't any existing pool
  globalForDb.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  })

console.log(pool)

// survive hot-reload in dev - without this every save creates new pool
if (process.env.NODE_ENV !== 'production') {
  globalForDb.pgPool = pool
}
