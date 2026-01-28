import React from 'react'
import {PostDetailPageVO} from "@/common/model"
import {GetAllBlogPosts} from "@/common/api"
import PostList from "@/components/PostList"
import {AsyncPathParams} from '@/common/common'

export default async function PostPage({ params }: AsyncPathParams) {
    const { page } = (await params) ?? { page: '1'}
    const pageIndex = parseInt(page!!)
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(pageIndex)

    return (
        <div className='flex justify-center flex-1 py-2'>
            <div className='flex flex-col max-md:w-full max-md:mx-2'>
                <PostList postDetailPageVO={postDetailPageVO}/>
            </div>
        </div>
    )
}
