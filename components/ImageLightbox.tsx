'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

export default function ImageLightbox({ html, cover }: { html: string, cover?: { url: string, name: string } | null }) {
    const [activeSrc, setActiveSrc] = useState<string | null>(null)
    const [activeAlt, setActiveAlt] = useState<string>('preview')
    const dialogRef = useRef<HTMLDialogElement>(null)

    const show = (src: string, alt: string) => {
        setActiveSrc(src)
        setActiveAlt(alt)
        dialogRef.current?.showModal()
    }

    return (
        <>
            {cover ? (
                // The card crops the cover to a banner, so let a click open the uncropped original
                <button
                    type='button'
                    onClick={() => show(cover.url, cover.name)}
                    aria-label={`View full cover: ${cover.name}`}
                    className='mb-6 block w-full cursor-zoom-in p-0 text-left'
                >
                    <Image
                        priority
                        quality={80}
                        width={1024}
                        height={400}
                        alt={cover.name}
                        src={cover.url}
                        className='w-full h-52 sm:h-72 object-cover rounded-xl ring-1 ring-base-300'
                    />
                </button>
            ) : null}
            <div
                className='prose max-w-none! max-md:prose-sm text-base-content/90 leading-relaxed [&_img]:cursor-zoom-in'
                dangerouslySetInnerHTML={{ __html: html }}
                onClick={(e) => {
                    if (e.target instanceof HTMLImageElement) {
                        show(e.target.src, e.target.alt)
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
        </>
    )
}
