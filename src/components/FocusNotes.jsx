import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { focusNotes } from '../data/focusNotes.js'

export default function FocusNotes() {
  const [active, setActive] = useState(0)
  const note = focusNotes[active]
  const Icon = note.icon
  const move = (offset) => {
    setActive((current) => (current + offset + focusNotes.length) % focusNotes.length)
  }

  return (
    <section className={`focus-note ${note.tone}`} id="focus-notes" aria-label="Focus notes">
      <div className="note-art" aria-hidden="true">
        <div className="note-art-orbit"><Icon size={27} /></div>
        <span className="note-spark spark-one">✳</span>
        <span className="note-spark spark-two">✦</span>
      </div>
      <div className="note-content" aria-live="polite">
        <div className="note-eyebrow">{note.eyebrow} <span>· {active + 1} OF {focusNotes.length}</span></div>
        <h2>{note.title}</h2>
        <p>{note.copy}</p>
      </div>
      <div className="note-controls">
        <div className="note-dots" aria-label="Choose a focus note">
          {focusNotes.map((item, index) => (
            <button
              key={item.title}
              className={`note-dot ${active === index ? 'selected' : ''}`}
              onClick={() => setActive(index)}
              aria-label={`Show focus note ${index + 1}`}
              aria-pressed={active === index}
            />
          ))}
        </div>
        <div className="note-arrows">
          <button className="round-control" aria-label="Previous focus note" onClick={() => move(-1)}><ChevronLeft size={17} /></button>
          <button className="round-control" aria-label="Next focus note" onClick={() => move(1)}><ChevronRight size={17} /></button>
        </div>
      </div>
    </section>
  )
}
