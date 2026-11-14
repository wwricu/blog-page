"use client"

import React from "react"

export default function Error() {
    return (
        <div className='flex-1 flex flex-col w-full max-md:w-full md:w-3xl max-sm:m-1 sm:m-2 md:m-3'>
            <div className='flex-1 flex flex-col items-center justify-center rounded-xl bg-base-100 ring-1 ring-base-300/70 px-6 py-14 text-center'>
                <p className='text-2xl font-semibold tracking-tight text-base-content/80'>Under maintenance</p>
                <p className='mt-2 text-sm text-base-content/60'>The site is temporarily unavailable. Please check back soon.</p>
            </div>
        </div>
    )
}
