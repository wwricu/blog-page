import React from "react"
import {GetAllBlogPosts, GetAllTagsAPI} from "@/common/api"
import {CategoriesURL, PathParams, TagsUrl} from "@/common/common"
import {notFound} from "next/navigation"
import PostList from "@/components/PostList"
import {TagTypeEnum} from "@/common/model"

export default async function PostView({ filter, name, index = '1' }: PathParams) {
    const pageSize = 10
    const pageIndex = Number(index)

    if (!Number.isSafeInteger(pageIndex) || pageIndex <= 0) {
        notFound()
    }

    // Dynamic route params arrive still percent-encoded, so the name has to be decoded before it
    // reaches the API, the breadcrumb or the pager; a malformed escape is left for the 404s below
    let decodedName = name
    if (name) {
        try {
            decodedName = decodeURIComponent(name)
        } catch {
            decodedName = name
        }
    }

    let category: string | undefined
    let tag: string | undefined
    if (filter === CategoriesURL) {
        category = decodedName
    } else if (filter === TagsUrl) {
        tag = decodedName
    } else if (filter || name) {
        notFound()
    }

    const [page, categories] = await Promise.all([
        GetAllBlogPosts(pageIndex, pageSize, category, tag),
        // The backend answers an unknown category with the whole list instead of an empty page,
        // so the name has to be checked against the categories the site actually exposes
        category ? GetAllTagsAPI(TagTypeEnum.POST_CAT) : Promise.resolve(null),
    ])
    if (category && !categories?.some((item) => item.name === category)) {
        notFound()
    }
    // Unknown or empty tags and empty categories have nothing to show; an empty list frame reads
    // like a broken page, so they go to the same 404 as a missing detail
    if (decodedName && (page.count ?? 0) === 0) {
        notFound()
    }

    const pageCount = Math.ceil((page.count ?? 0) / pageSize)
    if (pageCount > 0 && page.page_index > pageCount) {
        notFound()
    }

    const baseUrl = (filter && decodedName) ? `/${filter}/${encodeURIComponent(decodedName)}` : '/'
    const breadcrumb = ((filter === CategoriesURL || filter === TagsUrl) && decodedName) ? (
        <ul>
            <li><a className='hover:text-primary' href={'/'}>Home</a></li>
            <li><a className='hover:text-primary' href={`/${filter}`}>{filter}</a></li>
            <li>{decodedName}</li>
        </ul>
    ) : null

    return (
        <PostList
            page={page}
            pageSize={pageSize}
            baseUrl={baseUrl}
            breadcrumb={breadcrumb}
            mobile={{ category, tag, pageIndex }}
        />
    )
}
