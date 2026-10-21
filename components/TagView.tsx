import {TagTypeEnum, TagVO} from "@/common/model"
import Link from "next/link"
import React from "react"
import {GetAllTagsAPI} from "@/common/api"
import {CategoriesURL, TagsUrl} from "@/common/common"

export default async function TagView({ tagType }: {  tagType: TagTypeEnum }) {
    const isCategory = tagType === TagTypeEnum.POST_CAT
    const title = isCategory ? 'Categories' : 'Tags'
    const tags: TagVO[] = await GetAllTagsAPI(tagType)

    return (
        <div className='w-full max-md:w-full md:w-3xl max-sm:px-1 sm:px-2 md:px-0 mt-1 sm:mt-2 md:mt-3 mb-4 md:mb-6'>
            <div className='bg-base-100 rounded-lg shadow-sm overflow-hidden'>
                <div className='flex items-baseline justify-between gap-3 px-4 sm:px-5 py-4 border-b border-base-200'>
                    <h1 className='text-base-content text-lg font-medium'>{title}</h1>
                    <span className='text-base-content/40 text-xs tabular-nums'>{tags.length}</span>
                </div>
                {
                    tags.length ? (
                        <ul className='divide-y divide-base-200'>
                            {
                                tags.map((tag: TagVO) => (
                                    <li key={tag.id}>
                                        <Link
                                            className='group flex items-center justify-between gap-3 px-4 sm:px-5 py-3 transition-colors hover:bg-base-200/60'
                                            href={`/${isCategory ? CategoriesURL : TagsUrl}/${encodeURIComponent(tag.name)}`}
                                        >
                                            <span className='text-base-content/80 text-sm truncate transition-colors group-hover:text-primary'>
                                                {tag.name}
                                            </span>
                                            <span className='shrink-0 text-base-content/40 text-xs tabular-nums transition-colors group-hover:text-primary/70'>
                                                {tag.count}
                                            </span>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (
                        <p className='text-base-content/50 text-sm text-center py-10'>Nothing here yet.</p>
                    )
                }
            </div>
        </div>
    )
}
