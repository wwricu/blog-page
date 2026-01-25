import {PostDetailPageVO} from "@/common/model";
import {GetAllBlogPosts} from "@/common/api";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import PostList from "@/components/PostList";
import React from "react";
import {Breadcrumb} from "antd";
import {useRouter} from "next/router";

export const getServerSideProps = (async (context) => {
    const category = context.params?.name ?? ''
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(1, category as string | undefined)
    return { props: { postDetailPageVO } }
}) satisfies GetServerSideProps<{ postDetailPageVO: PostDetailPageVO }>

export default function Categories({ postDetailPageVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()
    return (
        <div className='flex justify-center grow py-2'>
            <div className='flex flex-col max-md:w-full max-md:mx-2'>
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
            </div>
        </div>
    )
}
