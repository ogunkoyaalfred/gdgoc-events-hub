// The GDG-style brackets, in the four Google colours.
function LogoMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true" className="flex-none">
      <path d="M11 8 3 16l8 8" fill="none" stroke="#4285F4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m21 8 8 8-8 8" fill="none" stroke="#34A853" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="11" r="2.4" fill="#EA4335" />
      <circle cx="16" cy="21" r="2.4" fill="#FBBC04" />
    </svg>
  )
}

// `active` names the current page ('events' or 'rsvps') for the pill highlight.
// Both links are plain <a> for now; swap to React Router's <Link> in Sprint 4.
export default function Header({ active = 'events' }) {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="/" className="flex items-center gap-2 rounded-lg" aria-label="GDGoC Bowen Events Hub, home">
          <LogoMark />
          <span className="text-[15px] font-semibold tracking-tight">
            GDGoC <span className="font-normal text-zinc-500">Bowen</span>
          </span>
        </a>

        <nav aria-label="Main" className="flex items-center gap-1 text-sm">
          <a
            href="/"
            aria-current={active === 'events' ? 'page' : undefined}
            className={`rounded-full px-3.5 py-2 font-medium ${
              active === 'events' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Events
          </a>
          <a
            href="/my-rsvps"
            aria-current={active === 'rsvps' ? 'page' : undefined}
            className={`rounded-full px-3.5 py-2 font-medium ${
              active === 'rsvps' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            My RSVPs
          </a>
        </nav>
      </div>
    </header>
  )
}
