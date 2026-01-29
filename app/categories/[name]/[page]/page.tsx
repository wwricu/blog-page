import {PostDetailPageVO} from "@/common/model"
import {GetAllBlogPosts} from "@/common/api"
import PostList from "@/components/PostList"
import React from "react"
import {AsyncPathParams} from "@/common/common"

export default async function Categories({ params }: AsyncPathParams) {
    const { name, page } = (await params) ?? { page: '1' }
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(parseInt(page ?? '1'), name ? decodeURI(name) : undefined)
    return <PostList postDetailPageVO={postDetailPageVO}/>
}
