'use client'

import React, {useEffect, useRef} from 'react'
import Link from 'next/link'
import {Mail, X} from 'lucide-react'
import {SiteVO} from '@/common/model'
import {IconClassNames, monospace} from '@/common/common'
import GithubIcon from '@/components/GithubIcon'

type AboutDialogProps = {
    open: boolean
    onClose: () => void
    site: SiteVO
}

// Shared About modal for the mobile Header and the desktop Sidebar
export default function AboutDialog({ open, onClose, site }: AboutDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) {
            return
        }
        if (open && !dialog.open) {
            dialog.showModal()
        } else if (!open && dialog.open) {
            dialog.close()
        }
    }, [open])

    return (
        <dialog className='modal' ref={dialogRef} onClose={onClose}>
            <div className='modal-box bg-base-100 relative w-full max-w-md rounded-2xl p-0 shadow-xl'>
                {/* The about body carries its own heading, so the modal only owns the close affordance */}
                <button
                    type='button'
                    aria-label='Close'
                    onClick={() => dialogRef.current?.close()}
                    className='btn btn-ghost btn-sm btn-circle absolute right-2.5 top-2.5 z-10 text-base-content/40 hover:text-base-content'
                >
                    <X className='w-4 h-4'/>
                </button>
                <div
                    className='prose prose-sm max-w-none max-h-60 overflow-y-auto px-6 pt-6 empty:hidden'
                    dangerouslySetInnerHTML={{__html: site.content}}
                />
                <div className='grid grid-cols-3 divide-x divide-base-content/10 mx-6 my-5 rounded-lg bg-base-200/50'>
                    {
                        [
                            {title: 'Posts', value: site.post_count},
                            {title: 'Categories', value: site.category_count},
                            {title: 'Tags', value: site.tag_count},
                        ].map(
                            (stat) => (
                                <div key={stat.title} className='py-3 text-center'>
                                    <div className='text-[10px] uppercase tracking-wider text-base-content/45'>{stat.title}</div>
                                    <div className='text-lg font-medium text-base-content tabular-nums'>{stat.value}</div>
                                </div>
                            )
                        )
                    }
                </div>
                <div className={`flex gap-2 px-6 pb-6 ${monospace.className}`}>
                    <Link className='flex-1' href='https://github.com/wwricu' target='_blank' rel='noopener noreferrer'>
                        <button className='btn btn-ghost btn-sm w-full rounded-lg border border-base-300 text-base-content/80 gap-1.5 transition-colors hover:border-primary/40 hover:text-primary'>
                            <GithubIcon className={IconClassNames}/>GitHub
                        </button>
                    </Link>
                    <Link className='flex-1' href='mailto:me@wwr.icu'>
                        <button className='btn btn-ghost btn-sm w-full rounded-lg border border-base-300 text-base-content/80 gap-1.5 transition-colors hover:border-primary/40 hover:text-primary'>
                            <Mail className={IconClassNames}/>Mail me
                        </button>
                    </Link>
                </div>
            </div>
            <form method='dialog' className='modal-backdrop'>
                <button>close</button>
            </form>
        </dialog>
    )
}
