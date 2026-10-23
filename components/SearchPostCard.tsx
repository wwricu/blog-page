import {PostSearchVO} from '@/common/model'
import {convertMarkersToHtml} from '@/common/common'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import {PostCategory, PostCreateTime, PostTagList} from "@/components/PostMeta"

const markStyle = '[&_mark]:bg-warning/40 [&_mark]:text-base-content [&_mark]:font-medium [&_mark]:rounded-sm [&_mark]:px-0.5'

export default function SearchPostCard({ hit, index }: { hit: PostSearchVO, index: number }) {
    const hasCover = hit.cover?.url != null && hit.cover?.name != null
    const titleHtml = convertMarkersToHtml(hit.title ?? '')
    const previewHtml = convertMarkersToHtml(hit.preview ?? '')
    const snippetHtml = convertMarkersToHtml(hit.snippet ?? null)
    const detailUrl = `/detail/${hit.id}`
    return (
        <div className={
            `group min-w-2xs w-full rounded-xl bg-base-100 ring-1 ring-base-300 px-4 py-5
            transition-shadow hover:shadow-sm hover:ring-base-content/25 max-sm:px-3 max-md:w-full md:w-3xl`
        }>
            <div className='flex items-center justify-between gap-4 md:h-24'>
                {/* Same fixed line budget as PostCard: title / 2-line preview / meta */}
                <div className='flex flex-col flex-1 items-start min-w-0'>
                    <Link className='w-full' href={detailUrl}>
                        <h4
                            className={`text-base-content text-[17px] font-semibold tracking-tight leading-6 line-clamp-1 transition-colors group-hover:text-primary ${markStyle}`}
                            dangerouslySetInnerHTML={{__html: titleHtml}}
                        />
                        <p
                            className={`text-base-content/70 font-normal leading-6 text-sm line-clamp-1 max-sm:text-xs ${markStyle}`}
                            dangerouslySetInnerHTML={{__html: previewHtml}}
                        />
                    </Link>
                    <div className='flex gap-x-3 gap-y-1 w-full flex-nowrap overflow-hidden'>
                        <PostCreateTime createTime={hit?.create_time}/>
                        <PostCategory category={hit?.category}/>
                        <PostTagList tagList={hit?.tag_list}/>
                        <Link className='flex-1' href={detailUrl} aria-label={hit.title}/>
                    </div>
                </div>
                {hasCover ? (
                    <Link className='relative w-52 h-24 shrink-0 max-md:hidden' href={detailUrl}>
                        <Image
                            priority={ index < 3 }
                            loading={ index < 3 ? 'eager' : 'lazy' }
                            fetchPriority={ index < 3 ? 'high' : 'auto' }
                            quality={75}
                            width={208}
                            height={96}
                            alt={hit.cover!.name!}
                            src={hit.cover!.url}
                            className='object-cover w-full h-full rounded-lg ring-1 ring-base-300'
                        />
                        <div className='absolute inset-0 bg-black/40 dark:block hidden rounded-lg'/>
                    </Link>
                ) : null}
            </div>
            {snippetHtml ? (
                <Link href={detailUrl} className='block mt-4 pt-4 border-t border-base-300 group/snippet' aria-label={hit.title}>
                    <div className='flex items-start gap-2.5'>
                        <span className='shrink-0 text-[10px] tracking-wider font-semibold text-primary/80 uppercase px-1.5 py-0.5 rounded bg-primary/10 mt-0.5 transition-colors group-hover/snippet:bg-primary/20'>
                            Match
                        </span>
                        <p
                            className={`flex-1 min-w-0 text-base-content/70 line-clamp-2 text-xs leading-relaxed italic ${markStyle}`}
                            dangerouslySetInnerHTML={{__html: snippetHtml}}
                        />
                    </div>
                </Link>
            ) : null}
        </div>
    )
}
