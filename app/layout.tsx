import React from "react"
import '@/styles/globals.css'
import Header from "@/components/Header"

export const dynamic = 'force-dynamic'

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="zh-cn">
            <body>
                <div className='flex flex-col min-h-screen bg-gray-100'>
                    <Header/>
                    <main className='flex flex-col flex-1 items-center'>{children}</main>
                    <div className='flex flex-col justify-between items-center bg-slate-50 h-14'>
                        <div className='w-full border-t border-gray-200'/>
                        <div className='text-sm text-center text-gray-500'>
                            wwr.icu {new Date().getFullYear()}
                        </div>
                        <div/>
                    </div>
                </div>
            </body>
        </html>
    )
}
