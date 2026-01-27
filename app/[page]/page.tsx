import React from 'react'
import {PostDetailPageVO} from "@/common/model"
import {GetAllBlogPosts} from "@/common/api"
import PostList from "@/components/PostList";


export default async function Home({ params }: { params: Promise<{ page: string }> }) {
    const { page } = await params;
    const pageIndex = parseInt(page ?? '1')
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(pageIndex)
    return (
        <div className='flex justify-center grow py-2'>
            <div className='flex flex-col max-md:w-full max-md:mx-2'>
                <PostList postDetailPageVO={postDetailPageVO}/>
            </div>
        </div>
    )
}
