import {PostDetailVO} from '@/common/model'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import {PostCategory, PostCreateTime, PostTagList} from "@/components/PostMeta"

export default function PostCard({postDetailVO}: { postDetailVO: PostDetailVO }) {
    return (
        <div className={
            `flex justify-between gap-2 p-0 w-full
            rounded-lg sm:rounded-xl md:rounded-box bg-base-100 shadow-xl
            max-sm:min-h-16 max-md:min-h-20 md:min-h-45`
        }>
            <div className={`flex flex-col flex-1 justify-between items-start w-full max-sm:p-2 sm:p-4`}>
                <Link className='flex-1 w-full' href={`/detail/${postDetailVO.id}`}>
                    <h4 className='transition-all hover:text-primary text-base-content font-medium mb-1 line-clamp-1 sm:text-lg md:text-xl'>{postDetailVO.title}</h4>
                    <p className='text-base-content/70 line-clamp-2 font-normal max-h-16 min-h-0 max-sm:text-xs max-md:my-2 my-4'>
                        {postDetailVO.preview}
                    </p>
                </Link>
                <div className='flex flex-col justify-end items-start'>
                    <div className='flex justify-start items-baseline gap-x-2 w-full flex-wrap'>
                        <PostCreateTime createTime={postDetailVO?.create_time}/>
                        <PostCategory category={postDetailVO?.category}/>
                        <PostTagList tagList={postDetailVO?.tag_list}/>
                    </div>
                </div>
            </div>
            {
                postDetailVO.cover?.url != null && postDetailVO.cover?.name != null ? (
                    <div className="relative max-md:hidden">
                        <Image
                            loading='lazy'
                            width={300}
                            height={180}
                            alt={postDetailVO.cover?.name!!}
                            src={postDetailVO.cover?.url!!}
                            className='object-cover rounded-r-box h-full'
                        />
                        <div className='absolute inset-0 bg-black/40 dark:block hidden rounded-r-box'/>
                    </div>
                ) : null
            }
        </div>
    )
}
