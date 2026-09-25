import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { fetchEvents } from '../api/events'

// Holds the events list and load status in one place, so Home and the event
// detail page share one fetch instead of each doing their own.
const EventsContext = createContext(null)

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'

  const load = useCallback(() => {
    let cancelled = false
    setStatus('loading')
    fetchEvents()
      .then((data) => {
        if (cancelled) return
        setEvents(data)
        setStatus('success')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => load(), [load])

  return <EventsContext.Provider value={{ events, status, load }}>{children}</EventsContext.Provider>
}

export function useEvents() {
  const ctx = useContext(EventsContext)
  if (!ctx) throw new Error('useEvents must be used inside <EventsProvider>')
  return ctx
}