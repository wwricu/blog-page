import { NextResponse } from 'next/server'
import { headers } from "next/headers"

const pathnameHeader = 'x-full-url'

export function middleware(request: Request) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set(pathnameHeader, request.url)

    return NextResponse.next({
        request: { headers: requestHeaders }
    })
}

export async function getPathname() {
    const headersList = await headers()
    return headersList.get(pathnameHeader) || ""
}
