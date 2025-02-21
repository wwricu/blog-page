import {PostDetailVO, TagVO} from "@/common/model";
import {GetPostDetailAPI} from "@/common/api";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Flex, Typography} from "antd";
import React from "react";
import {AppstoreOutlined, ClockCircleOutlined, TagsOutlined} from "@ant-design/icons";


export const getServerSideProps = (async (context) => {
    const { params } = context;
    const postId = params!.id;
    const postDetailVO = await GetPostDetailAPI(postId as string)
    postDetailVO.tag_list = []
    return { props: { postDetailVO } }
}) satisfies GetServerSideProps<{ postDetailVO: PostDetailVO }>


const renderTags = (postDetailVO: PostDetailVO) => {
    if (postDetailVO?.tag_list == null || postDetailVO?.tag_list.length === 0) {
        return <></>
    }
    return <Typography.Text type='secondary'>
        <TagsOutlined className='mr-1'/>
        {postDetailVO?.tag_list.map((tag: TagVO) => (
            <Typography.Link key={tag.id} href={`/tags/${tag.name}`} className='text-base mx-1'>
                {tag.name}
            </Typography.Link>
        ))}
    </Typography.Text>
}

const renderCategory = (postDetailVO: PostDetailVO) => {
    if (postDetailVO?.category == null) {
        return <></>
    }
    return <Typography.Text type='secondary'>
        <AppstoreOutlined className='mr-1'/>
        <Typography.Link href={`/categories/${postDetailVO?.category.name}`} className='text-base mx-1'>
            {postDetailVO?.category?.name}
        </Typography.Link>
    </Typography.Text>
}


export default function PostDetailPage({ postDetailVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Flex
            className='min-h-lvh w-full'
            justify='center'
        >
            <div className='w-800px bg-white shadow-sm border-x p-4'>
                <Typography.Title level={3}>{postDetailVO.title}</Typography.Title>
                <Flex gap='small' className='my-6' align='baseline'>
                    <Typography.Text type='secondary'>
                        <ClockCircleOutlined className='mr-1'/>
                        {postDetailVO.create_time?.slice(0, 10)}
                    </Typography.Text>
                    {renderCategory(postDetailVO)}
                    {renderTags(postDetailVO)}
                </Flex>
                <Typography.Paragraph>
                    <div dangerouslySetInnerHTML={{__html: postDetailVO.content}} ></div>
                </Typography.Paragraph>
            </div>
        </Flex>
    )
}
