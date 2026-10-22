import {PostDetailVO} from "@/common/model"
import React from "react"
import Image from "next/image"
import {PostCategory, PostCreateTime, PostTagList} from "@/components/PostMeta"
import { notFound } from "next/navigation"
import ImageLightbox from "@/components/ImageLightbox"
import {estimateReadMinutes} from "@/common/common"

export default async function PostDetailView({ postDetailVO }: { postDetailVO: PostDetailVO | null }) {
    if (!postDetailVO) {
        notFound()
    }
    const hasCover = postDetailVO.cover?.url != null && postDetailVO.cover?.name != null
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
                    <span className='text-sm text-base-content/60 tabular-nums'>{readMinutes} min read</span>
                </div>
            </header>
            {
                hasCover ? (
                    <Image
                        priority
                        quality={80}
                        width={1024}
                        height={400}
                        alt={postDetailVO.cover!.name!}
                        src={postDetailVO.cover!.url}
                        className='mt-6 w-full h-52 sm:h-72 object-cover rounded-xl ring-1 ring-base-300'
                    />
                ) : null
            }
            <div className='pt-6'>
                <ImageLightbox html={postDetailVO.content}/>
            </div>
        </article>
    )
}
