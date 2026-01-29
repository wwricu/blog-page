import {PostDetailVO, TagVO} from '@/common/model'
import {Clock, Hash, Tags} from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import {getTagColorClass} from "@/common/common"
import {VerticalDivider} from "@/components/Common"

const renderCategory = (tag: TagVO | undefined) => {
    if (!tag) {
        return <></>
    }

    return (
        <>
            <span><VerticalDivider/></span>
            <span className='max-w-[100vw] overflow-hidden'>
                <Hash className='inline mr-1' size={15} color="#757575" strokeWidth={2}/>
                <Link href={`/categories/${tag.name}`}>
                    <div className='badge badge-neutral badge-outline rounded bg-white text-gray-600 max-sm:badge-xs sm:badge-sm'>{tag.name}</div>
                </Link>
            </span>
        </>
    )
}

const renderTags = (tagList: TagVO[]) => {
    if (!tagList || tagList.length === 0) {
        return <></>
    }
    return (
        <>
            <span><VerticalDivider/></span>
            <span className='max-w-[100vw] overflow-hidden'>
                <Tags className='inline mr-1' size={15} color="#757575" strokeWidth={2}/>
                {tagList.map((tag: TagVO) => (
                    <Link key={tag.id} href={`/tags/${tag.name}`}>
                        <div className={`badge rounded mx-0.5 text-gray-800 max-sm: badge-xs sm:badge-sm ${getTagColorClass()}`}>{tag.name}</div>
                    </Link>
                ))}
            </span>
        </>
    )
}

export default function PostCard({postDetailVO}: { postDetailVO: PostDetailVO }) {
    const hasCover = postDetailVO.cover?.url != null
    const cardHeight = hasCover ? 'md:h-45' : 'md:min-h-45'  // cover shown after md
    return (
        <div className={
            `flex flex-1 justify-between gap-2 w-3xl p-0 shadow-lg 
            border-gray-400 rounded-md bg-[rgba(240,240,240,0.5)] hover:drop-shadow-2xl
            max-sm:my-1 max-sm:min-h-16 sm:my-2 max-md:min-h-20 max-md:w-full ${cardHeight}`
        }>
            <div className={
                `flex flex-col flex-1 justify-between items-start w-full
                 max-sm:p-2 sm:p-4 md:px-6 md:py-4`
            }>
                <Link className='flex-1 w-full' href={`/detail/${postDetailVO.id}`}>
                    <h4 className='font-semibold mb-1 line-clamp-1 sm:text-lg md:text-xl'>{postDetailVO.title}</h4>
                    <p className='line-clamp-2 font-light text-gray-500 max-h-16 min-h-0 max-sm:text-xs max-md:my-2 my-4'>
                        {postDetailVO.preview}
                    </p>
                </Link>
                <div className='flex flex-col justify-end items-start'>
                    <div className='flex justify-start items-baseline gap-x-2.5 w-full flex-wrap'>
                        <span>
                            <Clock className="inline mr-1" size={15} color="#757575" strokeWidth={2}/>
                            <span className='text-gray-600 font-light align-middle mr-0.5 max-sm:text-xs sm:text-sm'>
                                {postDetailVO.create_time.slice(0, 10)}
                            </span>
                        </span>
                        {renderCategory(postDetailVO?.category)}
                        {renderTags(postDetailVO.tag_list)}
                    </div>
                </div>
            </div>
            {
                hasCover ? <Image
                    loading='lazy'
                    unoptimized
                    width={300}
                    height={180}
                    src={postDetailVO.cover?.url ?? `https://picsum.photos/250/100?id=${postDetailVO.id}`} alt={postDetailVO.cover?.name ?? 'cover'}
                    className='object-cover max-md:hidden'
                /> : <></>
            }
        </div>
    )
}
