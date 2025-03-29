import {PostDetailVO, TagVO} from "@/common/model";
import {GetPostDetailAPI} from "@/common/api";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Divider, Flex, Tag, Typography} from "antd";
import React from "react";
import {BorderlessTableOutlined, ClockCircleOutlined, TagsOutlined} from "@ant-design/icons";


export const getServerSideProps = (async (context) => {
    const { params } = context;
    const postId = params!.id;
    const postDetailVO = await GetPostDetailAPI(postId as string)
    return { props: { postDetailVO } }
}) satisfies GetServerSideProps<{ postDetailVO: PostDetailVO }>


const tagColorList = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple'
]

const getTagColor = () => {
    return tagColorList[Math.floor(Math.random() * tagColorList.length)]
}


const renderTags = (postDetailVO: PostDetailVO) => {
    if (postDetailVO?.tag_list == null || postDetailVO?.tag_list.length === 0) {
        return <></>
    }
    return (
        <Flex justify='flex-start' className='flex-wrap'>
            <Typography.Text type='secondary'>
                <TagsOutlined className='mr-1'/>
            </Typography.Text>
            {postDetailVO?.tag_list.map((tag: TagVO) => (
                <Typography.Link key={tag.id} href={`/tags/${tag.name}`} className='ml-1'>
                    <Tag color={getTagColor()}>
                        {tag.name}
                    </Tag>
                </Typography.Link>
            ))}
        </Flex>
    )
}

const renderCategory = (postDetailVO: PostDetailVO) => {
    if (postDetailVO?.category == null) {
        return <></>
    }
    return (
        <Typography.Text type='secondary'>
            <BorderlessTableOutlined className='mr-2'/>
                <Typography.Link href={`/categories/${postDetailVO?.category.name}`}>
                    <Tag>
                        {postDetailVO?.category?.name}
                    </Tag>
                </Typography.Link>
            <Divider type='vertical' orientation='center'/>
        </Typography.Text>
    )
}


export default function PostDetailPage({ postDetailVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Flex
            className='min-h-lvh w-full '
            justify='center'
        >
            <div className='w-md bg-[rgba(240,240,240,0.5)] shadow-sm border-x p-4'>
                <Typography.Title level={3}>{postDetailVO.title}</Typography.Title>
                <Flex gap='small' align='center' className='mt-6 mb-8 flex-wrap'>
                    <Typography.Text type='secondary'>
                        <ClockCircleOutlined className='mr-1'/>
                        {postDetailVO.create_time?.slice(0, 10)}
                    </Typography.Text>
                    <Divider type='vertical' orientation='center'/>
                    {renderCategory(postDetailVO)}
                    {renderTags(postDetailVO)}
                </Flex>
                <Typography.Paragraph>
                    <div dangerouslySetInnerHTML={{__html: postDetailVO.content}}/>
                </Typography.Paragraph>
            </div>
        </Flex>
    )
}
