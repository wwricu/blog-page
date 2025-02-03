import {PostDetailPageVO} from "@/common/model";
import PostCard from "@/components/PostCard";
import {Flex, Pagination} from "antd";
import React from "react";
import {useRouter} from "next/router";


type PostListProps = {
    postDetailPageVO: PostDetailPageVO;
}

export default function PostList({postDetailPageVO}: PostListProps) {
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
        <Flex className='grow' justify="center">
            <Flex className='w-800px' vertical>
                {postDetailPageVO?.post_details?.map(postDetailVO =>
                    <PostCard key={postDetailVO.id} postDetailVO={postDetailVO}/>)}
                <Pagination
                    className='mt-2'
                    align="center"
                    current={postDetailPageVO.page_index}
                    total={postDetailPageVO.count}
                    onChange={changePage}
                />
            </Flex>
        </Flex>
    )
}
