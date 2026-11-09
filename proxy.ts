import { NextResponse, type NextRequest } from 'next/server'

// Legacy path-style search URLs are canonicalized here at the edge instead of a page:
// the app-function launcher throws "failed to decode param" on malformed escapes like
// %E0%A4 before any page code runs, so the redirect has to happen earlier than render.
export default function proxy(request: NextRequest) {
    const tail = request.nextUrl.pathname.slice('/search/'.length)
    let decoded = tail
    try {
        decoded = decodeURIComponent(tail)
    } catch { /* keep the raw value */ }
    const url = request.nextUrl.clone()
    url.pathname = '/search'
    url.search = `keyword=${encodeURIComponent(decoded)}`
    return NextResponse.redirect(url, 308)
}

export const config = {
    matcher: ['/search/:tail+'],
}
