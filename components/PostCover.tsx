'use client'

import Image from 'next/image'
import { useLightbox } from '@/components/Lightbox'

export default function PostCover({ url, name }: { url: string, name: string }) {
    const { show, dialog } = useLightbox()

    return (
        <>
            {/* Bleeds to the card edges so the cover reads as the article's masthead rather
                than as the first picture of the body; a click still opens the uncropped original */}
            <button
                type='button'
                onClick={() => show(url, name)}
                aria-label={`View full cover: ${name}`}
                className='-mx-3 sm:-mx-4 mt-5 block w-[calc(100%+1.5rem)] sm:w-[calc(100%+2rem)] cursor-zoom-in p-0 text-left'
            >
                <Image
                    priority
                    quality={80}
                    width={1024}
                    height={400}
                    alt={name}
                    src={url}
                    className='w-full h-52 sm:h-72 object-cover'
                />
            </button>
            {dialog}
        </>
    )
}
