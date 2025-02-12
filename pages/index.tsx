import React from 'react'
import {GetServerSideProps, InferGetServerSidePropsType} from "next"
import {PostDetailPageVO} from "@/common/model"
import {GetAllBlogPosts} from "@/common/api"
import PostList from "@/components/PostList";


export const getServerSideProps = (async () => {
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(1)
    return { props: { postDetailPageVO } }
}) satisfies GetServerSideProps<{ postDetailPageVO: PostDetailPageVO }>

export default function Home({ postDetailPageVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <PostList postDetailPageVO={postDetailPageVO}/>
    )
}
