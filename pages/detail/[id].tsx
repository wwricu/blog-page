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
    boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.7)',
    width: '900px',
    background: 'rgba(240, 255, 246, 0.4)',
    padding: 20
}

export default function PostDetailPage({ postDetailVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Flex
            justify='center'
            style={{
            backgroundImage: 'url("https://www.toptal.com/designers/subtlepatterns/uploads/leaves.png")',
            width: '100%',
            minHeight: '100vh',
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
