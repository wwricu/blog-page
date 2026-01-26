const tagColorClassList = [
    ' badge-secondary',
    ' badge-accent',
    ' badge-info',
    ' badge-success',
    ' badge-warning',
    ' badge-error',
]

export const getTagColorClass = () => {
    return tagColorClassList[Math.floor(Math.random() * tagColorClassList.length)]
}
