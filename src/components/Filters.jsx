import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { CATEGORIES } from '../utils/filter'
import { categoryThemes } from '../utils/categoryTheme'

export default function Filters({ query, onQuery, category, onCategory, shown, total }) {
  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="relative max-w-md">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="pointer-events-none absolute top-1/2 left-4 w-4 -translate-y-1/2 text-zinc-400"
          aria-hidden="true"
        />
        <label htmlFor="event-search" className="sr-only">
          Search events by title
        </label>
        <input
          id="event-search"
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search events by title"
          autoComplete="off"
          className="min-h-11 w-full rounded-full border border-zinc-300 bg-white py-2.5 pr-4 pl-11 text-sm focus:border-zinc-900 focus:outline-none"
        />
      </div>

      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {/* "All" stays neutral on purpose, since it doesn't belong to one category's colour */}
        <button
          type="button"
          aria-pressed={category === 'All'}
          onClick={() => onCategory('All')}
          className={`min-h-9 rounded-full border px-3.5 text-sm font-medium ${
            category === 'All'
              ? 'border-zinc-900 bg-zinc-900 text-white'
              : 'border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400'
          }`}
        >
          All
        </button>

        {CATEGORIES.map((c) => {
          const t = categoryThemes[c]
          const isActive = category === c
          return (
            <button
              key={c}
              type="button"
              aria-pressed={isActive}
              onClick={() => onCategory(c)}
              style={isActive ? { backgroundColor: t.c900, borderColor: t.c900 } : { borderColor: t.c100 }}
              className={`flex min-h-9 items-center gap-2 rounded-full border bg-white px-3.5 text-sm font-medium ${
                isActive ? 'text-white' : 'text-zinc-700 hover:brightness-95'
              }`}
            >
              <span
                aria-hidden="true"
                className="size-2 flex-none rounded-full"
                style={{ backgroundColor: isActive ? '#FFFFFF' : t.c900 }}
              />
              {c}
            </button>
          )
        })}
      </div>

      <p aria-live="polite" className="text-sm text-zinc-500">
        Showing {shown} of {total} events
      </p>
    </div>
  )
}