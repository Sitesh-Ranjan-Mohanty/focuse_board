import { useState } from 'react'
import { Check, ChevronDown, X } from 'lucide-react'
import { PRIORITIES, STATUSES } from '../constants/taskOptions.js'

export default function TaskDialog({ task, onClose, onSave }) {
  const [form, setForm] = useState(() => task ?? {
    title: '', description: '', category: '', status: 'To do', priority: 'Medium', dueDate: '',
  })
  const [error, setError] = useState('')
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  function submit(event) {
    event.preventDefault()
    const title = form.title.trim()
    if (!title) {
      setError('Please enter a task title.')
      return
    }
    if (!form.dueDate) {
      setError('Please choose a due date.')
      return
    }
    onSave({ ...form, title, category: form.category.trim() || 'General' })
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="task-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <div className="dialog-heading">
          <div><div className="dialog-kicker">TASK DETAILS</div><h2 id="dialog-title">{task ? 'Edit task' : 'Create a task'}</h2><p>Keep the next step clear and achievable.</p></div>
          <button className="icon-button" aria-label="Close form" onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={submit} noValidate>
          <label className="field-label" htmlFor="task-title">Title <span>*</span></label>
          <input id="task-title" name="title" value={form.title} onChange={(event) => { update(event); setError('') }} placeholder="e.g. Plan the product launch" autoFocus aria-invalid={Boolean(error && !form.title.trim())} />
          {error && <div className="form-error" role="alert">{error}</div>}
          <label className="field-label" htmlFor="task-description">Description <span className="optional">(optional)</span></label>
          <textarea id="task-description" name="description" rows="3" value={form.description} onChange={update} placeholder="Add a few details to help you get started..." />
          <label className="field-label" htmlFor="task-category">Category <span className="optional">(optional)</span></label>
          <input id="task-category" name="category" value={form.category ?? ''} onChange={update} placeholder="e.g. Design" />
          <div className="form-grid">
            <div>
              <label className="field-label" htmlFor="task-status">Status <span>*</span></label>
              <div className="select-wrap"><select id="task-status" name="status" value={form.status} onChange={update}>{STATUSES.map((status) => <option key={status}>{status}</option>)}</select><ChevronDown size={16} /></div>
            </div>
            <div>
              <label className="field-label" htmlFor="task-priority">Priority <span>*</span></label>
              <div className="select-wrap"><select id="task-priority" name="priority" value={form.priority} onChange={update}>{PRIORITIES.map((priority) => <option key={priority}>{priority}</option>)}</select><ChevronDown size={16} /></div>
            </div>
          </div>
          <label className="field-label" htmlFor="task-date">Due date <span>*</span></label>
          <input id="task-date" type="date" name="dueDate" value={form.dueDate} onChange={(event) => { update(event); setError('') }} />
          <div className="dialog-actions">
            <button type="button" className="button button-quiet" onClick={onClose}>Cancel</button>
            <button type="submit" className="button button-primary"><Check size={16} />{task ? 'Save changes' : 'Create task'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}
