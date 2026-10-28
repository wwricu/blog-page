import {AsyncPathParams} from "@/common/common"
import {notFound, permanentRedirect} from "next/navigation"

// Legacy path-style search URLs are canonicalized to the /search?keyword= route
export default async function SearchPage({ params }: AsyncPathParams) {
    const { keyword } = await params
    const decoded = keyword ? decodeURIComponent(keyword) : ''
    if (!decoded.trim()) {
        notFound()
    }
    permanentRedirect(`/search?keyword=${encodeURIComponent(decoded)}`)
}
