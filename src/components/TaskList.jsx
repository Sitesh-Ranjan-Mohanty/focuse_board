import { Check, Plus, Search } from 'lucide-react'
import TaskItem from './TaskItem.jsx'

function EmptyTaskState({ onClearFilters }) {
  return (
    <div className="empty-state">
      <div className="empty-icon"><Search size={20} /></div>
      <strong>No tasks found</strong>
      <p>Try a different search or update your filters.</p>
      <button className="button button-quiet" onClick={onClearFilters}>Clear filters</button>
    </div>
  )
}

function TaskListFooter({ visibleCount, totalCount }) {
  return (
    <div className="list-footer">
      <span>Showing <strong>{visibleCount}</strong> of <strong>{totalCount}</strong> tasks</span>
      <span className="list-updated">All changes saved locally <Check size={13} /></span>
    </div>
  )
}

export default function TaskList({
  tasks,
  allTasks,
  onEdit,
  onDelete,
  onStatusChange,
  onCreateTask,
  onClearFilters,
}) {
  return (
    <>
      <div className="task-list">
        <div className="task-list-head">
          <span>TASK</span>
          <span>CATEGORY</span>
          <span>STATUS</span>
          <span>PRIORITY</span>
          <span>DUE DATE</span>
          <span aria-label="Actions" />
        </div>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
          ))
        ) : (
          <EmptyTaskState onClearFilters={onClearFilters} />
        )}
      </div>
      <TaskListFooter visibleCount={tasks.length} totalCount={allTasks.length} />
      <button className="button button-primary mobile-create-task" onClick={onCreateTask}><Plus size={16} />Create task</button>
    </>
  )
}
