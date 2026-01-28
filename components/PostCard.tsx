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
                    <div className='badge badge-neutral badge-sm badge-outline rounded bg-white text-gray-600'>{tag.name}</div>
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
                        <div className={'badge badge-sm rounded mx-0.5 text-gray-800' + getTagColorClass()}>{tag.name}</div>
                    </Link>
                ))}
            </span>
        </>
    )
}

export default function PostCard({postDetailVO}: { postDetailVO: PostDetailVO }) {
    const hasCover = postDetailVO.cover?.url != null
    const cardHeight = hasCover ? 'h-45' : 'min-h-45'
    const bodyRightPadding = hasCover ? '' : 'pr-6'
    return (
        <div className={
            `${cardHeight} w-3xl my-2 p-0 shadow-lg 
            border-gray-400 rounded-md bg-[rgba(245,245,245,0.5)]
            hover:drop-shadow-2xl sm:min-h-36 max-md:w-full max-sm:my-1`
        }>
            <div className='flex h-full justify-between gap-2'>
                <div className={
                    `flex flex-col flex-1 justify-between items-start 
                    pl-6 ${bodyRightPadding} pt-6 pb-5 w-full sm:min-h-40`
                }>
                    <Link className='w-full' href={`/detail/${postDetailVO.id}`}>
                        <>
                            <h4 className='text-xl font-semibold mb-1 line-clamp-1 max-sm:hidden'>{postDetailVO.title}</h4>
                            <p className='font-semibold mb-2 line-clamp-1 sm:hidden'>{postDetailVO.title}</p>
                        </>
                        <p className='line-clamp-2 my-2 font-light text-gray-500 max-h-16 min-h-0 sm:text-md max-sm:text-xs max-sm:hidden'>
                            {postDetailVO.preview}
                        </p>
                    </Link>
                    <div className='flex flex-col justify-end items-start mt-2'>
                        <div className='flex justify-start items-baseline gap-x-2.5 w-full flex-wrap'>
                            <span>
                                {/*TODO: How to remove this span?*/}
                                <Clock className="inline mr-1" size={15} color="#757575" strokeWidth={2}/>
                                <span className='text-sm text-gray-600 font-light align-middle mr-0.5 max-sm:text-xs'>
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
                        className='object-cover max-sm:hidden'
                    /> : <></>
                }
            </div>
        </div>
    )
}
