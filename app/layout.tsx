import React from "react"
import {Inter, JetBrains_Mono} from "next/font/google"
import '@/styles/globals.css'
import Header from "@/components/Header"
import {Footer} from "@/components/Common"

export const dynamic = 'force-dynamic'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="zh-CN">
            <body className={`flex flex-col min-h-screen bg-base-200 ${inter.className} ${jetBrainsMono.className}`}>
                <Header/>
                <main className='flex flex-col flex-1 items-center'>{children}</main>
                <Footer/>
            </body>
        </html>
    )
}
