import type { Metadata } from 'next'
import React from "react"
import {notFound} from "next/navigation"
import PostView from "@/components/PostView"

export const metadata: Metadata = {
    // Title/description/openGraph come from the root layout defaults
    alternates: {
        canonical: '/',
    },
}

export const generateStaticParams = () => []

export default async function Page({params}: {params: Promise<{slug?: string[]}>}) {
    const {slug} = await params
    if (slug?.length) {
        notFound()
    }
    return <PostView/>
}
