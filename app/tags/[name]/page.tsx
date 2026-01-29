import {PostDetailPageVO} from "@/common/model"
import {GetAllBlogPosts} from "@/common/api"
import PostList from "@/components/PostList"
import React from "react"
import {AsyncPathParams} from "@/common/common"

export default async function TagListPage({ params }: AsyncPathParams) {
    const name  = (await params)?.name
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(1, undefined, name ? decodeURI(name) : undefined)
    return (
        <div className='py-2 max-md:w-full max-md:mx-2'>
            <PostList postDetailPageVO={postDetailPageVO}/>
        </div>
    )
}
