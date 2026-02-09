'use client'

import React, {useEffect, useRef, useState} from 'react'
import {
    House,
    Info,
    Mail,
    List,
    Tags
} from 'lucide-react'
import {GetAboutAPI} from "@/common/api"
import {usePathname} from "next/navigation"
import Link from "next/link"
import {GithubIcon} from "@/components/Common"
import {monospace} from "@/common/common"

export default function Header() {
    const pathname = usePathname()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [about, setAbout] = useState<string>('')
    const [postCount, setPostCount] = useState<number>(0)
    const [categoryCount, setCategoryCount] = useState<number>(0)
    const [tagCount, setTagCount] = useState<number>(0)
    const [currentRoute, setCurrentRoute] = useState<string>('')
    const modalRef = useRef<HTMLDialogElement>(null)

    const menuItemClassName = `btn btn-sm font-semibold h-full text-base-content rounded-none border-0 shadow-none max-sm:px-2`
    const menuIconClassName = 'stroke-2 w-3.75 h-3.75'

    const headers = [
        { url: '/', label: 'Home', Icon: House},
        { url: '/categories', label: 'Category', Icon: List},
        { url: '/tags', label: 'Tag', Icon: Tags},
    ]

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
            return `${menuItemClassName} btn-active text-primary`
        }
        return `${menuItemClassName} btn-ghost`
    }

    const getIconStyle = (path: string | undefined = undefined) => {
        if ((isModalOpen && path == null) || !isModalOpen && currentRoute === path) {
            return `${menuIconClassName} stroke-base-primary`
        }
        return `${menuIconClassName} stroke-base-content`
    }

    const renderStat = (
        statList: {
            title: string
            value: number
        }[]
    ) => {
        return (
            <>
                {
                    statList.map((stat) => (
                        <div key={stat.title} className='stat place-items-center'>
                            <div className="stat-title text-sm font-medium text-base-content/60">{stat.title}</div>
                            <div className="stat-value text-3xl font-normal text-base-content">{stat.value}</div>
                        </div>
                    ))
                }
            </>
        )
    }

    return (
        <>
            <div className='flex justify-between items-center sticky top-0 bg-base-100 shadow-sm flex-wrap h-10'>
                <div className='flex justify-start items-center flex-wrap h-full'>
                    {
                        headers.map(({url, label, Icon}) =>
                            <Link key={url} href={url} className={getButtonStyle(url)}>
                                <Icon className={getIconStyle(url)}/>
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
                <div className="modal-box bg-base-100 max-h-screen">
                    <div dangerouslySetInnerHTML={{__html: about}} className='min-h-48'/>
                    <div className='border-t border-base-content/30 mt-6 mb-4'/>
                    <div className='flex justify-around'>
                        {
                            renderStat([
                                {title: 'Post', value: postCount},
                                {title: 'Category', value: categoryCount},
                                {title: 'Tag', value: tagCount},
                            ])
                        }
                    </div>
                    <div className='border-t border-base-content/30 mt-4 mb-6'/>
                    <div className={`flex justify-between ${monospace.className}`}>
                        <Link className='flex-1 mr-2' href='https://github.com/wwricu' target='_blank'>
                            <button className='btn btn-active btn-primary btn-sm text-primary-content rounded w-full hover:btn-accent hover:text-accent-content'>
                                <GithubIcon className={`invert ${menuIconClassName}`}/>GitHub
                            </button>
                        </Link>
                        <Link className='flex-1 ml-2' href='mailto:me@wwr.icu'>
                            <button className='btn btn-ghost text-base-content border-primary rounded-s btn-sm rounded w-full hover:btn-accent hover:border-none'>
                                <Mail className={`${menuIconClassName} stroke-base-primary`}/>Mail me
                            </button>
                        </Link>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}
