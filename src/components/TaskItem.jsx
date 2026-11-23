import { CalendarDays, Check, ChevronDown, Settings, X } from 'lucide-react'
import { STATUSES } from '../constants/taskOptions.js'
import { formatDate } from '../utils/taskUtils.js'

export default function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <article className="task-row">
      <div className={`task-check ${task.status === 'Completed' ? 'is-complete' : ''}`} aria-hidden="true">
        {task.status === 'Completed' && <Check size={13} />}
      </div>
      <div className="task-main">
        <h3 className={task.status === 'Completed' ? 'completed-title' : ''}>{task.title}</h3>
        <p>{task.description || 'No description added.'}</p>
        <div className="task-mobile-meta">
          <span className="category-tag">{task.category || 'General'}</span>
          <span className="due-date"><CalendarDays size={13} />{formatDate(task.dueDate)}</span>
        </div>
      </div>
      <div className="task-category"><span className="category-tag">{task.category || 'General'}</span></div>
      <div className="task-status">
        <div className="select-wrap status-select">
          <select
            aria-label={`Status for ${task.title}`}
            value={task.status}
            onChange={(event) => onStatusChange(task.id, event.target.value)}
            className={`status-${task.status.toLowerCase().replace(' ', '-')}`}
          >
            {STATUSES.map((status) => <option key={status}>{status}</option>)}
          </select>
          <ChevronDown size={13} />
        </div>
      </div>
      <div className="task-priority"><span className={`priority-dot ${task.priority.toLowerCase()}`} />{task.priority}</div>
      <div className="task-date"><CalendarDays size={14} />{formatDate(task.dueDate)}</div>
      <div className="task-actions">
        <button className="icon-button small" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)}><Settings size={15} /></button>
        <button className="icon-button small danger-hover" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task)}><X size={16} /></button>
      </div>
    </article>
  )
}
