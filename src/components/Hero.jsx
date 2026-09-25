// Twelve shapes, positioned with margin from every edge so their drift never
// reaches the crop line. Each uses one of six drift classes (defined in
// index.css) so they move on staggered loops instead of in sync.
const shapes = [
  { type: 'circle', cx: 70, cy: 44, r: 13, drift: 'drift-a' },
  { type: 'rect', x: 150, y: 30, w: 28, h: 28, rx: 6, drift: 'drift-b' },
  { type: 'circle', cx: 250, cy: 50, r: 10, drift: 'drift-c' },
  { type: 'rect', x: 320, y: 26, w: 24, h: 38, rx: 6, drift: 'drift-a2' },
  { type: 'circle', cx: 410, cy: 46, r: 15, drift: 'drift-b2' },
  { type: 'rect', x: 465, y: 32, w: 28, h: 28, rx: 14, drift: 'drift-c2' },
  { type: 'circle', cx: 90, cy: 168, r: 11, drift: 'drift-b' },
  { type: 'rect', x: 170, y: 156, w: 26, h: 26, rx: 13, drift: 'drift-c' },
  { type: 'circle', cx: 260, cy: 176, r: 9, drift: 'drift-a' },
  { type: 'rect', x: 335, y: 150, w: 22, h: 32, rx: 6, drift: 'drift-b2' },
  { type: 'circle', cx: 425, cy: 170, r: 13, drift: 'drift-a2' },
  { type: 'rect', x: 470, y: 152, w: 26, h: 26, rx: 6, drift: 'drift-c2' },
]

// Full-bleed on mobile (no side margin, square corners), contained and
// rounded again from the `sm` breakpoint up, where there's room to spare.
export default function Hero({ eventCount, trackCount, sessionLabel = '2026 / 2027 session' }) {
  return (
    <div className="hero-cycle relative overflow-hidden rounded-none px-5 py-24 sm:rounded-2xl sm:px-8 sm:py-34">
      <svg
        viewBox="0 0 520 220"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-20"
      >
        {shapes.map((s, i) =>
          s.type === 'circle' ? (
            <circle key={i} className={`hero-cycle-fill ${s.drift}`} cx={s.cx} cy={s.cy} r={s.r} />
          ) : (
            <rect key={i} className={`hero-cycle-fill ${s.drift}`} x={s.x} y={s.y} width={s.w} height={s.h} rx={s.rx} />
          ),
        )}
      </svg>

      <div className="relative mx-auto max-w-md sm:mx-0">
        <span className="mb-4 inline-block rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
          {sessionLabel}
        </span>
        <h1 className="mb-2.5 text-[2rem] leading-[1.12] font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Find your next
          <br />
          Bowen event
        </h1>
        <p className="mb-5 max-w-[38ch] text-sm leading-relaxed text-zinc-700">
          Workshops, study jams and talks for Bowen students, in one place.
        </p>
        <div className="flex gap-6">
          <div>
            <div className="text-xl font-semibold text-zinc-900">{eventCount}</div>
            <div className="text-xs text-zinc-700">events</div>
          </div>
          <div>
            <div className="text-xl font-semibold text-zinc-900">{trackCount}</div>
            <div className="text-xs text-zinc-700">tracks</div>
          </div>
        </div>
      </div>
    </div>
  )
}