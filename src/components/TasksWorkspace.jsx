import { Plus } from 'lucide-react'
import TaskFilters from './TaskFilters.jsx'
import TaskList from './TaskList.jsx'

export default function TasksWorkspace({
  tasks,
  allTasks,
  search,
  filter,
  priority,
  onSearchChange,
  onFilterChange,
  onPriorityChange,
  onEdit,
  onDelete,
  onStatusChange,
  onCreateTask,
  onClearFilters,
  title = 'My tasks',
}) {
  return (
    <section className="tasks-section tasks-workspace-section" id="tasks">
      <div className="section-heading">
        <div><div className="section-eyebrow">YOUR WORKSPACE</div><h2>{title} <span className="task-total">{allTasks.length}</span></h2></div>
        <button className="button button-outline desktop-add" onClick={onCreateTask}><Plus size={16} />New task</button>
      </div>
      <TaskFilters
        tasks={allTasks}
        filter={filter}
        priority={priority}
        search={search}
        onFilterChange={onFilterChange}
        onPriorityChange={onPriorityChange}
        onSearchChange={onSearchChange}
      />
      <TaskList
        tasks={tasks}
        allTasks={allTasks}
        onEdit={onEdit}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
        onCreateTask={onCreateTask}
        onClearFilters={onClearFilters}
      />
    </section>
  )
}
