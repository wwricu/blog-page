import {PostDetailVO, TagVO} from "@/common/model"
import React from "react"
import {Clock, Hash, Tags} from 'lucide-react'
import {VerticalDivider} from "@/components/Common"

const iconClassNames = 'inline mr-1 stroke-2 w-4 h-4'

const renderTags = (postDetailVO: PostDetailVO) => {
    if (postDetailVO?.tag_list == null || postDetailVO?.tag_list.length === 0) {
        return null
    }
    return (
        <>
            <span><VerticalDivider/></span>
            <span className='flex-wrap'>
                <Tags className={`${iconClassNames} stroke-secondary/70`}/>
                {
                    postDetailVO?.tag_list.map((tag: TagVO) => (
                        <a key={tag.id} href={`/tags/${encodeURIComponent(tag.name)}`} className='ml-1'>
                            <div className={'badge rounded badge-secondary badge-outline hover:bg-secondary hover:text-secondary-content max-sm:badge-xs sm:badge-sm'}>
                                {tag.name}
                            </div>
                        </a>
                    ))
                }
            </span>
        </>
    )
}

const renderCategory = (postDetailVO: PostDetailVO) => {
    if (postDetailVO?.category == null) {
        return null
    }
    return (
        <>
            <span><VerticalDivider/></span>
            <span>
                <Hash className={`${iconClassNames} stroke-primary/70`}/>
                <a className='text-base-content/60' href={`/categories/${encodeURIComponent(postDetailVO?.category.name)}`}>
                    <div className='badge rounded bg-primary/15 text-primary hover:bg-primary hover:text-primary-content max-sm:badge-xs sm:badge-sm'>
                        {postDetailVO?.category?.name}
                    </div>
                </a>
            </span>
        </>
    )
}

export default async function PostDetailView({ postDetailVO }: { postDetailVO: PostDetailVO }) {
    return (
        <div className='flex-1 bg-base-100 shadow-xl max-sm:p-2 max-md:p-4 max-md:w-full md:w-3xl md:p-6'>
            <h1 className='text-base-content text-2xl font-medium font-title'>{postDetailVO.title}</h1>
            <div className='flex items-center max-sm:gap-1 max-sm:my-2 sm:gap-2 sm:my-4 md:my-6 flex-wrap'>
                <span>
                    <Clock className={`${iconClassNames} stroke-base-content/70`}/>
                    <span className='font-medium mr-0.5 text-base-content/70 align-middle max-sm:text-xs sm:text-sm'>{postDetailVO.create_time?.slice(0, 10)}</span>
                </span>
                {renderCategory(postDetailVO)}
                {renderTags(postDetailVO)}
            </div>
            <div className='prose max-w-none! max-md:prose-sm text-base-content leading-relaxed' dangerouslySetInnerHTML={{__html: postDetailVO.content}}/>
        </div>
    )
}
