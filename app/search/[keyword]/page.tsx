import SearchPostView from "@/components/SearchPostView"
import {AsyncPathParams, SearchUrl} from "@/common/common"
import {Metadata} from "next"
import {notFound} from "next/navigation"

export const generateMetadata = async ({ params }: AsyncPathParams): Promise<Metadata> => {
    const { keyword } = await params
    const decoded = keyword ? decodeURIComponent(keyword) : ''
    return {
        title: `Search: ${decoded} - wwr.icu`,
        description: `Search results for ${decoded}`,
        openGraph: {
            siteName: 'wwr.icu',
            title: decoded,
            description: 'wwr.icu',
            url: `${process.env.NEXT_SITE_URL}/${SearchUrl}/${keyword}`
        }
    }
}

export default async function SearchPage({ params }: AsyncPathParams) {
    const { keyword } = await params
    if (!keyword || !decodeURIComponent(keyword).trim()) {
        notFound()
    }
    return <SearchPostView keyword={keyword} />
}
