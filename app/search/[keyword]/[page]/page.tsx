import SearchPostView from "@/components/SearchPostView"
import {AsyncPathParams, SearchUrl} from "@/common/common"
import {Metadata} from "next"
import {notFound, permanentRedirect} from "next/navigation"

export const generateMetadata = async ({ params }: AsyncPathParams): Promise<Metadata> => {
    const { keyword, page } = await params
    const decoded = keyword ? decodeURIComponent(keyword) : ''
    return {
        title: `Page ${page} | Search: ${decoded} - wwr.icu`,
        description: `Page ${page} of search results for ${decoded}`,
        openGraph: {
            siteName: 'wwr.icu',
            title: decoded,
            description: 'wwr.icu',
            url: `${process.env.NEXT_SITE_URL}/${SearchUrl}/${keyword}/${page}`
        }
    }
}

export default async function SearchPagedPage({ params }: AsyncPathParams) {
    const { keyword, page } = await params
    if (!keyword || !decodeURIComponent(keyword).trim()) {
        notFound()
    }
    if (page === '1') {
        permanentRedirect(`/${SearchUrl}/${keyword}`)
    }
    return <SearchPostView keyword={keyword} index={page} />
}
