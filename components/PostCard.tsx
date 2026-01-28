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
    return (
        <div className='my-2 p-0 shadow-lg border-gray-400 rounded-md hover:drop-shadow-2xl bg-[rgba(245,245,245,0.5)] sm:min-h-36 w-3xl max-md:w-full max-sm:my-1'>
            <div className='flex justify-between gap-2'>
                <div className='flex flex-col justify-between items-start px-4 pt-4 pb-3 w-full sm:min-h-40'>
                    <Link className='w-full' href={`/detail/${postDetailVO.id}`}>
                        <div className='flex flex-col justify-start items-start w-full'>
                            <>
                                <h4 className='text-xl font-semibold mb-1 overflow-hidden max-sm:hidden'>{postDetailVO.title}</h4>
                                <p className='font-semibold mb-2 overflow-hidden sm:hidden'>{postDetailVO.title}</p>
                            </>
                            <p className='my-2 overflow-hidden font-light text-gray-600 max-h-16 md:min-h-10 sm:text-sm max-sm:text-xs max-sm:hidden'>{postDetailVO.preview}</p>
                        </div>
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
                <Image
                    loading='lazy'
                    unoptimized
                    width={250}
                    height={100}
                    src={postDetailVO.cover?.url ?? `https://picsum.photos/250/100?id=${postDetailVO.id}`} alt={postDetailVO.cover?.name ?? 'cover'}
                    className='max-sm:hidden'
                />
            </div>
        </div>
    )
}
