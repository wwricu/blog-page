import Link from "next/link"
import {ChevronLeft, ChevronRight} from "lucide-react"
import React from "react"

type PaginationProps = {
    total: number,
    current: number
    pageSize?: number
    className?: string
    baseUrl: string
}

const itemClass = 'flex h-8 min-w-8 items-center justify-center rounded-md px-1 text-sm transition-colors'
const inactiveClass = 'text-base-content/70 hover:bg-base-300/50 hover:text-base-content'
const activeClass = 'bg-primary/10 text-primary font-medium ring-1 ring-primary/25'

export default function Pagination({ current = 1, total, pageSize = 10, baseUrl, className }: PaginationProps) {
    const pageCount = Math.ceil(total / pageSize)
    // A single page has nothing to page through; the bar would be an empty frame under the list
    if (total <= 0 || current <= 0 || current > pageCount || pageCount <= 1) {
        return null
    }

    // First and last pages are always shown, plus the neighbours of the current one; anything skipped becomes a single ellipsis
    const pages: (number | '...')[] = [1]
    const from = Math.max(2, current - 1)
    const to = Math.min(pageCount - 1, current + 1)
    if (from > 2) {
        pages.push('...')
    }
    for (let page = from; page <= to; page++) {
        pages.push(page)
    }
    if (to < pageCount - 1) {
        pages.push('...')
    }
    if (pageCount > 1) {
        pages.push(pageCount)
    }

    const getUrl = (page: number) => page === 1
        ? baseUrl
        // split for unexpected tailing slash
        : `${baseUrl}${baseUrl.endsWith('/') ? '' : '/'}${page}`

    const edgeClass = `${itemClass} gap-1.5 px-2.5`
    const edge = (page: number, label: string, Icon: typeof ChevronLeft, leading: boolean) => {
        const inner = (
            <>
                {leading ? <Icon className='w-4 h-4'/> : null}
                {label}
                {leading ? null : <Icon className='w-4 h-4'/>}
            </>
        )
        return page >= 1 && page <= pageCount
            ? <Link href={getUrl(page)} aria-label={label} className={`${edgeClass} ${inactiveClass}`}>{inner}</Link>
            : <span aria-hidden='true' className={`${edgeClass} text-base-content/25`}>{inner}</span>
    }

    return (
        <nav aria-label='Pagination' className={`
            flex items-center justify-between gap-3 min-w-2xs w-full max-md:w-full md:w-3xl
            rounded-xl bg-base-100 ring-1 ring-base-300 px-2 py-1.5 ${className}
        `}>
            {edge(current - 1, 'Prev', ChevronLeft, true)}
            <div className='flex items-center gap-1'>
                {
                    pages.map((page, i) => page === '...' ? (
                        // Ellipsis placeholder: not a link, hidden from assistive tech
                        <span key={i} aria-hidden='true' className={`${itemClass} text-base-content/30`}>…</span>
                    ) : (
                        <Link
                            key={i}
                            href={getUrl(page)}
                            aria-current={page === current ? 'page' : undefined}
                            className={`${itemClass} ${page === current ? activeClass : inactiveClass}`}
                        >
                            {page}
                        </Link>
                    ))
                }
            </div>
            {edge(current + 1, 'Next', ChevronRight, false)}
        </nav>
    )
}
