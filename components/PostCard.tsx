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
        <div className='my-2 p-0 sm:min-h-48 shadow-lg bg-white rounded-md hover:drop-shadow-2xl hover:bg-slate-50 w-800px max-md:w-full max-sm:my-1'>
            <Flex justify='space-between' gap='small'>
                <Flex vertical justify='space-between' align='flex-start' className='px-3 py-2 w-full'>
                    <Link className='w-full' href={`/detail/${postDetailVO.id}`}>
                        <Flex vertical justify='flex-start' align='flex-start' className='w-full'>
                            <>
                                <Typography.Title level={4} className='max-sm:hidden'>{postDetailVO.title}</Typography.Title>
                                <Typography.Text className='max-sm:block'>{postDetailVO.title}</Typography.Text>
                            </>
                            <Divider className='mt-1 p-0 max-sm:my-2'/>
                            <Typography.Paragraph className='h-16 overflow-hidden max-sm:hidden'>{postDetailVO.preview}</Typography.Paragraph>
                        </Flex>
                    </Link>
                    <Flex vertical justify='flex-end' align='flex-start'>
                        {/*TODO: grid + breakpoint*/}
                        <Flex className='w-full' justify='space-between' align='center'>
                            <Typography.Text type={'secondary'} className='max-sm:text-xs'><ClockCircleOutlined/> {postDetailVO.create_time.slice(0, 10)}</Typography.Text>
                            {renderCategory(postDetailVO?.category)}
                            {renderTag(postDetailVO.tag_list)}
                        </Flex>
                    </Flex>
                </Flex>
                <Image
                    unoptimized
                    width={250}
                    height={200}
                    src={postDetailVO.cover?.url ?? `https://picsum.photos/250/200?id=${postDetailVO.id}`} alt={postDetailVO.cover?.name ?? 'cover'}
                    className='max-sm:hidden'
                />
            </Flex>
        </div>
    )
}
