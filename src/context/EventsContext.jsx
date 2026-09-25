import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { fetchEvents } from '../api/events'
import { useLocalStorage } from '../hooks/useLocalStorage'

// Holds the events list, load status, and RSVPs in one place, so every page
// (the grid, an event's own page, and My RSVPs in Sprint 7) reads and writes
// the same data instead of drifting apart.
const EventsContext = createContext(null)

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'
  const [rsvps, setRsvps] = useLocalStorage('gdgoc-rsvps', [])

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

  // The real "going" count: the number in the mock data, plus RSVPs made
  // from this browser. Without a backend this is the honest way to show
  // the count actually go up after someone submits.
  const getGoing = useCallback(
    (event) => event.going + rsvps.filter((r) => r.eventId === event.id).length,
    [rsvps],
  )

  const addRsvp = useCallback(
    async (eventId, values) => {
      await new Promise((resolve) => setTimeout(resolve, 600)) // small delay so submitting feels real
      const email = values.email.trim().toLowerCase()
      if (rsvps.some((r) => r.eventId === eventId && r.email === email)) {
        return { ok: false, errors: { email: 'This email has already RSVPed for this event.' } }
      }
      const rsvp = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        eventId,
        name: values.name.trim(),
        email,
        level: values.level,
        track: values.track,
        createdAt: new Date().toISOString(),
      }
      setRsvps((prev) => [...prev, rsvp])
      return { ok: true, rsvp }
    },
    [rsvps, setRsvps],
  )

  const cancelRsvp = useCallback((id) => setRsvps((prev) => prev.filter((r) => r.id !== id)), [setRsvps])

  const value = useMemo(
    () => ({ events, status, load, rsvps, getGoing, addRsvp, cancelRsvp }),
    [events, status, load, rsvps, getGoing, addRsvp, cancelRsvp],
  )

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
}

export function useEvents() {
  const ctx = useContext(EventsContext)
  if (!ctx) throw new Error('useEvents must be used inside <EventsProvider>')
  return ctx
}