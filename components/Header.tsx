import React, {useEffect, useRef, useState} from 'react';
import {
    House,
    LayoutGrid,
    Info,
    Mail,
    Tag
} from 'lucide-react'
import {GetAboutAPI} from "@/common/api";
import {useRouter} from "next/router";
import Link from "next/link";
import GithubIcon from "@/components/GithubIcon";

type StatProps = {
    title: string
    value: number
}

const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [about, setAbout] = useState<string>('')
    const [postCount, setPostCount] = useState<number>(0)
    const [categoryCount, setCategoryCount] = useState<number>(0)
    const [tagCount, setTagCount] = useState<number>(0)
    const router = useRouter()
    const modalRef = useRef<HTMLDialogElement>(null)

    const menuItemClassName = 'btn btn-sm h-full font-light rounded-none border-0 shadow-none max-sm:px-2 text-text-prime'

    useEffect(() => {
        GetAboutAPI().then((res) => {
            setAbout(res.content)
            setPostCount(res.post_count)
            setCategoryCount(res.category_count)
            setTagCount(res.tag_count)
        })
    }, []);

    const getButtonStyle = (path: string) => {
        if (isModalOpen) {
            return ' bg-transparent'
        }
        return router.pathname.replace(/\/\[.*]/g, "") === path ?
            ' bg-indigo-600 text-white hover:!bg-indigo-600 hover:!text-white' :
            ' hover:!bg-slate-300 bg-transparent hover:!text-text-prime'
    }

    const renderStat = (statList: StatProps[]) => {
        {/*TODO: font light does not work*/}
        return (
            <>
                {statList.map((stat: StatProps) => (
                    <div key={stat.title} className='stat place-items-center'>
                        <div className="stat-title text-sm text-gray-400">{stat.title}</div>
                        <div className="stat-value text-2xl font-light">{stat.value}</div>
                    </div>
                ))}

            </>
        )
    }

    return (
        <>
            <div className='flex justify-between items-center sm:h-10 bg-transparent flex-wrap border-solid border-b-2'>
                <div className='flex justify-start items-center flex-wrap h-full'>
                    <Link href='/' className='h-full'>
                        <button className={menuItemClassName + getButtonStyle('/')}>
                            <House size={16} color="#757575" strokeWidth={2}/>Home
                        </button>
                    </Link>
                    <Link href='/categories' className='h-full'>
                        <button className={menuItemClassName + getButtonStyle('/categories')}>
                            <LayoutGrid size={16} color="#757575" strokeWidth={2}/>Category
                        </button>
                    </Link>
                    <Link href='/tags' className='h-full'>
                        <button onClick={() => router.push('/tags')} className={menuItemClassName + getButtonStyle('/tags')}>
                            <Tag size={16} color="#757575" strokeWidth={2}/>Tags
                        </button>
                    </Link>
                </div>
                <button
                    className={menuItemClassName + ' hover:!bg-slate-300 hover:!text-text-prime ' + (isModalOpen ? ' bg-indigo-600 text-white' : 'bg-transparent')}
                    onClick={() => {
                        modalRef?.current?.showModal()
                        setIsModalOpen(true)
                    }}
                >
                    <Info size={16} color="#757575" strokeWidth={2}/>
                    <span className='max-sm:hidden'>
                    About
                </span>
                </button>
            </div>
            <dialog className='modal' ref={modalRef} onClose={() => setIsModalOpen(false)} >
                <div className="modal-box bg-[url(/dust_scratches.webp)]">
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
                        <Link href='https://github.com/wwricu'>
                            <button className='btn btn-active btn-neutral btn-sm m-2 rounded grow'>
                                <GithubIcon size={16} color="#B4B4B4" strokeWidth={2}/>GitHub
                            </button>
                        </Link>
                        <Link href='mailto:me@wwr.icu'>
                            <button className='btn bg-white text-black border-[#e5e5e5] rounded-s btn-sm rounded m-2 grow'>
                                <Mail size={16} color="#757575" strokeWidth={2}/>Mail me
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

export default Header;
