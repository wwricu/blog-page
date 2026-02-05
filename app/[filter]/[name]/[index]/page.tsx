import PostView from "@/components/PostView"
import {AsyncPathParams} from "@/common/common"
import {Metadata} from "next"

export async function generateMetadata({ params }: AsyncPathParams): Promise<Metadata> {
    const { filter, name, index } = await params
    return {
        title: `Page ${index} | ${name} | wwr.icu`,
        description: `Page ${index} of posts under ${filter} ${name}`
    }
}

export default async function PostPage({ params }: AsyncPathParams) {
    return PostView(await params)
}
