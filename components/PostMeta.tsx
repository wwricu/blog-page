import React from "react"
import Link from "next/link"
import {iconClassNames} from "@/common/common"
import {TagVO} from "@/common/model"
import {Clock, Hash, Tags} from "lucide-react"
import {VerticalDivider} from "@/components/Common"

export const PostCreateTime = ({ createTime }: { createTime?: string }) => {
    if (!createTime) {
        return null
    }
    return (
        <span>
            <Clock className={`${iconClassNames} mr-1 stroke-base-content/70`}/>
            <span className='text-base-content/70 font-medium align-middle max-sm:text-xs sm:text-sm'>
                {createTime.slice(0, 10)}
            </span>
        </span>
    )
}

export const PostCategory = ({ category }: { category?: TagVO}) => {
    if (!category) {
        return null
    }

    return (
        <>
            <span><VerticalDivider/></span>
            <span>
                <Hash className={`${iconClassNames} mr-1 stroke-primary/70`}/>
                <Link href={`/categories/${encodeURIComponent(category.name)}`}>
                    <div className='badge rounded bg-primary/15 text-primary hover:bg-primary hover:text-primary-content max-sm:badge-xs sm:badge-sm'>
                        {category.name}
                    </div>
                </Link>
            </span>
        </>
    )
}

export const PostTagList = ({ tagList }: { tagList?: TagVO[]}) => {
    if (!tagList || tagList.length === 0) {
        return null
    }
    return (
        <>
            <span><VerticalDivider/></span>
            <span>
                <Tags className={`${iconClassNames} mr-1 stroke-secondary/70`}/>
                {
                    tagList.map((tag: TagVO) => (
                        <Link key={tag.id} href={`/tags/${encodeURIComponent(tag.name)}`}>
                            <div className={`badge rounded mx-0.5 badge-secondary badge-outline hover:bg-secondary hover:text-secondary-content max-sm:badge-xs sm:badge-sm`}>{tag.name}</div>
                        </Link>
                    ))
                }
            </span>
        </>
    )
}
