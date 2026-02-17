import {AsyncPathParams} from "@/common/common"
import PostView from "@/components/PostView"
import {Metadata} from "next"

export const generateMetadata = async ({ params }: AsyncPathParams): Promise<Metadata> => {
    const { filter, name } = await params
    const decodedName = decodeURIComponent(name!!)
    return {
        title: `${decodedName} - wwr.icu`,
        description: `First page of posts under ${filter} ${decodedName}`,
        openGraph: {
            siteName: 'wwr.icu',
            title: decodedName,
            description: 'wwr.icu',
            url: `${process.env.NEXT_SITE_URL}/${filter}/${name}`
        }
    }
}

export default async function FilterPostPage({ params }: AsyncPathParams) {
    return PostView(await params)
}
