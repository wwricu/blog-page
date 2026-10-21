import React from "react"
import type { Metadata } from "next"
import '@/styles/globals.css'
import Header from "@/components/Header"
import {sansSerif, SiteUrl} from "@/common/common"
import Sidebar from "@/components/Sidebar"

export const revalidate = 300

// Site-wide metadata defaults; pages only override title/description/openGraph.url
export const metadata: Metadata = {
    metadataBase: new URL(SiteUrl),
    title: {
        default: 'wwr.icu - A nonsense site',
        template: '%s - wwr.icu',
    },
    description: 'A nonsense site, where I set forth',
    openGraph: {
        siteName: 'wwr.icu',
    },
}

const Footer = () => {
    return (
        <footer className='lg:hidden w-full shrink-0 border-t border-base-300 py-4 text-center text-xs text-base-content/45'>
            wwr.icu {new Date().getFullYear()}
        </footer>
    )
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="zh-CN" className={sansSerif.variable}>
            <body className='flex flex-col min-h-screen bg-base-200'>
                <div className='lg:hidden'>
                    <Header/>
                </div>
                <div className='flex w-full flex-1'>
                    <Sidebar/>
                    <div className='flex flex-col flex-1 min-w-0 bg-base-100'>
                        <main className='flex flex-col flex-1 items-center'>{children}</main>
                        <Footer/>
                    </div>
                </div>
            </body>
        </html>
    )
}
