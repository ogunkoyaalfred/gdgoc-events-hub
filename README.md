# GDGoC Bowen Events Hub

A web app where Bowen students can browse GDGoC events, search and filter them, read the full details, and RSVP.

Built for the GDGoC Bowen Frontend Lead assessment (2026/2027).

- **Live app:** https://gdgocevents.netlify.app/


## What it does

- Lists 12 events from a local JSON file. Each card shows the title, date, category, venue and a short description.
- Search by title and filter by category (Web, Mobile, Cloud, AI/ML, Design, Career). If nothing matches, it says so and offers a one-click reset.
- Clicking an event opens its own page at `/events/:id`, with the full write-up, what you'll get from the session, and the RSVP form.
- RSVP form with name, email, level (100L–500L) and track of interest. Validates on blur and on submit, shows a specific message under each field, focuses the first invalid one, and blocks a duplicate RSVP (same email, same event). On success it shows a confirmation and the event's "going" count goes up, everywhere it's shown.
- Works from a 360px phone up to a wide laptop screen.
- Fakes a short loading delay (about 1.3 seconds) every time you land on a page, with a skeleton shaped to match what's actually loading there, the card grid, an event's own layout, or the boarding-pass RSVP list. Shows an error state with a **Try again** button if loading fails (add `?error` to any URL to see it).

### Extras I built

- **My RSVPs page** (`/my-rsvps`), styled as a boarding-pass style ticket, that survives a refresh (saved in `localStorage`), with a two-step cancel.
- **Upcoming and past events** are treated differently throughout: past events are visually dimmed, show "ended", and RSVPs are closed for them automatically based on the event's own date.
- **Category colour system**: every category (Web, Mobile, Cloud, AI/ML, Design, Career) has its own colour and cover artwork, used consistently across the card grid, the event page, the filter chips, and the RSVP form.
- **Accessibility**: labelled form fields with linked error messages and visible focus outlines, live-region announcements for search results and confirmations, and reduced-motion support for the animated hero.

## Run it locally

You need Node 18 or newer.

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build in /dist
npm run preview   # serve the production build locally
```

To see the error state, open the app with `?error` on the end of the URL, for example [Error State](https://gdgocevents.netlify.app/?error).

## Deploy

The app is a static single-page app, so any static host works. Because React Router creates URLs like `/events/hack-night` that only exist client-side, your host needs a rewrite rule sending every path to `index.html`, or refreshing an event's page (or opening its link directly) will 404.

- **Netlify:** build command `npm run build`, publish directory `dist`. `public/_redirects` handles the same rule.

## Why this stack
- **React + Vite.** A few screens sharing one list of events and one list of RSVPs suits React well, and Vite gives instant feedback while building.
- **React Router**, so every event has a real, shareable, refreshable URL, rather than a modal that loses state on reload.
- **Tailwind CSS**, for consistent spacing and a design system (the category colours are CSS variables, so one component works for all six categories instead of six near-duplicates).
- **React Context** (`EventsContext`) holds the events list, load status, and RSVPs in one place, so the grid, an event's own page, and My RSVPs never show different numbers for the same event.
- **No backend.** RSVPs and the "going" count are stored in the browser's `localStorage`, since the brief doesn't require one. The tradeoff is explained below.

## How the code is organised
src/
api/events.js fake fetch: waits ~1.3s, can fail with ?error
data/events.json the 12 mock events
context/EventsContext.jsx events, load status, RSVPs, add/cancel RSVP, going count
hooks/useLocalStorage.js a useState that survives a refresh
utils/
filter.js search + category filtering, category list
categoryTheme.js one colour palette per category, shared by every component
validation.js RSVP form rules (pure function, easy to reason about)
components/
Header.jsx, Hero.jsx page chrome
EventCard.jsx, Covers.jsx the card grid and its per-category artwork
Filters.jsx search box + category chips
States.jsx loading skeletons (one shape per page), error state, empty state
RsvpForm.jsx the RSVP form itself
pages/
Home.jsx, EventDetail.jsx, MyRsvps.jsx, NotFound.jsx


## Decisions worth knowing about

- **The "going" count** is the number in the mock data plus any RSVPs made from this browser. Without a backend, that's the honest way to show the count actually go up after someone submits, rather than faking a random increment.
- **Upcoming vs. past is calculated live** from each event's own date compared to right now, so events move to "ended" on their own as time passes. If you're reading this well after the event dates in `events.json`, most will show as past; change the dates to see the upcoming state again.
- **Dates are shown in Lagos time** regardless of the viewer's own timezone, since that's where the events actually happen.
- **The loading skeleton refetches on every page visit**, not just the first time the app opens, so navigating around genuinely shows the loading state again rather than only once per session.
- **RSVPs live in `localStorage`, per browser**, not a shared server. Two different people on two different devices won't see each other's RSVPs, and clearing browser data clears them.

## What I'd improve with more time

- A real backend (Firebase or a small Node API), so RSVPs and the going count are shared across everyone, with real duplicate-email checking server-side instead of trusting the client.
- Keep the search text and category filter in the URL, so a filtered view can be shared as a link.
- Add-to-calendar (`.ics`) on the RSVP confirmation screen.
- Event capacity and a waitlist once "filling fast" actually means something concrete.
- Dark mode.
- Browser-level end-to-end tests (Playwright), and a Lighthouse check wired into CI so a regression is caught automatically rather than found by hand.