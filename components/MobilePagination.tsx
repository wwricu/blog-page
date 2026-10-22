'use client'

import React, {useEffect, useRef, useState} from "react"
import {ChevronDown} from "lucide-react"
import {PostPreviewVO} from "@/common/model"
import {GetAllBlogPosts} from "@/common/api"
import PostCard from "@/components/PostCard"

type PaginationProps = {
    // Page already rendered by the server; the client keeps appending from the next one
    pageIndex?: number,
    category?: string,
    tag?: string
    className?: string,
}
// Same surface as the list cards so the pager reads as the last row, not a floating pill
const buttonClassNames = 'flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-base-100 py-3 text-sm font-medium text-base-content/70 ring-1 ring-base-300 transition-shadow hover:shadow-sm hover:text-primary'
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

export default function MobilePagination({ pageIndex = 1, category, tag, className }: PaginationProps) {
    const pageSize = 10

    const [active, setActive] = useState(false)
    const [items, setItems] = useState<PostPreviewVO[]>([])
    const [loading, setLoading] = useState(false)
    // Reached the last page (short page) or the backend failed: stop asking
    const [exhausted, setExhausted] = useState(false)
    // Last rendered page; the server may have rendered any page, not only the first
    const pageRef = useRef(pageIndex)
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
                    <PostCard key={`${postDetailVO.id}-${i}`} index={pageIndex * pageSize + i} className={className} postDetailVO={postDetailVO}/>
                )
            }
            <div className={`w-full ${className}`}>
                {
                    !exhausted ?
                    (
                        <button type='button' className={buttonClassNames} disabled={loading}
                                onClick={() => { setActive(true); loadNext() }}>
                            {loading ? 'Loading...' : <>Show more <ChevronDown className='w-3.5 h-3.5'/></>}
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
