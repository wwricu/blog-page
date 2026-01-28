import {PostDetailVO, TagVO} from '@/common/model'
import {Clock, Hash, Tags} from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import {getTagColorClass} from "@/common/common"

const renderCategory = (tag: TagVO | undefined) => {
    if (!tag) {
        return <></>
    }

    return (
        <span className='max-w-[100vw] overflow-hidden'>
            <span className='text-gray-500'>
                <Hash className='inline mr-1' size={16} color="#757575" strokeWidth={2}/>
                <Link href={`/categories/${tag.name}`}>
                    <div className='badge badge-neutral badge-sm badge-outline rounded bg-white text-gray-400'>{tag.name}</div>
                </Link>
            </span>
            <div className='divider-horizontal ml-2 mr-0'/>
        </span>
    )
}

const renderTags = (tagList: TagVO[]) => {
    if (!tagList || tagList.length === 0) {
        return <></>
    }
    return (
        <span className='max-w-[100vw] overflow-hidden'>
            <span className='text-gray-500'>
                <Tags className='inline mr-1' size={16} color="#757575" strokeWidth={2}/>
                {tagList.map((tag: TagVO) => (
                    <Link key={tag.id} href={`/tags/${tag.name}`}>
                        <div className={'badge badge-sm rounded mx-0.5' + getTagColorClass()}>{tag.name}</div>
                    </Link>
                ))}
            </span>
        </span>
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
                                <h4 className='text-xl font-semibold mb-3 max-sm:hidden overflow-hidden'>{postDetailVO.title}</h4>
                                <p className='sm:hidden mb-5 overflow-hidden'>{postDetailVO.title}</p>
                            </>
                            <p className='mt-2 text-text-second overflow-hidden sm:h-16 sm:text-sm max-sm:text-xs max-sm:hidden '>{postDetailVO.preview}</p>
                        </div>
                    </Link>
                    <div className='flex flex-col justify-end items-start'>
                        <div className='flex justify-start items-center gap-2 w-full flex-wrap'>
                            <span>
                                <span className='text-gray-500 max-sm:text-xs'>
                                    <Clock className="inline" size={16} color="#757575" strokeWidth={2}/> {postDetailVO.create_time.slice(0, 10)}
                                </span>
                                <div className='divider-horizontal ml-2 mr-0'/>
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
