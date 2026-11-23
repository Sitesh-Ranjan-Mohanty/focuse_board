# FocusBoard

A responsive, single-user task dashboard built with React and Vite. The app supports task management, search and combined filters, calculated overview statistics, a three-slide Focus Notes carousel, and browser persistence.

## Features

- Six meaningful starter tasks with category, status, priority, description, and due date.
- Create and edit tasks in a shared, validated form; delete tasks with confirmation.
- Update status directly from a task row.
- Search by title and combine the search with status and priority filters.
- Derive task totals, in-progress and completed counts, and completion percentage from task state.
- Navigate three Focus Notes with previous/next controls and direct slide indicators.
- Persist tasks in `localStorage` under `focusboard_tasks`.
- Responsive desktop, tablet, and mobile layouts; semantic labels and keyboard focus styles.
- A calm, nature-inspired visual palette with a selected navigation state that follows workspace clicks.
- A working monthly calendar with previous/next month navigation, a Today shortcut, due-date markers, and editable task details.
- Visible Help and Settings workspaces, plus upcoming-task notifications.

## Tech stack

- React 18 with hooks for state and derived values.
- Vite for development and production builds.
- Lucide React for interface icons.
- CSS for responsive styling.

## Component structure

The UI is split into focused components under `src/components/`: sidebar/navigation, top bar, dashboard heading, overview cards, Focus Notes carousel, task filters, task list/items, and the task dialog. Shared task options and date/storage helpers live in `src/constants/` and `src/utils/`; the sample tasks and carousel slides are in `src/data/`.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create and preview a production build:

```bash
npm run build
npm run preview
```

## State and persistence

`App.jsx` owns the task array as the single source of truth. CRUD and status changes use immutable state updates. Statistics and visible tasks are derived with `useMemo`; filtering combines case-insensitive title matching, status, and priority. The Focus Notes component owns its active-slide index. On startup, tasks are restored from local storage or initialized with the sample dataset if there is no saved value. Updates are serialized back to storage; sample data does not replace an existing saved array.

## Design and submission

The supplied assignment text references live Figma frames but does not include their URLs or inspectable frame details. This implementation follows the written requirements and uses an original, clean dashboard visual treatment. Compare against the actual Figma file and adjust visual details before final submission.

- Hosting URL: pending deployment.
- GitHub repository: pending publication.
- Screenshots: capture desktop and mobile views after reviewing the live Figma reference.

## Limitations

- Sidebar destinations outside the dashboard are visual navigation placeholders.
- Notifications and calendar are not backed by services, as the assignment is frontend-only.
- Browser storage is device- and browser-specific; there is no account sync.
