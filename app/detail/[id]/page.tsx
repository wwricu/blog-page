import React from "react"
import {AsyncPathParams} from "@/common/common"
import PostDetailView from "@/components/PostDetailView"
import {GetPostDetailAPI} from "@/common/api"
import {Metadata} from "next"

/**
 * Response from fetch request with exactly same parameter would be cached during a React server component rendering;
 * 'The cache lasts the lifetime of a server request until the React component tree has finished rendering.'
 * This is NOT affected by 'export const dynamic = 'force-dynamic'
 * More to see: https://nextjs.org/docs/app/guides/caching#request-memoization
 */
export const generateMetadata = async ({ params }: AsyncPathParams): Promise<Metadata> => {
    const postId = (await params).id
    if (!postId) {
        return {}
    }

    const postDetailVO = await GetPostDetailAPI(postId)
    if (!postDetailVO) {
        return {}
    }

    return {
        title: postDetailVO.title,
        description: postDetailVO.preview,
        openGraph: {
            // Keep the bare post title (no site suffix) for share cards
            title: postDetailVO.title,
            url: `/detail/${postDetailVO.id}`,
            images: postDetailVO.cover && [
                {
                    url: postDetailVO?.cover?.url,
                    alt: postDetailVO?.cover?.name,
                    // Explicit size advertised for WeChat share cards, which require width/height
                    width: 240,
                    height: 180,
                }
            ],

            type: 'article',
            authors: 'wwr',
            publishedTime: postDetailVO.create_time,
            modifiedTime: postDetailVO.update_time || postDetailVO.create_time,
            tags: postDetailVO.tag_list?.map(tag => tag.name),
        }
    }
}

export const generateStaticParams = () => []

export default async function PostDetailPage({ params }: AsyncPathParams) {
    const postId = (await params).id
    const postDetailVO = await GetPostDetailAPI(postId!)
    return <PostDetailView postDetailVO={postDetailVO}/>
}
