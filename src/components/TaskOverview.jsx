import { ArrowDownWideNarrow, CheckCheck, ListTodo, Target } from 'lucide-react'
import StatCard from './StatCard.jsx'

export default function TaskOverview({ stats }) {
  return (
    <section className="stats-grid" aria-label="Task overview">
      <StatCard label="Total tasks" value={stats.total} detail={<span className="detail-neutral">Across all your projects</span>} icon={ListTodo} tone="lavender" />
      <StatCard label="In progress" value={stats.inProgress} detail={<><span className="detail-dot amber" />Keep the momentum going</>} icon={ArrowDownWideNarrow} tone="peach" />
      <StatCard label="Completed" value={stats.completed} detail={<><span className="detail-dot green" />Nice work, keep it up</>} icon={CheckCheck} tone="mint" />
      <StatCard label="Completion rate" value={`${stats.percent}%`} detail={<div className="progress-track"><span style={{ width: `${stats.percent}%` }} /></div>} icon={Target} tone="blue" />
    </section>
  )
}
