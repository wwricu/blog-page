import React from "react"
import Link from "next/link"
import {iconClassNames} from "@/common/common"
import {TagVO} from "@/common/model"
import {Clock, Hash, Tags} from "lucide-react"

export const PostCreateTime = ({ createTime }: { createTime?: string }) => {
    if (!createTime) {
        return null
    }
    return (
        <span>
            <Clock className={`${iconClassNames} w-3 h-3 relative top-[0.5px] mr-0.5 stroke-base-content/70`}/>
            <span className='text-base-content/70 font-medium align-middle max-sm:text-xs sm:text-sm'>
                {createTime.slice(0, 10)}
            </span>
        </span>
    )
}

export const PostCategory = ({ category }: { category?: TagVO }) => {
    if (!category) {
        return null
    }

    return (
        <>
            <span>
                <Hash className={`${iconClassNames} mr-0.5 stroke-primary/70`}/>
                <Link href={`/categories/${encodeURIComponent(category.name)}`}>
                    <div className='badge rounded bg-primary/10 text-primary px-2 transition-colors hover:bg-primary hover:text-primary-content max-sm:badge-xs sm:badge-sm'>
                        {category.name}
                    </div>
                </Link>
            </span>
        </>
    )
}

export const PostTagList = ({ tagList }: { tagList?: TagVO[] }) => {
    if (!tagList || tagList.length === 0) {
        return null
    }
    return (
        <>
            <span>
                <Tags className={`${iconClassNames} w-4 h-4 transform scale-x-[-1] relative top-[0.5px] mr-px stroke-secondary/70`}/>
                {
                    tagList.map((tag: TagVO) => (
                        <Link key={tag.id} href={`/tags/${encodeURIComponent(tag.name)}`}>
                            <div className={`badge rounded mx-0.5 transition-colors badge-secondary badge-outline px-2 hover:bg-secondary hover:text-secondary-content max-sm:badge-xs sm:badge-sm`}>{tag.name}</div>
                        </Link>
                    ))
                }
            </span>
        </>
    )
}
