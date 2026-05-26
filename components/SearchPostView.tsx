import React from "react"
import {SearchBlogPosts} from "@/common/api"
import {PathParams, SearchUrl} from "@/common/common"
import {notFound} from "next/navigation"
import PostCard from "@/components/PostCard"

const SEARCH_LIMIT = 30

export default async function SearchPostView({ keyword }: PathParams) {
    const decodedKeyword = keyword ? decodeURIComponent(keyword) : ''
    if (!decodedKeyword.trim()) {
        notFound()
    }

    const page = await SearchBlogPosts(decodedKeyword, 1, SEARCH_LIMIT)
    const shownCount = page.data?.length ?? 0
    const truncated = page.count > SEARCH_LIMIT

    return (
        <div className={`
            flex flex-col items-center w-full overflow-x-auto
            max-sm:gap-y-1 max-sm:px-1 max-sm:mt-1
            sm:gap-y-2 sm:mt-2 sm:px-2
            md:p-0 md:gap-y-3 md:mt-3`
        }>
            <div className='breadcrumbs py-0 min-w-2xs text-base-content/70 text-sm w-full max-sm:pl-2 sm:pl-4 max-md:w-full md:w-3xl'>
                <ul>
                    <li><a className='hover:text-primary' href={'/'}>Home</a></li>
                    <li>{SearchUrl}</li>
                    <li>{decodedKeyword}</li>
                </ul>
            </div>
            {
                page.data?.map((postDetailVO, i) =>
                    <PostCard key={postDetailVO.id} index={i} postDetailVO={postDetailVO}/>
                )
            }
            {
                shownCount === 0 ? (
                    <div className='text-base-content/60 text-sm py-8 text-center max-md:w-full md:w-3xl'>
                        No matching posts. Try different keywords.
                    </div>
                ) : null
            }
            {
                truncated ? (
                    <div className='text-base-content/50 text-xs text-center py-4 mb-4 max-md:w-full md:w-3xl'>
                        Showing top {SEARCH_LIMIT} of {page.count} results · refine your keyword for fewer matches
                    </div>
                ) : null
            }
        </div>
    )
}
