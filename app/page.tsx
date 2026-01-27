import type { Metadata } from 'next'
import PostList from "@/components/PostList";
import React from "react";
import {GetAllBlogPosts} from "@/common/api";

export const metadata: Metadata = {
    title: 'wwr.icu',
}

export default async function Page() {
    const postDetailPageVO = await GetAllBlogPosts(1)
    return (
        <div className='flex flex-col justify-center grow py-2'>
            <div className='flex flex-col max-md:w-full max-md:mx-2'>
                <PostList postDetailPageVO={postDetailPageVO}/>
            </div>
        </div>
    )
}
