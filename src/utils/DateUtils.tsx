export const parseDateString = (dateString: string) => {
  const [day, month, year] = dateString.split('/').map(Number)
  return new Date(year, month - 1, day) // month is 0-indexed
}

// Helper function to convert Date object to dd/MM/yyyy string
export const formatDateToString = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // month is 0-indexed
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
