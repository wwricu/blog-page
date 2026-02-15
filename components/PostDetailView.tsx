import {PostDetailVO} from "@/common/model"
import React from "react"
import {PostCategory, PostCreateTime, PostTagList} from "@/components/PostMeta"
import NotFound from "next/dist/client/components/builtin/not-found"

export default async function PostDetailView({ postDetailVO }: { postDetailVO: PostDetailVO | null }) {
    if (!postDetailVO) {
        return <NotFound/>
    }

    return (
        <div className='flex-1 bg-base-100 shadow-xl max-sm:p-2 max-md:p-4 max-md:w-full md:w-3xl md:p-6'>
            <h1 className='text-base-content text-2xl font-medium font-title'>{postDetailVO.title}</h1>
            <div className='flex items-center max-sm:gap-1 max-sm:my-2 sm:gap-2 sm:my-4 md:my-6 flex-wrap'>
                <PostCreateTime createTime={postDetailVO?.create_time}/>
                <PostCategory category={postDetailVO?.category}/>
                <PostTagList tagList={postDetailVO?.tag_list}/>
            </div>
            <div className='prose max-w-none! max-md:prose-sm text-base-content leading-relaxed' dangerouslySetInnerHTML={{__html: postDetailVO.content}}/>
        </div>
    )
}
