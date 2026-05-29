import React from "react"
import {SearchBlogPosts} from "@/common/api"
import {PathParams, SearchUrl} from "@/common/common"
import {notFound} from "next/navigation"
import PostCard from "@/components/PostCard"

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c] as string))

const highlight = (text: string, keyword: string): string => {
    const escaped = escapeHtml(text)
    const tokens = keyword.split(/\s+/).filter(Boolean).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    if (!tokens.length) return escaped
    return escaped.replace(new RegExp(`(${tokens.join('|')})`, 'gi'), '<mark>$1</mark>')
}

export default async function SearchPostView({ keyword }: PathParams) {
    const decodedKeyword = keyword ? decodeURIComponent(keyword) : ''
    if (!decodedKeyword.trim()) {
        notFound()
    }

    const hits = await SearchBlogPosts(decodedKeyword)
    const shownCount = hits?.length ?? 0
    const truncated = shownCount >= 30

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
                hits?.map((hit, i) =>
                    <PostCard key={hit.id} index={i} postDetailVO={hit} previewHtml={hit.snippet ? highlight(hit.snippet, decodedKeyword) : undefined}/>
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
                        Showing up to 30 results · refine your keyword for fewer matches
                    </div>
                ) : null
            }
        </div>
    )
}
