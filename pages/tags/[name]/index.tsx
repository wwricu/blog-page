import {PostDetailPageVO} from "@/common/model";
import {GetAllBlogPosts} from "@/common/api";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import PostList from "@/components/PostList";
import React from "react";
import {useRouter} from "next/router";
import {Breadcrumb, Flex} from "antd";

export const getServerSideProps = (async (context) => {
    const { params } = context
    const tag = params!.name ?? ''
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(1, undefined, tag as string | undefined)
    return { props: { postDetailPageVO } }
}) satisfies GetServerSideProps<{ postDetailPageVO: PostDetailPageVO }>

export default function Home({ postDetailPageVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()
    return <Flex className='grow py-2' justify="center">
        <Flex vertical>
            <Breadcrumb
                className='m-1'
                items={[
                    {
                        title: 'Categories',
                    },
                    {
                        title: ':name',
                    },
                ]}
                params={{ name: router.query.name }}
            />
            <PostList postDetailPageVO={postDetailPageVO}/>
        </Flex>
    </Flex>
}
