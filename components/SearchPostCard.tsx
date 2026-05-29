import {PostSearchVO} from '@/common/model'
import {highlightKeyword} from '@/common/common'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import {PostCategory, PostCreateTime, PostTagList} from "@/components/PostMeta"

const markStyle = '[&_mark]:bg-warning/40 [&_mark]:text-base-content [&_mark]:rounded-sm [&_mark]:px-0.5'

export default function SearchPostCard({ hit, keyword, index }: { hit: PostSearchVO, keyword: string, index: number }) {
    const hasCover = hit.cover?.url != null && hit.cover?.name != null
    const titleHtml = highlightKeyword(hit.title ?? '', keyword)
    const previewHtml = highlightKeyword(hit.preview ?? '', keyword)
    const snippetHtml = hit.snippet ? highlightKeyword(hit.snippet, keyword) : null
    return (
        <div className={
            `flex justify-between pl-1 min-w-2xs bg-base-100 rounded-lg
            relative hover:shadow-lg transition hover:-translate-y-px
            before:absolute before:left-0 before:top-3 before:bottom-3 before:w-0.5 before:bg-primary before:rounded-full before:opacity-0 hover:before:opacity-100 before:transition-opacity
            max-sm:min-h-16 max-md:w-full md:w-3xl md:min-h-36`
        }>
            <div className={`flex flex-col flex-1 items-start min-w-0 max-sm:p-2 sm:p-4`}>
                <Link className='w-full' href={`/detail/${hit.id}`}>
                    <h4
                        className={`text-base-content font-medium line-clamp-1 transition-colors hover:text-primary sm:text-lg ${markStyle}`}
                        dangerouslySetInnerHTML={{__html: titleHtml}}
                    />
                    <p
                        className={`text-base-content/70 line-clamp-2 font-normal max-h-16 min-h-0 text-sm ${hasCover ? 'mt-2' : 'my-2'} max-sm:text-xs ${markStyle}`}
                        dangerouslySetInnerHTML={{__html: previewHtml}}
                    />
                    {snippetHtml ? (
                        <p
                            className={`text-base-content/60 line-clamp-2 font-normal text-sm max-sm:text-xs italic border-l-2 border-base-content/20 pl-2 mt-1 mb-2 ${markStyle}`}
                            dangerouslySetInnerHTML={{__html: snippetHtml}}
                        />
                    ) : null}
                </Link>
                <Link className='w-full flex-1' href={`/detail/${hit.id}`} aria-label={hit.title}/>
                <div className={`flex gap-y-1 gap-x-4 flex-wrap w-full`}>
                    <PostCreateTime createTime={hit?.create_time}/>
                    <PostCategory category={hit?.category}/>
                    <PostTagList tagList={hit?.tag_list}/>
                    <Link className='flex-1' href={`/detail/${hit.id}`} aria-label={hit.title}/>
                </div>
            </div>
            {
                hasCover ? (
                    <Link className="relative w-72 h-36 shrink-0 self-start max-md:hidden" href={`/detail/${hit.id}`}>
                        <Image
                            priority={ index < 3 }
                            loading={ index < 3 ? 'eager' : 'lazy' }
                            fetchPriority={ index < 3 ? 'high' : 'auto' }
                            quality={75}
                            width={288}
                            height={144}
                            alt={hit.cover!.name!}
                            src={hit.cover!.url}
                            className='object-cover rounded-r-lg w-full h-full'
                        />
                        <div className='absolute inset-0 bg-black/40 dark:block hidden rounded-r-lg'/>
                    </Link>
                ) : null
            }
        </div>
    )
}
