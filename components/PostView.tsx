import {GetAllBlogPosts, GetAllTagsAPI} from "@/common/api"
import {CategoriesURL, TagsUrl} from "@/common/common"
import {notFound} from "next/navigation"
import Link from "next/link"
import PostList from "@/components/PostList"
import {TagTypeEnum} from "@/common/model"

export default async function PostView({ filter, name, index = '1' }: { filter?: string, name?: string, index?: string }) {
    const pageSize = 10
    const pageIndex = Number(index)

    if (!Number.isSafeInteger(pageIndex) || pageIndex <= 0) {
        notFound()
    }

    let decodedName = name
    try {
        decodedName = name ? decodeURIComponent(name) : name
    } catch { decodedName = name }

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
        category ? GetAllTagsAPI(TagTypeEnum.POST_CAT) : Promise.resolve(null),
    ])
    if (category && !categories?.some((item) => item.name === category)) {
        notFound()
    }
    if (decodedName && page.count === 0) {
        notFound()
    }

    const pageCount = Math.ceil(page.count / pageSize)
    if (pageCount > 0 && page.page_index > pageCount) {
        notFound()
    }

    const baseUrl = (filter && decodedName) ? `/${filter}/${encodeURIComponent(decodedName)}` : '/'
    const breadcrumb = ((filter === CategoriesURL || filter === TagsUrl) && decodedName) ? (
        <ul>
            <li><Link className='hover:text-primary' href='/'>Home</Link></li>
            <li><Link className='hover:text-primary' href={`/${filter}`}>{filter}</Link></li>
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
