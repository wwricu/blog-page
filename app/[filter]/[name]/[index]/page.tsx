import {PostDetailPageVO} from "@/common/model"
import {GetAllBlogPosts} from "@/common/api"
import PostList from "@/components/PostList"
import React from "react"
import {AsyncPathParams, CategoriesURL, TagsUrl} from "@/common/common"
import {BreadCrumb} from "@/components/Common";

export default async function PostPage({ params }: AsyncPathParams) {
    const { filter, name, index } = (await params) ?? { index: '1' }

    const apiParams: { index: number, category?: string, tag?: string} = { index: parseInt(index ?? '1') }
    if (filter === CategoriesURL) {
        apiParams.category = name ? decodeURI(name) : undefined
    } else if (filter === TagsUrl) {
        apiParams.tag = name ? decodeURI(name) : undefined
    } else if (filter && name) {
        return <></>
    }

    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(apiParams.index, apiParams.category, apiParams.tag)
    return (
        <div className='flex flex-col items-center max-sm:px-2 max-md:px-4 max-md:w-full md:mt-2 md:w-3xl'>
            <BreadCrumb params={params}/>
            <PostList postDetailPageVO={postDetailPageVO}/>
        </div>
    )
}
