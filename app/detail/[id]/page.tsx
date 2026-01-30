import React from "react"
import {AsyncPathParams} from "@/common/common"
import PostDetailView from "@/components/PostDetailView"

export default async function PostDetailPage({ params }: AsyncPathParams) {
    const id = (await params)!!.id!!
    return <PostDetailView id={id}/>
}
