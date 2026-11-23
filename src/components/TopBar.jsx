import { useState } from 'react'
import { Bell, CalendarDays, ChevronRight, Menu } from 'lucide-react'
import { formatDate } from '../utils/taskUtils.js'

const workspaceNames = {
  dashboard: 'Dashboard',
  tasks: 'My tasks',
  calendar: 'Calendar',
  help: 'Help & support',
  settings: 'Settings',
}

function NotificationsPanel({ tasks, onEdit }) {
  const upcoming = tasks
    .filter((task) => task.dueDate && task.status !== 'Completed')
    .sort((left, right) => left.dueDate.localeCompare(right.dueDate))
    .slice(0, 4)

  return (
    <div className="notification-panel" role="region" aria-label="Upcoming task notifications">
      <strong>Upcoming tasks</strong>
      {upcoming.length ? upcoming.map((task) => (
        <button key={task.id} className="notification-task" onClick={() => onEdit(task)}>
          <span className="notification-task-dot" />
          <span><b>{task.title}</b><small>Due {formatDate(task.dueDate)}</small></span>
        </button>
      )) : <p>You’re all caught up. No upcoming tasks.</p>}
    </div>
  )
}

export default function TopBar({ activeWorkspace, onOpenNavigation, tasks, onEditTask }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const todayLabel = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())

  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" aria-label="Open navigation" onClick={onOpenNavigation}><Menu size={21} /></button>
      <div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14} /><strong>{workspaceNames[activeWorkspace]}</strong></div>
      <div className="topbar-actions">
        <div className="today-label"><CalendarDays size={15} />{todayLabel}</div>
        <div className="notification-wrap">
          <button className="icon-button notification-button" aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((open) => !open)}><Bell size={18} /><i /></button>
          {notificationsOpen && <NotificationsPanel tasks={tasks} onEdit={(task) => { setNotificationsOpen(false); onEditTask(task) }} />}
        </div>
        <div className="avatar top-avatar" aria-label="Jamie Davis">JD</div>
      </div>
    </header>
  )
}
