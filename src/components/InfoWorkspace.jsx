import { BookOpen, CheckCircle2, Database, Keyboard, LifeBuoy } from 'lucide-react'

const helpItems = [
  { icon: BookOpen, title: 'Organize your work', copy: 'Use status tabs and priority filters together to find the next task that needs your attention.' },
  { icon: CheckCircle2, title: 'Update progress', copy: 'Change a task’s status from its row. Your overview counts and completion rate update immediately.' },
  { icon: Keyboard, title: 'Work with the calendar', copy: 'Choose a date to see its due tasks. Select any task to open it for editing.' },
]

export default function InfoWorkspace({ type, taskCount, onRestoreSamples }) {
  if (type === 'help') {
    return (
      <section className="workspace-view info-workspace" aria-labelledby="help-title">
        <div className="workspace-page-heading"><div><div className="section-eyebrow">HERE TO HELP</div><h1 id="help-title">Help & support</h1><p>Quick guides to help you get more from FocusBoard.</p></div><div className="info-heading-icon"><LifeBuoy size={22} /></div></div>
        <div className="help-grid">{helpItems.map(({ icon: Icon, title, copy }) => <article className="help-card" key={title}><div className="info-card-icon"><Icon size={19} /></div><h2>{title}</h2><p>{copy}</p></article>)}</div>
        <div className="support-note"><strong>Everything stays on this device.</strong><span>Your tasks are saved in this browser, so no account or internet connection is needed to manage them.</span></div>
      </section>
    )
  }

  return (
    <section className="workspace-view info-workspace" aria-labelledby="settings-title">
      <div className="workspace-page-heading"><div><div className="section-eyebrow">YOUR PREFERENCES</div><h1 id="settings-title">Settings</h1><p>Review how your FocusBoard data is stored.</p></div><div className="info-heading-icon"><Database size={22} /></div></div>
      <article className="settings-card">
        <div className="settings-card-copy"><div className="info-card-icon"><Database size={19} /></div><div><h2>Browser storage</h2><p>Your tasks are saved locally in this browser and restored when you return.</p><span className="settings-count">{taskCount} {taskCount === 1 ? 'task' : 'tasks'} currently saved</span></div></div>
        <button className="button button-outline" onClick={onRestoreSamples}>Restore sample tasks</button>
      </article>
      <div className="support-note"><strong>Need a fresh start?</strong><span>Restore sample tasks replaces the current list after you confirm. This change is saved locally.</span></div>
    </section>
  )
}
