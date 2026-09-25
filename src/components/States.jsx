export function CardSkeletons({ count = 6 }) {
  return (
    <div
      className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-5"
      aria-busy="true"
    >
      <p className="sr-only" role="status">
        Loading events
      </p>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} aria-hidden="true" className="min-h-110 animate-pulse rounded-2xl bg-zinc-200" />
      ))}
    </div>
  )
}

export function ErrorState({ onRetry }) {
  return (
    <div
      role="alert"
      className="grid justify-items-center gap-3 rounded-2xl border-2 border-dashed border-zinc-300 px-5 py-16 text-center"
    >
      <h2 className="text-xl font-semibold">We could not load the events</h2>
      <p className="max-w-md text-zinc-600">
        Check your connection, then try again. If it keeps happening, come back in a few minutes.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="min-h-11 rounded-lg bg-zinc-900 px-5 font-semibold text-white hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
      >
        Try again
      </button>
    </div>
  )
}

export function EmptyState({ onClear }) {
  return (
    <div className="grid justify-items-center gap-3 rounded-2xl border-2 border-dashed border-zinc-300 px-5 py-16 text-center">
      <h2 className="text-xl font-semibold">No events match that search</h2>
      <p className="max-w-md text-zinc-600">
        Try a different title or pick another category. New events are added often.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="min-h-11 rounded-lg border border-zinc-300 px-5 font-semibold text-zinc-900 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
      >
        Clear search and filters
      </button>
    </div>
  )
}