import { Pool } from 'pg'

const pgConnectionConfig = {
    user: process.env.PG_USER || '',
    database: process.env.PG_DATABASE || '',
    host: process.env.PG_HOST || '',
    port: parseInt(process.env.PG_PORT || '5432'),
    password: process.env.PG_PASSWORD || '',
}

const pool = new Pool(pgConnectionConfig)

export default pool
