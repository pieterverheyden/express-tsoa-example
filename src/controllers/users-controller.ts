import { Body, Controller, Delete, Get, Path, Put, Response, Route, SuccessResponse, Tags } from 'tsoa'
import { User } from '../models/user'
import { createOrUpdateUser, getUserByEmail, removeUserByEmail } from '../services/users-service'
import * as EmailValidator from 'email-validator'
import logger from '../logger'


@Tags('Users')
@Route('users')
export class UsersController extends Controller {

    /**
     * Get an existing user by email adress
     * @param email the email address of the user
     */
    @Response(404, 'User not found')
    @Response(400, 'Bad request: invalid email')
    @Response(500, 'Internal server error')
    @Get('{email}')
    public async getUserByEmail(@Path() email: string): Promise<User | null> {
        if (EmailValidator.validate(email)) {
            this.setStatus(200)
        } else {
            this.setStatus(400)
            return null
        }
        try {
            const res = await getUserByEmail(email)
            if (!res) {
                this.setStatus(404)
            }
            return res
        } catch (err) {
            logger.error(err)
            this.setStatus(500)
            return null
        }
    }

    /**
    * Create a new user or automatically update an existing user if the email address already exists
    * @summary Create or update a user
    * @param requestBody the user to create or update
    */
    @SuccessResponse(201, 'User successfully created or updated')
    @Response(400, 'Bad request: invalid email')
    @Response(500, 'Internal server error')
    @Put()
    public async createOrUpdateUser(@Body() requestBody: User): Promise<void> {
        if (EmailValidator.validate(requestBody.email)) {
            this.setStatus(201)
        } else {
            this.setStatus(400)
            return
        }
        try {
            await createOrUpdateUser(requestBody)
        } catch (err) {
            logger.error(err)
            this.setStatus(500)
        }
    }

    /**
     * Delete an existing user by email adress
     * @param email the email address of the user
     */
    @SuccessResponse(204, 'User successfully deleted')
    @Response(400, 'Bad request: invalid email')
    @Response(410, 'User not found')
    @Response(500, 'Internal server error')
    @Delete('{email}')
    public async removeUser(@Path() email: string): Promise<void> {
        if (EmailValidator.validate(email)) {
            this.setStatus(204)
        } else {
            this.setStatus(400)
            return
        }
        try {
            const res = await removeUserByEmail(email)
            if (res === 0) {
                this.setStatus(410)
            }
        } catch (err) {
            logger.error(err)
            this.setStatus(500)
        }
    }

}
