import type { Metadata } from 'next'
import React from "react";
import PostPage from "@/app/[page]/page";

export const metadata: Metadata = {
    title: 'wwr.icu',
}

export default async function Page() {
    return <PostPage/>
}
