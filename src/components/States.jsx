export function CardSkeletons({ count = 6 }) {
  return (
    <div
      className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-5"
      aria-busy="true"
    >
      <p className="sr-only" role="status">
        Loading events
      </p>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="flex min-h-96 animate-pulse flex-col overflow-hidden rounded-2xl bg-white"
        >
          <div className="relative h-32 bg-zinc-200">
            <div className="absolute top-3 left-3 h-5 w-16 rounded-lg bg-zinc-300" />
            <div className="absolute top-3 right-3 h-5 w-14 rounded-full bg-zinc-300" />
          </div>
          <div className="relative -mt-3 flex gap-1.5 px-3">
            <div className="h-5 w-20 rounded-lg bg-zinc-300" />
            <div className="h-5 w-16 rounded-lg bg-zinc-300" />
          </div>
          <div className="flex flex-1 flex-col gap-2 px-4 pt-3 pb-4">
            <div className="h-5 w-3/4 rounded bg-zinc-200" />
            <div className="h-3.5 w-full rounded bg-zinc-200" />
            <div className="h-3.5 w-5/6 rounded bg-zinc-200" />
            <div className="mt-auto flex items-end justify-between pt-2">
              <div className="space-y-1.5">
                <div className="h-3 w-32 rounded bg-zinc-200" />
                <div className="h-3 w-20 rounded bg-zinc-200" />
              </div>
              <div className="size-10 rounded-full bg-zinc-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/** Mirrors the event detail page: a big cover, a meta row, paragraph lines,
 * a short bullet list, and the RSVP panel below it. */
export function EventDetailSkeleton() {
  return (
    <div aria-busy="true">
      <p className="sr-only" role="status">
        Loading event
      </p>
      <div aria-hidden="true" className="animate-pulse">
        <div className="mb-5 h-4 w-24 rounded bg-zinc-200" />
        <div className="overflow-hidden rounded-2xl bg-white">
          <div className="h-48 bg-zinc-200 sm:h-64" />
          <div className="px-5 pt-5 pb-6 sm:px-8 sm:pb-8">
            <div className="mb-4 h-7 w-3/4 rounded bg-zinc-200" />
            <div className="mb-6 flex gap-6">
              <div className="h-3.5 w-32 rounded bg-zinc-200" />
              <div className="h-3.5 w-28 rounded bg-zinc-200" />
              <div className="h-3.5 w-20 rounded bg-zinc-200" />
            </div>
            <div className="mb-2 h-3.5 w-full rounded bg-zinc-200" />
            <div className="mb-2 h-3.5 w-full rounded bg-zinc-200" />
            <div className="mb-6 h-3.5 w-2/3 rounded bg-zinc-200" />
            <div className="h-3.5 w-40 rounded bg-zinc-200" />
          </div>
        </div>
        <div className="mt-6 h-40 rounded-2xl bg-white" />
      </div>
    </div>
  )
}

/** Mirrors a My RSVPs boarding-pass row: a wide info panel and a narrow stub. */
export function TicketSkeletons({ count = 2 }) {
  return (
    <div aria-busy="true">
      <p className="sr-only" role="status">
        Loading your RSVPs
      </p>
      <div aria-hidden="true" className="flex flex-col gap-5">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="flex">
              <div className="min-w-0 flex-1 p-4 sm:p-5">
                <div className="mb-2 h-5 w-16 rounded-full bg-zinc-200" />
                <div className="mb-2 h-5 w-2/3 rounded bg-zinc-200" />
                <div className="mb-3 h-3.5 w-4/5 rounded bg-zinc-200" />
                <div className="h-3.5 w-1/2 rounded bg-zinc-200" />
              </div>
              <div className="w-16 flex-none bg-zinc-200 sm:w-20" />
            </div>
            <div className="h-10 border-t border-zinc-100 bg-zinc-50" />
          </div>
        ))}
      </div>
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