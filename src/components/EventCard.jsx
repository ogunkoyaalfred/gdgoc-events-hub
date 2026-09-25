import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faFire,
  faUsers,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Covers, FallbackCover } from "./Covers";
import { categoryThemes, fallbackCategoryTheme } from "../utils/categoryTheme";
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";

const fmt = (options) =>
  new Intl.DateTimeFormat("en-NG", { timeZone: "Africa/Lagos", ...options });
const chipDate = fmt({ weekday: "short", day: "numeric", month: "short" });
const timeFormat = fmt({ hour: "numeric", minute: "2-digit", hour12: true });

// The whole card always links to its own event page — no prop needed.
export default function EventCard({ event }) {
  const { getGoing } = useEvents();
  const t = categoryThemes[event.category] ?? fallbackCategoryTheme;
  const Cover = Covers[event.category] ?? FallbackCover;

  const date = new Date(event.date);
  const isPast = date < new Date();
  const going = getGoing(event);
  const almostFull = !isPast && going >= 90;
  const tags = (event.tags ?? []).slice(0, 2);

  return (
    <article
      style={{
        "--c50": t.c50,
        "--c100": t.c100,
        "--c800": t.c800,
        "--c900": t.c900,
      }}
      className={`relative flex min-h-96 flex-col overflow-hidden rounded-2xl bg-(--c100) text-(--c800) transition-transform duration-200 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-(--c900) motion-safe:hover:-translate-y-1 ${
        isPast ? "opacity-80 saturate-50" : ""
      }`}
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
          <Link
            to={`/events/${event.id}`}
            className="outline-none after:absolute after:inset-0"
          >
            {event.title}
          </Link>
        </h2>

        <p className="line-clamp-3 min-h-18 text-sm leading-relaxed">{event.summary}</p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="space-y-0.5 text-xs leading-relaxed">
            <p className="flex items-center gap-1.5">
              <FontAwesomeIcon
                icon={faClock}
                className="w-3.5 flex-none"
                aria-hidden="true"
              />
              {timeFormat.format(date).toUpperCase()}, {event.venue}
            </p>
            <p className="flex items-center gap-1.5">
              <FontAwesomeIcon
                icon={faUsers}
                className="w-3.5 flex-none"
                aria-hidden="true"
              />
              {going} {isPast ? "went" : "going"}
              {isPast && <span className="font-medium">(ended)</span>}
            </p>
            {almostFull && (
              <p className="flex items-center gap-1.5 font-medium text-(--c900)">
                <FontAwesomeIcon
                  icon={faFire}
                  className="w-3.5 flex-none"
                  aria-hidden="true"
                />
                Filling fast
              </p>
            )}
          </div>

          <span
            aria-hidden="true"
            className="grid size-10 flex-none place-items-center rounded-full bg-(--c900) text-(--c50)"
          >
            <FontAwesomeIcon icon={faArrowRight} className="w-4" />
          </span>
        </div>
      </div>
    </article>
  );
}