import Link from "next/link"
import React from "react"

type PaginationProps = {
    total: number,
    current: number
    pageSize?: number
    className?: string
    baseUrl: string
}

export default function Pagination({ current = 1, total, pageSize = 10, baseUrl, className }: PaginationProps) {
    const delta = 1
    const pageCount = Math.ceil(total / pageSize)
    if (total <= 0 || current <= 0 || current > pageCount) {
        return null
    }

    const getButtonValues = () => {
        const pages: (number | string)[] = []
        if (pageCount < 1) {
            return pages
        }

        pages.push(1)

        if (current - 1 > delta + 1) {
            pages.push('...')
        }

        for (let i = 1; i <= delta; i++) {
            if (current - delta + i - 1 > 1) {
                pages.push(current - delta + i - 1)
            }
        }

        if (current > 1 && current < pageCount) {
            pages.push(current)
        }

        for (let i = 1; i <= delta; i++) {
            if (current + i < pageCount) {
                pages.push(current + i)
            }
        }

        if (current + delta < pageCount - 1) {
            pages.push('...')
        }

        if (pageCount > 1) {
            pages.push(pageCount)
        }

        return pages
    }

    const getUrl = (page: string) => {
        if (page === '1') {
            return baseUrl
        }
        // split for unexpected tailing slash
        return `${baseUrl}${baseUrl.endsWith('/') ? '' : '/'}${page}`
    }

    return (
        <div className={`join ${className}`}>
            {
                getButtonValues().map((value, i) => {
                    const status = value === current ? 'btn-active btn-primary text-primary-content' : 'btn-ghost'
                    return (
                        <Link
                            key={i}
                            href={value === '...' ? '' : getUrl(value.toString())}
                            className={`join-item btn btn-outline border-base-300 text-base-content max-md:btn-sm md:btn-md ${status}`}
                        >
                            {value}
                        </Link>
                    )
                })
            }
        </div>
    )
}
