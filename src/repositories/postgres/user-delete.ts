import { QueryConfig } from 'pg'
import pool from './db'


function getUserDeleteByEmailQuery(email: string): QueryConfig {
    return {
        text: 'DELETE FROM users WHERE email = $1',
        values: [email],
    }
}

export async function deleteUserByEmail(email: string): Promise<number> {
    try {
        const res = await pool.query(getUserDeleteByEmailQuery(email))
        return res.rowCount
    } catch (err) {
        throw new Error(`Deleting user with email "${email}" failed: ${err}`)
    }
}
