import PostView from "@/components/PostView"
import {AsyncPathParams} from "@/common/common"
import {Metadata} from "next"
import {permanentRedirect} from "next/navigation"

export const generateMetadata = async ({ params }: AsyncPathParams): Promise<Metadata> => {
    const { filter, name, index } = await params
    return {
        title: `Page ${index} | ${name} | wwr.icu`,
        description: `Page ${index} of posts under ${filter} ${name}`
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
