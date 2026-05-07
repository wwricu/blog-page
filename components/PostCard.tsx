import {PostDetailVO} from '@/common/model'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import {PostCategory, PostCreateTime, PostTagList} from "@/components/PostMeta"

export default function PostCard({ postDetailVO, index, className }: { postDetailVO: PostDetailVO, index: number, className?: string }) {
    const hasCover = postDetailVO.cover?.url != null && postDetailVO.cover?.name != null
    return (
        <div className={
            `${className} flex justify-between pl-1 min-w-2xs bg-base-100 rounded-lg
            relative hover:shadow-lg transition hover:-translate-y-px
            max-sm:min-h-16 max-md:w-full md:w-3xl ${hasCover ? 'md:h-36' : 'md:min-h-36'}`
        }>
            <div className={`flex flex-col flex-1 items-start min-w-0 max-sm:p-2 sm:p-4`}>
                <Link className='w-full' href={`/detail/${postDetailVO.id}`}>
                    <h4 className='text-base-content font-medium line-clamp-1 transition-colors hover:text-primary sm:text-lg'>
                        {postDetailVO.title}
                    </h4>
                    <p className={`text-base-content/70 line-clamp-2 font-normal max-h-16 min-h-0 text-sm ${hasCover ? 'mt-2' : 'my-2'} max-sm:text-xs`}>
                        {postDetailVO.preview}
                    </p>
                </Link>
                <Link className='w-full flex-1' href={`/detail/${postDetailVO.id}`} aria-label={postDetailVO.title}/>
                <div className={`flex gap-y-1 gap-x-4 flex-wrap w-full`}>
                    <PostCreateTime createTime={postDetailVO?.create_time}/>
                    <PostCategory category={postDetailVO?.category}/>
                    <PostTagList tagList={postDetailVO?.tag_list}/>
                    <Link className='flex-1' href={`/detail/${postDetailVO.id}`} aria-label={postDetailVO.title}/>
                </div>
            </div>
            {
                hasCover ? (
                    <Link className="relative w-72 h-36 max-md:hidden" href={`/detail/${postDetailVO.id}`}>
                        <Image
                            // TODO: WHY preload & priority not work
                            priority={ index < 3 }
                            loading={ index < 3 ? 'eager' : 'lazy' }
                            fetchPriority={ index < 3 ? 'high' : 'auto' }
                            quality={75}
                            width={288}
                            height={144}
                            alt={postDetailVO.cover!.name!}
                            src={postDetailVO.cover!.url}
                            className='object-cover rounded-r-lg h-full'
                        />
                        <div className='absolute inset-0 bg-black/40 dark:block hidden rounded-r-box'/>
                    </Link>
                ) : null
            }
        </div>
    )
}
