import {PostDetailVO, TagVO} from '@/common/model';
import {Card, Divider, Flex, Row, Typography} from 'antd';
import {ClockCircleOutlined, TagsOutlined} from '@ant-design/icons';
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

const dividerStyle: React.CSSProperties = {
    color: '#000000'
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
            <Divider style={dividerStyle} type='vertical'/>
            <Typography.Text type={'secondary'}><TagsOutlined/>
                <Link href={'https://google.com'}>{tag.name}</Link>
            </Typography.Text>
        </>
    )
}

const renderTag = (tagList: TagVO[]) => {
    return (
        tagList.map((tag: TagVO) => (
            <>
                <Divider style={dividerStyle} type='vertical'/>
                <Typography.Text type={'secondary'}><TagsOutlined/>
                    <Link href={'https://google.com'}>{tag.name}</Link>
                </Typography.Text>
            </>
        ))
    )
}


export default function PostCard({postDetailVO}: PostCardProps) {
    return (
        <Row key={postDetailVO.id} justify='center'>
            <Card style={cardStyle} styles={{body: cardBodyStyle}}>
                <Flex justify='space-between' gap='small'>
                    <Flex vertical justify='space-between' align='flex-start' style={{padding: 24, width: '600px'}}>
                        <Flex vertical justify='flex-start' align='flex-start' style={{width: '100%'}}>
                            <Typography.Title level={4}>{postDetailVO.title}</Typography.Title>
                            <Divider style={dividerStyle}/>
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
                    <Image width={200} height={300} src={postDetailVO.cover?.url ?? `/covers/${Math.floor(Math.random() * 5).toString()}.jpg`} alt={postDetailVO.cover?.name ?? 'cover'} style={imgStyle}/>
                </Flex>
            </Card>
        </Row>
    )
}
