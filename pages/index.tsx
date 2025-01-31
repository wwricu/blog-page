import React from 'react'
import { Pagination, Space} from 'antd'
import {GetServerSideProps, InferGetServerSidePropsType} from "next"
import {PostDetailPageVO} from "@/common/model"
import {GetAllBlogPosts} from "@/common/api"
import {useRouter} from "next/router";
import PostCard from "@/components/PostCard";


export const getServerSideProps = (async (context) => {
    const { query } = context
    const { page, tag, category} = query
    const pageIndex = parseInt(page as string ?? '1')
    const tags = tag == null ? undefined : [tag as string]
    const postDetailPageVO: PostDetailPageVO = await GetAllBlogPosts(pageIndex, category as string | undefined, tags)
    return { props: { postDetailPageVO } }
}) satisfies GetServerSideProps<{ postDetailPageVO: PostDetailPageVO }>

export default function Home({ postDetailPageVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();

    const changePage = (pageIndex: number) => {
        let url = `?page=${pageIndex}`
        if (router.query.category) {
            url += `&category=${router.query.category}`
        }
        if (router.query.tag) {
            url += `&tag=${router.query.tag}`
        }
        router.push(url).then()
    }

    return (
        <Space className='mt-3 w-full' direction="vertical" size={16}>
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
