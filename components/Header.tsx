'use client'

import React, {useEffect, useRef, useState} from 'react'
import {House, Info, Mail, List, Tags} from 'lucide-react'
import {GetAboutAPI} from "@/common/api"
import {usePathname} from "next/navigation"
import Link from "next/link"
import {iconClassNames, monospace} from "@/common/common"

const menuItemClassName = `btn btn-sm btn-ghost rounded-none border-0 shadow-none h-full text-base-content
                           border-b-2 pt-0.5 hover:bg-primary/10 max-sm:pl-2`

const headers = [
    { url: '/', label: 'Home', Icon: House },
    { url: '/categories', label: 'Category', Icon: List },
    { url: '/tags', label: 'Tag', Icon: Tags, iconClassName: 'relative top-[0.75px] transform scale-x-[-1]'},
]

const GithubIcon = ({ className='', }) => {
    return (
        <svg
            className={className}
            role="img"
            viewBox="0 0 24 24"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
                0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7
                3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305
                3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93
                0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399
                3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84
                1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015
                3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
        </svg>
    )
}

export default function Header() {
    const pathname = usePathname()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [about, setAbout] = useState<string>('')
    const [postCount, setPostCount] = useState<number>(0)
    const [categoryCount, setCategoryCount] = useState<number>(0)
    const [tagCount, setTagCount] = useState<number>(0)
    const [currentRoute, setCurrentRoute] = useState<string>('')
    const modalRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        setCurrentRoute(pathname?.replace(/\/\[.*]/g, "") || '/')
        GetAboutAPI().then((res) => {
            setAbout(res.content)
            setPostCount(res.post_count)
            setCategoryCount(res.category_count)
            setTagCount(res.tag_count)
        })
    }, [pathname])

    const getButtonStyle = (path: string | undefined = undefined) => {
        if ((isModalOpen && path == null) || !isModalOpen && currentRoute === path) {
            return `${menuItemClassName} border-primary text-primary font-bold`
        }
        return `${menuItemClassName} border-transparent font-semibold`
    }

    const getIconStyle = (path: string | undefined = undefined)=>
        `${iconClassNames} stroke-base-${(isModalOpen && path == null) || !isModalOpen && currentRoute === path ? 'primary' : 'content'}`

    return (
        <>
            <div className='flex justify-between items-center sticky z-100 top-0 bg-base-100 shadow-xs h-10 overflow-x-auto overflow-y-clip'>
                <div className='flex justify-start items-center h-full'>
                    {
                        headers.map(({url, label, Icon, iconClassName}) =>
                            <Link key={url} href={url} className={getButtonStyle(url)}>
                                <Icon className={`${getIconStyle(url)} ${iconClassName}`}/>
                                {label}
                            </Link>
                        )
                    }
                </div>
                <button
                    className={getButtonStyle()}
                    onClick={() => {
                        modalRef?.current?.showModal()
                        setIsModalOpen(true)
                    }}
                >
                    <Info className={getIconStyle()}/>About
                </button>
            </div>
            <dialog className='modal' ref={modalRef} onClose={() => setIsModalOpen(false)} >
                <div className="modal-box bg-base-100 max-xs:p-2 overflow-x-auto">
                    <div className="min-w-60">
                        <div dangerouslySetInnerHTML={{__html: about}} className='min-h-48'/>
                        <div className='border-t border-base-content/30 mt-6 mb-4'/>
                        <div className='flex justify-around'>
                            {
                                [
                                    {title: 'Post', value: postCount},
                                    {title: 'Category', value: categoryCount},
                                    {title: 'Tag', value: tagCount},
                                ].map(
                                    (stat) => (
                                        <div key={stat.title} className='stat place-items-center max-sm:px-4'>
                                            <div className="stat-title text-sm font-medium text-base-content/60">{stat.title}</div>
                                            <div className="stat-value text-3xl font-normal text-base-content">{stat.value}</div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                        <div className='border-t border-base-content/30 mt-4 mb-6'/>
                        <div className={`flex justify-between ${monospace.className}`}>
                            <Link className='flex-1 mr-2' href='https://github.com/wwricu' target='_blank'>
                                <button className='btn btn-active btn-primary btn-sm text-primary-content rounded w-full transition-colors hover:btn-accent hover:text-accent-content'>
                                    <GithubIcon className={`invert dark:invert-0 ${iconClassNames}`}/>GitHub
                                </button>
                            </Link>
                            <Link className='flex-1 ml-2' href='mailto:me@wwr.icu'>
                                <button className='btn btn-ghost text-base-content border-primary rounded-s btn-sm rounded w-full transition-colors hover:btn-accent hover:border-none'>
                                    <Mail className={`${iconClassNames} stroke-base-primary`}/>Mail me
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}
