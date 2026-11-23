import { Search, X, ChevronDown } from 'lucide-react'
import { FILTERS, PRIORITIES } from '../constants/taskOptions.js'

export default function TaskFilters({
  tasks,
  filter,
  priority,
  search,
  onFilterChange,
  onPriorityChange,
  onSearchChange,
}) {
  return (
    <div className="task-toolbar">
      <div className="filter-tabs" role="tablist" aria-label="Filter tasks by status">
        {FILTERS.map((item) => (
          <button
            key={item}
            role="tab"
            aria-selected={filter === item}
            className={filter === item ? 'tab active-tab' : 'tab'}
            onClick={() => onFilterChange(item)}
          >
            {item}
            <span>{item === 'All tasks' ? tasks.length : tasks.filter((task) => task.status === item).length}</span>
          </button>
        ))}
      </div>
      <div className="toolbar-controls">
        <label className="search-box">
          <Search size={16} />
          <input type="search" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search tasks..." aria-label="Search tasks by title" />
          {search && <button className="clear-search" aria-label="Clear search" onClick={() => onSearchChange('')}><X size={14} /></button>}
        </label>
        <div className="select-wrap priority-filter">
          <select aria-label="Filter by priority" value={priority} onChange={(event) => onPriorityChange(event.target.value)}>
            <option>All priorities</option>
            {PRIORITIES.map((item) => <option key={item}>{item}</option>)}
          </select>
          <ChevronDown size={15} />
        </div>
      </div>
    </div>
  )
}
