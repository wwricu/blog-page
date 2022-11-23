export interface Response <T> {
    data: T
    status: number | string
    statusText?: string
}
