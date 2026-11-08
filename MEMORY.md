---
schemaVersion: 1
scope: workspace
updatedAt: "2026-11-07T23:49:30.180Z"
workspaceName: "Fieldwork"
---

# Project Memory

## Project Overview
- Build a reusable Fieldwork design system inspired by https://www.blacksmith.sh/; original industrial minimalism, not an official brand kit.
- Current design: **3D Model Viewer Interface**. Preserve and extend the existing reference for future apps.

## Current State
- **Unresolved blocker:** user reported a blank white Codesign preview. Isolated checks render, but the actual cause has not been reproduced or diagnosed. Crash reporting/viewer isolation do not prove resolution.
- Continuous reference includes foundations, controls, product patterns, motion, dialogs/popups, nested navigation, local OBJ/STL viewer, simulated folders, standalone window, and a new connected phone-app example.
- **Phone application** index entry opens a field-inspection app: work orders, search, creation dialog with validation, checklists, notes, completion, Activity/Undo, model viewer, and appearance settings. State survives screen/theme changes during the session.
- Phone example adapts relevant features rather than copying desktop window menus.
- Viewer supports orbit, zoom, wireframe, reset, and local OBJ/STL geometry; files stay local. Shared range styling, fill, and reset behavior are aligned.
- Nested index links have real destinations, parent/child active states, disclosure opening, and focus handling.
- Standalone window has functional File/Options/Help menus and simulated minimize, maximize/restore, close/reopen with retained document state.
- Window title-bar order: **File / Options / Help → window name → controls**, on one row.
- Four schemes—Fieldwork, Vector, Foundry, Olive—support light/dark modes. Default remains dark, Themes & modes selected.
- Phone desktop/mobile journeys passed: creation/validation, checklist completion/Undo, notes, search recovery, theme changes, viewer controls, and dialog keyboard behavior. Final check found no syntax/runtime issues; narrow previews reported a layout advisory not established as a defect.
- Native file imports and touch gestures remain manually unverified. No ZIP, repository, deployment, or portable skill confirmed.

## Artifacts
- `DESIGN.md`: sole authoritative design-system specification; includes navigation, viewer, window, and phone-app contracts.
- `tokens.css`: portable semantic variables, palettes, primitives, interaction/motion/viewer and window styles.
- `App.jsx`: continuous live reference, token export, viewers, folders, nested index, window, phone app, and error boundaries.
- `README.md`: adoption, interactions, runtime guidance, phone example, and AI handoff.
- `AGENTS.md`: AI workflow referencing DESIGN.md, not a second visual specification.
- `examples/toast-starter.jsx`: auxiliary scaffold, not authoritative popup implementation.
- `examples/window-frame-starter.jsx`: browser-chrome scaffold, not authoritative application window.
- `.codesign/settings.json` absent.

## Design Direction
- Editorial hierarchy, technical monospace labels, structural grids, square panels, restrained decoration.
- Fieldwork: warm paper/olive-black and signal orange. Vector: original Marathon-inspired acid lime. Foundry: industrial grayscale. Olive: military-inspired neutrals.
- Schemes share typography, layout, behavior, and identity; motion explains state and spatial changes.
- Phone example uses the same system with mobile navigation and task-oriented screens.

## User Feedback
- Wants a complete reusable system, four schemes, dark mode, and clear on/off highlights.
- Wants expandable sidebars, nested navigation, menus, modals, discoverable popups, and smooth disclosures.
- Requires a genuine model viewer, not a substitute folder browser.
- Requested whole-page consistency checks; flagged viewer slider styling and broken index links.
- Required File/Options/Help before the window name on the title-bar line.
- Latest request: a phone-app example containing the existing features that make sense on mobile.
- Blank previews and unsupported “fixed” claims remain important concerns.
- No explicit theme approval; previously asked about AI instructions, ZIP storage, platforms, and skills.

## Decisions
- DESIGN.md is authoritative; implementation, docs, and AI guidance stay aligned.
- Maintain one continuous live reference with real index destinations.
- Light modes use dark button fills/white labels; dark modes use bright fills/ink labels. Active states include non-color cues.
- Measured-height disclosures preserve state; support keyboard/reduced motion without decorative bounce.
- Dialogs manage validation/focus; popups support dismissal and functional Undo.
- OBJ/STL viewer stays distinct from simulated folders.
- Window controls stay rightmost; narrow layouts reduce the title to a glyph with full-title tooltip. Window actions are local simulations.
- Phone example reuses relevant system features without desktop window chrome.
- AI handoff: AGENTS.md + DESIGN.md + tokens.css; optionally App.jsx/README. Skills package workflows, not duplicate specifications.

## Open Questions
- What causes the user's blank preview?
- Do native OBJ/STL imports, invalid-file recovery, and touch gestures work across target browsers?
- Preferred scheme/mode, first adoption app, and additional model formats?
- Export, repository/hosting, closer reference fidelity, or portable skill needed?
- Non-blocking specification warning: `components.primaryButton.minHeight`.

## Next Steps
- Diagnose the actual blank preview before claiming resolution.
- Manually test representative/invalid model imports and phone touch interactions.
- Validate accessibility and handoff in a consuming app; keep artifacts aligned.

## Promotion Candidates For DESIGN.md
- Consider formalizing runtime-error recovery after investigating the blank preview.
- Navigation, viewer range, window ordering, and phone-app contracts are documented; preserve alignment.

## Recent History
- 2026-11-02–03: Established schemes, reusable artifacts, disclosures, dialogs, popups/Undo, and AI guidance.
- 2026-11-04: Added OBJ/STL viewer and repaired navigation; blank preview remained unresolved.
- 2026-11-07: Aligned slider, added nested index and standalone window; refined menu-before-title ordering.
- 2026-11-07: Added connected phone inspection app, updated DESIGN.md/README, and tested desktop/mobile journeys.