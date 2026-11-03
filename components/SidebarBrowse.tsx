import React from 'react'
import Link from 'next/link'
import {ChevronRight} from 'lucide-react'
import {GetAllTagsAPI} from '@/common/api'
import {CategoriesURL, TagsUrl} from '@/common/common'
import {TagTypeEnum, TagVO} from '@/common/model'

/* Native details/summary: collapsing needs no client state, and because the sidebar lives in
   the root layout the chosen state survives client-side navigation (a reload reopens). */
const Group = ({ title, tags, base }: { title: string, tags: TagVO[], base: string }) => (
    <details open className='pt-4 first:pt-0'>
        <summary className='flex cursor-pointer select-none list-none items-center gap-1 px-5 pb-1.5 text-[11px] font-medium tracking-wider text-base-content/45 uppercase transition-colors hover:text-base-content/70 [&::-webkit-details-marker]:hidden'>
            <ChevronRight className='w-3 h-3 shrink-0'/>
            {title}
        </summary>
        <nav className='flex flex-col gap-0.5 px-2'>
            {tags.map(tag => (
                <Link
                    key={tag.id}
                    href={`/${base}/${encodeURIComponent(tag.name)}`}
                    className='group flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-base-content/75 transition-colors hover:bg-base-300/35 hover:text-base-content'
                >
                    <span className='truncate'>{tag.name}</span>
                    <span className='ml-auto shrink-0 text-xs tabular-nums text-base-content/40 transition-colors group-hover:text-base-content/60'>
                        {tag.count}
                    </span>
                </Link>
            ))}
        </nav>
    </details>
)

/* Fills the space the nav leaves behind with something that is also a shortcut: every
   category and tag with its post count. Rendered by the layout, so it shares the page's
   ISR window instead of adding a request per visit. */
export default async function SidebarBrowse() {
    let categories: TagVO[] = []
    let tags: TagVO[] = []
    try {
        [categories, tags] = await Promise.all([
            GetAllTagsAPI(TagTypeEnum.POST_CAT),
            GetAllTagsAPI(TagTypeEnum.POST_TAG),
        ])
    } catch {
        // Navigation still works without the lists
        return null
    }
    if (!categories.length && !tags.length) return null

    return (
        <div className='pb-4'>
            {categories.length ? <Group title='Categories' tags={categories} base={CategoriesURL}/> : null}
            {tags.length ? <Group title='Tags' tags={tags} base={TagsUrl}/> : null}
        </div>
    )
}
