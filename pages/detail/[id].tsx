import {PostDetailVO} from "@/common/model";
import {GetPostDetailAPI} from "@/common/api";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Flex} from "antd";
import React from "react";


export const getServerSideProps = (async (context) => {
    const { params } = context;
    const postId = params!.id;
    const postDetailVO = await GetPostDetailAPI(postId as string)
    return { props: { postDetailVO } }
}) satisfies GetServerSideProps<{ postDetailVO: PostDetailVO }>


export default function PostDetailPage({ postDetailVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Flex
            className='min-h-lvh w-full'
            justify='center'
        >
            <div className='w-800px border-x p-4'>
                <div>
                    <p>{postDetailVO.title}</p>
                </div>
                <div dangerouslySetInnerHTML={{__html: postDetailVO.content}} ></div>
            </div>
        </Flex>
    )
}
