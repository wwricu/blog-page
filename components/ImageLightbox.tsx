'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

export default function ImageLightbox({ html }: { html: string }) {
    const [activeSrc, setActiveSrc] = useState<string | null>(null)
    const [activeAlt, setActiveAlt] = useState<string>('preview')
    const dialogRef = useRef<HTMLDialogElement>(null)

    return (
        <>
            <div
                className='prose max-w-none! max-md:prose-sm text-base-content leading-relaxed [&_img]:cursor-zoom-in'
                dangerouslySetInnerHTML={{ __html: html }}
                onClick={(e) => {
                    if (e.target instanceof HTMLImageElement) {
                        setActiveSrc(e.target.src)
                        setActiveAlt(e.target.alt)
                        dialogRef.current?.showModal()
                    }
                }}
            />
            <dialog
                ref={dialogRef}
                className='modal'
                onClose={() => setActiveSrc(null)}
            >
                <div 
                    className='modal-box w-[90vw] h-[85vh] max-w-none p-0 bg-transparent shadow-none overflow-hidden flex items-center justify-center'
                    onClick={() => dialogRef.current?.close()}
                >
                    {activeSrc && (
                        <img
                            src={activeSrc}
                            alt={activeAlt}
                            className='max-w-full max-h-full object-contain cursor-zoom-out'
                        />
                    )}
                </div>
                <form method='dialog' className='modal-backdrop'>
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}
