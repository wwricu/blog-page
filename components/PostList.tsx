import {PostDetailPageVO} from "@/common/model"
import PostCard from "@/components/PostCard"
import React from "react"
import {Pagination} from "@/components/Common"
import {getPathname} from "@/common/middleware";

export default async function PostList({postDetailPageVO}: { postDetailPageVO: PostDetailPageVO }) {
    const current = postDetailPageVO.page_index ?? 1

    const getUrl = async (page: number) => {
        const pathname = await getPathname()
        const split = pathname.endsWith('/') ? '' : '/'
        return `${pathname}${split}${page}`
    }

    return (
        <>
            {
                postDetailPageVO?.data?.map(postDetailVO =>
                    <PostCard key={postDetailVO.id} postDetailVO={postDetailVO}/>
                )
            }
            <Pagination
                className='max-sm:my-3 sm:my-6'
                current={current}
                total={postDetailPageVO.count}
                getHref={getUrl}
            />
        </>
    )
}
