import {PostDetailPageVO} from "@/common/model"
import PostCard from "@/components/PostCard"
import React from "react"
import Pagination from "@/components/Pagination"
import dynamic from 'next/dynamic'

const MobilePagination = dynamic(() => import('@/components/MobilePagination'))

type MobilePaginationParams = {
    category?: string
    tag?: string
}

type PostListProps = {
    page: PostDetailPageVO
    pageSize: number
    baseUrl: string
    breadcrumb?: React.ReactNode
    mobile?: MobilePaginationParams
}

export default function PostList({ page, pageSize, baseUrl, breadcrumb, mobile }: PostListProps) {
    return (
        <div className={`
            flex flex-col items-center w-full overflow-x-auto
            max-sm:gap-y-1 max-sm:px-1 max-sm:mt-1
            sm:gap-y-2 sm:mt-2 sm:px-2
            md:p-0 md:gap-y-3 md:mt-3`
        }>
            {
                breadcrumb ?
                (
                    <div className={`breadcrumbs py-0 min-w-2xs text-base-content/70 text-sm w-full max-sm:pl-2 sm:pl-4 max-md:w-full md:w-3xl`}>
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
                className='max-sm:hidden max-sm:mt-1 max-sm:mb-2 sm:mt-2 sm:mb-4 md:mt-3 md:mb-6'
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
                    />
                ) : null
            }
        </div>
    )
}
