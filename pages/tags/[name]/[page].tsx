import {PostDetailPageVO} from "@/common/model";
import {GetAllBlogPosts} from "@/common/api";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import PostList from "@/components/PostList";
import React from "react";

export const getServerSideProps = (async (context) => {
    const pageIndex = parseInt((context.params?.page ?? 1) as string)
    const tag = context.params?.name
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(pageIndex, undefined, tag as string | undefined)
    return { props: { postDetailPageVO } }
}) satisfies GetServerSideProps<{ postDetailPageVO: PostDetailPageVO }>

export default function Home({ postDetailPageVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <PostList postDetailPageVO={postDetailPageVO}/>
    )
}
