import { Plus } from 'lucide-react'

export default function DashboardHeader({ onCreateTask }) {
  const today = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    .format(new Date()).toUpperCase()

  return (
    <section className="welcome-row">
      <div>
        <div className="page-eyebrow">{today} <span className="sun-icon">✳</span></div>
        <h1>Good morning, Jamie <span className="wave">✦</span></h1>
        <p>Here’s what’s happening with your tasks today.</p>
      </div>
      <button className="button button-primary add-task-button" onClick={onCreateTask}><Plus size={17} />Create task</button>
    </section>
  )
}
