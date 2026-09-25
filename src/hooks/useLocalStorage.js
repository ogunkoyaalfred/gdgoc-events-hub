import { useEffect, useState } from 'react'

// Like useState, but the value survives a refresh. Fails quietly if storage
// is blocked (private browsing, storage full), so the app still works, it
// just won't remember between visits in that case.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* ignore */
    }
  }, [key, value])

  return [value, setValue]
}