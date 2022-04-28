import { QueryConfig } from 'pg'
import { User } from '../../models/user'
import pool from './db'


function getUserSelectByEmailQuery(email: string): QueryConfig {
    return {
        text: 'SELECT email, first_name, last_name, gender FROM users WHERE email = $1',
        values: [email],
    }
}

export async function selectUserByEmail(email: string): Promise<User | null> {
    try {
        const res = await pool.query(getUserSelectByEmailQuery(email))
        if (res.rowCount === 1) {
            return res.rows[0]
        } else {
            return null
        }
    } catch (err) {
        throw new Error(`Retrieving user with email "${email}" failed: ${err}`)
    }
}
