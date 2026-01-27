import React, {useState} from "react";
import Link from "next/link";

type PaginationProps = {
    total: number,
    current: number,
    getHref: (page: number) => string
    pageSize?: number,
    className?: string,
}

export default function Pagination({ current = 1, total, getHref, pageSize = 10, className }: PaginationProps) {
    const [delta, _] = useState(1);

    if (total < 0) {
        total = 0
    }
    const pageCount = Math.ceil(total / pageSize);

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

        return pages;
    }

    return (
        <div className={`join ${className}`}>
            {
                getButtonValues().map((value, i) => {
                    let buttonStatus = ""
                    if (value === '...') {
                        buttonStatus = 'bg-transparent'
                    } else if (value === current) {
                        buttonStatus = 'btn-active'
                    }
                    const item = <button key={i} className={"join-item btn btn-soft btn-neutral btn-sm " + buttonStatus}>{value}</button>
                    if (value === '...') {
                        return item
                    }
                    return <Link href={getHref(Number(value))}>{item}</Link>
                })
            }
        </div>
    )
}
