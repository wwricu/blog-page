import React from 'react'
import { Card, Divider, Flex, Layout, Pagination, Row, Space, Typography} from 'antd'
import {BorderlessTableOutlined, ClockCircleOutlined, TagsOutlined} from "@ant-design/icons"
import {GetServerSideProps, InferGetServerSidePropsType} from "next"
import {PostDetailPageVO, PostDetailVO} from "@/pages/model"
import {GetAllBlogPosts} from "@/pages/api"
import Image from 'next/image'
import {useRouter} from "next/router";

const { Footer, Content } = Layout
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

const renderPost = (postDetailVO: PostDetailVO) => {
    return (
        <Row key={postDetailVO.id} justify="center">
            <Card style={cardStyle} styles={{body: cardBodyStyle}}>
                <Flex justify="space-between" gap='small'>
                    <Flex vertical justify='space-around' align='flex-start' style={{padding: 24}}>
                        <div style={{width: '100%'}}>
                            <Typography.Title level={4}>{postDetailVO.title}</Typography.Title>
                            <Divider style={dividerStyle}/>
                        </div>
                        <div style={{height: '100px', overflow: 'hidden', marginBottom: 10}}>
                            <Typography.Paragraph>{postDetailVO.preview}</Typography.Paragraph>
                        </div>
                        <Flex justify="space-between" align='center' style={{width: '100%'}}>
                            <Typography.Text type={"secondary"}><ClockCircleOutlined/> {postDetailVO.create_time.slice(0, 10)}</Typography.Text>
                            <Divider style={dividerStyle} type='vertical'/>
                            <Typography.Text type={"secondary"}><BorderlessTableOutlined/> {postDetailVO.category?.name}</Typography.Text>
                            <Divider style={dividerStyle} type='vertical'/>
                            <Typography.Text type={"secondary"}><TagsOutlined/> {postDetailVO.category?.name}</Typography.Text>
                        </Flex>
                    </Flex>
                    <Image width={200} height={400} src={postDetailVO.cover?.url ?? `/covers/${Math.floor(Math.random() * 5).toString()}.jpg`} alt={postDetailVO.cover?.name ?? 'cover'} style={imgStyle}/>
                </Flex>
            </Card>
        </Row>
    )
}

export const getServerSideProps = (async (context) => {
    const { query } = context
    const { page, tags, category} = query
    const pageIndex = parseInt(page as string ?? '1')
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(pageIndex, category as string | undefined, tags as string[] | undefined)
    return { props: { postDetailPageVO } }
}) satisfies GetServerSideProps<{ postDetailPageVO: PostDetailPageVO }>

export default function Home({ postDetailPageVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content>
                <Space direction="vertical" size={16} style={{ marginTop: "16px", width: '100%' }}>
                    {postDetailPageVO?.post_details?.map(postDetailVO => renderPost(postDetailVO))}
                    <Pagination
                        align="center"
                        current={postDetailPageVO.page_index}
                        total={postDetailPageVO.count}
                        onChange={pageIndex => router.push(`?page=${pageIndex}`)}
                    />
                </Space>
            </Content>
            <Footer style={{ textAlign: 'center' }}>wwr.icu 2025</Footer>
        </Layout>
    )
}
