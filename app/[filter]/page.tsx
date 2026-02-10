import {TagTypeEnum} from "@/common/model"
import TagView from "@/components/TagView"
import {AsyncPathParams, CategoriesURL, TagsUrl} from "@/common/common"
import React from "react"
import PostView from "@/components/PostView"
import {Metadata} from "next"
import {permanentRedirect} from "next/navigation"
import { NotFound } from "@/components/Common"

export const generateMetadata = async ({ params }: AsyncPathParams): Promise<Metadata> => {
    const filter = (await params).filter

    const metadata: Metadata = {
        title: `${filter} - wwr.icu`,
        description: `Explore all posts organized by ${filter}`,
        openGraph: {
            siteName: 'wwr.icu',
            title: filter,
            description: 'wwr.icu',
            url: `${process.env.NEXT_SITE_URL}/${filter}`
        }
    }

    if (filter !== CategoriesURL && filter !== TagsUrl) {
        metadata.title = `Page ${filter} - wwr.icu`
        metadata.description = `Explore all posts on ${filter}th page `
    }

    return metadata
}

export default async function FilterPage({ params }: AsyncPathParams) {
    const filter = (await params)?.filter

    if (filter === CategoriesURL) {
        return <TagView tagType={TagTypeEnum.POST_CAT} />
    } else if (filter === TagsUrl) {
        return <TagView tagType={TagTypeEnum.POST_TAG} />
    } else if (!Number.isSafeInteger(Number(filter))) {
        return <NotFound/>
    }

    if (filter === '1') {
        permanentRedirect('/')
    }

    return <PostView index={filter}/>
}
