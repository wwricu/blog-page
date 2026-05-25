import React from "react"
import {SearchBlogPosts} from "@/common/api"
import {PathParams, SearchUrl} from "@/common/common"
import {notFound} from "next/navigation"
import PostList from "@/components/PostList"

export default async function SearchPostView({ keyword, index = '1' }: PathParams) {
    const pageSize = 10
    const pageIndex = Number(index)

    if (!Number.isSafeInteger(pageIndex) || pageIndex <= 0) {
        notFound()
    }

    const decodedKeyword = keyword ? decodeURIComponent(keyword) : ''
    if (!decodedKeyword.trim()) {
        notFound()
    }

    const page = await SearchBlogPosts(decodedKeyword, pageIndex, pageSize)
    const pageCount = Math.ceil(page.count / pageSize)
    if (page.count > 0 && page.page_index > pageCount) {
        notFound()
    }

    const baseUrl = `/${SearchUrl}/${keyword}`
    const breadcrumb = (
        <ul>
            <li><a className='hover:text-primary' href={'/'}>Home</a></li>
            <li>{SearchUrl}</li>
            <li>{decodedKeyword}</li>
        </ul>
    )

    return (
        <PostList
            page={page}
            pageSize={pageSize}
            baseUrl={baseUrl}
            breadcrumb={breadcrumb}
        />
    )
}
