import {PostPreviewVO} from '@/common/model'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import {PostCategory, PostCreateTime, PostTagList} from "@/components/PostMeta"

export default function PostCard({ postDetailVO, index, className }: { postDetailVO: PostPreviewVO, index: number, className?: string }) {
    const hasCover = postDetailVO.cover?.url != null && postDetailVO.cover?.name != null
    return (
        <div className={
            `${className} group flex items-center justify-between gap-4 min-w-2xs w-full border-b border-base-300
            bg-base-100 px-4 py-5 transition-colors hover:bg-base-200/60
            max-sm:min-h-16 max-sm:px-3 max-md:w-full md:w-3xl`
        }>
            <div className='flex flex-col flex-1 items-start min-w-0'>
                <Link className='w-full' href={`/detail/${postDetailVO.id}`}>
                    <h4 className='text-base-content text-[17px] font-semibold tracking-tight line-clamp-1 transition-colors group-hover:text-primary'>
                        {postDetailVO.title}
                    </h4>
                    <p className='text-base-content/70 line-clamp-2 font-normal text-sm leading-6 mt-1.5 max-sm:text-xs'>
                        {postDetailVO.preview}
                    </p>
                </Link>
                <div className='mt-1.5 flex gap-y-1 gap-x-3 flex-wrap w-full'>
                    <PostCreateTime createTime={postDetailVO?.create_time}/>
                    <PostCategory category={postDetailVO?.category}/>
                    <PostTagList tagList={postDetailVO?.tag_list}/>
                    <Link className='flex-1' href={`/detail/${postDetailVO.id}`} aria-label={postDetailVO.title}/>
                </div>
            </div>
            {
                hasCover ? (
                    <Link className="relative w-52 h-28 shrink-0 max-md:hidden" href={`/detail/${postDetailVO.id}`}>
                        <Image
                            // TODO: WHY preload & priority not work
                            priority={ index < 3 }
                            loading={ index < 3 ? 'eager' : 'lazy' }
                            fetchPriority={ index < 3 ? 'high' : 'auto' }
                            quality={75}
                            width={208}
                            height={112}
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
