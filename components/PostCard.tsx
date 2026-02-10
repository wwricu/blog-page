import {PostDetailVO} from '@/common/model'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import {PostCategory, PostCreateTime, PostTagList} from "@/components/PostMeta"

export default function PostCard({ postDetailVO, index }: { postDetailVO: PostDetailVO, index: number }) {
    const hasCover = postDetailVO.cover?.url != null && postDetailVO.cover?.name != null
    return (
        <div className={
            `flex justify-between p-0 w-full
            rounded-lg sm:rounded-xl md:rounded-box bg-base-100 shadow-xl
            max-sm:min-h-16 max-md:min-h-20 md:min-h-45 ${hasCover ? 'h-45' : ''}`
        }>
            <div className={`flex flex-col flex-1 items-start min-w-0 max-sm:p-2 sm:p-4`}>
                <Link className='w-full' href={`/detail/${postDetailVO.id}`}>
                    <h4 className='text-base-content font-medium mb-1 line-clamp-1 transition-colors hover:text-primary sm:text-lg md:text-xl'>
                        {postDetailVO.title}
                    </h4>
                </Link>
                <p className={`text-base-content/70 line-clamp-2 font-normal max-h-16 min-h-0 ${hasCover ? 'mt-4' : 'my-4'} max-sm:text-xs max-md:my-2`}>
                    {postDetailVO.preview}
                </p>
                <div className={`flex mt-auto justify-stretch items-baseline gap-y-1 gap-x-4 flex-wrap`}>
                    <PostCreateTime createTime={postDetailVO?.create_time}/>
                    <PostCategory category={postDetailVO?.category}/>
                    <PostTagList tagList={postDetailVO?.tag_list}/>
                </div>
            </div>
            {
                hasCover ? (
                    <Link className="relative w-60 h-45 max-md:hidden" href={`/detail/${postDetailVO.id}`}>
                        <Image
                            // TODO: WHY preload & priority not work
                            priority={ index < 3 }
                            loading={ index < 3 ? 'eager' : 'lazy' }
                            fetchPriority={ index < 3 ? 'high' : 'auto' }
                            quality={75}
                            width={240}
                            height={180}
                            alt={postDetailVO.cover?.name!!}
                            src={postDetailVO.cover?.url!!}
                            className='object-cover rounded-r-box h-full'
                        />
                        <div className='absolute inset-0 bg-black/40 dark:block hidden rounded-r-box'/>
                    </Link>
                ) : null
            }
        </div>
    )
}
