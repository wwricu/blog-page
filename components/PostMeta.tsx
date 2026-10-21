import React from "react"
import Link from "next/link"
import {TagVO} from "@/common/model"

export const PostCreateTime = ({ createTime }: { createTime?: string }) => {
    if (!createTime) {
        return null
    }
    return (
        <span className='text-sm text-base-content/45 tabular-nums'>
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
            className='text-sm font-medium text-primary/85 transition-colors hover:text-primary'
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
                        className='text-sm text-base-content/50 transition-colors hover:text-primary'
                    >
                        #{tag.name}
                    </Link>
                ))
            }
        </>
    )
}
