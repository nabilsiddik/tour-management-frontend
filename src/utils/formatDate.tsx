export const formatDate = (date: Date) => {
    return `${new Date(date).getDate()} / ${new Date(date).getMonth()} / ${new Date(date).getFullYear()}`
}