'use client'

import { useEffect, useRef, useState } from 'react'

export default function ImageLightbox({ html }: { html: string }) {
    const [activeSrc, setActiveSrc] = useState<string | null>(null)
    const [showImg, setShowImg] = useState(false)
    const displaySrc = useRef<string | null>(null)

    useEffect(() => {
        if (!activeSrc) return
        const handleScroll = () => setActiveSrc(null)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [activeSrc])

    useEffect(() => {
        if (activeSrc) {
            displaySrc.current = activeSrc
            setShowImg(true)
        } else {
            const timer = setTimeout(() => setShowImg(false), 700)
            return () => clearTimeout(timer)
        }
    }, [activeSrc])

    return (
        <>
            <div
                className='prose max-w-none! max-md:prose-sm text-base-content leading-relaxed [&_img]:cursor-zoom-in'
                dangerouslySetInnerHTML={{ __html: html }}
                onClick={(e) => {
                    if (e.target instanceof HTMLImageElement) {
                        setActiveSrc(e.target.src)
                    }
                }}
            />
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out transition-opacity duration-700 ${activeSrc ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setActiveSrc(null)}
            >
                {showImg && (
                    <img
                        src={displaySrc.current || undefined}
                        alt='preview'
                        className={`max-w-[90vw] max-h-[90vh] object-contain transition-all duration-700 ${activeSrc ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                        onClick={() => setActiveSrc(null)}
                    />
                )}
            </div>
        </>
    )
}
