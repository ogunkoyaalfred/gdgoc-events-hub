import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">That page does not exist</h1>
      <p className="mt-2 text-zinc-600">Check the link, or head back to the events list.</p>
      <Link to="/" className="mt-6 inline-block min-h-11 rounded-lg bg-zinc-900 px-5 py-2.5 font-semibold text-white">
        See all events
      </Link>
    </main>
  )
}