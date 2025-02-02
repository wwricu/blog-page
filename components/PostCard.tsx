import {PostDetailVO, TagVO} from '@/common/model';
import {Divider, Flex, Typography} from 'antd';
import {BorderlessTableOutlined, ClockCircleOutlined, TagsOutlined} from '@ant-design/icons';
import Image from 'next/image';
import React from 'react';
import Link from "next/link";

type PostCardProps = {
    postDetailVO: PostDetailVO
}

const renderCategory = (tag: TagVO | undefined) => {
    if (!tag) {
        return <></>
    }

    return (
        <>
            <Divider type='vertical'/>
            <BorderlessTableOutlined/>
            <Typography.Text type={'secondary'} className='ml-2'>
                <Link href={`?category=${tag.name}`}>{tag.name}</Link>
            </Typography.Text>
        </>
    )
}

const renderTag = (tagList: TagVO[]) => {
    if (!tagList || tagList.length === 0) {
        return <></>
    }
    return (
        <>
            <Divider type='vertical'/>
            <TagsOutlined/>
            {tagList.map((tag: TagVO) => (
                <Typography.Text key={tag.id} type={'secondary'} className='ml-2'>
                    <Link href={`?tags=${tag.name}`}>{tag.name}</Link>
                </Typography.Text>
            ))}
        </>
    )
}


export default function PostCard({postDetailVO}: PostCardProps) {
    return (
        <div className='my-2 p-0 shadow-lg bg-slate-100'>
            <Flex justify='space-between' gap='small'>
                <Flex vertical justify='space-between' align='flex-start' className='p-5 w-full'>
                    <Link href={`/detail/${postDetailVO.id}`}>
                        <Flex vertical justify='flex-start' align='flex-start' className='w-full'>
                            <Typography.Title level={4}>{postDetailVO.title}</Typography.Title>
                            <Divider className='mt-2 p-0'/>
                            <Typography.Paragraph className='h-10 overflow-hidden'>{postDetailVO.preview}</Typography.Paragraph>
                        </Flex>
                    </Link>
                    <Flex vertical justify='flex-end' align='flex-start'>
                        <Flex className='w-full' justify='space-between' align='center'>
                            <Typography.Text type={'secondary'}><ClockCircleOutlined/> {postDetailVO.create_time.slice(0, 10)}</Typography.Text>
                            {renderCategory(postDetailVO?.category)}
                            {renderTag(postDetailVO.tag_list)}
                        </Flex>
                    </Flex>
                </Flex>
                <Image width={200} height={250} src={postDetailVO.cover?.url ?? `https://picsum.photos/200/250?id=${postDetailVO.id}`} alt={postDetailVO.cover?.name ?? 'cover'} unoptimized/>
            </Flex>
        </div>
    )
}
