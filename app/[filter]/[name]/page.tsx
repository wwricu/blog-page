import React from "react"
import {AsyncPathParams} from "@/common/common"
import PostPage from "@/app/[filter]/[name]/[index]/page"

export default async function FilterPostPage({ params }: AsyncPathParams) {
    return <PostPage params={params}/>
}
