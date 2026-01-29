'use client'

import React, {useEffect, useRef, useState} from 'react'
import {
    House,
    LayoutGrid,
    Info,
    Mail, Tags,
} from 'lucide-react'
import {GetAboutAPI} from "@/common/api"
import {usePathname} from "next/navigation"
import Link from "next/link"
import {GithubIcon} from "@/components/Common";

export default function Menu({ className }: { className?: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [about, setAbout] = useState<string>('')
    const [postCount, setPostCount] = useState<number>(0)
    const [categoryCount, setCategoryCount] = useState<number>(0)
    const [tagCount, setTagCount] = useState<number>(0)
    const modalRef = useRef<HTMLDialogElement>(null)


    useEffect(() => {
        GetAboutAPI().then((res) => {
            setAbout(res.content)
            setPostCount(res.post_count)
            setCategoryCount(res.category_count)
            setTagCount(res.tag_count)
        })
    }, [])

    const getEntryActiveClass = (path: string) => {
        if (!isModalOpen && usePathname()?.replace(/\/\[.*]/g, "") === path) {
            return 'menu-active bg-gray-600'
        }
        return ''
    }

    const renderStat = (
        statList: {
            title: string
            value: number
        }[]
    ) => {
        return (
            <>
                {statList.map((stat) => (
                    <div key={stat.title} className='stat place-items-center'>
                        <div className="stat-title text-sm text-gray-400">{stat.title}</div>
                        <div className="stat-value text-3xl font-light">{stat.value}</div>
                    </div>
                ))}
            </>
        )
    }

    return (
        <div className={`py-10 px-5 h-full ${className}`}>
            <div className={`
                flex flex-col p-5 rounded-4xl bg-gray-100 justify-start shadow-xs h-full
            `}>
                <ul className="menu w-full gap-3">
                    <li>
                        <Link href='/' className={`rounded-4xl ${getEntryActiveClass('/')}`}>
                            <House size={15} color="#757575" strokeWidth={2}/>Home
                        </Link>
                    </li>
                    <li>
                        <Link href='/categories' className={`rounded-4xl ${getEntryActiveClass('/categories')}`}>
                            <LayoutGrid size={15} color="#757575" strokeWidth={2}/>Category
                        </Link>
                    </li>
                    <li>
                        <Link href='/tags' className={`rounded-4xl ${getEntryActiveClass('/tags')}`}>
                            <Tags size={15} color="#757575" strokeWidth={2}/>Tags
                        </Link>
                    </li>
                    <li>
                        <button
                            className={`rounded-4xl ${isModalOpen && ' menu-active'}`}
                            onClick={() => {
                                modalRef?.current?.showModal()
                                setIsModalOpen(true)
                            }}
                        >
                            <Info size={15} color="#757575" strokeWidth={2}/>
                            <span className='max-sm:hidden'>
                            About
                        </span>
                        </button>
                    </li>
                </ul>
            </div>

            <dialog className='modal' ref={modalRef} onClose={() => setIsModalOpen(false)} >
                <div className="modal-box bg-slate-100">
                    <div dangerouslySetInnerHTML={{__html: about}} className='min-h-48'/>
                    <div className='divider mb-4'/>
                    <div className='flex justify-around'>
                        {
                            renderStat([
                                {title: 'Post', value: postCount},
                                {title: 'Category', value: categoryCount},
                                {title: 'Tag', value: tagCount},
                            ])
                        }
                    </div>
                    <div className='divider my-4'/>
                    <div className='flex justify-between'>
                        <Link className='grow mr-2 my-1' href='https://github.com/wwricu' target='_blank'>
                            <button className='btn btn-active btn-neutral btn-sm rounded w-full'>
                                <GithubIcon size={15} strokeWidth={2} className={'invert'}/>GitHub
                            </button>
                        </Link>
                        <Link className='grow ml-2 my-1' href='mailto:me@wwr.icu'>
                            <button className='btn bg-white text-black border-[#e5e5e5] rounded-s btn-sm rounded w-full'>
                                <Mail size={15} color="#222222" strokeWidth={2}/>Mail me
                            </button>
                        </Link>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}
