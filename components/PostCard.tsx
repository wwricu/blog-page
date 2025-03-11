import {PostDetailVO, TagVO} from '@/common/model';
import {Divider, Flex, Tag, Typography} from 'antd';
import {BorderlessTableOutlined, ClockCircleOutlined, TagsOutlined} from '@ant-design/icons';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

type PostCardProps = {
    postDetailVO: PostDetailVO
}

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


const renderCategory = (tag: TagVO | undefined) => {
    if (!tag) {
        return <></>
    }

    return (
        <span>
            <Typography.Text type={'secondary'}>
                <BorderlessTableOutlined className='mr-1'/>
                <Link href={`?category=${tag.name}`}>
                    <Tag>
                        {tag.name}
                    </Tag>
                </Link>
            </Typography.Text>
            <Divider type='vertical' className='ml-2 mr-0'/>
        </span>
    )
}

const renderTag = (tagList: TagVO[]) => {
    if (!tagList || tagList.length === 0) {
        return <></>
    }
    return (
        <span>
            <Typography.Text type={'secondary'}>
                <TagsOutlined className='mr-1'/>
                {tagList.map((tag: TagVO) => (
                    <Link key={tag.id} href={`/tags/${tag.name}`}>
                        <Tag color={getTagColor()}>
                            {tag.name}
                        </Tag>
                    </Link>
                ))}
            </Typography.Text>
        </span>
    )
}

export default function PostCard({postDetailVO}: PostCardProps) {
    return (
        <div className='my-2 p-0 sm:min-h-48 shadow-lg rounded-md hover:drop-shadow-2xl bg-[rgba(240,240,240,0.3)] w-md max-md:w-full max-sm:my-1'>
            <Flex justify='space-between' gap='small'>
                <Flex vertical justify='space-between' align='flex-start' className='px-3 py-2 w-full'>
                    <Link className='w-full' href={`/detail/${postDetailVO.id}`}>
                        <Flex vertical justify='flex-start' align='flex-start' className='w-full'>
                            <>
                                <Typography.Title level={4} className='max-sm:hidden'>{postDetailVO.title}</Typography.Title>
                                <Typography.Text className='sm:hidden'>{postDetailVO.title}</Typography.Text>
                            </>
                            <Divider className='mt-1 p-0 max-sm:my-2'/>
                            <Typography.Paragraph className='h-16 overflow-hidden max-sm:h-8 max-sm:text-xs'>{postDetailVO.preview}</Typography.Paragraph>
                        </Flex>
                    </Link>
                    <Flex vertical justify='flex-end' align='flex-start'>
                        {/*TODO: grid + breakpoint*/}
                        <Flex className='w-full flex-wrap' justify='space-between' align='center' gap='small'>
                            <span>
                                <Typography.Text type={'secondary'} className='max-sm:text-xs'><ClockCircleOutlined/> {postDetailVO.create_time.slice(0, 10)}</Typography.Text>
                                <Divider type='vertical' className='ml-2 mr-0'/>
                            </span>
                            {renderCategory(postDetailVO?.category)}
                            {renderTag(postDetailVO.tag_list)}
                        </Flex>
                    </Flex>
                </Flex>
                <Image
                    loading='lazy'
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
