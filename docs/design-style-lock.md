# Design Style Lock

Use these classes for all new landing sections to keep a stable FINDEST style:

- `ds-section` + `ds-container` for section shell
- `ds-rule` for thin editorial divider
- `ds-kicker`, `ds-title`, `ds-lead` for heading rhythm
- `ds-panel` for main paper panel
- `ds-card` for inner paper cards
- `ds-grid-2` for desktop two-column / mobile one-column
- `ds-btn` for standard button
- `ds-input`, `ds-select`, `ds-textarea` for form fields

Typography lock:

- Sans: `Noto Sans JP`
- Serif headings: `Noto Serif JP`

Source:

- `app/design-core.css` (single source of reusable section styles)
- `app/globals.css` (site-specific overrides)
