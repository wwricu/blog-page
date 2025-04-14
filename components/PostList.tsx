import {PostDetailPageVO} from "@/common/model";
import PostCard from "@/components/PostCard";
import {Flex, Pagination} from "antd";
import React from "react";
import {useRouter} from "next/router";
import Link from "next/link";


type PostListProps = {
    postDetailPageVO: PostDetailPageVO;
}

export default function PostList({postDetailPageVO}: PostListProps) {
    const router = useRouter();

    const getUrl = (page: number) => {
        const pathname = router.pathname
        if (pathname.includes('[page]')) {
            return pathname.replace('[page]', page.toString())
        }
        return `${pathname}/${page}`
    }

    const itemRender = (
        page: number,
        type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
        element: React.ReactNode
    ) => {
        return (
            <Link href={getUrl(page)}>
                {type === 'page' ? page : element}
            </Link>
        )
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
                itemRender={itemRender}
            />
        </Flex>
    )
}
