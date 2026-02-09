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
        apiParams.category = name ? decodeURIComponent(name) : undefined
    } else if (filter === TagsUrl) {
        apiParams.tag = name ? decodeURIComponent(name) : undefined
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
        <div className={`
            flex flex-col items-center
            max-sm:gap-1 max-sm:px-1 max-sm:mt-1
            sm:gap-2 sm:mt-4 sm:px-4 sm:w-full
            md:gap-2 md:mt-2 md:w-3xl`
        }>
            <BreadCrumb filter={filter} name={name}/>
            {
                postDetailPageVO?.data?.map(postDetailVO =>
                    <PostCard key={postDetailVO.id} postDetailVO={postDetailVO}/>
                )
            }
            <Pagination
                className='max-sm:mt-2.5 max-sm:mb-3 sm:mt-5 sm:mb-6'
                current={current}
                total={postDetailPageVO.count}
                getHref={getUrl}
            />
        </div>
    )
}
