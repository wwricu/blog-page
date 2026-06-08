import React from "react"
import '@/styles/globals.css'
import Header from "@/components/Header"
import {sansSerif} from "@/common/common"
import Sidebar from "@/components/Sidebar"

export const dynamic = 'force-dynamic'

const Footer = () => {
    return (
        <div className='lg:hidden flex flex-col justify-between items-center bg-base-100 text-base-content/70 overflow-x-auto max-md:h-10 md:h-12'>
            <div className='w-full border-t border-base-300'/>
                <div className='text-sm text-center min-w-2xs'>
                    wwr.icu {new Date().getFullYear()}
                </div>
            <div/>
        </div>
    )
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="zh-CN">
            <body className={`flex flex-col min-h-screen bg-base-200 ${sansSerif.className}`}>
                <div className='lg:hidden'>
                    <Header/>
                </div>
                <div className='flex w-full flex-1'>
                    <Sidebar/>
                    <div className='flex flex-col flex-1 min-w-0'>
                        <main className='flex flex-col flex-1 items-center'>{children}</main>
                        <Footer/>
                    </div>
                </div>
            </body>
        </html>
    )
}
