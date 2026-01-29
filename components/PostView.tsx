import {PostDetailPageVO} from "@/common/model"
import PostCard from "@/components/PostCard"
import React from "react"
import {BreadCrumb, Pagination} from "@/components/Common"
import {getPathname} from "@/common/middleware"
import {GetAllBlogPosts} from "@/common/api"
import {CategoriesURL, PathParams, TagsUrl} from "@/common/common"

export default async function PostView({ filter, name, index = '1' }: PathParams) {
    const apiParams: { index: number, category?: string, tag?: string } = { index: parseInt(index) }
    if (filter === CategoriesURL) {
        apiParams.category = name ? decodeURI(name) : undefined
    } else if (filter === TagsUrl) {
        apiParams.tag = name ? decodeURI(name) : undefined
    } else if (filter && name) {
        return <></>
    }

    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(apiParams.index, apiParams.category, apiParams.tag)
    const current = postDetailPageVO.page_index ?? 1

    const getUrl = async (page: number) => {
        const pathname = await getPathname()
        const split = pathname.endsWith('/') ? '' : '/'
        return `${pathname}${split}${page}`
    }

    return (
        <div className='flex flex-col items-center max-sm:px-2 max-md:px-4 max-md:w-full md:mt-2 md:w-3xl'>
            <BreadCrumb filter={filter} name={name}/>
            {
                postDetailPageVO?.data?.map(postDetailVO =>
                    <PostCard key={postDetailVO.id} postDetailVO={postDetailVO}/>
                )
            }
            <Pagination
                className='max-sm:my-3 sm:my-6'
                current={current}
                total={postDetailPageVO.count}
                getHref={getUrl}
            />
        </div>
    )
}
