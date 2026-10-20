import type { Metadata } from 'next'
import React from "react"
import PostView from "@/components/PostView"

export const metadata: Metadata = {
    // Title/description/openGraph come from the root layout defaults
    alternates: {
        canonical: '/',
    },
}

export const dynamic = 'force-dynamic'

export default async function Page() {
    return <PostView/>
}
