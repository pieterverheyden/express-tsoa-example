import { User } from '../models/user'
import { deleteUserByEmail } from '../repositories/postgres/user-delete'
import { selectAllUsers, selectUserByEmail } from '../repositories/postgres/user-select'
import { upsertUser } from '../repositories/postgres/user-upsert'


export async function createOrUpdateUser(user: User): Promise<void> {
    try {
        return await upsertUser(user)
    } catch (err) {
        throw new Error(`${err}`)
    }
}

export async function getAllUsers(): Promise<User[] | null> {
    try {
        return await selectAllUsers()
    } catch (err) {
        throw new Error(`${err}`)
    }
}

export async function getUserByEmail(email: string): Promise<User | null> {
    try {
        return await selectUserByEmail(email)
    } catch (err) {
        throw new Error(`${err}`)
    }
}

export async function removeUserByEmail(email: string): Promise<number> {
    try {
        return await deleteUserByEmail(email)
    } catch (err) {
        throw new Error(`${err}`)
    }
}
