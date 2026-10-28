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
        <aside className='max-lg:hidden sticky top-0 left-0 h-svh w-60 shrink-0 flex flex-col bg-base-100 border-r border-base-content/10'>
            <Link href='/' className='block px-5 pt-6 pb-5'>
                <h1 className='text-xl font-bold text-base-content tracking-tight leading-none'>
                    wwr<span className='text-primary'>.</span>icu
                </h1>
                <p className='text-xs text-base-content/50 mt-1.5'>A nonsense site</p>
            </Link>

            <form onSubmit={(e) => { e.preventDefault(); submitSearch() }} className='px-4'>
                <label className='flex items-center gap-2 px-3 h-9 rounded-lg bg-base-200/60 ring-1 ring-transparent focus-within:bg-base-100 focus-within:ring-base-content/15 transition'>
                    <Search className='w-4 h-4 stroke-base-content/50 shrink-0'/>
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
                    if (isButton) {
                        return (
                            <button
                                key={label}
                                type='button'
                                onClick={() => setIsModalOpen(true)}
                                className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full
                                    ${isModalOpen
                                        ? 'bg-base-200 text-base-content'
                                        : 'text-base-content/70 hover:bg-base-200/60 hover:text-base-content'}`}
                            >
                                {isModalOpen && <span className='absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-primary rounded-full'/>}
                                <Icon className={`w-4 h-4 ${iconClassName ?? ''} ${isModalOpen ? 'stroke-base-content' : 'stroke-base-content/60 group-hover:stroke-base-content'}`} />
                                {label}
                            </button>
                        )
                    }
                    const active = isActive(url || '')
                    return (
                        <Link
                            key={url}
                            href={url || '/'}
                            className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                                ${active
                                    ? 'bg-base-200 text-base-content'
                                    : 'text-base-content/70 hover:bg-base-200/60 hover:text-base-content'}`}
                        >
                            {active && <span className='absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-primary rounded-full'/>}
                            <Icon className={`w-4 h-4 ${iconClassName ?? ''} ${active ? 'stroke-base-content' : 'stroke-base-content/60 group-hover:stroke-base-content'}`} />
                            {label}
                        </Link>
                    )
                })}
            </nav>

            <div className='mt-auto px-4 py-4 border-t border-base-content/10 flex items-center justify-between text-xs text-base-content/50'>
                <span>© {new Date().getFullYear()} wwr</span>
                <div className='flex items-center gap-1'>
                    <button
                        type='button'
                        onClick={toggleTheme}
                        className='inline-flex items-center justify-center w-7 h-7 rounded-md hover:bg-base-200 hover:text-base-content transition-colors'
                        aria-label='Toggle theme'
                    >
                        {theme === DarkTheme ? <Sun className='w-4 h-4'/> : <Moon className='w-4 h-4'/>}
                    </button>
                    <Link
                        href='https://github.com/wwricu'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center justify-center w-7 h-7 rounded-md hover:bg-base-200 hover:text-base-content transition-colors'
                        aria-label='GitHub'
                    >
                        <GithubIcon className='w-4 h-4'/>
                    </Link>
                    <Link
                        href='mailto:me@wwr.icu'
                        className='inline-flex items-center justify-center w-7 h-7 rounded-md hover:bg-base-200 hover:text-base-content transition-colors'
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
