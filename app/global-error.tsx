"use client"

import '@/styles/globals.css'

export default function GlobalError() {
    return (
        <html lang="zh-CN">
            <body className='flex min-h-screen flex-col items-center justify-center bg-base-100 px-4 text-center'>
                <p className='text-2xl font-semibold tracking-tight text-base-content/80'>Under maintenance</p>
                <p className='mt-2 text-sm text-base-content/60'>The site is temporarily unavailable. Please check back soon.</p>
            </body>
        </html>
    )
}
