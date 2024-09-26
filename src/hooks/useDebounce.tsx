import { useEffect, useState } from 'react'

export default function useDebounce(searchName: any, delayTime: number) {
  const [debouncedSearchName, setDebouncedSearchName] = useState(searchName)

  // Debounce input change
  // the search name is only updated after the user has stopped typing for 500ms, preventing multiple updates for quick successive keystrokes.
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchName(searchName)
    }, delayTime)

    // Cleanup the timeout if the user is still typing
    // The cleanup function inside useEffect ensures that if the user continues typing within the delay,
    // the previous timeout is cleared, and a new one starts.
    return () => {
      clearTimeout(handler)
    }
  }, [searchName, delayTime])

  return debouncedSearchName
}
