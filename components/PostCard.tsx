import {PostDetailVO, TagVO} from '@/common/model';
import {Divider, Tag} from 'antd';
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
        <span className='max-w-[100vw] overflow-hidden'>
            <span className='text-gray-500'>
                <BorderlessTableOutlined className='mr-1'/>
                <Link href={`/categories/${tag.name}`}>
                    <Tag>
                        {tag.name}
                    </Tag>
                </Link>
            </span>
            <Divider type='vertical' className='ml-2 mr-0'/>
        </span>
    )
}

const renderTag = (tagList: TagVO[]) => {
    if (!tagList || tagList.length === 0) {
        return <></>
    }
    return (
        <span className='max-w-[100vw] overflow-hidden'>
            <span className='text-gray-500'>
                <TagsOutlined className='mr-1'/>
                {tagList.map((tag: TagVO) => (
                    <Link key={tag.id} href={`/tags/${tag.name}`}>
                        <Tag color={getTagColor()}>
                            {tag.name}
                        </Tag>
                    </Link>
                ))}
            </span>
        </span>
    )
}

export default function PostCard({postDetailVO}: PostCardProps) {
    return (
        <div className='my-2 p-0 sm:min-h-36 shadow-lg border rounded-md hover:drop-shadow-2xl bg-[rgba(245,245,245,0.5)] w-md max-md:w-full max-sm:my-1'>
            <div className='flex justify-between gap-2'>
                <div className='flex flex-col justify-between items-start px-4 pt-4 pb-3 w-full sm:h-40'>
                    <Link className='w-full' href={`/detail/${postDetailVO.id}`}>
                        <div className='flex flex-col justify-start items-start w-full'>
                            <>
                                <h4 className='text-xl font-semibold mb-3 max-sm:hidden'>{postDetailVO.title}</h4>
                                <p className='sm:hidden mb-5'>{postDetailVO.title}</p>
                            </>
                            <p className='mt-2 max-sm:hidden overflow-hidden sm:h-10 max-sm:text-xs text-text-second'>{postDetailVO.preview}</p>
                        </div>
                    </Link>
                    <div className='flex flex-col justify-end items-start'>
                        <div className='flex justify-between items-center gap-2 w-full flex-wrap'>
                            <span>
                                <span className='text-gray-500 max-sm:text-xs'><ClockCircleOutlined/> {postDetailVO.create_time.slice(0, 10)}</span>
                                <Divider type='vertical' className='ml-2 mr-0'/>
                            </span>
                            {renderCategory(postDetailVO?.category)}
                            {renderTag(postDetailVO.tag_list)}
                        </div>
                    </div>
                </div>
                <Image
                    loading='lazy'
                    unoptimized
                    width={250}
                    height={100}
                    src={postDetailVO.cover?.url ?? `https://picsum.photos/250/100?id=${postDetailVO.id}`} alt={postDetailVO.cover?.name ?? 'cover'}
                    className='max-sm:hidden'
                />
            </div>
        </div>
    )
}
