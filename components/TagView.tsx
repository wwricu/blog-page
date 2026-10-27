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
            <h1 className='text-base-content/60 text-xs font-medium uppercase tracking-wider pl-4 pb-3'>{title}</h1>
            {
                tags.length ? (
                    <div className='flex flex-wrap gap-3'>
                        {
                            tags.map((tag: TagVO) => (
                                <Link
                                    key={tag.id}
                                    className='group flex min-w-40 flex-1 basis-40 flex-col gap-1 rounded-xl bg-base-100 px-4 py-5 ring-1 ring-base-300 transition-shadow hover:shadow-sm hover:ring-base-content/25'
                                    href={`/${isCategory ? CategoriesURL : TagsUrl}/${encodeURIComponent(tag.name)}`}
                                >
                                    <span className='min-w-0 text-base-content text-base font-semibold tracking-tight break-words transition-colors group-hover:text-primary'>
                                        {tag.name}
                                    </span>
                                    <span className='text-xs tabular-nums text-base-content/55 transition-colors group-hover:text-primary/70'>
                                        {tag.count} {tag.count === 1 ? 'post' : 'posts'}
                                    </span>
                                </Link>
                            ))
                        }
                    </div>
                ) : (
                    <p className='text-base-content/70 text-sm text-center py-10 rounded-xl bg-base-100 ring-1 ring-base-300'>Nothing here yet.</p>
                )
            }
        </div>
    )
}
