import React from "react"
import Link from "next/link"
import {CategoriesURL, PathParams, TagsUrl} from "@/common/common"

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
        let status = 'btn-ghost'
        if (value === '...') {
            status = 'btn-ghost'
        } else if (value === current) {
            status = 'btn-active btn-primary text-neutral'
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
                    return <Link
                        key={i} href={item.href}
                        className={`
                            join-item btn btn-outline
                            border-base-300 text-base-content
                            max-md:btn-sm md:btn-md ${item.status}`}
                    >{item.value}</Link>
                })
            }
        </div>
    )
}

export const VerticalDivider = () => {
    return <div className='border-l h-4 inline-block align-middle border-neutral/60'/>
}

export const GithubIcon = ({ className='', }) => {
    return (
        <svg
            className={className}
            role="img"
            viewBox="0 0 24 24"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
    )
}

export async function BreadCrumb({ filter, name }: PathParams) {
    if ((filter === CategoriesURL || filter === TagsUrl) && name) {
        return (
            <div className="breadcrumbs text-base-content/50 text-sm w-full py-1 pl-2">
                <ul>
                    <li><a className='hover:text-primary' href={'/'}>Home</a></li>
                    <li><a className='hover:text-primary' href={`/${filter}`}>{filter}</a></li>
                    <li>{decodeURIComponent(name)}</li>
                </ul>
            </div>
        )
    }
}

export async function Footer() {
    return (
        <div className='flex flex-col justify-between items-center bg-base-100 text-base-content/60 max-md:h-10 md:h-14'>
            <div className='w-full border-t border-base-300'/>
            <div className='text-sm text-center'>
                wwr.icu {new Date().getFullYear()}
            </div>
            <div/>
        </div>
    )
}
