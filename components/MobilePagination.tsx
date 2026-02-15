'use client'

import React, {useEffect, useRef, useState} from "react"
import {PostDetailVO} from "@/common/model"
import {GetAllBlogPosts} from "@/common/api"
import PostCard from "@/components/PostCard"

type PaginationProps = {
    baseCount?: number,
    category?: string,
    tag?: string
    className?: string,
}
const buttonClassNames = 'btn btn-primary btn-sm btn-outline rounded-lg whitespace-nowrap py-0 my-2 hover:btn-soft'

const useInfiniteScroll = (
    hasNextPage: boolean,
    onLoadMore: () => void,
    threshold: number = 100,
    timeout: number = 100
) => {
    const isFetchingRef = useRef(false)

    useEffect(() => {
        if (!hasNextPage) return

        const handleScroll = () => {
            if (isFetchingRef.current) return

            const scrollHeight = document.documentElement.scrollHeight
            const scrollTop = window.scrollY
            const clientHeight = window.innerHeight

            if (scrollHeight - scrollTop - clientHeight <= threshold) {
                isFetchingRef.current = true
                onLoadMore()

                setTimeout(() => { isFetchingRef.current = false }, timeout)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [hasNextPage, onLoadMore, threshold])
}

export default function MobilePagination({ baseCount = 10, category, tag, className }: PaginationProps) {
    const pageSize = 10

    const [active, setActive] = useState(false)
    const [postDetailVOList, setPostDetailVOList] = useState<PostDetailVO[]>([])
    const [currentData, setCurrentData] = useState<PostDetailVO[]>([])
    const [current, setCurrent] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const updatePage = () => {
        setPostDetailVOList([...postDetailVOList, ...currentData])
        GetAllBlogPosts(current + 1, pageSize, category, tag).then((postDetailPageVO) => {
            setPageCount(Math.ceil(postDetailPageVO.count / pageSize))
            setCurrentData(postDetailPageVO.data)
            setCurrent(current + 1)
        })
    }

    useEffect(() => { updatePage() }, [])
    useInfiniteScroll(active && current <= pageCount, () => { updatePage() }, 300)

    return (
        <>
            {
                active ?
                postDetailVOList.map((postDetailVO, i) =>
                    <PostCard key={postDetailVO.id} index={baseCount + (current - 2) * pageSize + i} className={className} postDetailVO={postDetailVO}/>
                ) :
                <div className={`${buttonClassNames}  ${className}`} onTouchEnd={(e) => {
                    e.preventDefault()
                    updatePage()
                    setActive(true)
                }}>Show More</div>
            }
            {
                <div className={`${buttonClassNames} ${active && current > pageCount ? '' : 'hidden'} ${className}`}
                     onTouchEnd={(e) => {
                         e.preventDefault()
                         window.scrollTo({top: 0, behavior: 'smooth'})
                     }}
                >Back to top</div>
            }
        </>
    )
}
