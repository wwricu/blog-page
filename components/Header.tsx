'use client'

import React, {useRef, useState} from 'react'
import {House, Info, List, Search, Tags} from 'lucide-react'
import {usePathname, useRouter} from "next/navigation"
import Link from "next/link"
import {IconClassNames, SearchUrl} from "@/common/common"
import {SiteVO} from "@/common/model"
import AboutDialog from "@/components/AboutDialog"

const menuItemClassName = `btn btn-sm btn-ghost rounded-none border-0 shadow-none h-full text-base-content
                           border-b-2 pt-0.5 hover:bg-primary/10 max-sm:pl-2 max-sm:pr-2`

const headers = [
    { url: '/', label: 'Home', Icon: House },
    { url: '/categories', label: 'Category', Icon: List },
    { url: '/tags', label: 'Tag', Icon: Tags, iconClassName: 'relative top-[0.75px] transform scale-x-[-1]'},
]

export default function Header({site}: { site: SiteVO }) {
    const pathname = usePathname()
    const router = useRouter()
    const searchRef = useRef<HTMLDialogElement>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const currentRoute = pathname?.replace(/\/\[.*]/g, "") || '/'

    const getButtonStyle = (path: string | undefined = undefined) => {
        if ((isModalOpen && path == null) || !isModalOpen && currentRoute === path) {
            return `${menuItemClassName} border-primary text-primary font-semibold`
        }
        return `${menuItemClassName} border-transparent font-normal text-base-content/85`
    }

    const getIconStyle = (path: string | undefined = undefined)=>
        `${IconClassNames} ${(isModalOpen && path == null) || !isModalOpen && currentRoute === path ? 'stroke-primary' : 'stroke-base-content/80'}`

    return (
        <>
            <div className='flex justify-between items-center sticky z-100 top-0 bg-base-200 border-b border-base-300 h-9 overflow-x-auto overflow-y-clip'>
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
                <div className='flex items-center h-full'>
                    <button
                        className={getButtonStyle(`/${SearchUrl}`)}
                        onClick={() => searchRef.current?.showModal()}
                        aria-label='Search'
                    >
                        <Search className={getIconStyle(`/${SearchUrl}`)}/>
                    </button>
                    <button
                        className={getButtonStyle()}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Info className={getIconStyle()}/>About
                    </button>
                </div>
            </div>
            <dialog ref={searchRef} className='modal'>
                <div className='modal-box bg-base-100 w-full max-w-sm rounded-2xl p-4 shadow-xl'>
                    <form
                        className='flex items-center gap-2 px-3 h-10 rounded-lg bg-base-300/50 transition-colors focus-within:bg-base-100 focus-within:ring-1 focus-within:ring-primary/40'
                        onSubmit={(e) => {
                            e.preventDefault()
                            const keyword = new FormData(e.currentTarget).get('keyword')?.toString().trim()
                            if (!keyword) return
                            searchRef.current?.close()
                            router.push(`/${SearchUrl}?keyword=${encodeURIComponent(keyword)}`)
                        }}
                    >
                        <input
                            type='text'
                            name='keyword'
                            placeholder='Search...'
                            className='grow min-w-0 bg-transparent text-sm text-base-content placeholder:text-base-content/55 outline-none'
                        />
                        <button type='submit' aria-label='Search' className='shrink-0 text-base-content/60 transition-colors hover:text-primary'>
                            <Search className='w-4 h-4'/>
                        </button>
                    </form>
                </div>
                <form method='dialog' className='modal-backdrop'>
                    <button>close</button>
                </form>
            </dialog>
            <AboutDialog open={isModalOpen} onClose={() => setIsModalOpen(false)} site={site}/>
        </>
    )
}
