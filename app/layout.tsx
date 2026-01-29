import React from "react"
import '@/styles/globals.css'
import Menu from "@/components/Menu"

export const dynamic = 'force-dynamic'

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <div className='justify-items-center'>
                    <div className='grid grid-cols-7 h-screen gap-2'>
                        <div className='col-span-2'>
                            <Menu className="h-screen"/>
                        </div>
                        <div className='col-span-5 my-10 overflow-y-scroll hide-scrollbar'>
                            {/*<Header/>*/}
                            <main className='flex-1 hide-scrollbar'>{children}</main>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}
