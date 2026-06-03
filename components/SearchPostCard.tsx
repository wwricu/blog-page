import {PostSearchVO} from '@/common/model'
import {highlightKeyword} from '@/common/common'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import {PostCategory, PostCreateTime, PostTagList} from "@/components/PostMeta"

const markStyle = '[&_mark]:bg-warning/40 [&_mark]:text-base-content [&_mark]:font-medium [&_mark]:rounded-sm [&_mark]:px-0.5'

export default function SearchPostCard({ hit, keyword, index }: { hit: PostSearchVO, keyword: string, index: number }) {
    const hasCover = hit.cover?.url != null && hit.cover?.name != null
    const titleHtml = highlightKeyword(hit.title ?? '', keyword)
    const previewHtml = highlightKeyword(hit.preview ?? '', keyword)
    const snippetHtml = hit.snippet ? highlightKeyword(hit.snippet, keyword) : null
    const detailUrl = `/detail/${hit.id}`
    return (
        <div className={
            `relative pl-1 min-w-2xs bg-base-100 rounded-lg max-md:w-full md:w-3xl
            hover:shadow-lg transition hover:-translate-y-px
            before:absolute before:left-0 before:top-3 before:bottom-3 before:w-0.5 before:bg-primary before:rounded-full before:opacity-0 hover:before:opacity-100 before:transition-opacity`
        }>
            <div className={`flex justify-between max-sm:min-h-16 ${hasCover ? 'md:h-36' : 'md:min-h-36'}`}>
                <div className={`flex flex-col flex-1 items-start min-w-0 max-sm:p-2 sm:p-4`}>
                    <Link className='w-full' href={detailUrl}>
                        <h4
                            className={`text-base-content font-medium line-clamp-1 transition-colors hover:text-primary sm:text-lg ${markStyle}`}
                            dangerouslySetInnerHTML={{__html: titleHtml}}
                        />
                        <p
                            className={`text-base-content/70 line-clamp-2 font-normal max-h-16 min-h-0 text-sm ${hasCover ? 'mt-2' : 'my-2'} max-sm:text-xs ${markStyle}`}
                            dangerouslySetInnerHTML={{__html: previewHtml}}
                        />
                    </Link>
                    <Link className='w-full flex-1' href={detailUrl} aria-label={hit.title}/>
                    <div className={`flex gap-y-1 gap-x-4 flex-wrap w-full`}>
                        <PostCreateTime createTime={hit?.create_time}/>
                        <PostCategory category={hit?.category}/>
                        <PostTagList tagList={hit?.tag_list}/>
                        <Link className='flex-1' href={detailUrl} aria-label={hit.title}/>
                    </div>
                </div>
                {hasCover ? (
                    <Link className='relative w-72 h-36 max-md:hidden' href={detailUrl}>
                        <Image
                            priority={ index < 3 }
                            loading={ index < 3 ? 'eager' : 'lazy' }
                            fetchPriority={ index < 3 ? 'high' : 'auto' }
                            quality={75}
                            width={288}
                            height={144}
                            alt={hit.cover!.name!}
                            src={hit.cover!.url}
                            className='object-cover rounded-r-lg h-full'
                        />
                        <div className='absolute inset-0 bg-black/40 dark:block hidden rounded-r-box'/>
                    </Link>
                ) : null}
            </div>
            {snippetHtml ? (
                <Link href={detailUrl} className='block max-sm:mx-2 max-sm:pt-2 max-sm:pb-2 sm:mx-4 sm:pt-3 sm:pb-4 border-t border-base-300/60 group/snippet' aria-label={hit.title}>
                    <div className='flex items-start gap-2.5'>
                        <span className='shrink-0 text-[10px] tracking-wider font-semibold text-primary/80 uppercase px-1.5 py-0.5 rounded bg-primary/10 mt-0.5 transition-colors group-hover/snippet:bg-primary/20'>
                            Match
                        </span>
                        <p
                            className={`flex-1 min-w-0 text-base-content/60 line-clamp-2 text-xs leading-relaxed italic ${markStyle}`}
                            dangerouslySetInnerHTML={{__html: snippetHtml}}
                        />
                    </div>
                </Link>
            ) : null}
        </div>
    )
}
