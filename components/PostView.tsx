import {PostDetailPageVO} from "@/common/model"
import PostCard from "@/components/PostCard"
import React from "react"
import {GetAllBlogPosts} from "@/common/api"
import {CategoriesURL, PathParams, TagsUrl} from "@/common/common"
import NotFound from "next/dist/client/components/builtin/not-found"
import Pagination from "@/components/Pagination"

export default async function PostView({ filter, name, index = '1' }: PathParams) {
    const apiParams: { index: number, category?: string, tag?: string } = { index: Number(index) }
    const pageSize = 10

    if (!Number.isSafeInteger(apiParams.index) || apiParams.index <= 0) {
        return <NotFound/>
    }

    if (filter === CategoriesURL) {
        apiParams.category = name ? decodeURIComponent(name) : undefined
    } else if (filter === TagsUrl) {
        apiParams.tag = name ? decodeURIComponent(name) : undefined
    } else if (filter || name) {
        return <NotFound/>
    }

    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(apiParams.index, pageSize, apiParams.category, apiParams.tag)
    const pageCount = Math.ceil(postDetailPageVO.count / pageSize)
    if (postDetailPageVO.page_index > pageCount) {
        return <NotFound/>
    }

    return (
        <div className={`
            flex flex-col items-center w-full overflow-x-auto
            max-sm:gap-y-1 max-sm:px-1 max-sm:mt-1
            sm:gap-y-2 sm:mt-2 sm:px-2
            md:p-0 md:gap-y-3 md:mt-3`
        }>
            {
                (filter === CategoriesURL || filter === TagsUrl) && name ?
                (
                    <div className={`breadcrumbs py-0 min-w-2xs text-base-content/70 text-sm w-full max-sm:pl-2 sm:pl-4 max-md:w-full md:w-3xl`}>
                        <ul>
                            <li><a className='hover:text-primary' href={'/'}>Home</a></li>
                            <li><a className='hover:text-primary' href={`/${filter}`}>{filter}</a></li>
                            { name ? <li>{decodeURIComponent(name)}</li> : null }
                        </ul>
                    </div>
                ) : null
            }
            {
                postDetailPageVO?.data?.map((postDetailVO, i) =>
                    <PostCard key={postDetailVO.id} index={i} postDetailVO={postDetailVO}/>
                )
            }
            <Pagination
                className='max-sm:mt-1 max-sm:mb-2 sm:mt-2 sm:mb-4 md:mt-3 md:mb-6'
                current={postDetailPageVO.page_index}
                total={postDetailPageVO.count}
                baseUrl={ (filter && name) ? `/${filter}/${name}` : '/' }
            />
        </div>
    )
}
