'use client'

import React, {useState} from 'react'
import {House, Info, List, Tags} from 'lucide-react'
import {usePathname} from "next/navigation"
import Link from "next/link"
import {IconClassNames} from "@/common/common"
import AboutDialog from "@/components/AboutDialog"

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
    const currentRoute = pathname?.replace(/\/\[.*]/g, "") || '/'

    const getButtonStyle = (path: string | undefined = undefined) => {
        if ((isModalOpen && path == null) || !isModalOpen && currentRoute === path) {
            return `${menuItemClassName} border-primary text-primary font-bold`
        }
        return `${menuItemClassName} border-transparent font-semibold`
    }

    const getIconStyle = (path: string | undefined = undefined)=>
        `${IconClassNames} stroke-base-${(isModalOpen && path == null) || !isModalOpen && currentRoute === path ? 'primary' : 'content'}`

    return (
        <>
            <div className='flex justify-between items-center sticky z-100 top-0 bg-base-100 shadow-xs h-9 overflow-x-auto overflow-y-clip'>
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
                    onClick={() => setIsModalOpen(true)}
                >
                    <Info className={getIconStyle()}/>About
                </button>
            </div>
            <AboutDialog open={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </>
    )
}
