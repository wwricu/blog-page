import React from "react"
import '@/styles/globals.css'
import Header from "@/components/Header"
import {sansSerif} from "@/common/common"

export const dynamic = 'force-dynamic'

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="zh-CN">
            <body className={`flex flex-col min-h-screen bg-base-200 ${sansSerif.className}`}>
                <Header/>
                <main className='flex flex-col flex-1 items-center'>{children}</main>
                <div className='flex flex-col justify-between items-center bg-base-100 text-base-content/70 overflow-x-auto max-md:h-10 md:h-14'>
                    <div className='w-full border-t border-base-300'/>
                    <div className='text-sm text-center min-w-2xs'>
                        wwr.icu {new Date().getFullYear()}
                    </div>
                    <div/>
                </div>
            </body>
        </html>
    )
}
