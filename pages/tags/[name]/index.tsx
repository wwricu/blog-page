import {PostDetailPageVO} from "@/common/model";
import {GetAllBlogPosts} from "@/common/api";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import PostList from "@/components/PostList";
import React from "react";

export const getServerSideProps = (async (context) => {
    const { params } = context
    const tag = params!.name ?? ''
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(1, undefined, tag as string | undefined)
    return { props: { postDetailPageVO } }
}) satisfies GetServerSideProps<{ postDetailPageVO: PostDetailPageVO }>

export default function Home({ postDetailPageVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <PostList postDetailPageVO={postDetailPageVO}/>
    )
}
