'use client'

import React, {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import {Mail} from 'lucide-react'
import {GetAboutAPI} from '@/common/api'
import {AboutVO} from '@/common/model'
import {IconClassNames, monospace} from '@/common/common'
import GithubIcon from '@/components/GithubIcon'

type AboutDialogProps = {
    open: boolean
    onClose: () => void
}

// Shared About modal for the mobile Header and the desktop Sidebar
export default function AboutDialog({ open, onClose }: AboutDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [about, setAbout] = useState<AboutVO | null>(null)

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

    useEffect(() => {
        if (!open || about) {
            return
        }
        GetAboutAPI().then(setAbout).catch(() => {
            // Keep the dialog usable with empty content; the error surfaces in console
            setAbout({content: '', post_count: 0, category_count: 0, tag_count: 0})
        })
    }, [open, about])

    return (
        <dialog className='modal' ref={dialogRef} onClose={onClose}>
            <div className='modal-box bg-base-100 max-xs:p-2 overflow-x-auto'>
                <div className='min-w-60'>
                    <div dangerouslySetInnerHTML={{__html: about?.content ?? ''}} className='min-h-48'/>
                    <div className='border-t border-base-content/30 mt-6 mb-4'/>
                    <div className='flex justify-around'>
                        {
                            [
                                {title: 'Post', value: about?.post_count ?? 0},
                                {title: 'Category', value: about?.category_count ?? 0},
                                {title: 'Tag', value: about?.tag_count ?? 0},
                            ].map(
                                (stat) => (
                                    <div key={stat.title} className='stat place-items-center max-sm:px-4'>
                                        <div className='stat-title text-sm font-medium text-base-content/60'>{stat.title}</div>
                                        <div className='stat-value text-3xl font-normal text-base-content'>{stat.value}</div>
                                    </div>
                                )
                            )
                        }
                    </div>
                    <div className='border-t border-base-content/30 mt-4 mb-6'/>
                    <div className={`flex justify-between ${monospace.className}`}>
                        <Link className='flex-1 mr-2' href='https://github.com/wwricu' target='_blank' rel='noopener noreferrer'>
                            <button className='btn btn-active btn-primary btn-sm text-primary-content rounded w-full transition-colors hover:btn-accent hover:text-accent-content'>
                                <GithubIcon className={IconClassNames}/>GitHub
                            </button>
                        </Link>
                        <Link className='flex-1 ml-2' href='mailto:me@wwr.icu'>
                            <button className='btn btn-ghost text-base-content border-primary rounded-s btn-sm rounded w-full transition-colors hover:btn-accent hover:border-none'>
                                <Mail className={`${IconClassNames} stroke-base-primary`}/>Mail me
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <form method='dialog' className='modal-backdrop'>
                <button>close</button>
            </form>
        </dialog>
    )
}
