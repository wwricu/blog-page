import PostView from "@/components/PostView"
import {Metadata} from "next"
import {permanentRedirect} from "next/navigation"

export const generateMetadata = async ({ params }: PageProps<'/[filter]/[name]/[index]'>): Promise<Metadata> => {
    const { filter, name, index } = await params
    return {
        title: `Page ${index} | ${name}`,
        description: `Page ${index} of posts under ${filter} ${name}`,
        openGraph: { url: `/${filter}/${name}/${index}` },
    }
}

export const generateStaticParams = () => []

export default async function PostPage({ params }: PageProps<'/[filter]/[name]/[index]'>) {
    const { filter, name, index } = await params
    if (index === '1') {
        permanentRedirect(`/${filter}/${name}`)
    }

    return <PostView filter={filter} name={name} index={index} />
}
