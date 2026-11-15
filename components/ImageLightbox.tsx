'use client'

import { useEffect, useRef } from 'react'
import { useLightbox } from '@/components/Lightbox'

export default function ImageLightbox({ html }: { html: string }) {
    const { show, dialog } = useLightbox()
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        ref.current?.querySelectorAll('img').forEach(img => {
            img.tabIndex = 0
            img.setAttribute('role', 'button')
            img.setAttribute('aria-label', img.alt ? `View image: ${img.alt}` : 'View image')
        })
    }, [html])

    const open = (target: EventTarget | null) => {
        if (target instanceof HTMLImageElement) {
            show(target.src, target.alt)
        }
    }

    return (
        <>
            <div
                ref={ref}
                className='prose max-w-none! max-md:prose-sm leading-relaxed [&_img]:cursor-zoom-in [&_img]:focus-visible:outline-2 [&_img]:focus-visible:outline-offset-2 [&_img]:focus-visible:outline-primary'
                dangerouslySetInnerHTML={{ __html: html }}
                onClick={(e) => open(e.target)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        open(e.target)
                    }
                }}
            />
            {dialog}
        </>
    )
}