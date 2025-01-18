import React from 'react'
import { Layout, Pagination, Space} from 'antd'
import {GetServerSideProps, InferGetServerSidePropsType} from "next"
import {PostDetailPageVO} from "@/common/model"
import {GetAllBlogPosts} from "@/common/api"
import {useRouter} from "next/router";
import PostCard from "@/pages/PostCard";

const { Footer, Content } = Layout


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
                    {postDetailPageVO?.post_details?.map(postDetailVO => <PostCard key={postDetailVO.id} postDetailVO={postDetailVO}/>)}
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
