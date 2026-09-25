import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faClock, faFire, faLocationDot, faUsers } from '@fortawesome/free-solid-svg-icons'
import { useEvents } from '../context/EventsContext'
import { Covers, FallbackCover } from '../components/Covers'
import { categoryThemes, fallbackCategoryTheme } from '../utils/categoryTheme'
import { CardSkeletons, ErrorState } from '../components/States'

const fmt = (options) => new Intl.DateTimeFormat('en-NG', { timeZone: 'Africa/Lagos', ...options })
const longDate = fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
const timeFormat = fmt({ hour: 'numeric', minute: '2-digit', hour12: true })

export default function EventDetail() {
  const { id } = useParams()
  const { events, status, load } = useEvents()
  const headingRef = useRef(null)

  useEffect(() => {
    if (status === 'success') headingRef.current?.focus()
  }, [id, status])

  if (status === 'loading') {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <CardSkeletons count={1} />
      </main>
    )
  }

  if (status === 'error') {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <ErrorState onRetry={load} />
      </main>
    )
  }

  const event = events.find((e) => e.id === id)

  if (!event) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold outline-none">
          We could not find that event
        </h1>
        <p className="mt-2 text-zinc-600">The link may be old, or the event may have been removed.</p>
        <Link
          to="/"
          className="mt-6 inline-block min-h-11 rounded-lg bg-zinc-900 px-5 py-2.5 font-semibold text-white"
        >
          See all events
        </Link>
      </main>
    )
  }

  const t = categoryThemes[event.category] ?? fallbackCategoryTheme
  const Cover = Covers[event.category] ?? FallbackCover
  const date = new Date(event.date)
  const isPast = date < new Date()
  const almostFull = !isPast && event.going >= 90
  const tags = (event.tags ?? []).slice(0, 2)
  const learn = event.learn ?? []

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900">
        <FontAwesomeIcon icon={faArrowLeft} className="w-3.5" aria-hidden="true" />
        All events
      </Link>

      <article
        style={{ '--c50': t.c50, '--c100': t.c100, '--c800': t.c800, '--c900': t.c900 }}
        className={`overflow-hidden rounded-2xl bg-(--c100) ${isPast ? 'opacity-80 saturate-50' : ''}`}
      >
        <div className="relative h-48 sm:h-64">
          <Cover />
          <span className="absolute top-4 left-4 rounded-lg bg-(--c50) px-3 py-1 text-sm font-medium text-(--c800)">
            {longDate.format(date)}
          </span>
          <span className="absolute top-4 right-4 rounded-full bg-(--c800) px-3 py-1 text-sm font-medium text-(--c50)">
            {event.category}
          </span>
        </div>

        {tags.length > 0 && (
          <div className="relative -mt-4 flex flex-wrap gap-2 px-5 sm:px-8">
            <span className="-rotate-3 rounded-lg border border-(--c800) bg-(--c50) px-3 py-1 text-xs font-medium text-(--c800)">
              {tags[0]}
            </span>
            {tags[1] && (
              <span className="rotate-2 rounded-lg bg-(--c900) px-3 py-1.5 text-xs font-medium text-(--c50)">
                {tags[1]}
              </span>
            )}
          </div>
        )}

        <div className="px-5 pt-5 pb-6 text-(--c800) sm:px-8 sm:pb-8">
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-2xl leading-tight font-semibold tracking-tight text-(--c900) outline-none sm:text-3xl"
          >
            {event.title}
          </h1>

          <ul className="mt-4 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            <li className="flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} className="w-3.5 flex-none" aria-hidden="true" />
              <time dateTime={event.date}>{timeFormat.format(date).toUpperCase()}</time>
            </li>
            <li className="flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} className="w-3.5 flex-none" aria-hidden="true" />
              {event.venue}
            </li>
            <li className="flex items-center gap-2">
              <FontAwesomeIcon icon={faUsers} className="w-3.5 flex-none" aria-hidden="true" />
              {event.going} {isPast ? 'went' : 'going'}
              {isPast && <span className="font-medium">(this event has ended)</span>}
            </li>
            {almostFull && (
              <li className="flex items-center gap-1.5 font-medium text-(--c900)">
                <FontAwesomeIcon icon={faFire} className="w-3.5" aria-hidden="true" />
                Filling fast
              </li>
            )}
          </ul>

          <p className="mt-6 max-w-prose text-sm leading-relaxed sm:text-base">{event.description}</p>

          {learn.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-2 text-sm font-semibold text-(--c900)">What you'll get from this session</h2>
              <ul className="max-w-prose list-disc space-y-1 pl-5 text-sm leading-relaxed marker:text-(--c900)">
                {learn.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 text-center sm:p-6">
        {isPast ? (
          <>
            <h2 className="text-lg font-semibold">This event has ended</h2>
            <p className="mt-1 text-sm text-zinc-600">RSVPs are closed. Take a look at what is coming up next.</p>
            <Link
              to="/"
              className="mt-4 inline-block min-h-11 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white"
            >
              See upcoming events
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold">RSVP for this event</h2>
            <p className="mt-1 text-sm text-zinc-600">The RSVP form is coming in the next sprint.</p>
          </>
        )}
      </div>
    </main>
  )
}