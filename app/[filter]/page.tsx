import {TagTypeEnum, TagVO} from "@/common/model"
import {GetAllTagsAPI} from "@/common/api"
import TagList from "@/components/TagList"
import {AsyncPathParams, CategoriesURL, TagsUrl} from "@/common/common"
import React from "react"
import PostView from "@/components/PostList"

export default async function FilterPage({ params }: AsyncPathParams) {
    const filter = (await params)?.filter

    if (filter === CategoriesURL) {
        const tags: TagVO[] = await GetAllTagsAPI(TagTypeEnum.POST_CAT)
        return <TagList tags={tags} tagType={TagTypeEnum.POST_CAT} />
    } else if (filter === TagsUrl) {
        const tags: TagVO[] = await GetAllTagsAPI(TagTypeEnum.POST_TAG)
        return <TagList tags={tags} tagType={TagTypeEnum.POST_TAG} />
    }

    return <PostView index={filter}/>
}
