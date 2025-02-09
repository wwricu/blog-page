import React from 'react'
import {GetServerSideProps, InferGetServerSidePropsType} from "next"
import {PostDetailPageVO} from "@/common/model"
import {GetAllBlogPosts} from "@/common/api"
import PostList from "@/components/PostList";


export const getServerSideProps = (async (context) => {
    const { query } = context
    const { page } = query
    const pageIndex = parseInt(page as string ?? '1')
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(pageIndex)
    return { props: { postDetailPageVO } }
}) satisfies GetServerSideProps<{ postDetailPageVO: PostDetailPageVO }>

export default function Home({ postDetailPageVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <PostList postDetailPageVO={postDetailPageVO}/>
    )
}
