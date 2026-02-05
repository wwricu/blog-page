import type { Metadata } from 'next'
import React from "react"
import PostView from "@/components/PostView"

export const metadata: Metadata = {
    title: 'wwr.icu | A nonsense site',
    description: 'A nonsense site, where I set forth',
    alternates: {
        canonical: process.env.NEXT_SITE_URL
    }
}

export default async function Page() {
    return <PostView/>
}
