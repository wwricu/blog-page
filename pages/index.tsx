import React from 'react'
import {GetServerSideProps, InferGetServerSidePropsType} from "next"
import {PostDetailPageVO} from "@/common/model"
import {GetAllBlogPosts} from "@/common/api"
import PostList from "@/components/PostList";
import {Breadcrumb, Flex} from "antd";


export const getServerSideProps = (async () => {
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(1)
    return { props: { postDetailPageVO } }
}) satisfies GetServerSideProps<{ postDetailPageVO: PostDetailPageVO }>

export default function Home({ postDetailPageVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <Flex className='grow py-2' justify="center">
        <Flex vertical>
            <PostList postDetailPageVO={postDetailPageVO}/>
        </Flex>
    </Flex>
}
