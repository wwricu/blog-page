import React from "react"
import Link from "next/link"

type PaginationProps = {
    total: number,
    current: number
    getHref: (page: number) => Promise<string>
    pageSize?: number
    className?: string
}

export const Pagination = async ({ current = 1, total, getHref, pageSize = 10, className }: PaginationProps) => {
    const delta = 1

    if (total < 0) {
        total = 0
    }
    const pageCount = Math.ceil(total / pageSize)

    if (current < 1) {
        current = 1
    } else if (current > pageCount) {
        current = pageCount
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

    const buttons = getButtonValues()
    const buttonProps = []

    for (let i = 0; i < buttons.length; i++) {
        const value = buttons[i]
        let status = ''
        if (value === '...') {
            status = 'bg-transparent'
        } else if (value === current) {
            status = 'btn-active'
        }
        buttonProps.push({
            value: value,
            href: value === '...' ? '' : await getHref(Number(value)),
            status: status
        })
    }

    return (
        <div className={`join ${className}`}>
            {
                buttonProps.map((item, i) => {
                    return <Link key={i} href={item.href}>
                        <button className={"join-item btn btn-soft btn-neutral btn-md " + item.status}>{item.value}</button>
                    </Link>
                })
            }
        </div>
    )
}

export const VerticalDivider = () => {
    return <div className='border-l h-4 inline-block align-middle border-gray-400'/>
}
