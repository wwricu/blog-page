import {PostDetailVO, TagVO} from "@/common/model"
import {GetPostDetailAPI} from "@/common/api"
import React from "react"
import {Clock, Hash, Tags} from 'lucide-react'
import {AsyncPathParams, getTagColorClass} from "@/common/common"
import {VerticalDivider} from "@/components/Common";

const renderTags = (postDetailVO: PostDetailVO) => {
    if (postDetailVO?.tag_list == null || postDetailVO?.tag_list.length === 0) {
        return <></>
    }
    return (
        <>
            <span><VerticalDivider/></span>
            <span className='flex-wrap'>
                <Tags className='inline text-gray-600 mr-1' size={16} color="#757575" strokeWidth={2}/>
                {postDetailVO?.tag_list.map((tag: TagVO) => (
                    <a key={tag.id} href={`/tags/${tag.name}`} className='ml-1'>
                        <div className={'badge badge-sm rounded' + getTagColorClass()}>
                            {tag.name}
                        </div>
                    </a>
                ))}
            </span>
        </>
    )
}

const renderCategory = (postDetailVO: PostDetailVO) => {
    if (postDetailVO?.category == null) {
        return <></>
    }
    return (
        <>
            <span><VerticalDivider/></span>
            <span>
                <Hash className='inline mr-1' size={16} color="#757575" strokeWidth={2}/>
                <a className='text-gray-600' href={`/categories/${postDetailVO?.category.name}`}>
                    <div className='badge badge-neutral badge-sm badge-outline rounded bg-white text-gray-400'>
                        {postDetailVO?.category?.name}
                    </div>
                </a>
            </span>
        </>
    )
}

export default async function PostDetailPage({ params }: AsyncPathParams) {
    const { id } = await params
    const postDetailVO = await GetPostDetailAPI(id!!)
    return (
        <div className='flex justify-center min-h-lvh w-full '>
            <div className='w-3xl bg-[rgba(240,240,240,0.5)] shadow-xs border-x border-gray-200 p-4 pb-6'>
                <h1 className='text-2xl font-semibold'>{postDetailVO.title}</h1>
                <div className='flex items-center gap-2.5 mt-6 mb-8 flex-wrap'>
                    <span>
                        <Clock className='inline mr-1' size={16} color="#757575" strokeWidth={2}/>
                        <span className='mr-0.5 text-gray-600 align-middle'>{postDetailVO.create_time?.slice(0, 10)}</span>
                    </span>
                    {renderCategory(postDetailVO)}
                    {renderTags(postDetailVO)}
                </div>
                <div className='prose prose-sm max-w-full' dangerouslySetInnerHTML={{__html: postDetailVO.content}}/>
            </div>
        </div>
    )
}
