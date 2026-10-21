'use client'

/* The sidebar intentionally syncs external systems into React state after mount and on
   navigation: the theme (localStorage + OS preference) and the URL search keyword.
   Deferring these would either break hydration or duplicate the state sources. */
/* eslint-disable react-hooks/set-state-in-effect */

import React, {useEffect, useState} from "react"
import {House, Info, List, Mail, Moon, Search, Sun, Tags} from "lucide-react"
import Link from "next/link"
import {usePathname, useRouter} from "next/navigation"
import {DarkTheme, LightTheme, SearchUrl} from "@/common/common"
import AboutDialog from "@/components/AboutDialog"
import GithubIcon from "@/components/GithubIcon"

const navItems = [
    {url: '/', label: 'Home', Icon: House},
    {url: '/categories', label: 'Categories', Icon: List},
    {url: '/tags', label: 'Tags', Icon: Tags, iconClassName: 'transform scale-x-[-1]'},
    {url: null, label: 'About', Icon: Info, isButton: true},
]

export default function Sidebar() {
    const pathname = usePathname() || '/'
    const router = useRouter()
    const [keyword, setKeyword] = useState('')
    const [theme, setTheme] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('theme')
        if (saved === LightTheme || saved === DarkTheme) {
            document.documentElement.setAttribute('data-theme', saved)
            setTheme(saved)
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            setTheme(prefersDark ? DarkTheme : LightTheme)
        }
    }, [])

    useEffect(() => {
        const syncFromUrl = () => {
            if (!window.location.pathname.startsWith(`/${SearchUrl}`)) {
                setKeyword('')
                return
            }
            // URLSearchParams.get() already percent-decodes, so a second decode would corrupt (or
            // throw on) keywords containing a literal '%'
            setKeyword(new URLSearchParams(window.location.search).get('keyword') ?? '')
        }
        syncFromUrl()
        window.addEventListener('popstate', syncFromUrl)
        return () => window.removeEventListener('popstate', syncFromUrl)
    }, [pathname])

    const toggleTheme = () => {
        const next = theme === DarkTheme ? LightTheme : DarkTheme
        document.documentElement.setAttribute('data-theme', next)
        localStorage.setItem('theme', next)
        setTheme(next)
    }

    const submitSearch = () => {
        const trimmed = keyword.trim()
        if (!trimmed) return
        router.push(`/${SearchUrl}?keyword=${encodeURIComponent(trimmed)}`)
    }

    const isActive = (url: string) => {
        if (url === '/') return pathname === '/'
        return pathname === url || pathname.startsWith(`${url}/`)
    }

    return (
        <aside className='max-lg:hidden sticky top-0 left-0 h-svh w-60 shrink-0 flex flex-col bg-base-200 border-r border-base-300'>
            <Link href='/' className='block px-5 pt-6 pb-5'>
                <h1 className='text-[17px] font-semibold text-base-content tracking-tight leading-none'>
                    wwr<span className='text-primary'>.</span>icu
                </h1>
                <p className='text-xs text-base-content/50 mt-1.5'>A nonsense site</p>
            </Link>

            <form onSubmit={(e) => { e.preventDefault(); submitSearch() }} className='px-4'>
                <label className='flex items-center gap-2 px-3 h-9 rounded-lg bg-base-100 ring-1 ring-base-300 focus-within:ring-primary/50 transition'>
                    <Search className='w-4 h-4 stroke-base-content/45 shrink-0'/>
                    <input
                        type='text'
                        className='grow min-w-0 bg-transparent text-sm text-base-content placeholder:text-base-content/40 outline-none'
                        placeholder='Search...'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </label>
            </form>

            <nav className='flex flex-col gap-0.5 px-2 mt-5'>
                {navItems.map(({url, label, Icon, iconClassName, isButton}) => {
                    const active = isButton ? isModalOpen : isActive(url || '')
                    const itemClass = `group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full
                        ${active
                            ? 'bg-base-100 text-base-content ring-1 ring-base-300'
                            : 'text-base-content/65 hover:bg-base-100/70 hover:text-base-content'}`
                    const iconClass = `w-4 h-4 ${iconClassName ?? ''} ${active ? 'stroke-primary' : 'stroke-base-content/50 group-hover:stroke-base-content'}`

                    if (isButton) {
                        return (
                            <button key={label} type='button' onClick={() => setIsModalOpen(true)} className={itemClass}>
                                <Icon className={iconClass}/>
                                {label}
                            </button>
                        )
                    }
                    return (
                        <Link key={url} href={url || '/'} className={itemClass}>
                            <Icon className={iconClass}/>
                            {label}
                        </Link>
                    )
                })}
            </nav>

            <div className='mt-auto px-4 py-4 border-t border-base-300 flex items-center justify-between text-xs text-base-content/45'>
                <span>© {new Date().getFullYear()} wwr</span>
                <div className='flex items-center gap-1'>
                    <button
                        type='button'
                        onClick={toggleTheme}
                        className='inline-flex items-center justify-center w-7 h-7 rounded-md hover:bg-base-100 hover:text-base-content transition-colors'
                        aria-label='Toggle theme'
                    >
                        {theme === DarkTheme ? <Sun className='w-4 h-4'/> : <Moon className='w-4 h-4'/>}
                    </button>
                    <Link
                        href='https://github.com/wwricu'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center justify-center w-7 h-7 rounded-md hover:bg-base-100 hover:text-base-content transition-colors'
                        aria-label='GitHub'
                    >
                        <GithubIcon className='w-4 h-4'/>
                    </Link>
                    <Link
                        href='mailto:me@wwr.icu'
                        className='inline-flex items-center justify-center w-7 h-7 rounded-md hover:bg-base-100 hover:text-base-content transition-colors'
                        aria-label='Mail'
                    >
                        <Mail className='w-4 h-4'/>
                    </Link>
                </div>
            </div>

            <AboutDialog open={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </aside>
    )
}
