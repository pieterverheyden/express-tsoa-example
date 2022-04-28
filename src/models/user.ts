export enum Gender {
    Female = 'F',
    Male = 'M',
    NonBinary = 'X'
}

export interface User {
    email: string
    firstName: string
    lastName?: string
    gender?: Gender
}
