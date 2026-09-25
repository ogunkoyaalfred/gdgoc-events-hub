import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faFire, faUsers, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Covers, FallbackCover } from './Covers'

// Each category has four shades: 50 (lightest), 100 (card background),
// 800 (body text) and 900 (title and buttons). The card sets them as CSS
// variables, and every class below reads those variables, so one card
// layout works for all categories.
const themes = {
  Web: { c50: '#E6F1FB', c100: '#B5D4F4', c800: '#0C447C', c900: '#042C53' },
  Mobile: { c50: '#EAF3DE', c100: '#C0DD97', c800: '#27500A', c900: '#173404' },
  Cloud: { c50: '#FAEEDA', c100: '#FAC775', c800: '#633806', c900: '#412402' },
  'AI/ML': { c50: '#FAECE7', c100: '#F5C4B3', c800: '#712B13', c900: '#4A1B0C' },
  Design: { c50: '#EEEDFE', c100: '#CECBF6', c800: '#3C3489', c900: '#26215C' },
  Career: { c50: '#E1F5EE', c100: '#9FE1CB', c800: '#085041', c900: '#04342C' },
}
const fallbackTheme = { c50: '#F4F4F5', c100: '#E4E4E7', c800: '#3F3F46', c900: '#18181B' }

const fmt = (options) => new Intl.DateTimeFormat('en-NG', { timeZone: 'Africa/Lagos', ...options })
const chipDate = fmt({ weekday: 'short', day: 'numeric', month: 'short' })
const timeFormat = fmt({ hour: 'numeric', minute: '2-digit', hour12: true })

// Pass `href` once the event page exists (Sprint 4). Without it the card is not a link.
export default function EventCard({ event, href }) {
  const t = themes[event.category] ?? fallbackTheme
  const Cover = Covers[event.category] ?? FallbackCover

  const date = new Date(event.date)
  const isPast = date < new Date()
  const almostFull = !isPast && event.going >= 90
  const tags = (event.tags ?? []).slice(0, 2)

  return (
    <article
      style={{ '--c50': t.c50, '--c100': t.c100, '--c800': t.c800, '--c900': t.c900 }}
      className={`relative flex min-h-110 flex-col overflow-hidden rounded-2xl bg-(--c100) text-(--c800) transition-transform duration-200 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-(--c900) ${
        href ? 'motion-safe:hover:-translate-y-1' : ''
      } ${isPast ? 'opacity-80 saturate-50' : ''}`}
    >
      <div className="relative h-32">
        <Cover />
        <time
          dateTime={event.date}
          className="absolute top-3 left-3 rounded-lg bg-(--c50) px-2.5 py-0.5 text-xs font-medium text-(--c800)"
        >
          {chipDate.format(date)}
        </time>
        <span className="absolute top-3 right-3 rounded-full bg-(--c800) px-2.5 py-0.5 text-xs font-medium text-(--c50)">
          {event.category}
        </span>
      </div>

      {tags.length > 0 && (
        <div className="relative -mt-3 flex flex-wrap gap-x-1.5 gap-y-1 px-3">
          <span className="-rotate-3 rounded-lg border border-(--c800) bg-(--c50) px-2.5 py-0.5 text-xs font-medium text-(--c800)">
            {tags[0]}
          </span>
          {tags[1] && (
            <span className="rotate-2 rounded-lg bg-(--c900) px-2.5 py-1 text-xs font-medium text-(--c50)">
              {tags[1]}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 px-4 pt-3 pb-4">
        <h2 className="text-xl leading-tight font-semibold tracking-tight text-(--c900)">
          {href ? (
            <a href={href} className="outline-none after:absolute after:inset-0">
              {event.title}
            </a>
          ) : (
            event.title
          )}
        </h2>

        <p className="line-clamp-3 text-sm leading-relaxed">{event.description}</p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="space-y-0.5 text-xs leading-relaxed">
            <p className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faClock} className="w-3.5 flex-none" aria-hidden="true" />
              {timeFormat.format(date).toUpperCase()}, {event.venue}
            </p>
            <p className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faUsers} className="w-3.5 flex-none" aria-hidden="true" />
              {event.going} {isPast ? 'went' : 'going'}
              {isPast && <span className="font-medium">(ended)</span>}
            </p>
            {almostFull && (
              <p className="flex items-center gap-1.5 font-medium text-(--c900)">
                <FontAwesomeIcon icon={faFire} className="w-3.5 flex-none" aria-hidden="true" />
                Filling fast
              </p>
            )}
          </div>

          {href && (
            <span
              aria-hidden="true"
              className="grid size-10 flex-none place-items-center rounded-full bg-(--c900) text-(--c50)"
            >
              <FontAwesomeIcon icon={faArrowRight} className="w-4" />
            </span>
          )}
        </div>
      </div>
    </article>
  )
}