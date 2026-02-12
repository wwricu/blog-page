'use client'

import React, {useEffect, useRef, useState} from 'react'
import {House, Info, Mail, List, Tags} from 'lucide-react'
import {GetAboutAPI} from "@/common/api"
import {usePathname} from "next/navigation"
import Link from "next/link"
import {GithubIcon} from "@/components/Common"
import {iconClassNames, monospace} from "@/common/common"

const menuItemClassName = `btn btn-sm btn-ghost rounded-none border-0 shadow-none h-full text-base-content
                           border-b-2 pt-0.5 hover:bg-primary/10 max-sm:pl-2`

const headers = [
    { url: '/', label: 'Home', Icon: House },
    { url: '/categories', label: 'Category', Icon: List },
    { url: '/tags', label: 'Tag', Icon: Tags, iconClassName: 'relative top-[0.75px] transform scale-x-[-1]'},
]

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
            <div className='flex justify-between items-center sticky top-0 bg-base-100 shadow-xs h-10 overflow-x-auto overflow-y-clip'>
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
