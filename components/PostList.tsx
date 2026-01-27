import {PostDetailPageVO} from "@/common/model";
import PostCard from "@/components/PostCard";
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import Pagination from "@/components/Pagination";

type PostListProps = {
    postDetailPageVO: PostDetailPageVO;
}

export default function PostList({postDetailPageVO}: PostListProps) {
    const router = useRouter();
    const [current, setCurrent] = React.useState<number>(1);

    /*
    * Since we use itemRender to assign page url to each button,
    * onChange is not reliable anymore because it is invoked on click before goto new page by url on buttons.
    * Next.js does not refresh the entire page under the same router so the page number behaves correctly
    * when user jump between pages but the page was fully loaded when user click page button on the index page
    * that router changes, so I suggest to use useEffect hook to ensure everyone sees correct page number.
    */
    useEffect(() => {
        setCurrent(postDetailPageVO.page_index)
    }, [postDetailPageVO.page_index])

    const getUrl = (page: number) => {
        const pathname = router.pathname
        if (pathname.includes('[page]')) {
            return pathname.replace('[page]', page.toString())
        }
        const split = pathname.endsWith('/') ? '' : '/'
        return `${pathname}${split}${page}`
    }

    return (
        <div className='flex flex-col items-center'>
            {postDetailPageVO?.data?.map(postDetailVO =>
                <PostCard key={postDetailVO.id} postDetailVO={postDetailVO}/>)}
            <Pagination
                className='mt-4 mb-2'
                current={current}
                total={postDetailPageVO.count}
                getHref={getUrl}
            />
        </div>
    )
}
