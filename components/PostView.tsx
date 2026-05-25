import React from "react"
import {GetAllBlogPosts} from "@/common/api"
import {CategoriesURL, PathParams, TagsUrl} from "@/common/common"
import {notFound} from "next/navigation"
import PostList from "@/components/PostList"

export default async function PostView({ filter, name, index = '1' }: PathParams) {
    const pageSize = 10
    const pageIndex = Number(index)

    if (!Number.isSafeInteger(pageIndex) || pageIndex <= 0) {
        notFound()
    }

    let category: string | undefined
    let tag: string | undefined
    if (filter === CategoriesURL) {
        category = name ? decodeURIComponent(name) : undefined
    } else if (filter === TagsUrl) {
        tag = name ? decodeURIComponent(name) : undefined
    } else if (filter || name) {
        notFound()
    }

    const page = await GetAllBlogPosts(pageIndex, pageSize, category, tag)
    const pageCount = Math.ceil(page.count / pageSize)
    if (page.page_index > pageCount) {
        notFound()
    }

    const baseUrl = (filter && name) ? `/${filter}/${name}` : '/'
    const breadcrumb = ((filter === CategoriesURL || filter === TagsUrl) && name) ? (
        <ul>
            <li><a className='hover:text-primary' href={'/'}>Home</a></li>
            <li><a className='hover:text-primary' href={`/${filter}`}>{filter}</a></li>
            <li>{decodeURIComponent(name)}</li>
        </ul>
    ) : null

    return (
        <PostList
            page={page}
            pageSize={pageSize}
            baseUrl={baseUrl}
            breadcrumb={breadcrumb}
            mobile={{ category, tag }}
        />
    )
}
