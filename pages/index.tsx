import React from 'react'
import { Pagination, Space} from 'antd'
import {GetServerSideProps, InferGetServerSidePropsType} from "next"
import {PostDetailPageVO} from "@/common/model"
import {GetAllBlogPosts} from "@/common/api"
import {useRouter} from "next/router";
import PostCard from "@/components/PostCard";


export const getServerSideProps = (async (context) => {
    const { query } = context
    const { page, tags, category} = query
    const pageIndex = parseInt(page as string ?? '1')
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(pageIndex, category as string | undefined, tags as string[] | undefined)
    return { props: { postDetailPageVO } }
}) satisfies GetServerSideProps<{ postDetailPageVO: PostDetailPageVO }>

export default function Home({ postDetailPageVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();

    const changePage = (pageIndex: number) => {
        let url = `?page=${pageIndex}`
        if (router.query.category) {
            url += `&category=${router.query.category}`
        }
        if (router.query.tags) {
            url += `&tags=${router.query.tags}`
        }
        router.push(url).then()
    }

    return (
        <Space direction="vertical" size={16} style={{ marginTop: "16px", width: '100%' }}>
            {postDetailPageVO?.post_details?.map(postDetailVO => <PostCard key={postDetailVO.id} postDetailVO={postDetailVO}/>)}
            <Pagination
                align="center"
                current={postDetailPageVO.page_index}
                total={postDetailPageVO.count}
                onChange={changePage}
            />
        </Space>
    )
}
