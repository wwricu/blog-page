import Link from "next/link"
import React from "react"
import {Home} from "lucide-react"

export default function NotFound() {
    return (
        <div className='w-full max-md:w-full md:w-3xl max-sm:px-1 sm:px-2 md:px-0 mt-1 sm:mt-2 md:mt-3 mb-4 md:mb-6'>
            <div className='rounded-xl bg-base-100 ring-1 ring-base-300 px-6 py-14 text-center'>
                <p className='text-4xl font-semibold tracking-tight tabular-nums text-base-content/80'>404</p>
                <p className='mt-2 text-sm text-base-content/60'>This page could not be found.</p>
                <Link
                    href='/'
                    className='mt-6 inline-flex items-center gap-2 rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-primary/25 transition-colors hover:bg-primary/15'
                >
                    <Home className='h-4 w-4'/>
                    Back to home
                </Link>
            </div>
        </div>
    )
}
