import {PostDetailPageVO} from "@/common/model";
import {GetAllBlogPosts} from "@/common/api";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import PostList from "@/components/PostList";
import React from "react";
import {Breadcrumb, Flex} from "antd";
import {useRouter} from "next/router";

export const getServerSideProps = (async (context) => {
    const category = context.params?.name ?? ''
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(1, category as string | undefined)
    return { props: { postDetailPageVO } }
}) satisfies GetServerSideProps<{ postDetailPageVO: PostDetailPageVO }>

export default function Categories({ postDetailPageVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()
    return (
        <Flex className='grow py-2' justify="center">
            <Flex vertical className='max-md:w-full max-md:mx-2'>
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
    )
}
