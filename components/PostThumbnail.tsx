import Image from 'next/image'
import Link from 'next/link'
import {PostResourceVO} from '@/common/model'

export default function PostThumbnail({ cover, title, href, index }: { cover: PostResourceVO, title: string, href: string, index: number }) {
    return (
        <Link className='relative w-52 h-24 shrink-0 max-md:hidden overflow-hidden rounded-lg' href={href}>
            <Image
                priority={ index < 3 }
                loading={ index < 3 ? 'eager' : 'lazy' }
                fetchPriority={ index < 3 ? 'high' : 'auto' }
                quality={75}
                width={208}
                height={96}
                alt={cover.name ?? title}
                src={cover.url}
                className='object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]'
            />
        </Link>
    )
}
