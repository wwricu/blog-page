import PostDetailView from "@/components/PostDetailView"
import {GetPostDetailAPI} from "@/common/api"
import {Metadata} from "next"

export const generateMetadata = async ({ params }: PageProps<'/detail/[id]'>): Promise<Metadata> => {
    const postDetailVO = await GetPostDetailAPI((await params).id)
    if (!postDetailVO) {
        return {}
    }

    return {
        title: postDetailVO.title,
        description: postDetailVO.preview,
        alternates: { canonical: `/detail/${postDetailVO.id}` },
        openGraph: {
            title: postDetailVO.title,
            url: `/detail/${postDetailVO.id}`,
            images: postDetailVO.cover ? [{ url: postDetailVO.cover.url, alt: postDetailVO.cover.name ?? undefined }] : undefined,
            type: 'article',
            authors: 'wwr',
            publishedTime: postDetailVO.create_time,
            modifiedTime: postDetailVO.update_time || postDetailVO.create_time,
            tags: postDetailVO.tag_list.map(tag => tag.name),
        }
    }
}

export const generateStaticParams = () => []

export default async function PostDetailPage({ params }: PageProps<'/detail/[id]'>) {
    const postDetailVO = await GetPostDetailAPI((await params).id)
    return <PostDetailView postDetailVO={postDetailVO}/>
}
