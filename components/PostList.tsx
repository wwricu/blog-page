import {PostDetailPageVO} from "@/common/model";
import PostCard from "@/components/PostCard";
import {Flex, Pagination} from "antd";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";


type PostListProps = {
    postDetailPageVO: PostDetailPageVO;
}

export default function PostList({postDetailPageVO}: PostListProps) {
    const router = useRouter();
    const [useLink, setUseLink] = useState<boolean>();

    useEffect(() => {
        const { name } = router.query;
        setUseLink(!name);
    }, [router])

    const itemRender = (
        page: number,
        type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
        element: React.ReactNode
    ) => {
        return (
            <Link href={`/${page}`}>
                {type === 'page' ? page : element}
            </Link>
        )
    }

    const changePage = (pageIndex: number) => {
        const { name } = router.query
        router.push(`${name ? `/${name}` : ''}/${pageIndex}`).then()
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
                itemRender={useLink ? itemRender : undefined}
                onChange={useLink ? undefined : changePage}
            />
        </Flex>
    )
}
