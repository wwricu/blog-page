import SearchPostView from "@/components/SearchPostView"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const generateMetadata = async ({ searchParams }: { searchParams: Promise<{ keyword?: string }> }): Promise<Metadata> => {
    const { keyword } = await searchParams
    const decoded = keyword ? decodeURIComponent(keyword) : ''
    return {
        title: `Search: ${decoded}`,
        description: `Search results for ${decoded}`,
        // Search results are transient duplicates; keep them out of the index
        robots: { index: false, follow: true },
        openGraph: { url: `/search?keyword=${encodeURIComponent(decoded)}` },
    }
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ keyword?: string }> }) {
    const { keyword } = await searchParams
    if (!keyword || !decodeURIComponent(keyword).trim()) {
        redirect('/')
    }
    return <SearchPostView keyword={keyword} />
}
