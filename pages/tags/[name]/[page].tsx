import {PostDetailPageVO} from "@/common/model";
import {GetAllBlogPosts} from "@/common/api";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import PostList from "@/components/PostList";
import React from "react";
import {useRouter} from "next/router";
import {Breadcrumb, Flex} from "antd";

export const getServerSideProps = (async (context) => {
    const pageIndex = parseInt((context.params?.page ?? 1) as string)
    const tag = context.params?.name
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(pageIndex, undefined, tag as string | undefined)
    return { props: { postDetailPageVO } }
}) satisfies GetServerSideProps<{ postDetailPageVO: PostDetailPageVO }>

export default function Home({ postDetailPageVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()
    return (
        <Flex className='grow py-2' justify="center">
            <Flex vertical className='max-md:w-full max-md:mx-2'>
                <Breadcrumb
                    className='m-1'
                    items={[
                        {
                            title: 'Tags',
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
    )
}
