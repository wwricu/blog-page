import {PostDetailVO, TagVO} from '@/common/model'
import {Clock, Hash, Tags} from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import {VerticalDivider} from "@/components/Common"

const renderCategory = (tag: TagVO | undefined) => {
    if (!tag) {
        return null
    }

    return (
        <>
            <span><VerticalDivider/></span>
            <span className='max-w-screen overflow-hidden'>
                <Hash className='inline mr-0.75' size={15} color="#757575" strokeWidth={2}/>
                <Link href={`/categories/${encodeURIComponent(tag.name)}`}>
                    <div className='badge badge-neutral badge-outline rounded bg-base-100 text-base-content/70 hover:bg-secondary hover:text-secondary-content max-sm:badge-xs sm:badge-sm'>{tag.name}</div>
                </Link>
            </span>
        </>
    )
}

const renderTags = (tagList: TagVO[]) => {
    if (!tagList || tagList.length === 0) {
        return null
    }
    return (
        <>
            <span><VerticalDivider/></span>
            <span className='max-w-screen overflow-hidden'>
                <Tags className='inline mr-0.5' size={15} color="#757575" strokeWidth={2}/>
                {
                    tagList.map((tag: TagVO) => (
                        <Link key={tag.id} href={`/tags/${encodeURIComponent(tag.name)}`}>
                            <div className={`badge rounded mx-0.5 bg-base-300 text-base-content/70 hover:bg-secondary hover:text-secondary-content max-sm:badge-xs sm:badge-sm`}>{tag.name}</div>
                        </Link>
                    ))
                }
            </span>
        </>
    )
}

export default function PostCard({postDetailVO}: { postDetailVO: PostDetailVO }) {
    return (
        <div className={
            `flex justify-between gap-2 p-0 w-full
            rounded-lg sm:rounded-xl md:rounded-box bg-base-100 shadow-xl
            max-sm:min-h-16 max-md:min-h-20 md:min-h-45`
        }>
            <div className={`flex flex-col flex-1 justify-between items-start w-full max-sm:p-2 sm:p-4`}>
                <Link className='flex-1 w-full' href={`/detail/${postDetailVO.id}`}>
                    <h4 className='hover:text-primary text-base-content font-medium mb-1 line-clamp-1 sm:text-lg md:text-xl'>{postDetailVO.title}</h4>
                    <p className='text-base-content/70 line-clamp-2 font-normal max-h-16 min-h-0 max-sm:text-xs max-md:my-2 my-4'>
                        {postDetailVO.preview}
                    </p>
                </Link>
                <div className='flex flex-col justify-end items-start'>
                    <div className='flex justify-start items-baseline gap-x-2 w-full flex-wrap'>
                        <span>
                            <Clock className="inline mr-0.75" size={15} color="#757575" strokeWidth={2}/>
                            <span className='text-base-content/50 font-medium align-middle max-sm:text-xs sm:text-sm'>
                                {postDetailVO.create_time.slice(0, 10)}
                            </span>
                        </span>
                        {renderCategory(postDetailVO?.category)}
                        {renderTags(postDetailVO.tag_list)}
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
