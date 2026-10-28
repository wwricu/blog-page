'use client'

import { useLightbox } from '@/components/Lightbox'

export default function ImageLightbox({ html }: { html: string }) {
    const { show, dialog } = useLightbox()

    return (
        <>
            <div
                className='prose max-w-none! max-md:prose-sm text-base-content/90 leading-relaxed [&_img]:cursor-zoom-in'
                dangerouslySetInnerHTML={{ __html: html }}
                onClick={(e) => {
                    if (e.target instanceof HTMLImageElement) {
                        show(e.target.src, e.target.alt)
                    }
                }}
            />
            {dialog}
        </>
    )
}
