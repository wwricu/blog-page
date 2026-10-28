'use client'

import { useRef, useState } from 'react'

export function useLightbox() {
    const [activeSrc, setActiveSrc] = useState<string | null>(null)
    const [activeAlt, setActiveAlt] = useState('preview')
    const dialogRef = useRef<HTMLDialogElement>(null)

    const show = (src: string, alt: string) => {
        setActiveSrc(src)
        setActiveAlt(alt)
        dialogRef.current?.showModal()
    }

    const dialog = (
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
                    // Full-size source is arbitrary remote HTML content; next/image cannot
                    // optimize unknown URLs here, and the dialog image is not crawled/indexed
                    // eslint-disable-next-line @next/next/no-img-element
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
    )

    return { show, dialog }
}
