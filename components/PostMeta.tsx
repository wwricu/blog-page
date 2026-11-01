import React from "react"
import Link from "next/link"
import {TagVO} from "@/common/model"

export const PostCreateTime = ({ createTime }: { createTime?: string }) => {
    if (!createTime) {
        return null
    }
    return (
        <span className='text-sm text-base-content/60 tabular-nums'>
            {createTime.slice(0, 10)}
        </span>
    )
}

export const PostCategory = ({ category }: { category?: TagVO }) => {
    if (!category) {
        return null
    }

    return (
        <Link
            href={`/categories/${encodeURIComponent(category.name)}`}
            className='self-center shrink-0 rounded-md bg-primary/10 px-1.5 text-sm font-medium leading-5 text-primary
                transition-colors hover:bg-primary hover:text-primary-content'
        >
            {category.name}
        </Link>
    )
}

export const PostTagList = ({ tagList }: { tagList?: TagVO[] }) => {
    if (!tagList || tagList.length === 0) {
        return null
    }
    return (
        <>
            {
                tagList.map((tag: TagVO) => (
                    <Link
                        key={tag.id}
                        href={`/tags/${encodeURIComponent(tag.name)}`}
                        className='text-sm text-base-content/65 transition-colors hover:text-primary'
                    >
                        #{tag.name}
                    </Link>
                ))
            }
        </>
    )
}
