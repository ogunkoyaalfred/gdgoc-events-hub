import events from './data/events.json'
import Header from './components/Header'
import Hero from './components/Hero'
import EventCard from './components/EventCard'

export default function App() {
  const trackCount = new Set(events.map((e) => e.category)).size

  return (
    <>
      <Header active="events" />
      <main className="mx-auto max-w-6xl py-6 sm:px-4">
        <Hero eventCount={events.length} trackCount={trackCount} />
        <div className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-5 px-4">
          {events.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </main>
    </>
  )
}