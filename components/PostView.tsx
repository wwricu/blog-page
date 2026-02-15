import {PostDetailPageVO} from "@/common/model"
import PostCard from "@/components/PostCard"
import React from "react"
import {GetAllBlogPosts} from "@/common/api"
import {CategoriesURL, PathParams, TagsUrl} from "@/common/common"
import NotFound from "next/dist/client/components/builtin/not-found"
import Link from "next/link"

type PaginationProps = {
    total: number,
    current: number
    pageSize?: number
    className?: string
    baseUrl: string
}

const Pagination = ({ current = 1, total, pageSize = 10, baseUrl, className }: PaginationProps) => {
    const delta = 1
    const pageCount = Math.ceil(total / pageSize)
    if (total <= 0 || current <= 0 || current > pageCount) {
        return null
    }

    const getButtonValues = () => {
        const pages: (number | string)[] = []
        if (pageCount < 1) {
            return pages
        }

        pages.push(1)

        if (current - 1 > delta + 1) {
            pages.push('...')
        }

        for (let i = 1; i <= delta; i++) {
            if (current - delta + i - 1 > 1) {
                pages.push(current - delta + i - 1)
            }
        }

        if (current > 1 && current < pageCount) {
            pages.push(current)
        }

        for (let i = 1; i <= delta; i++) {
            if (current + i < pageCount) {
                pages.push(current + i)
            }
        }

        if (current + delta < pageCount - 1) {
            pages.push('...')
        }

        if (pageCount > 1) {
            pages.push(pageCount)
        }

        return pages
    }

    const getUrl = (page: string) => {
        if (page === '1') {
            return baseUrl
        }
        // split for unexpected tailing slash
        return `${baseUrl}${baseUrl.endsWith('/') ? '' : '/'}${page}`
    }

    return (
        <div className={`join ${className}`}>
            {
                getButtonValues().map((value, i) => {
                    const status = value === current ? 'btn-active btn-primary text-primary-content' : 'btn-ghost'
                    return (
                        <Link
                            key={i}
                            href={value === '...' ? '' : getUrl(value.toString())}
                            className={`join-item btn btn-outline border-base-300 text-base-content max-md:btn-sm md:btn-md ${status}`}
                        >
                            {value}
                        </Link>
                    )
                })
            }
        </div>
    )
}

const BreadCrumb = async ({ filter, name, className }: PathParams)=> {
    return (
        <div className={`breadcrumbs text-base-content/70 text-sm w-full ${className}`}>
            <ul>
                <li><a className='hover:text-primary' href={'/'}>Home</a></li>
                <li><a className='hover:text-primary' href={`/${filter}`}>{filter}</a></li>
                { name ? <li>{decodeURIComponent(name)}</li> : null }
            </ul>
        </div>
    )
}

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
                <BreadCrumb className='py-0 min-w-2xs max-sm:pl-2 sm:pl-4 max-md:w-full md:w-3xl' filter={filter} name={name}/> : null
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
