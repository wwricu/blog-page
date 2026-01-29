import {PostDetailPageVO} from "@/common/model"
import PostCard from "@/components/PostCard"
import React from "react"
import {Pagination} from "@/components/Common"
import {getPathname} from "@/common/common"

export default async function PostList({postDetailPageVO}: { postDetailPageVO: PostDetailPageVO }) {
    const current = postDetailPageVO.page_index ?? 1

    const getUrl = async (page: number) => {
        const pathname = await getPathname()
        const split = pathname.endsWith('/') ? '' : '/'
        return `${pathname}${split}${page}`
    }

    return (
        <div className='max-sm:px-2 max-md:px-4'>
            {postDetailPageVO?.data?.map(postDetailVO =>
                <PostCard key={postDetailVO.id} postDetailVO={postDetailVO}/>)}
            <Pagination
                className='max-sm:mt-3 max-sm:mb-2 sm:mt-6 sm:mb-4'
                current={current}
                total={postDetailPageVO.count}
                getHref={getUrl}
            />
        </div>
    )
}
