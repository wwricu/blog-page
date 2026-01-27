import React from "react";
import '../styles/globals.css'
import Header from "@/components/Header";

export default function RootLayout({children}: {
    children: React.ReactNode;
}) {


    return (
        <html>
            <body>
                <div className='flex flex-col min-h-screen bg-slate-100 bg-[url(/dust_scratches.webp)]'>
                    <main className='flex-1'>
                        <Header/>
                        {children}
                    </main>
                    <div className='text-gray-500 text-center bg-transparent sm:h-12 max-sm:h-6'>
                        <div className='divider mt-0 mb-0 max-sm:hidden'/>
                        wwr.icu {new Date().getFullYear()}
                    </div>
                </div>
            </body>
        </html>
    )
}
