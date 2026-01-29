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
        <div className='flex flex-col items-center max-sm:px-2 max-md:px-4 md:mt-2'>
            {postDetailPageVO?.data?.map(postDetailVO =>
                <PostCard key={postDetailVO.id} postDetailVO={postDetailVO}/>)}
            <Pagination
                className='max-sm:my-3 sm:my-6'
                current={current}
                total={postDetailPageVO.count}
                getHref={getUrl}
            />
        </div>
    )
}
