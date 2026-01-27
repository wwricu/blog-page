import {PostDetailVO, TagVO} from "@/common/model";
import {GetPostDetailAPI} from "@/common/api";
import React from "react";
import {Clock, Hash, Tags} from 'lucide-react'
import {getTagColorClass} from "@/common/common";

const renderTags = (postDetailVO: PostDetailVO) => {
    if (postDetailVO?.tag_list == null || postDetailVO?.tag_list.length === 0) {
        return <></>
    }
    return (
        <div className='flex justify-start flex-wrap'>
            <Tags className='inline text-gray-500 mr-1' size={16} color="#757575" strokeWidth={2}/>
            {postDetailVO?.tag_list.map((tag: TagVO) => (
                <a key={tag.id} href={`/tags/${tag.name}`} className='ml-1'>
                    <div className={'badge badge-sm rounded' + getTagColorClass()}>
                        {tag.name}
                    </div>
                </a>
            ))}
        </div>
    )
}

const renderCategory = (postDetailVO: PostDetailVO) => {
    if (postDetailVO?.category == null) {
        return <></>
    }
    return (
        <div className='text-gray-500'>
            <Hash className='inline mr-2' size={16} color="#757575" strokeWidth={2}/>
            <a href={`/categories/${postDetailVO?.category.name}`}>
                <div className='badge badge-neutral badge-sm badge-outline rounded bg-white text-gray-400'>
                    {postDetailVO?.category?.name}
                </div>
            </a>
            <div className='divider-horizontal'/>
        </div>
    )
}

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const postDetailVO = await GetPostDetailAPI(id)
    return (
        <div className='flex justify-center min-h-lvh w-full '>
            <div className='w-3xl bg-[rgba(240,240,240,0.5)] shadow-sm border-x border-gray-200 p-4'>
                <h1 className='text-2xl font-semibold'>{postDetailVO.title}</h1>
                <div className='flex items-center gap-2 mt-6 mb-8 flex-wrap'>
                    <p className='text-gray-500'>
                        <Clock className='inline mr-1' size={16} color="#757575" strokeWidth={2}/>
                        {postDetailVO.create_time?.slice(0, 10)}
                    </p>
                    <div className='divider-horizontal'/>
                    {renderCategory(postDetailVO)}
                    {renderTags(postDetailVO)}
                </div>
                <div className='prose prose-sm max-w-full' dangerouslySetInnerHTML={{__html: postDetailVO.content}}/>
            </div>
        </div>
    )
}
