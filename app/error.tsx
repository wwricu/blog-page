"use client"

import React from "react"

export default function Error() {
    return (
        <div className='w-full max-md:w-full md:w-3xl max-sm:px-1 sm:px-2 md:px-0 mt-1 sm:mt-2 md:mt-3 mb-4 md:mb-6'>
            <div className='rounded-xl bg-base-100 ring-1 ring-base-300 px-6 py-14 text-center'>
                <p className='text-2xl font-semibold tracking-tight text-base-content/80'>Under maintenance</p>
                <p className='mt-2 text-sm text-base-content/60'>The site is temporarily unavailable. Please check back soon.</p>
            </div>
        </div>
    )
}
