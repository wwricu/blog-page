import React from 'react';
import { Card, Divider, Flex, Layout, Pagination, Row, Space, Typography} from 'antd';
import {BorderlessTableOutlined, ClockCircleOutlined, TagsOutlined} from "@ant-design/icons";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";

const { Footer, Content } = Layout;
const imgStyle: React.CSSProperties = {
    height: '280px',
    width: '180px',
    display: 'block',
    objectFit: 'cover'
}

const cardBodyStyle: React.CSSProperties = {
    overflow: 'hidden',
    padding: 0
};

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
                            <Typography.Text type={"secondary"}><ClockCircleOutlined/> {postDetailVO.create_time}</Typography.Text>
                            <Divider style={dividerStyle} type='vertical'/>
                            <Typography.Text type={"secondary"}><BorderlessTableOutlined/> {postDetailVO.category?.name}</Typography.Text>
                            <Divider style={dividerStyle} type='vertical'/>
                            <Typography.Text type={"secondary"}><TagsOutlined/> {postDetailVO.category?.name}</Typography.Text>
                        </Flex>
                    </Flex>
                    <img src={postDetailVO.cover?.url} alt={postDetailVO.cover?.name} style={imgStyle}/>
                </Flex>
            </Card>
        </Row>
    )
}

export const getServerSideProps = (async () => {
    // Fetch data from external API
    // const res = await fetch(`http://localhost:8000/open/post/all`)
    // const postDetailVOList: PostDetailVO[] = await res.json()
    // Pass data to the page via props
    const postDetailVOList: PostDetailVO[] = [
        {
            id: 1,
            title: 'Sed ipsum',
            category: {id: 1, name: 'test class 1', type: 'post_category'},
            tag_list: [],
            create_time: '',
            preview: 'Et sanctus ea delenit dolores rebum vero eos ad elitr sit kasd eleifend magna vero. Stet eu dolore vero ipsum magna dolor ea adipiscing dignissim eirmod consetetur lorem sit sit duo dolor dolore.',
            content: '',
            update_time: ''
        },
        {
            id: 2,
            title: 'Sed ipsum',
            category: {id: 1, name: 'test class 1', type: 'post_category'},
            tag_list: [],
            create_time: '',
            preview: 'Et sanctus ea delenit dolores rebum vero eos ad elitr sit kasd eleifend magna vero. Stet eu dolore vero ipsum magna dolor ea adipiscing dignissim eirmod consetetur lorem sit sit duo dolor dolore.',
            content: '',
            update_time: ''
        },
        {
            id: 3,
            title: 'Sed ipsum',
            category: {id: 1, name: 'test class 1', type: 'post_category'},
            tag_list: [],
            create_time: '',
            preview: 'Et sanctus ea delenit dolores rebum vero eos ad elitr sit kasd eleifend magna vero. Stet eu dolore vero ipsum magna dolor ea adipiscing dignissim eirmod consetetur lorem sit sit duo dolor dolore.',
            content: '',
            update_time: ''
        },
        {
            id: 4,
            title: 'Sed ipsum',
            category: {id: 1, name: 'test class 1', type: 'post_category'},
            tag_list: [],
            create_time: '',
            preview: 'Et sanctus ea delenit dolores rebum vero eos ad elitr sit kasd eleifend magna vero. Stet eu dolore vero ipsum magna dolor ea adipiscing dignissim eirmod consetetur lorem sit sit duo dolor dolore.',
            content: '',
            update_time: ''
        },
        {
            id: 5,
            title: 'Sed ipsum',
            category: {id: 1, name: 'test class 1', type: 'post_category'},
            tag_list: [],
            create_time: '',
            preview: 'Et sanctus ea delenit dolores rebum vero eos ad elitr sit kasd eleifend magna vero. Stet eu dolore vero ipsum magna dolor ea adipiscing dignissim eirmod consetetur lorem sit sit duo dolor dolore.',
            content: '',
            update_time: ''
        },
    ];
    return { props: { postDetailVOList } }
}) satisfies GetServerSideProps<{ postDetailVOList: PostDetailVO[] }>


export default function Home({ postDetailVOList }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content>
                <Space direction="vertical" size={16} style={{ marginTop: "16px", width: '100%' }}>
                    {postDetailVOList?.map(postDetailVO => renderPost(postDetailVO))}
                    <Pagination align="center" defaultCurrent={1} total={50}/>
                </Space>
            </Content>
            <Footer style={{ textAlign: 'center' }}>wwr.icu 2025</Footer>
        </Layout>
    );
}
