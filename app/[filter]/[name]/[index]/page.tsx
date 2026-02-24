import PostView from "@/components/PostView"
import {AsyncPathParams} from "@/common/common"
import {Metadata} from "next"
import {permanentRedirect} from "next/navigation"

export const generateMetadata = async ({ params }: AsyncPathParams): Promise<Metadata> => {
    const { filter, name, index } = await params
    const decodedName = decodeURIComponent(name!!)
    return {
        title: `Page ${index} | ${decodedName} - wwr.icu`,
        description: `Page ${index} of posts under ${filter} ${decodedName}`,
        openGraph: {
            siteName: 'wwr.icu',
            title: decodedName,
            description: 'wwr.icu',
            url: `${process.env.NEXT_SITE_URL}/${filter}/${name}${index ? `/${index}` : ''}`
        }
    }
}

export default async function PostPage({ params }: AsyncPathParams) {
    const { filter, name, index } = await params
    if (index === '1') {
        // This is safe for next.js matches only non-none strings as path params
        permanentRedirect(`/${filter}/${name}`)
    }

    return <PostView filter={filter} name={name} index={index} />
}
