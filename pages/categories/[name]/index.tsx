import {PostDetailPageVO} from "@/common/model";
import {GetAllBlogPosts} from "@/common/api";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import PostList from "@/components/PostList";
import React from "react";

export const getServerSideProps = (async (context) => {
    const category = context.params?.name ?? ''
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(1, category as string | undefined)
    return { props: { postDetailPageVO } }
}) satisfies GetServerSideProps<{ postDetailPageVO: PostDetailPageVO }>

export default function Categories({ postDetailPageVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <PostList postDetailPageVO={postDetailPageVO}/>
}
