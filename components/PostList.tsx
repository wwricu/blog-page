import {PostPreviewPageVO} from "@/common/model"
import PostCard from "@/components/PostCard"
import React from "react"
import Pagination from "@/components/Pagination"
import dynamic from 'next/dynamic'

const MobilePagination = dynamic(() => import('@/components/MobilePagination'))

type MobilePaginationParams = {
    category?: string
    tag?: string
    pageIndex: number
}

type PostListProps = {
    page: PostPreviewPageVO
    pageSize: number
    baseUrl: string
    breadcrumb?: React.ReactNode
    mobile?: MobilePaginationParams
}

export default function PostList({ page, pageSize, baseUrl, breadcrumb, mobile }: PostListProps) {
    return (
        <div className={`
            flex flex-col items-center gap-3 w-full overflow-x-auto
            max-sm:px-1 max-sm:mt-3
            sm:mt-4 sm:px-2
            md:mt-5 md:p-0`
        }>
            {
                breadcrumb ?
                (
                    <div className={`breadcrumbs py-0 min-w-2xs text-base-content/70 text-sm w-full max-sm:pl-3 sm:pl-4 max-md:w-full md:w-3xl`}>
                        {breadcrumb}
                    </div>
                ) : null
            }
            {
                page?.data?.map((postDetailVO, i) =>
                    <PostCard key={postDetailVO.id} index={i} postDetailVO={postDetailVO}/>
                )
            }
            <Pagination
                className='max-sm:hidden mb-2'
                current={page.page_index}
                total={page.count}
                pageSize={pageSize}
                baseUrl={baseUrl}
            />
            {
                mobile ? (
                    <MobilePagination
                        className='sm:hidden'
                        category={mobile.category}
                        tag={mobile.tag}
                        pageIndex={mobile.pageIndex}
                    />
                ) : null
            }
        </div>
    )
}
