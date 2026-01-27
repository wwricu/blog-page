import {PostDetailPageVO} from "@/common/model";
import {GetAllBlogPosts} from "@/common/api";
import PostList from "@/components/PostList";
import React from "react";

export default async function Home({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(1, undefined, name)
    return (
        <div className='flex justify-center grow py-2'>
            <div className='flex flex-col max-md:w-full max-md:mx-2'>
                <PostList postDetailPageVO={postDetailPageVO}/>
            </div>
        </div>
    )
}
