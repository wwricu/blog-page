import React from "react"
import '@/styles/globals.css'
import Header from "@/components/Header"
import {Footer} from "@/components/Common"

export const dynamic = 'force-dynamic'

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="zh-CN">
            <body className='flex flex-col min-h-screen bg-base-200'>
                <Header/>
                <main className='flex flex-col flex-1 items-center'>{children}</main>
                <Footer/>
            </body>
        </html>
    )
}
