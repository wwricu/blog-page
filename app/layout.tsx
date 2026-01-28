import React from "react"
import '@/styles/globals.css'
import Header from "@/components/Header"

export const dynamic = 'force-dynamic'

export default function RootLayout({children}: {
    children: React.ReactNode
}) {

    return (
        <html>
            <body>
                <div className='flex flex-col min-h-screen bg-gray-50'>
                    <Header/>
                    <main className='flex-1'>
                        {children}
                    </main>
                    <div className='flex flex-col justify-between items-center bg-slate-50 sm:h-12 max-sm:h-6'>
                        <div className='w-3xl border-t h-1 mt-0 border-gray-200'/>
                        <div className='text-center text-gray-500'>
                            wwr.icu {new Date().getFullYear()}
                        </div>
                        <div className='h-1'/>
                    </div>
                </div>
            </body>
        </html>
    )
}
