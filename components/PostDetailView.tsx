import {PostDetailVO} from "@/common/model"
import React from "react"
import {PostCategory, PostCreateTime, PostTagList} from "@/components/PostMeta"
import { notFound } from "next/navigation"
import ImageLightbox from "@/components/ImageLightbox"
import PostCover from "@/components/PostCover"
import {estimateReadMinutes} from "@/common/common"

export default async function PostDetailView({ postDetailVO }: { postDetailVO: PostDetailVO | null }) {
    if (!postDetailVO) {
        notFound()
    }
    const coverUrl = postDetailVO.cover?.url
    const coverName = postDetailVO.cover?.name
    const cover = coverUrl && coverName ? { url: coverUrl, name: coverName } : null
    const readMinutes = estimateReadMinutes(postDetailVO.content)

    return (
        <article className='flex-1 w-full max-md:w-full md:w-3xl max-sm:m-1 sm:m-2 md:m-3 rounded-xl bg-base-100 ring-1 ring-base-300 px-3 sm:px-4 py-6 sm:py-8'>
            <header className='pb-5 border-b border-base-300'>
                <h1 className='text-base-content text-2xl sm:text-[28px] font-semibold tracking-tight'>
                    {postDetailVO.title}
                </h1>
                <div className='mt-3 flex items-center flex-wrap gap-x-3 gap-y-1'>
                    <PostCreateTime createTime={postDetailVO?.create_time}/>
                    <PostCategory category={postDetailVO?.category}/>
                    <PostTagList tagList={postDetailVO?.tag_list}/>
                    <span className='ml-auto text-sm text-base-content/60 tabular-nums'>{readMinutes} min read</span>
                </div>
                {cover ? <PostCover url={cover.url} name={cover.name}/> : null}
            </header>
            <div className='pt-6'>
                <ImageLightbox html={postDetailVO.content}/>
            </div>
        </article>
    )
}
