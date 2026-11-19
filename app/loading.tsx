export default function Loading() {
    return (
        <div className='mt-3 flex w-full flex-col items-center gap-3 max-md:w-full md:w-3xl'>
            {[0, 1, 2].map((i) => <div key={i} className='h-28 w-full animate-pulse rounded-xl bg-base-100 ring-1 ring-base-300'/>)}
        </div>
    )
}
