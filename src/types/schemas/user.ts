export interface RoleSchema {
    id: number
    name: string
}

export interface UserInput {
    id?: number
    username?: string
    password?: string
    email?: string
}

export interface UserOutput {
    id: number
    username: string
    email: string
    roles: RoleSchema[]
}
