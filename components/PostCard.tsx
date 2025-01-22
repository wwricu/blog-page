import {PostDetailVO, TagVO} from '@/common/model';
import {Card, Divider, Flex, Row, Typography} from 'antd';
import {BorderlessTableOutlined, ClockCircleOutlined, TagsOutlined} from '@ant-design/icons';
import Image from 'next/image';
import React from 'react';
import Link from "next/link";

const imgStyle: React.CSSProperties = {
    height: '280px',
    width: '180px',
    display: 'block',
    objectFit: 'cover'
}

const cardBodyStyle: React.CSSProperties = {
    overflow: 'hidden',
    padding: 0
}

const cardStyle: React.CSSProperties = {
    boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
    width: '800px', padding: 0, overflow: 'hidden',
}

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
            <Typography.Text type={'secondary'} style={{marginLeft: 5}}>
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
                <>
                    <Typography.Text type={'secondary'} style={{marginLeft: 5}}>
                        <Link href={`?tags=${tag.name}`}>{tag.name}</Link>
                    </Typography.Text>
                </>
            ))}
        </>
    )
}


export default function PostCard({postDetailVO}: PostCardProps) {
    return (
        <a href={`/detail/${postDetailVO.id}`}>
            <Row key={postDetailVO.id} justify='center'>
                <Card style={cardStyle} styles={{body: cardBodyStyle}}>
                    <Flex justify='space-between' gap='small'>
                        <Flex vertical justify='space-between' align='flex-start' style={{padding: 24, width: '100%'}}>
                            <Flex vertical justify='flex-start' align='flex-start' style={{width: '100%'}}>
                                <Typography.Title level={4}>{postDetailVO.title}</Typography.Title>
                                <Divider/>
                                <Typography.Paragraph style={{height: '50px', overflow: 'hidden'}}>{postDetailVO.preview}</Typography.Paragraph>
                            </Flex>
                            <Flex vertical justify='flex-end' align='flex-start'>
                                <Flex justify='space-between' align='center' style={{width: '100%'}}>
                                    <Typography.Text type={'secondary'}><ClockCircleOutlined/> {postDetailVO.create_time.slice(0, 10)}</Typography.Text>
                                    {renderCategory(postDetailVO?.category)}
                                    {renderTag(postDetailVO.tag_list)}
                                </Flex>
                            </Flex>
                        </Flex>
                        <Image width={400} height={600} src={postDetailVO.cover?.url ?? `https://picsum.photos/400/600?id=${postDetailVO.id}`} alt={postDetailVO.cover?.name ?? 'cover'} unoptimized style={imgStyle}/>
                    </Flex>
                </Card>
            </Row>
        </a>
    )
}
