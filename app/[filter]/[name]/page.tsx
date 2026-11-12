import PostView from "@/components/PostView"
import {Metadata} from "next"

export const generateMetadata = async ({ params }: PageProps<'/[filter]/[name]'>): Promise<Metadata> => {
    const { filter, name } = await params
    return {
        title: name,
        description: `First page of posts under ${filter} ${name}`,
        openGraph: { url: `/${filter}/${name}` },
    }
}

export const generateStaticParams = () => []

export default async function FilterPostPage({ params }: PageProps<'/[filter]/[name]'>) {
    const { filter, name } = await params
    return <PostView filter={filter} name={name} />
}
