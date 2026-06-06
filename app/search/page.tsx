import SearchPostView from "@/components/SearchPostView"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const generateMetadata = async ({ searchParams }: { searchParams: Promise<{ keyword?: string }> }): Promise<Metadata> => {
    const { keyword } = await searchParams
    const decoded = keyword ? decodeURIComponent(keyword) : ''
    return {
        title: `Search: ${decoded} - wwr.icu`,
        description: `Search results for ${decoded}`,
        robots: { index: false, follow: true },
        openGraph: {
            siteName: 'wwr.icu',
            title: decoded,
            description: 'wwr.icu',
            url: `${process.env.NEXT_SITE_URL}/search?keyword=${keyword}`
        }
    }
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ keyword?: string }> }) {
    const { keyword } = await searchParams
    if (!keyword || !decodeURIComponent(keyword).trim()) {
        redirect('/')
    }
    return <SearchPostView keyword={keyword} />
}
