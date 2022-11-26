export interface Response <T> {
    data: T
    status: number | string
    statusText?: string
}

export interface TokenResponse {
    access_token: string
    refresh_token: string
    token_type: string
}
