import {NextRequest, NextResponse } from "next/server"

export const proxy = async (request: NextRequest) => {
    const requestHeaders = new Headers(request.headers)
    if (process.env.NEXT_API_KEY_ID && process.env.NEXT_API_KEY) {
        requestHeaders.set('x-api-key-id', process.env.NEXT_API_KEY_ID)
        requestHeaders.set('x-api-key', process.env.NEXT_API_KEY)
    }
    return NextResponse.next({request: {headers: requestHeaders}})
}
