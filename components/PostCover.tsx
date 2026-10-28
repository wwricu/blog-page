'use client'

import Image from 'next/image'
import { useLightbox } from '@/components/Lightbox'

export default function PostCover({ url, name }: { url: string, name: string }) {
    const { show, dialog } = useLightbox()

    return (
        <>
            {/* Sits above the title like the lead card's picture, so the cover opens the card
                instead of interrupting the text; a click still opens the uncropped original */}
            <button
                type='button'
                onClick={() => show(url, name)}
                aria-label={`View full cover: ${name}`}
                className='mb-6 sm:mb-8 block w-full cursor-zoom-in p-0 text-left'
            >
                <Image
                    priority
                    quality={80}
                    width={1024}
                    height={400}
                    alt={name}
                    src={url}
                    className='w-full h-52 sm:h-72 object-cover rounded-xl ring-1 ring-base-300'
                />
            </button>
            {dialog}
        </>
    )
}
