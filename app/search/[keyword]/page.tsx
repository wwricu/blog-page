import {AsyncPathParams} from "@/common/common"
import {notFound, permanentRedirect} from "next/navigation"

// Legacy path-style search URLs are canonicalized to the /search?keyword= route
export default async function SearchPage({ params }: AsyncPathParams) {
    const { keyword } = await params
    // This route is rendered dynamically, so its params arrive still percent-encoded;
    // a malformed escape is kept raw instead of throwing, the same guard PostView uses
    let decoded = keyword ?? ''
    try {
        decoded = decodeURIComponent(decoded)
    } catch { /* keep the raw value */ }
    if (!decoded.trim()) {
        notFound()
    }
    permanentRedirect(`/search?keyword=${encodeURIComponent(decoded)}`)
}
