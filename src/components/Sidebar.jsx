import {
  ArrowUpRight,
  CalendarDays,
  CheckCheck,
  CircleHelp,
  LayoutDashboard,
  ListTodo,
  MoreHorizontal,
  Settings,
  Sparkles,
  X,
} from 'lucide-react'

const primaryLinks = [
  { id: 'dashboard', label: 'Dashboard', href: '#dashboard', icon: LayoutDashboard },
  { id: 'tasks', label: 'My tasks', href: '#tasks', icon: ListTodo },
  { id: 'calendar', label: 'Calendar', href: '#calendar', icon: CalendarDays },
]

const secondaryLinks = [
  { id: 'help', label: 'Help & support', href: '#help', icon: CircleHelp },
  { id: 'settings', label: 'Settings', href: '#settings', icon: Settings },
]

function NavigationLinks({ links, activeWorkspace, onSelect, taskCount }) {
  return links.map(({ id, label, href, icon: Icon }) => (
    <a
      key={id}
      className={`side-link ${activeWorkspace === id ? 'active' : ''}`}
      href={href}
      aria-current={activeWorkspace === id ? 'page' : undefined}
      onClick={() => onSelect(id)}
    >
      <Icon size={18} />
      {label}
      {id === 'tasks' && <span className="nav-count">{taskCount}</span>}
    </a>
  ))
}

export default function Sidebar({
  activeWorkspace,
  taskCount,
  mobileOpen,
  onSelectWorkspace,
  onClose,
}) {
  return (
    <>
      {mobileOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><CheckCheck size={19} strokeWidth={2.5} /></div>
          <span>focus<span className="brand-light">board</span></span>
          <button className="icon-button sidebar-close" aria-label="Close navigation" onClick={onClose}><X size={19} /></button>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          <NavigationLinks
            links={primaryLinks}
            activeWorkspace={activeWorkspace}
            onSelect={onSelectWorkspace}
            taskCount={taskCount}
          />
        </nav>
        <div className="sidebar-bottom">
          <div className="tip-card">
            <div className="tip-icon"><Sparkles size={16} /></div>
            <strong>Stay in your flow</strong>
            <p>One task at a time is still great progress.</p>
            <a href="#focus-notes" onClick={() => onSelectWorkspace('dashboard')}>Explore focus notes <ArrowUpRight size={13} /></a>
          </div>
          <nav className="side-nav secondary-nav" aria-label="Settings">
            <NavigationLinks
              links={secondaryLinks}
              activeWorkspace={activeWorkspace}
              onSelect={onSelectWorkspace}
              taskCount={taskCount}
            />
          </nav>
          <div className="profile">
            <div className="avatar">JD</div>
            <div className="profile-copy"><strong>Jamie Davis</strong><span>Free plan</span></div>
            <MoreHorizontal size={19} className="profile-more" />
          </div>
        </div>
      </aside>
    </>
  )
}
