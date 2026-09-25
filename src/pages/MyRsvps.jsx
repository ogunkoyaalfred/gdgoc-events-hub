import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarXmark,
  faClock,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEvents } from "../context/EventsContext";
import { categoryThemes, fallbackCategoryTheme } from "../utils/categoryTheme";
import { TicketSkeletons, ErrorState } from "../components/States";

const fmt = (options) =>
  new Intl.DateTimeFormat("en-NG", { timeZone: "Africa/Lagos", ...options });
const longDate = fmt({
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const timeFormat = fmt({ hour: "numeric", minute: "2-digit", hour12: true });

// The colour the little "torn" notches sit against. Matches the page
// background (set in index.css) so they read as cut-out circles, not dots.
const PAGE_BG = "#FAFAFA";

export default function MyRsvps() {
  const { events, status, load, rsvps, cancelRsvp } = useEvents();
  const [confirmingId, setConfirmingId] = useState(null);

  // re-fetch (and re-show the loading skeleton) every time this page is visited
  useEffect(() => load(), [load]);

  if (status === "loading") {
    return (
      <main
        id="main"
        tabIndex={-1}
        className="outline-none mx-auto max-w-3xl px-4 py-10"
      >
        <TicketSkeletons count={2} />
      </main>
    );
  }

  if (status === "error") {
    return (
      <main
        id="main"
        tabIndex={-1}
        className="outline-none mx-auto max-w-3xl px-4 py-10"
      >
        <ErrorState onRetry={load} />
      </main>
    );
  }

  const rows = rsvps
    .map((rsvp) => ({ rsvp, event: events.find((e) => e.id === rsvp.eventId) }))
    .filter((row) => row.event)
    .sort((a, b) => new Date(a.event.date) - new Date(b.event.date));

  return (
    <main
      id="main"
      tabIndex={-1}
      className="outline-none mx-auto max-w-3xl px-4 py-6 sm:py-10"
    >
      <h1 className="text-2xl mb-5 font-semibold tracking-tight text-zinc-900 sm:text-3xl">
        My RSVPs
      </h1>

      {rows.length === 0 ? (
        <div className="grid justify-items-center gap-3 rounded-2xl border-2 border-dashed border-zinc-300 px-5 py-16 text-center">
          <FontAwesomeIcon
            icon={faCalendarXmark}
            className="w-8 text-zinc-400"
            aria-hidden="true"
          />
          <h2 className="text-xl font-semibold">You haven't RSVPed yet</h2>
          <p className="max-w-md text-zinc-600">
            When you save a seat at an event, it will show up here.
          </p>
          <Link
            to="/"
            className="min-h-11 rounded-lg bg-zinc-900 px-5 py-2.5 font-semibold text-white"
          >
            Browse events
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-5">
          {rows.map(({ rsvp, event }) => {
            const t = categoryThemes[event.category] ?? fallbackCategoryTheme;
            const date = new Date(event.date);

            return (
              <li
                key={rsvp.id}
                style={{
                  "--c50": t.c50,
                  "--c100": t.c100,
                  "--c800": t.c800,
                  "--c900": t.c900,
                }}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                {/* Boarding-pass body: the main info panel, then a torn stub on the right */}
                <div className="flex">
                  <div className="min-w-0 flex-1 border border-zinc-200 border-r-0 p-4 sm:p-5">
                    <span className="mb-2 inline-block rounded-full bg-(--c100) px-2.5 py-0.5 text-xs font-medium text-(--c900)">
                      {event.category}
                    </span>
                    <h2 className="text-base leading-snug font-semibold text-zinc-900 sm:text-lg">
                      <Link
                        to={`/events/${event.id}`}
                        className="hover:underline"
                      >
                        {event.title}
                      </Link>
                    </h2>
                    <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-600 sm:text-sm">
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon
                          icon={faClock}
                          className="w-3 flex-none"
                          aria-hidden="true"
                        />
                        {longDate.format(date)},{" "}
                        {timeFormat.format(date).toUpperCase()}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="w-3 flex-none"
                          aria-hidden="true"
                        />
                        {event.venue}
                      </span>
                    </p>
                    <p className="mt-3 text-xs text-zinc-700 sm:text-sm">
                      <span className="font-medium">{rsvp.name}</span>
                      <span className="mx-1.5 text-zinc-300">&bull;</span>
                      {rsvp.level}
                      <span className="mx-1.5 text-zinc-300">&bull;</span>
                      {rsvp.track}
                    </p>
                  </div>

                  {/* the stub: a perforated tear-line with two punched-out notches */}
                  <div className="relative flex w-16 flex-none items-center justify-center border border-zinc-200 border-l-0 bg-(--c100) sm:w-20">
                    <div
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 border-l-2 border-dashed"
                      style={{ borderColor: t.c50 }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute top-0 left-0 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ backgroundColor: PAGE_BG }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 size-3.5 -translate-x-1/2 translate-y-1/2 rounded-full"
                      style={{ backgroundColor: PAGE_BG }}
                    />
                    <span
                      className="text-[10px] font-semibold tracking-wide text-(--c900) uppercase"
                      style={{ writingMode: "vertical-rl" }}
                    >
                      RSVP confirmed
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 rounded-b-2xl border border-t-0 border-zinc-200 bg-zinc-50 px-4 py-2.5 sm:px-5">
                  {confirmingId === rsvp.id ? (
                    <>
                      <span className="mr-auto text-sm text-zinc-600">
                        Cancel this RSVP?
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          cancelRsvp(rsvp.id);
                          setConfirmingId(null);
                        }}
                        className="min-h-9 rounded-lg bg-red-600 px-3.5 text-sm font-semibold text-white hover:bg-red-700"
                      >
                        Yes, cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmingId(null)}
                        className="min-h-9 rounded-lg border border-zinc-300 px-3.5 text-sm font-medium text-zinc-700 hover:bg-white"
                      >
                        Keep it
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmingId(rsvp.id)}
                      className="min-h-9 rounded-lg px-3.5 text-sm font-medium text-zinc-600 hover:bg-white"
                    >
                      Cancel RSVP
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
