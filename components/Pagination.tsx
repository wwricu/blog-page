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
    if (total <= 0 || current <= 0 || current > pageCount) {
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

    const arrow = (page: number, label: string, Icon: typeof ChevronLeft) => (
        <Link href={getUrl(page)} aria-label={label} className={`${itemClass} ${inactiveClass}`}>
            <Icon className='w-4 h-4'/>
        </Link>
    )

    return (
        <nav aria-label='Pagination' className={`flex items-center gap-1 ${className}`}>
            {current > 1 && arrow(current - 1, 'Previous page', ChevronLeft)}
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
            {current < pageCount && arrow(current + 1, 'Next page', ChevronRight)}
        </nav>
    )
}
