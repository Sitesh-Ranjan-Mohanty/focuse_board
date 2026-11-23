import { sampleTasks } from '../data/sampleTasks.js'

export const STORAGE_KEY = 'focusboard_tasks'

export function readTasks() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === null) return sampleTasks
    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed)) throw new TypeError('Saved tasks must be an array.')
    return parsed
  } catch (error) {
    console.error('FocusBoard could not restore saved tasks.', error)
    return sampleTasks
  }
}

export function formatDate(value) {
  if (!value) return 'No due date'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(
    new Date(`${value}T00:00:00`),
  )
}
