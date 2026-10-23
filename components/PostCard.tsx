import {PostPreviewVO} from '@/common/model'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import {PostCategory, PostCreateTime, PostTagList} from "@/components/PostMeta"

export default function PostCard({ postDetailVO, index, className }: { postDetailVO: PostPreviewVO, index: number, className?: string }) {
    const hasCover = postDetailVO.cover?.url != null && postDetailVO.cover?.name != null
    const detailHref = `/detail/${postDetailVO.id}`

    return (
        <div className={
            `${className} group flex items-center justify-between gap-4 min-w-2xs w-full rounded-xl
            bg-base-100 ring-1 ring-base-300 px-4 py-5 transition-shadow hover:shadow-sm hover:ring-base-content/25
            max-sm:min-h-16 max-sm:px-3 max-md:w-full md:h-28 md:py-0 md:w-3xl`
        }>
            {/* One line each for title, preview and meta inside a fixed-height row: the text block
                is then identical in every card, with or without a thumbnail */}
            <div className='flex flex-col flex-1 items-start min-w-0'>
                <Link className='w-full' href={detailHref}>
                    <h4 className='text-base-content text-[17px] font-semibold tracking-tight leading-6 line-clamp-1 transition-colors group-hover:text-primary'>
                        {postDetailVO.title}
                    </h4>
                    <p className='text-base-content/70 font-normal leading-6 text-sm line-clamp-1 max-sm:text-xs'>
                        {postDetailVO.preview}
                    </p>
                </Link>
                <div className='flex gap-x-3 gap-y-1 w-full flex-nowrap overflow-hidden'>
                    <PostCreateTime createTime={postDetailVO?.create_time}/>
                    <PostCategory category={postDetailVO?.category}/>
                    <PostTagList tagList={postDetailVO?.tag_list}/>
                    <Link className='flex-1' href={detailHref} aria-label={postDetailVO.title}/>
                </div>
            </div>
            {
                hasCover ? (
                    <Link className="relative w-52 h-24 shrink-0 max-md:hidden" href={detailHref}>
                        <Image
                            // TODO: WHY preload & priority not work
                            priority={ index < 3 }
                            loading={ index < 3 ? 'eager' : 'lazy' }
                            fetchPriority={ index < 3 ? 'high' : 'auto' }
                            quality={75}
                            width={208}
                            height={96}
                            alt={postDetailVO.cover!.name!}
                            src={postDetailVO.cover!.url}
                            className='object-cover w-full h-full rounded-lg ring-1 ring-base-300'
                        />
                        <div className='absolute inset-0 bg-black/40 dark:block hidden rounded-lg'/>
                    </Link>
                ) : null
            }
        </div>
    )
}
