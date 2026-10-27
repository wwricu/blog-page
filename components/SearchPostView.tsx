import React from "react"
import {SearchBlogPosts} from "@/common/api"
import {PathParams, SearchUrl} from "@/common/common"
import {notFound} from "next/navigation"
import SearchPostCard from "@/components/SearchPostCard"
import {PostSearchVO} from "@/common/model"

export default async function SearchPostView({ keyword }: PathParams) {
    const term = keyword ?? ''
    if (!term.trim()) {
        notFound()
    }

    const hits: PostSearchVO[] = await SearchBlogPosts(term).catch(() => [])
    const shownCount = hits?.length ?? 0
    const truncated = shownCount >= 30

    return (
        <div className={`
            flex flex-col items-center gap-3 w-full overflow-x-auto
            max-sm:px-1 max-sm:mt-1
            sm:mt-2 sm:px-2
            md:mt-3 md:p-0`
        }>
            <div className='breadcrumbs py-0 min-w-2xs text-base-content/70 text-sm w-full max-sm:pl-3 sm:pl-4 max-md:w-full md:w-3xl'>
                <ul>
                    <li><a className='hover:text-primary' href={'/'}>Home</a></li>
                    <li>{SearchUrl}</li>
                    <li>{term}</li>
                </ul>
            </div>
            {
                hits?.map((hit, i) =>
                    <SearchPostCard key={hit.id} index={i} hit={hit}/>
                )
            }
            {
                shownCount === 0 ? (
                    <div className='rounded-xl bg-base-100 ring-1 ring-base-300 text-base-content/70 text-sm py-8 text-center max-md:w-full md:w-3xl'>
                        No matching posts. Try different keywords.
                    </div>
                ) : null
            }
            {
                truncated ? (
                    <div className='text-base-content/50 text-xs text-center py-4 mb-4 max-md:w-full md:w-3xl'>
                        Showing up to 30 results · refine your keyword for fewer matches
                    </div>
                ) : null
            }
        </div>
    )
}
