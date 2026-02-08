import React from "react"
import {Noto_Sans} from "next/font/google"
import '@/styles/globals.css'
import Header from "@/components/Header"
import {Footer} from "@/components/Common"

export const dynamic = 'force-dynamic'

const notoSans = Noto_Sans({
    subsets: ['latin', 'latin-ext', 'greek', 'cyrillic'],
    // font-light, font-normal, font-medium, font-semibold, font-bold
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
})

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="zh-CN">
            <body className={`flex flex-col min-h-screen bg-base-200 ${notoSans.className}`}>
                <Header/>
                <main className='flex flex-col flex-1 items-center'>{children}</main>
                <Footer/>
            </body>
        </html>
    )
}
