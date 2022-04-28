import { QueryConfig } from 'pg'
import { User } from '../../models/user'
import pool from './db'


function getUserUpsertQuery(user: User): QueryConfig {
    return {
        text: 'INSERT INTO users (email, first_name, last_name, gender) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO UPDATE SET first_name = EXCLUDED.first_name, last_name = EXCLUDED.last_name, gender = EXCLUDED.gender',
        values: [user.email, user.firstName, user?.lastName || null, user?.gender || null],
    }
}

export async function upsertUser(user: User): Promise<void> {
    try {
        await pool.query(getUserUpsertQuery(user))
    } catch (err) {
        throw new Error(`Upserting user with email "${user.email}" failed: ${err}`)
    }
}
