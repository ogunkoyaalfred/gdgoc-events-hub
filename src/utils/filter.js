export const CATEGORIES = ['Web', 'Mobile', 'Cloud', 'AI/ML', 'Design', 'Career']

/** Search by title (case-insensitive) and filter by category. Both optional. */
export function filterEvents(events, query, category) {
  const q = query.trim().toLowerCase()
  return events.filter((event) => {
    const matchesCategory = category === 'All' || event.category === category
    const matchesQuery = !q || event.title.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  })
}