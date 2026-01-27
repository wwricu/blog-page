import {PostDetailPageVO} from "@/common/model";
import {GetAllBlogPosts} from "@/common/api";
import PostList from "@/components/PostList";
import React from "react";
import {AsyncPathParams} from "@/common/common";

export default async function Categories({ params }: AsyncPathParams) {
    const { name, page } = await params
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(parseInt(page ?? '1'), name)
    return (
        <div className='flex justify-center grow py-2'>
            <div className='flex flex-col max-md:w-full max-md:mx-2'>
                <PostList postDetailPageVO={postDetailPageVO}/>
            </div>
        </div>
    )
}
