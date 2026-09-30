export const formatDateTime = (timestamp: string | null | undefined): string => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const months = date.getMonth()
  const days = date.getDate()
  const MM = months + 1 < 10 ? `0${months + 1}` : months + 1
  const DD = days < 10 ? `0${days}` : days
  const YYYY = date.getFullYear()

  return `${DD}/${MM}/${YYYY}`
}

export const formatTime = (timestamp: string | null | undefined): string => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes

  return `${hours}:${minutesStr} ${ampm}`
}
