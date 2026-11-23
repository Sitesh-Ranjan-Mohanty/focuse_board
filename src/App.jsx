import { useEffect, useMemo, useState } from 'react'
import DashboardHeader from './components/DashboardHeader.jsx'
import CalendarView from './components/CalendarView.jsx'
import FocusNotes from './components/FocusNotes.jsx'
import InfoWorkspace from './components/InfoWorkspace.jsx'
import PageFooter from './components/PageFooter.jsx'
import Sidebar from './components/Sidebar.jsx'
import TaskDialog from './components/TaskDialog.jsx'
import TasksWorkspace from './components/TasksWorkspace.jsx'
import TaskOverview from './components/TaskOverview.jsx'
import TopBar from './components/TopBar.jsx'
import { readTasks, STORAGE_KEY } from './utils/taskUtils.js'
import { sampleTasks } from './data/sampleTasks.js'

function App() {
  const [tasks, setTasks] = useState(readTasks)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All tasks')
  const [priority, setPriority] = useState('All priorities')
  const [dialogTask, setDialogTask] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [activeWorkspace, setActiveWorkspace] = useState('dashboard')

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (error) {
      console.error('FocusBoard could not save tasks to local storage.', error)
    }
  }, [tasks])

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === 'Completed').length
    const inProgress = tasks.filter((task) => task.status === 'In progress').length
    return {
      total: tasks.length,
      completed,
      inProgress,
      percent: tasks.length ? Math.round((completed / tasks.length) * 100) : 0,
    }
  }, [tasks])

  const visibleTasks = useMemo(() => {
    const query = search.trim().toLocaleLowerCase()
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLocaleLowerCase().includes(query)
      const matchesStatus = filter === 'All tasks' || task.status === filter
      const matchesPriority = priority === 'All priorities' || task.priority === priority
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [tasks, search, filter, priority])

  function saveTask(values) {
    if (dialogTask) {
      setTasks((current) => current.map((task) => (
        task.id === dialogTask.id ? { ...task, ...values, id: task.id } : task
      )))
    } else {
      setTasks((current) => [
        { ...values, id: globalThis.crypto?.randomUUID?.() ?? `task-${Date.now()}` },
        ...current,
      ])
    }
    closeDialog()
  }

  function editTask(task) {
    setDialogTask(task)
    setDialogOpen(true)
  }

  function deleteTask(task) {
    if (window.confirm(`Delete “${task.title}”? This task will be permanently removed.`)) {
      setTasks((current) => current.filter((item) => item.id !== task.id))
    }
  }

  function openCreate() {
    setDialogTask(null)
    setDialogOpen(true)
  }

  function closeDialog() {
    setDialogOpen(false)
    setDialogTask(null)
  }

  function changeWorkspace(workspace) {
    setActiveWorkspace(workspace)
    setMobileNavOpen(false)
  }

  function clearFilters() {
    setSearch('')
    setFilter('All tasks')
    setPriority('All priorities')
  }

  function restoreSamples() {
    if (window.confirm('Replace your current tasks with the six sample tasks? This cannot be undone.')) {
      setTasks(sampleTasks)
      clearFilters()
    }
  }

  const taskWorkspaceProps = {
    tasks: visibleTasks,
    allTasks: tasks,
    search,
    filter,
    priority,
    onSearchChange: setSearch,
    onFilterChange: setFilter,
    onPriorityChange: setPriority,
    onEdit: editTask,
    onDelete: deleteTask,
    onStatusChange: (id, status) => setTasks((current) => current.map((task) => (
      task.id === id ? { ...task, status } : task
    ))),
    onCreateTask: openCreate,
    onClearFilters: clearFilters,
  }

  return (
    <div className={`app-shell workspace-${activeWorkspace}`} id="dashboard">
      <Sidebar
        activeWorkspace={activeWorkspace}
        taskCount={tasks.length}
        mobileOpen={mobileNavOpen}
        onSelectWorkspace={changeWorkspace}
        onClose={() => setMobileNavOpen(false)}
      />
      <main className="main-area">
        <TopBar
          activeWorkspace={activeWorkspace}
          onOpenNavigation={() => setMobileNavOpen(true)}
          tasks={tasks}
          onEditTask={editTask}
        />
        <div className="page-content">
          {activeWorkspace === 'dashboard' && (
            <>
              <DashboardHeader onCreateTask={openCreate} />
              <TaskOverview stats={stats} />
              <FocusNotes />
              <TasksWorkspace {...taskWorkspaceProps} />
            </>
          )}
          {activeWorkspace === 'tasks' && (
            <TasksWorkspace {...taskWorkspaceProps} title="All tasks" />
          )}
          {activeWorkspace === 'calendar' && (
            <CalendarView tasks={tasks} onEdit={editTask} />
          )}
          {(activeWorkspace === 'help' || activeWorkspace === 'settings') && (
            <InfoWorkspace
              type={activeWorkspace}
              taskCount={tasks.length}
              onRestoreSamples={restoreSamples}
            />
          )}
          <PageFooter />
        </div>
      </main>
      {dialogOpen && (
        <TaskDialog
          key={dialogTask?.id ?? 'new-task'}
          task={dialogTask}
          onClose={closeDialog}
          onSave={saveTask}
        />
      )}
    </div>
  )
}

export default App
