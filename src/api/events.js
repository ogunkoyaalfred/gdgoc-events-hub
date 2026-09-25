import events from '../data/events.json'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Pretends to be a network request.
// Add ?error to the page URL to force a failure and see the error state.
export async function fetchEvents() {
  await wait(1300)
  if (new URLSearchParams(window.location.search).has('error')) {
    throw new Error('Could not load events')
  }
  return events
}