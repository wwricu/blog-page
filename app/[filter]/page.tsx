import {TagTypeEnum, TagVO} from "@/common/model"
import {GetAllTagsAPI} from "@/common/api"
import TagView from "@/components/TagView"
import {AsyncPathParams, CategoriesURL, TagsUrl} from "@/common/common"
import React from "react"
import PostView from "@/components/PostView"
import {Metadata} from "next";
import {permanentRedirect} from "next/navigation"

export async function generateMetadata({ params }: AsyncPathParams): Promise<Metadata> {
    const filter = (await params).filter

    const metadata: Metadata = {
        title: `${filter} | wwr.icu`,
        description: `Explore all posts organized by ${filter}`
    }

    if (filter !== CategoriesURL && filter !== TagsUrl) {
        metadata.title = `Page ${filter} | wwr.icu`
        metadata.description = `Explore all posts on ${filter}th page `
    }

    return metadata
}

export default async function FilterPage({ params }: AsyncPathParams) {
    const filter = (await params)?.filter

    if (filter === CategoriesURL) {
        const tags: TagVO[] = await GetAllTagsAPI(TagTypeEnum.POST_CAT)
        return <TagView tags={tags} tagType={TagTypeEnum.POST_CAT} />
    } else if (filter === TagsUrl) {
        const tags: TagVO[] = await GetAllTagsAPI(TagTypeEnum.POST_TAG)
        return <TagView tags={tags} tagType={TagTypeEnum.POST_TAG} />
    }

    if (filter === '1') {
        permanentRedirect('/')
    }

    return <PostView index={filter}/>
}
