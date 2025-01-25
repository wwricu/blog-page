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

const contentStyle: React.CSSProperties = {
    width: '800px',
    background: '#f0fff6',
    opacity: 0.7
}

export default function PostDetailPage({ postDetailVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Flex
            justify='center'
            style={{
            backgroundImage: 'url("https://www.toptal.com/designers/subtlepatterns/uploads/leaves.png")',
            height: '100vh',
            width: '100%',
        }}>
            <div style={contentStyle}>
                <div>
                    <p>{postDetailVO.title}</p>
                </div>
                <div dangerouslySetInnerHTML={{__html: postDetailVO.content}} ></div>
            </div>
        </Flex>
    )
}
