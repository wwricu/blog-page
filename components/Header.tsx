'use client'

import React, {useEffect, useRef, useState} from 'react'
import {
    House,
    LayoutGrid,
    Info,
    Mail,
    Tags
} from 'lucide-react'
import {GetAboutAPI} from "@/common/api"
import {usePathname} from "next/navigation"
import Link from "next/link"
import {GithubIcon} from "@/components/Common";

const Header: React.FC = () => {
    const pathname = usePathname()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [about, setAbout] = useState<string>('')
    const [postCount, setPostCount] = useState<number>(0)
    const [categoryCount, setCategoryCount] = useState<number>(0)
    const [tagCount, setTagCount] = useState<number>(0)
    const [currentRoute, setCurrentRoute] = useState<string>('')
    const modalRef = useRef<HTMLDialogElement>(null)

    const menuItemClassName = 'btn btn-sm font-medium h-full text-base-content rounded-none border-0 shadow-none max-sm:px-2'
    const menuIconClassName = 'stroke-2 w-3.75'

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
                {statList.map((stat) => (
                    <div key={stat.title} className='stat place-items-center'>
                        <div className="stat-title text-sm font-medium text-base-content/60">{stat.title}</div>
                        <div className="stat-value text-3xl font-normal text-base-content">{stat.value}</div>
                    </div>
                ))}
            </>
        )
    }

    return (
        <>
            <div className='flex justify-between items-center sticky top-0 bg-base-100 shadow-sm flex-wrap h-10'>
                <div className='flex justify-start items-center flex-wrap h-full'>
                    <Link href='/' className={getButtonStyle('/')}>
                        <House className={getIconStyle('/')}/>Home
                    </Link>
                    <Link href='/categories' className={getButtonStyle('/categories')}>
                        <LayoutGrid className={getIconStyle('/categories')}/>Category
                    </Link>
                    <Link href='/tags' className={getButtonStyle('/tags')}>
                        <Tags className={getIconStyle('/tags')}/>Tags
                    </Link>
                </div>
                <button
                    className={getButtonStyle()}
                    onClick={() => {
                        modalRef?.current?.showModal()
                        setIsModalOpen(true)
                    }}
                >
                    <Info className={getIconStyle()}/>
                    <span className='max-sm:hidden'>About</span>
                </button>
            </div>
            <dialog className='modal' ref={modalRef} onClose={() => setIsModalOpen(false)} >
                <div className="modal-box bg-base-100">
                    <div dangerouslySetInnerHTML={{__html: about}} className='min-h-48'/>
                    <div className='border-t border-base-content/30 mb-4'/>
                    <div className='flex justify-around'>
                        {
                            renderStat([
                                {title: 'Post', value: postCount},
                                {title: 'Category', value: categoryCount},
                                {title: 'Tag', value: tagCount},
                            ])
                        }
                    </div>
                    <div className='border-t border-base-content/30 mt-4 mb-8'/>
                    <div className='flex justify-between my-4'>
                        <Link className='flex-1 mr-2 my-1' href='https://github.com/wwricu' target='_blank'>
                            <button className='btn btn-active btn-primary btn-sm rounded w-full'>
                                <GithubIcon className='text-primary' size={15} strokeWidth={2}/>GitHub
                            </button>
                        </Link>
                        <Link className='flex-1 ml-2 my-1' href='mailto:me@wwr.icu'>
                            <button className='btn bg-base-100 text-base-content border-[#e5e5e5] rounded-s btn-sm rounded w-full'>
                                <Mail className={menuIconClassName}/>Mail me
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

export default Header
