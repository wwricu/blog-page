import type { Metadata } from 'next'
import React from "react"
import PostPage from "@/app/[filter]/[name]/[index]/page"

export const metadata: Metadata = {
    title: 'wwr.icu',
    description: 'wwr.icu',
}

export default async function Page() {
    return <PostPage/>
}
