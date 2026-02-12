'use client'

import React, {useEffect, useRef, useState} from "react"
import {PostDetailVO} from "@/common/model"
import {GetAllBlogPosts} from "@/common/api"
import PostCard from "@/components/PostCard"


const useInfiniteScroll = (
    hasNextPage: boolean,
    onLoadMore: () => void,
    threshold: number = 100,
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

                setTimeout(() => {
                    isFetchingRef.current = false
                }, 50)
            }
        }

        window.addEventListener('scroll', handleScroll, {passive: true})
        return () => window.removeEventListener('scroll', handleScroll)
    }, [hasNextPage, onLoadMore, threshold])
}

export default function MobilePagination({ baseCount = 10, category, tag }: { baseCount?: number, category?: string, tag?: string }) {
    const pageSize = 10

    const [active, setActive] = useState(false)
    const [postDetailVOList, setPostDetailVOList] = useState<PostDetailVO[]>([])
    const [currentData, setCurrentData] = useState<PostDetailVO[]>([])
    const [current, setCurrent] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const updatePage = () => {
        setPostDetailVOList([...postDetailVOList, ...currentData])
        setCurrent(current + 1)
        GetAllBlogPosts(current, pageSize, category, tag).then((postDetailPageVO) => {
            setPageCount(Math.ceil(postDetailPageVO.count / pageSize))
            setCurrentData(postDetailPageVO.data)
        })
    }

    useEffect(() => { updatePage() }, [])

    useInfiniteScroll(active && current <= pageCount, () => { updatePage() })

    return (
        <>
            {
                active ?
                postDetailVOList.map((postDetailVO, i) =>
                    <PostCard key={postDetailVO.id} index={baseCount + (current - 2) * pageSize + i} postDetailVO={postDetailVO}/>
                ) :
                <div className='btn btn-primary btn-sm btn-outline rounded-lg whitespace-nowrap py-0 hover:btn-soft my-2' onClick={() => {
                    updatePage()
                    setActive(true)
                }}>Show More</div>
            }
            {
                // active && current > pageCount ? <div className='my-2'>No more</div> : null
            }
        </>
    )
}
