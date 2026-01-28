import {PostDetailPageVO} from "@/common/model";
import PostCard from "@/components/PostCard";
import React from "react";
import Pagination from "@/components/Pagination";
import {getPathname} from "@/common/common";

export default async function PostList({postDetailPageVO}: { postDetailPageVO: PostDetailPageVO }) {
    const current = postDetailPageVO.page_index ?? 1

    const getUrl = async (page: number) => {
        const pathname = await getPathname()
        const split = pathname.endsWith('/') ? '' : '/'
        return `${pathname}${split}${page}`
    }

    return (
        <div className='flex flex-col items-center'>
            {postDetailPageVO?.data?.map(postDetailVO =>
                <PostCard key={postDetailVO.id} postDetailVO={postDetailVO}/>)}
            <Pagination
                className='mt-5 mb-3'
                current={current}
                total={postDetailPageVO.count}
                getHref={getUrl}
            />
        </div>
    )
}
