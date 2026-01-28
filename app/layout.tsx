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
                <div className='flex flex-col min-h-screen bg-slate-100 bg-[url(/dust_scratches.webp)]'>
                    <main className='flex-1'>
                        <Header/>
                        {children}
                    </main>
                    <div className='flex flex-col justify-center items-center text-gray-500 text-center border-solid border shadow-md border-gray-200 bg-transparent sm:h-12 max-sm:h-6'>
                        wwr.icu {new Date().getFullYear()}
                    </div>
                </div>
            </body>
        </html>
    )
}
