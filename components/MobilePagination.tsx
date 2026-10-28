'use client'

import React, {useEffect, useRef, useState} from "react"
import {PostPreviewVO} from "@/common/model"
import {GetAllBlogPosts} from "@/common/api"
import PostCard from "@/components/PostCard"

type PaginationProps = {
    baseCount?: number,
    category?: string,
    tag?: string
    className?: string,
}
const buttonClassNames = 'btn btn-primary btn-sm btn-outline rounded-lg whitespace-nowrap py-0 mt-2 mb-3 hover:btn-soft'

const useInfiniteScroll = (enabled: boolean, onBottom: () => void, threshold: number = 100) => {
    // Keep the latest callback so the listener never runs on a stale closure
    const onBottomRef = useRef(onBottom)
    useEffect(() => { onBottomRef.current = onBottom }, [onBottom])

    useEffect(() => {
        if (!enabled) return
        const handleScroll = () => {
            const { scrollHeight } = document.documentElement
            if (scrollHeight - window.scrollY - window.innerHeight <= threshold) {
                onBottomRef.current()
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [enabled, threshold])
}

export default function MobilePagination({ baseCount = 10, category, tag, className }: PaginationProps) {
    const pageSize = 10

    const [active, setActive] = useState(false)
    const [items, setItems] = useState<PostPreviewVO[]>([])
    const [loading, setLoading] = useState(false)
    // Reached the last page (short page) or the backend failed: stop asking
    const [exhausted, setExhausted] = useState(false)
    // Last rendered page; page 1 comes from SSR
    const pageRef = useRef(1)
    // Synchronous guard: state updates are async, quick successive triggers must not overlap fetches
    const loadingRef = useRef(false)

    const loadNext = () => {
        if (loadingRef.current || exhausted) return
        loadingRef.current = true
        setLoading(true)

        GetAllBlogPosts(pageRef.current + 1, pageSize, category, tag).then((postDetailPageVO) => {
            const data = postDetailPageVO.data ?? []
            pageRef.current += 1
            setItems(prev => [...prev, ...data])
            if (data.length < pageSize) {
                setExhausted(true)
            }
        }).catch(() => {
            setExhausted(true)
        }).finally(() => {
            loadingRef.current = false
            setLoading(false)
        })
    }

    useInfiniteScroll(active && !exhausted, loadNext, 300)

    return (
        <>
            {
                items.map((postDetailVO, i) =>
                    <PostCard key={`${postDetailVO.id}-${i}`} index={baseCount + i} className={className} postDetailVO={postDetailVO}/>
                )
            }
            <div className={className}>
                {
                    !exhausted ?
                    (
                        <button type='button' className={buttonClassNames} disabled={loading}
                                onClick={() => { setActive(true); loadNext() }}>
                            {loading ? 'Loading...' : 'Show More'}
                        </button>
                    ) : active ?
                    (
                        <button type='button' className={buttonClassNames}
                                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Back to top</button>
                    ) : <div className='mb-px'/>
                }
            </div>
        </>
    )
}
