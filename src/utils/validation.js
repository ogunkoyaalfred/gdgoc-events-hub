export const LEVELS = ['100L', '200L', '300L', '400L', '500L']

export const TRACKS = [
  'Web Development',
  'Mobile Development',
  'Cloud',
  'AI / Machine Learning',
  'UI/UX Design',
  'Not sure yet',
]

const NAME_PATTERN = /^\p{L}[\p{L}\s'.-]*$/u
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Returns { field: message }. An empty object means the form is valid. */
export function validateRsvp(values) {
  const errors = {}
  const name = (values.name || '').trim()
  const email = (values.email || '').trim()

  if (!name) errors.name = 'Enter your full name.'
  else if (name.length < 2) errors.name = 'Your name should be at least 2 characters.'
  else if (!NAME_PATTERN.test(name)) errors.name = 'Use letters only. Spaces, hyphens and apostrophes are fine.'

  if (!email) errors.email = 'Enter your email address.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email, like name@example.com.'

  if (!values.level) errors.level = 'Choose your level.'
  else if (!LEVELS.includes(values.level)) errors.level = 'Choose a level from the list.'

  if (!values.track) errors.track = 'Choose the track you are most interested in.'
  else if (!TRACKS.includes(values.track)) errors.track = 'Choose a track from the list.'

  return errors
}