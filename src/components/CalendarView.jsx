import { useMemo, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, Clock3 } from 'lucide-react'
import { STATUSES } from '../constants/taskOptions.js'
import { formatDate } from '../utils/taskUtils.js'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const pad = (value) => String(value).padStart(2, '0')
const toDateKey = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

function CalendarTask({ task, onEdit }) {
  return (
    <button className={`calendar-event event-${task.status.toLowerCase().replace(' ', '-')}`} onClick={() => onEdit(task)} title={`Edit ${task.title}`}>
      <span className="calendar-event-dot" />
      <span className="calendar-event-title">{task.title}</span>
    </button>
  )
}

function SelectedDayPanel({ date, tasks, onEdit }) {
  const dateLabel = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(date)

  return (
    <aside className="calendar-day-panel">
      <div className="calendar-panel-heading">
        <div><span className="section-eyebrow">SELECTED DAY</span><h3>{dateLabel}</h3></div>
        <CalendarDays size={18} />
      </div>
      {tasks.length ? (
        <div className="calendar-day-tasks">
          {tasks.map((task) => (
            <button key={task.id} className="calendar-day-task" onClick={() => onEdit(task)}>
              <span className={`calendar-task-marker ${task.status.toLowerCase().replace(' ', '-')}`} />
              <span className="calendar-day-task-copy"><strong>{task.title}</strong><span>{task.category || 'General'} · {task.priority} priority</span></span>
              <span className="calendar-task-edit">Edit</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="calendar-empty"><Clock3 size={18} /><p>No tasks due this day.</p><span>Choose another date to see its schedule.</span></div>
      )}
      <div className="calendar-legend">
        {STATUSES.map((status) => <span key={status}><i className={`calendar-task-marker ${status.toLowerCase().replace(' ', '-')}`} />{status}</span>)}
      </div>
    </aside>
  )
}

export default function CalendarView({ tasks, onEdit }) {
  const [month, setMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()))

  const calendarDays = useMemo(() => {
    const year = month.getFullYear()
    const monthIndex = month.getMonth()
    const firstWeekday = (new Date(year, monthIndex, 1).getDay() + 6) % 7
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
    const cellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7
    return Array.from({ length: cellCount }, (_, index) => {
      const dayNumber = index - firstWeekday + 1
      if (dayNumber < 1 || dayNumber > daysInMonth) return null
      const date = new Date(year, monthIndex, dayNumber)
      const key = toDateKey(date)
      return { date, key, dayNumber, tasks: tasks.filter((task) => task.dueDate === key) }
    })
  }, [month, tasks])

  const selected = useMemo(() => {
    const [year, monthIndex, day] = selectedDate.split('-').map(Number)
    return new Date(year, monthIndex - 1, day)
  }, [selectedDate])
  const selectedTasks = tasks.filter((task) => task.dueDate === selectedDate)
  const monthLabel = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(month)

  function changeMonth(offset) {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1))
  }

  function goToToday() {
    const today = new Date()
    setMonth(new Date(today.getFullYear(), today.getMonth(), 1))
    setSelectedDate(toDateKey(today))
  }

  return (
    <section className="workspace-view calendar-view" aria-labelledby="calendar-title">
      <div className="workspace-page-heading">
        <div><div className="section-eyebrow">PLAN YOUR TIME</div><h1 id="calendar-title">Calendar</h1><p>See what’s coming up and choose a day to review its tasks.</p></div>
        <div className="calendar-controls">
          <button className="button button-outline today-button" onClick={goToToday}>Today</button>
          <div className="month-controls">
            <button className="icon-button" aria-label="Previous month" onClick={() => changeMonth(-1)}><ChevronLeft size={18} /></button>
            <strong>{monthLabel}</strong>
            <button className="icon-button" aria-label="Next month" onClick={() => changeMonth(1)}><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
      <div className="calendar-layout">
        <div className="calendar-grid-card">
          <div className="calendar-weekdays">{WEEKDAYS.map((day) => <div key={day}>{day}</div>)}</div>
          <div className="calendar-grid">
            {calendarDays.map((cell, index) => {
              if (!cell) return <div key={`blank-${index}`} className="calendar-cell calendar-blank" aria-hidden="true" />
              const isToday = cell.key === toDateKey(new Date())
              return (
                <button
                  type="button"
                  key={cell.key}
                  className={`calendar-cell ${cell.key === selectedDate ? 'calendar-selected' : ''} ${isToday ? 'calendar-today' : ''}`}
                  onClick={() => setSelectedDate(cell.key)}
                  aria-label={`${formatDate(cell.key)}${cell.tasks.length ? `, ${cell.tasks.length} tasks` : ''}`}
                  aria-pressed={cell.key === selectedDate}
                >
                  <span className="calendar-day-number">{cell.dayNumber}</span>
                  {cell.tasks.length > 0 && (
                    <span className="calendar-cell-events">
                      {cell.tasks.slice(0, 2).map((task) => <span key={task.id} className={`calendar-event-preview preview-${task.status.toLowerCase().replace(' ', '-')}`}><i />{task.title}</span>)}
                      {cell.tasks.length > 2 && <span className="calendar-more">+{cell.tasks.length - 2} more</span>}
                    </span>
                  )}
                  {cell.tasks.length > 0 && <span className="calendar-mobile-dots" aria-hidden="true">{cell.tasks.slice(0, 3).map((task) => <i key={task.id} className={`preview-${task.status.toLowerCase().replace(' ', '-')}`} />)}</span>}
                </button>
              )
            })}
          </div>
          <div className="calendar-grid-footer"><CalendarDays size={14} />Select a date to view its tasks. Select a task to edit it.</div>
        </div>
        <SelectedDayPanel date={selected} tasks={selectedTasks} onEdit={onEdit} />
      </div>
    </section>
  )
}
