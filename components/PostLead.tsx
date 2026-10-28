import {PostPreviewVO} from '@/common/model'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import {PostCategory, PostCreateTime, PostTagList} from "@/components/PostMeta"

export default function PostLead({ postDetailVO }: { postDetailVO: PostPreviewVO }) {
    const hasCover = postDetailVO.cover?.url != null && postDetailVO.cover?.name != null
    const detailHref = `/detail/${postDetailVO.id}`

    return (
        <div className={
            `group flex flex-col min-w-2xs w-full overflow-hidden rounded-xl mb-1
            bg-base-100 ring-1 ring-base-300 transition-shadow hover:shadow-sm hover:ring-base-content/25
            max-md:w-full md:w-3xl`
        }>
            {
                hasCover ? (
                    <Link href={detailHref} aria-label={postDetailVO.title} className='relative block w-full aspect-[5/2]'>
                        <Image
                            priority
                            quality={80}
                            width={1024}
                            height={400}
                            alt={postDetailVO.cover!.name!}
                            src={postDetailVO.cover!.url}
                            className='object-cover w-full h-full'
                        />
                    </Link>
                ) : null
            }
            <div className='flex flex-col flex-1 px-4 py-5 sm:px-5 sm:py-6'>
                <Link className='w-full' href={detailHref}>
                    <h2 className='text-base-content text-[19px] font-semibold tracking-tight leading-7 line-clamp-2 sm:text-[21px] transition-colors group-hover:text-primary'>
                        {postDetailVO.title}
                    </h2>
                    <p className='mt-1 text-base-content/70 font-normal leading-6 text-sm line-clamp-2'>
                        {postDetailVO.preview}
                    </p>
                </Link>
                <div className='mt-2 flex gap-x-3 gap-y-1 w-full flex-nowrap overflow-hidden'>
                    <PostCreateTime createTime={postDetailVO?.create_time}/>
                    <PostCategory category={postDetailVO?.category}/>
                    <PostTagList tagList={postDetailVO?.tag_list}/>
                </div>
            </div>
        </div>
    )
}
