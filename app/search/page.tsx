import SearchPostView from "@/components/SearchPostView"
import { Metadata } from "next"
import { redirect } from "next/navigation"

const termOf = (keyword: string | string[] | undefined) => ((Array.isArray(keyword) ? keyword[0] : keyword) ?? '').slice(0, 128)

export const generateMetadata = async ({ searchParams }: PageProps<'/search'>): Promise<Metadata> => {
    const term = termOf((await searchParams).keyword)
    return {
        title: `Search: ${term}`,
        description: `Search results for ${term}`,
        robots: { index: false, follow: true },
        openGraph: { url: `/search?keyword=${encodeURIComponent(term)}` },
    }
}

export default async function SearchPage({ searchParams }: PageProps<'/search'>) {
    const term = termOf((await searchParams).keyword)
    if (!term.trim()) {
        redirect('/')
    }
    return <SearchPostView keyword={term} />
}
