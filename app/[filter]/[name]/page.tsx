import {AsyncPathParams} from "@/common/common"
import PostView from "@/components/PostView"
import {Metadata} from "next"

export const generateMetadata = async ({ params }: AsyncPathParams): Promise<Metadata> => {
    const { filter, name } = await params
    return {
        title: `${name} - wwr.icu`,
        description: `First page of posts under ${filter} ${name}`,
        openGraph: {
            siteName: 'wwr.icu',
            title: name,
            description: 'wwr.icu',
            url: `${process.env.NEXT_SITE_URL}/${filter}/${name}`
        }
    }
}

export default async function FilterPostPage({ params }: AsyncPathParams) {
    return PostView(await params)
}
