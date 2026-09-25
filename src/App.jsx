import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import EventCard from './components/EventCard'
import Filters from './components/Filters'
import { CardSkeletons, ErrorState, EmptyState } from './components/States'
import { fetchEvents } from './api/events'
import { filterEvents } from './utils/filter'

export default function App() {
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

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

  const filtered = useMemo(() => filterEvents(events, query, category), [events, query, category])
  const trackCount = useMemo(() => new Set(events.map((e) => e.category)).size, [events])

  const clearFilters = () => {
    setQuery('')
    setCategory('All')
  }

  return (
    <>
      <Header active="events" />
      <main className="mx-auto max-w-6xl py-6 sm:px-4">
        <Hero eventCount={events.length} trackCount={trackCount} />

        <div className="mt-10 px-4 sm:px-0">
          {status === 'loading' && <CardSkeletons />}

          {status === 'error' && <ErrorState onRetry={load} />}

          {status === 'success' && (
            <>
              <Filters
                query={query}
                onQuery={setQuery}
                category={category}
                onCategory={setCategory}
                shown={filtered.length}
                total={events.length}
              />

              {filtered.length === 0 ? (
                <EmptyState onClear={clearFilters} />
              ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-5">
                  {filtered.map((e) => (
                    <EventCard key={e.id} event={e} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}