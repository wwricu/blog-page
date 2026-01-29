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
                <Tags className='inline text-base-content/50 mr-1' size={16} color="#757575" strokeWidth={2}/>
                {postDetailVO?.tag_list.map((tag: TagVO) => (
                    <a key={tag.id} href={`/tags/${tag.name}`} className='ml-1'>
                        <div className={'badge rounded text-base-content/60 max-sm:badge-xs sm:badge-sm' + getTagColorClass()}>
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
                <a className='text-base-content/60' href={`/categories/${postDetailVO?.category.name}`}>
                    <div className='badge badge-neutral badge-outline rounded bg-base-100 text-base-content/50 max-sm:badge-xs sm:badge-sm'>
                        {postDetailVO?.category?.name}
                    </div>
                </a>
            </span>
        </>
    )
}

export default async function PostDetailPage({ params }: AsyncPathParams) {
    const id = (await params)!!.id
    const postDetailVO = await GetPostDetailAPI(id!!)
    return (
        <div className='flex-1 bg-base-100 shadow-xl max-sm:p-2 max-md:py-4 max-md:px-4 max-md:w-full md:w-3xl md:py-6 md:px-8 '>
            <h1 className='text-base-content text-2xl font-bold'>{postDetailVO.title}</h1>
            <div className='flex items-center gap-2.5 mt-6 mb-8 flex-wrap'>
                <span>
                    <Clock className='inline mr-1' size={16} color="#757575" strokeWidth={2}/>
                    <span className='font-medium mr-0.5 text-base-content/50 align-middle max-sm:text-xs sm:text-sm'>{postDetailVO.create_time?.slice(0, 10)}</span>
                </span>
                {renderCategory(postDetailVO)}
                {renderTags(postDetailVO)}
            </div>
            <div className='prose max-w-none! max-md:prose-sm text-base-content leading-relaxed' dangerouslySetInnerHTML={{__html: postDetailVO.content}}/>
        </div>
    )
}
