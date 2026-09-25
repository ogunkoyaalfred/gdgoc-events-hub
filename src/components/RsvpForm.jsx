import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faEnvelope, faGraduationCap, faUser } from '@fortawesome/free-solid-svg-icons'
import { useEvents } from '../context/EventsContext'
import { categoryThemes, fallbackCategoryTheme } from '../utils/categoryTheme'
import { LEVELS, TRACKS, validateRsvp } from '../utils/validation'

const FIELDS = ['name', 'email', 'level', 'track']
const EMPTY = { name: '', email: '', level: '', track: '' }

export default function RsvpForm({ event, onSuccess }) {
  const { addRsvp } = useEvents()
  const t = categoryThemes[event.category] ?? fallbackCategoryTheme
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const refs = useRef({})

  const handleChange = (e) => {
    const { name, value } = e.target
    const next = { ...values, [name]: value }
    setValues(next)
    // once a field has been visited, re-check it as the person types so the error clears right away
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validateRsvp(next)[name] }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateRsvp(values)[name] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return

    const found = validateRsvp(values)
    setErrors(found)
    setTouched({ name: true, email: true, level: true, track: true })

    const firstInvalid = FIELDS.find((f) => found[f])
    if (firstInvalid) {
      refs.current[firstInvalid]?.focus()
      return
    }

    setSubmitting(true)
    const result = await addRsvp(event.id, values)
    setSubmitting(false)

    if (!result.ok) {
      setErrors(result.errors)
      refs.current.email?.focus()
      return
    }
    onSuccess(result.rsvp)
  }

  // shared props for every field: value, handlers, and the a11y wiring for its error message
  const field = (name) => ({
    id: `rsvp-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    ref: (el) => (refs.current[name] = el),
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `rsvp-${name}-error` : undefined,
  })

  const error = (name) =>
    errors[name] ? (
      <p className="mt-1 text-sm font-medium text-red-600" id={`rsvp-${name}-error`}>
        {errors[name]}
      </p>
    ) : null

  // Text/select fields share one look: an icon docked on the left, category-
  // tinted focus ring, and a light category tint filling the background.
  const controlClass =
    'min-h-11 w-full rounded-lg border border-zinc-300 bg-(--c50)/40 py-2.5 pr-3 pl-10 text-base text-zinc-900 focus:border-(--c900) focus:bg-white focus:outline-none aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ '--c50': t.c50, '--c800': t.c800, '--c900': t.c900 }}
      className="text-left"
    >
      <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Save your seat</h2>
      <p className="mt-1 mb-5 text-sm text-zinc-600">It takes under a minute. All fields are required.</p>

      <div className="mb-4">
        <label htmlFor="rsvp-name" className="mb-1 block text-sm font-medium text-zinc-800">
          Full name
        </label>
        <div className="relative">
          <FontAwesomeIcon
            icon={faUser}
            className="pointer-events-none absolute top-1/2 left-3.5 w-4 -translate-y-1/2 text-(--c800)"
            aria-hidden="true"
          />
          <input type="text" autoComplete="name" {...field('name')} className={controlClass} />
        </div>
        {error('name')}
      </div>

      <div className="mb-4">
        <label htmlFor="rsvp-email" className="mb-1 block text-sm font-medium text-zinc-800">
          Email address
        </label>
        <div className="relative">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="pointer-events-none absolute top-1/2 left-3.5 w-4 -translate-y-1/2 text-(--c800)"
            aria-hidden="true"
          />
          <input
            type="email"
            autoComplete="email"
            inputMode="email"
            {...field('email')}
            className={controlClass}
          />
        </div>
        {error('email')}
      </div>

      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="rsvp-level" className="mb-1 block text-sm font-medium text-zinc-800">
            Level
          </label>
          <div className="relative">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="pointer-events-none absolute top-1/2 left-3.5 w-4 -translate-y-1/2 text-(--c800)"
              aria-hidden="true"
            />
            <select {...field('level')} className={`${controlClass} appearance-none`}>
              <option value="">Select level</option>
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          {error('level')}
        </div>

        <div>
          <label htmlFor="rsvp-track" className="mb-1 block text-sm font-medium text-zinc-800">
            Track of interest
          </label>
          <div className="relative">
            <FontAwesomeIcon
              icon={faCompass}
              className="pointer-events-none absolute top-1/2 left-3.5 w-4 -translate-y-1/2 text-(--c800)"
              aria-hidden="true"
            />
            <select {...field('track')} className={`${controlClass} appearance-none`}>
              <option value="">Select track</option>
              {TRACKS.map((tr) => (
                <option key={tr} value={tr}>
                  {tr}
                </option>
              ))}
            </select>
          </div>
          {error('track')}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="min-h-11 w-full rounded-lg bg-(--c900) px-5 font-semibold text-white hover:brightness-110 disabled:opacity-70"
      >
        {submitting ? 'Saving your seat...' : 'RSVP for this event'}
      </button>
    </form>
  )
}