import {TagTypeEnum} from "@/common/model"
import TagView from "@/components/TagView"
import {AsyncPathParams, CategoriesURL, TagsUrl} from "@/common/common"
import React from "react"
import PostView from "@/components/PostView"
import {Metadata} from "next"
import {permanentRedirect} from "next/navigation"

export const generateMetadata = async ({ params }: AsyncPathParams): Promise<Metadata> => {
    const filter = (await params).filter
    const isPagedHome = filter !== CategoriesURL && filter !== TagsUrl

    return isPagedHome
        ? {
            title: `Page ${filter}`,
            description: `Explore all posts on ${filter}th page`,
            openGraph: { url: `/${filter}` },
        }
        : {
            title: `${filter}`,
            description: `Explore all posts organized by ${filter}`,
            openGraph: { url: `/${filter}` },
        }
}

export const generateStaticParams = () => []

export default async function FilterPage({ params }: AsyncPathParams) {
    const filter = (await params)?.filter

    if (filter === CategoriesURL) {
        return <TagView tagType={TagTypeEnum.POST_CAT} />
    } else if (filter === TagsUrl) {
        return <TagView tagType={TagTypeEnum.POST_TAG} />
    }

    if (filter === '1') {
        permanentRedirect('/')
    }

    return <PostView index={filter}/>
}
