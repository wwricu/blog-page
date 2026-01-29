import {PostDetailPageVO} from "@/common/model"
import {GetAllBlogPosts} from "@/common/api"
import PostList from "@/components/PostList"
import React from "react"
import {AsyncPathParams, CategoriesURL, TagsUrl} from "@/common/common"

export default async function PostPage({ params }: AsyncPathParams) {
    const { filter, name, index } = (await params) ?? { index: '1' }

    const apiParams: { index: number, category?: string, tag?: string} = { index: parseInt(index ?? '1') }
    if (filter === CategoriesURL) {
        apiParams.category = name ? decodeURI(name) : undefined
    } else if (filter === TagsUrl) {
        apiParams.tag = name ? decodeURI(name) : undefined
    }

    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(apiParams.index, apiParams.category, apiParams.tag)
    return <PostList postDetailPageVO={postDetailPageVO}/>
}
