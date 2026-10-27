import SearchPostView from "@/components/SearchPostView"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const generateMetadata = async ({ searchParams }: { searchParams: Promise<{ keyword?: string }> }): Promise<Metadata> => {
    const { keyword } = await searchParams
    const term = keyword ?? ''
    return {
        title: `Search: ${term}`,
        description: `Search results for ${term}`,
        // Search results are transient duplicates; keep them out of the index
        robots: { index: false, follow: true },
        openGraph: { url: `/search?keyword=${encodeURIComponent(term)}` },
    }
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ keyword?: string }> }) {
    const { keyword } = await searchParams
    if (!keyword?.trim()) {
        redirect('/')
    }
    return <SearchPostView keyword={keyword} />
}
