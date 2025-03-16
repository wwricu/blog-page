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
        const { name } = router.query
        const url = name ? `/${name}` : ''
        router.push(`${url}/${pageIndex}`).then()
    }

    return (
        <Flex vertical>
            {postDetailPageVO?.post_details?.map(postDetailVO =>
                <PostCard key={postDetailVO.id} postDetailVO={postDetailVO}/>)}
            <Pagination
                className='my-5 max-sm:my-1'
                align="center"
                current={postDetailPageVO.page_index}
                total={postDetailPageVO.count}
                onChange={changePage}
            />
        </Flex>
    )
}
