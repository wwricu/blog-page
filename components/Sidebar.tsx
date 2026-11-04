'use client'

/* The sidebar intentionally syncs external systems into React state after mount and on
   navigation: the theme (localStorage + OS preference) and the URL search keyword.
   Deferring these would either break hydration or duplicate the state sources. */
/* eslint-disable react-hooks/set-state-in-effect */

import React, {useEffect, useState} from "react"
import {Info, Mail, Moon, Search, Sun} from "lucide-react"
import Link from "next/link"
import {usePathname, useRouter} from "next/navigation"
import {DarkTheme, LightTheme, SearchUrl} from "@/common/common"
import {SiteVO} from "@/common/model"
import AboutDialog from "@/components/AboutDialog"
import GithubIcon from "@/components/GithubIcon"

export default function Sidebar({site, children}: { site: SiteVO, children?: React.ReactNode }) {
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

    return (
        <aside className='max-lg:hidden sticky top-0 left-0 h-svh w-60 shrink-0 flex flex-col bg-base-200 border-r border-base-300'>
            <Link href='/' className='block px-5 pt-6 pb-5'>
                <h1 className='text-[17px] font-semibold text-base-content tracking-tight leading-none'>
                    {site.title}
                </h1>
                <p className='text-xs text-base-content/60 mt-1.5'>{site.tagline}</p>
            </Link>

            <form onSubmit={(e) => { e.preventDefault(); submitSearch() }} className='px-2'>
                <label className='flex items-center gap-2 px-3 h-9 rounded-lg bg-base-300/50 transition-colors focus-within:bg-base-100 focus-within:ring-1 focus-within:ring-primary/40'>
                    <Search className='w-4 h-4 stroke-base-content/60 shrink-0'/>
                    <input
                        type='text'
                        className='grow min-w-0 bg-transparent text-sm text-base-content placeholder:text-base-content/55 outline-none'
                        placeholder='Search...'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </label>
            </form>

            <div className='mt-5 min-h-0 flex-1 overflow-y-auto'>
                {children}
            </div>

            <div className='mt-auto px-2 pl-5 py-4 border-t border-base-300 flex items-center justify-between text-xs text-base-content/55'>
                <span>© {new Date().getFullYear()} wwr</span>
                <div className='flex items-center gap-1'>
                    <button
                        type='button'
                        onClick={() => setIsModalOpen(true)}
                        className='inline-flex items-center justify-center w-7 h-7 rounded-md hover:bg-base-300/60 hover:text-base-content transition-colors'
                        aria-label='About'
                    >
                        <Info className='w-4 h-4'/>
                    </button>
                    <button
                        type='button'
                        onClick={toggleTheme}
                        className='inline-flex items-center justify-center w-7 h-7 rounded-md hover:bg-base-300/60 hover:text-base-content transition-colors'
                        aria-label='Toggle theme'
                    >
                        {theme === DarkTheme ? <Sun className='w-4 h-4'/> : <Moon className='w-4 h-4'/>}
                    </button>
                    <Link
                        href='https://github.com/wwricu'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center justify-center w-7 h-7 rounded-md hover:bg-base-300/60 hover:text-base-content transition-colors'
                        aria-label='GitHub'
                    >
                        <GithubIcon className='w-4 h-4'/>
                    </Link>
                    <Link
                        href='mailto:me@wwr.icu'
                        className='inline-flex items-center justify-center w-7 h-7 rounded-md hover:bg-base-300/60 hover:text-base-content transition-colors'
                        aria-label='Mail'
                    >
                        <Mail className='w-4 h-4'/>
                    </Link>
                </div>
            </div>

            <AboutDialog open={isModalOpen} onClose={() => setIsModalOpen(false)} site={site}/>
        </aside>
    )
}
