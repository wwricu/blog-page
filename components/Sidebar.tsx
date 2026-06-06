'use client'

import React, {useEffect, useState} from "react"
import {House, List, Mail, Moon, Search, Sun, Tags} from "lucide-react"
import Link from "next/link"
import {usePathname, useRouter, useSearchParams} from "next/navigation"
import {SearchUrl} from "@/common/common"

const navItems = [
    {url: '/', label: 'Home', Icon: House},
    {url: '/categories', label: 'Categories', Icon: List},
    {url: '/tags', label: 'Tags', Icon: Tags, iconClassName: 'transform scale-x-[-1]'},
]

const LIGHT_THEME = 'fantasy'
const DARK_THEME = 'abyss'

const GithubIcon = ({className = ''}: { className?: string }) => (
    <svg
        className={className}
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
    >
        <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/>
    </svg>
)

export default function Sidebar() {
    const pathname = usePathname() || '/'
    const searchParams = useSearchParams()
    const router = useRouter()
    const [keyword, setKeyword] = useState('')
    const [theme, setTheme] = useState<string | null>(null)

    useEffect(() => {
        const saved = localStorage.getItem('theme')
        if (saved === LIGHT_THEME || saved === DARK_THEME) {
            document.documentElement.setAttribute('data-theme', saved)
            setTheme(saved)
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            setTheme(prefersDark ? DARK_THEME : LIGHT_THEME)
        }
    }, [])

    useEffect(() => {
        if (pathname.startsWith('/search')) {
            const keywordParam = searchParams.get('keyword')
            if (keywordParam) {
                setKeyword(decodeURIComponent(keywordParam))
            }
        } else {
            setKeyword('')
        }
    }, [pathname, searchParams])

    const toggleTheme = () => {
        const next = theme === DARK_THEME ? LIGHT_THEME : DARK_THEME
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
                        placeholder='Search posts...'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </label>
            </form>

            <nav className='flex flex-col gap-0.5 px-2 mt-5'>
                {navItems.map(({url, label, Icon, iconClassName}) => {
                    const active = isActive(url)
                    return (
                        <Link
                            key={url}
                            href={url}
                            className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                                ${active
                                    ? 'bg-base-200 text-base-content'
                                    : 'text-base-content/70 hover:bg-base-200/60 hover:text-base-content'}`}
                        >
                            {active && <span className='absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-primary rounded-full'/>}
                            <Icon className={`w-4 h-4 ${iconClassName ?? ''} ${active ? 'stroke-base-content' : 'stroke-base-content/60 group-hover:stroke-base-content'}`}/>
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
                        {theme === DARK_THEME ? <Sun className='w-4 h-4'/> : <Moon className='w-4 h-4'/>}
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
        </aside>
    )
}
