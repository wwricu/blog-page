import {AsyncPathParams} from "@/common/common"
import PostView from "@/components/PostView"
import {Metadata} from "next"

export const generateMetadata = async ({ params }: AsyncPathParams): Promise<Metadata> => {
    const { filter, name } = await params
    return {
        title: `${name} | wwr.icu`,
        description: `First page of posts under ${filter} ${name}`
    }
}

export default async function FilterPostPage({ params }: AsyncPathParams) {
    return PostView(await params)
}
