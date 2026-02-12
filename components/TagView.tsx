import {TagTypeEnum, TagVO} from "@/common/model"
import Link from "next/link"
import React from "react";
import {GetAllTagsAPI} from "@/common/api"
import {CategoriesURL, TagsUrl} from "@/common/common"

export default async function TagView({ tagType }: {  tagType: TagTypeEnum }) {
    const tags: TagVO[] = await GetAllTagsAPI(tagType)
    return (
        <div className='flex flex-col flex-1 overflow-x-auto w-full gap-6 bg-base-100 shadow-sm max-sm:p-4 sm:p-6 max-md:w-full md:w-3xl'>
        {
            tags.map((tag: TagVO) => (
                <div key={tag.id} className='flex justify-between items-baseline min-w-2xs'>
                    <Link
                        className='link text-base-content/80 transition-colors hover:text-primary'
                        href={`/${tagType === TagTypeEnum.POST_CAT ? CategoriesURL : TagsUrl}/${tag.name}`}
                    >
                        {tag.name}
                    </Link>
                    <p className='text-base-content/40'>{tag.count}</p>
                </div>
            ))
        }
        </div>
    )
}
