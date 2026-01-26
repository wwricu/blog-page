import {PostDetailVO, TagVO} from "@/common/model";
import {GetPostDetailAPI} from "@/common/api";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Tag} from "antd";
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
        <div className='flex justify-start flex-wrap'>
            <TagsOutlined className='text-gray-500 mr-1 '/>
            {postDetailVO?.tag_list.map((tag: TagVO) => (
                <a key={tag.id} href={`/tags/${tag.name}`} className='ml-1'>
                    <Tag color={getTagColor()}>
                        {tag.name}
                    </Tag>
                </a>
            ))}
        </div>
    )
}

const renderCategory = (postDetailVO: PostDetailVO) => {
    if (postDetailVO?.category == null) {
        return <></>
    }
    return (
        <p className='text-gray-500'>
            <BorderlessTableOutlined className='mr-2'/>
                <a href={`/categories/${postDetailVO?.category.name}`}>
                    <Tag>
                        {postDetailVO?.category?.name}
                    </Tag>
                </a>
            <div className='divider-horizontal'/>
        </p>
    )
}


export default function PostDetailPage({ postDetailVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className='flex justify-center min-h-lvh w-full '>
            <div className='w-md bg-[rgba(240,240,240,0.5)] shadow-sm border-x p-4'>
                <h1 className='text-2xl font-semibold'>{postDetailVO.title}</h1>
                <div className='flex items-center gap-2 mt-6 mb-8 flex-wrap'>
                    <p className='text-gray-500'>
                        <ClockCircleOutlined className='mr-1'/>
                        {postDetailVO.create_time?.slice(0, 10)}
                    </p>
                    <div className='divider-horizontal'/>
                    {renderCategory(postDetailVO)}
                    {renderTags(postDetailVO)}
                </div>
                <div className='prose prose-sm max-w-full' dangerouslySetInnerHTML={{__html: postDetailVO.content}}/>
            </div>
        </div>
    )
}
