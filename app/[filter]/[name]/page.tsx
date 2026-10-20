import {AsyncPathParams} from "@/common/common"
import PostView from "@/components/PostView"
import {Metadata} from "next"

export const generateMetadata = async ({ params }: AsyncPathParams): Promise<Metadata> => {
    const { filter, name } = await params
    const decodedName = decodeURIComponent(name!)
    return {
        title: decodedName,
        description: `First page of posts under ${filter} ${decodedName}`,
        openGraph: { url: `/${filter}/${name}` },
    }
}

export const generateStaticParams = () => []

export default async function FilterPostPage({ params }: AsyncPathParams) {
    const { filter, name } = await params
    return <PostView filter={filter} name={name} />
}
