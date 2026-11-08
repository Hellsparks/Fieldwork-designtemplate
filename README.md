# Fieldwork design system

An original industrial-minimalist system for technical products. This is not an extracted or official Blacksmith brand kit; rendered reference styling could not be verified.

## Files

- **AGENTS.md** — AI implementation workflow: read the system first, reuse semantic tokens and components, preserve schemes/modes and state, and verify changed journeys. Copy alongside the system into future apps; merge with existing project instructions rather than replacing them.
- **DESIGN.md** — authoritative specification: visual direction, semantic colors, type, spacing, layout, elevation, component contracts, states, accessibility, and adoption rules.
- **tokens.css** — dependency-free CSS custom properties and opt-in `.fw-button`, `.fw-button--secondary`, `.fw-field`, and `.fw-panel` primitives. Import with your app's existing build setup.
- **App.jsx** — live React reference, intended for the supplied design runtime. It demonstrates working controls, validation, in-memory preferences, search, status filters, and empty-state recovery. It is not a standalone production app or a packaged component library.


## If the preview is blank

Open `App.jsx` through the design runtime's preview; opening a JSX file directly in a browser does not run it. The host supplies React, ReactDOM, JSX compilation, and the `root` element. The reference now has a root error boundary, plus a separate viewer boundary: React rendering failures show their error message and a retry control rather than removing the entire page. These boundaries do not catch compilation failures or failures before React starts. If the preview remains empty, capture the host error or browser console message; a successful isolated preview alone cannot establish the cause in another runtime.

## Reuse in a future app

1. Bring DESIGN.md, tokens.css, and AGENTS.md into the new project. Keep DESIGN.md as the visual authority; AGENTS.md tells AI coding tools how to apply it.
2. Import tokens.css once through that app's stylesheet entry.
3. Use semantic roles such as `--fw-background`, `--fw-text`, `--fw-accent-hover`, and `--fw-border`. Do not scatter hex values through feature components.
4. Build components from the contracts in DESIGN.md. The `.fw-*` primitives are intentionally opt-in, without a global reset. Apply border-box sizing in the app's own reset.
5. Verify all interactive states, screen-reader labels, keyboard behavior, contrast, and narrow viewports before release.

Suggested future brief:

> Use the attached Fieldwork DESIGN.md as the visual authority and tokens.css for semantic tokens. Build [your app] using warm neutral surfaces, square structural panels, system sans typography, technical mono labels, and sparing signal orange. Follow the component, responsive, accessibility, and state contracts. Do not copy the reference-page layout unless it fits the task.

## Boundaries

Examples use local sample data. Preferences reset on reload. Clipboard access is best-effort with visible manual-copy fallback. No backend, authentication, network calls, asset downloads, or analytics are included. Tooltips, nonmodal info popovers, native modal dialogs and keyboard-aware ARIA tabs are implemented in the motion reference.

The preview embeds the token block so it runs without a CSS import. Keep DESIGN.md, tokens.css, and the inline preview tokens aligned when changing the system.

## Checks

Desktop 1440px and mobile 390px previews were rendered. Checked form validation and correction, keyboard submission, preference retention across section navigation, action/reset, search, status filtering, zero-results recovery, and keyboard filter activation. No complete assistive-technology, zoom, or cross-browser certification is implied. Clipboard integration has a fallback but was not separately verified.



## Themes and dark mode (v0.2)

Choose a scheme with the live **Themes & modes** buttons, then select **Light** or **Dark**. All examples, palette hex values, and the copyable color snippet update together. Switching appearance preserves in-memory product state. Reload resets the reference to Fieldwork dark; no preference storage is implied.

| Theme ID | Direction |
|---|---|
| `fieldwork` | Warm industrial, signal orange |
| `vector` | Marathon-inspired acid-lime sci-fi (original, unofficial) |
| `foundry` | Greyscale industrial |
| `olive` | Military-equipment olive and canvas |

For future apps, include `tokens.css` and put both attributes on the root element:

```html
<html data-fw-theme="vector" data-fw-mode="dark">
```

Change either attribute to switch appearance; modes are `light` and `dark`. With no attributes, existing apps retain the original Fieldwork light fallback. Use the semantic variables in components:

```css
.primary-button {
  background: var(--fw-accent-hover); /* legacy name: base action fill */
  color: var(--fw-on-accent);
}
.primary-button:hover { background: var(--fw-button-hover); }
.status-success { color: var(--fw-success); background: var(--fw-success-bg); }
```

Do not hardcode white button text, light status fills, or orange focus rings. Theme definitions, mode feedback pairs, integration rules, and limitations are documented in DESIGN.md. The live **Usage guidelines** copy action exports the selected color overrides; retain the complete `tokens.css` for typography, spacing, and other primitives. EDITMODE controls offer the same scheme and mode choices as the live UI.


## Interactive controls (v0.3)

Open **Interactive controls** in the reference index for working switches, checkboxes, radio groups, range sliders, segmented preferences, and a bounded number stepper. The live configuration reflects every change; Reset controls restores defaults. No backend changes occur.

Portable classes are included in `tokens.css`: `.fw-control` with `--switch`, `--check`, or `--radio` modifiers; `.fw-range`; `.fw-segment`; `.fw-stepper`. Wrap native inputs in visible labels, use fieldsets for related choices, and preserve their native keyboard behavior. `SwitchControl` and `ControlsSection` in App.jsx demonstrate React state wiring.

Selected fills use `--fw-control-active` and contrasting marks use `--fw-control-on`; neutral tracks and boundaries use `--fw-control-off` and `--fw-control-boundary`. These aliases follow all four schemes in both modes. Do not hardcode orange, white checks, or bright lime backgrounds in light mode. Set a range input's inline `--fw-range-fill` percentage from its current value and min/max; output labels must include units. See DESIGN.md for dimensions, disabled states, focus, and semantic contracts.


## Motion examples

Open **Motion & navigation** in the reference for four working patterns: expanding sidebar, environment dropdown, accordion, and keyboard-aware tabs. They follow the selected theme/mode. A demo switch disables motion; operating-system reduced-motion preferences always win. The expansion-duration tweak adjusts sidebar and accordion timing (default 240ms).

Reuse the motion tokens and `.fw-sidebar`, `.fw-popover`, `.fw-collapse`, `.fw-chevron`, `.fw-tabs`, and `.fw-tab-panel` primitives in `tokens.css`. Copy/adapt the named `Motion*` React examples in `App.jsx` for state and focus behavior. Read the **Motion and navigation patterns** contracts in `DESIGN.md`: CSS classes alone do not implement dismissal, keyboard tabs, focus restoration, or hidden-content accessibility. The demos use only local state, with no service calls or persistence.


### Modals and fluid disclosure (v0.5)

The motion reference now includes five patterns. `MotionModals` demonstrates a validated workspace-name edit and a reversible archive confirmation using native dialog focus containment, Escape/Cancel and focus restoration. All changes are local samples. Copy the named component and `.fw-dialog` styles; actions can use `.fw-button` or the included `.dialog-action` variants.

`FluidCollapse` replaces grid-row disclosure with a ResizeObserver-measured height transition (320ms by default, derived from the existing expansion preference). Copy both its state/measurement logic and `.fw-collapse` styles; CSS alone does not measure content. Keep children mounted, place padding inside the measured wrapper, and preserve inert/aria-hidden on closed regions. Reduced-motion settings remove these transitions. No arbitrary max-height cap or delayed visibility snap is used.


### Popups (v0.6)

The sixth motion example adds an anchored info popover (Escape, outside click and focus departure), a hover/focus tooltip (Escape dismissal), and a local notification preview. Pause/resume updates shared queue state; notification Undo restores the previous value. Notices stay until dismissed, announce politely, prevent duplicates and restore focus on dismissal. All changes are in-memory sample interactions.

Reuse `MotionPopups` with `.fw-info-popup`, `.fw-tooltip`, `.fw-toast` and related styles in tokens.css. The popover is locally positioned above its trigger, not a universal collision-aware overlay; add placement handling in constrained real-app layouts. Notifications are inline examples, not a global delivery service. `examples/toast-starter.jsx` is the scaffold source, not the themed entry point.


## Spatial file-browser reference

Choose **3D model viewer** in the system index, then expand **Related pattern / spatial folder browser** below the mesh inspector. Open Projects → Fieldwork, inspect Tokens.css, and try rename or starring. Use breadcrumbs, Back/Forward, or the location shortcuts to return. Search is scoped to the current folder, and **+ Folder** creates a local sample folder. The **3D / Flat** switch changes only the presentation; it preserves browsing state. All file records and changes remain in memory and reset on reload. No disk or cloud integration is implied.

Reuse the `SpatialFileBrowser`, `FileArt`, and `initialFiles` reference code from App.jsx with the `.fw-browser` styles in tokens.css. Supply your own records and service layer in a real application. Spatial tokens are `--fw-spatial-depth` and `--fw-spatial-tilt`; reduced motion removes spatial transforms. Existing scheme/mode attributes theme the browser without special palette overrides.

The reference sidebar now uses explicit section navigation with focus management. Interactive controls, motion, and explorer examples belong to the same continuous page; do not add screen-switching metadata to those sections. Keep actual app routes distinct from documentation anchors.


## 3D model viewer

Choose **3D model viewer** in the index. `ModelViewer` reads local OBJ, ASCII STL, and binary STL geometry using `decodeMesh`. Orbit by dragging or arrow keys; use the zoom slider or + / − keys, toggle Wireframe, and Reset view (Home on the canvas). Load sample restores the calibration cube through the OBJ decoder. The reference uses a dependency-free Canvas 2D projection with depth-sorted triangles, not a WebGL/CAD engine.

Files stay in memory and are never uploaded. Limits: 10 MB and 40,000 triangles. No textures, materials, GLB/glTF, animation, measurement, or persistence. Invalid files show an error without replacing the current model. Theme changes and index navigation preserve the loaded model and viewing state. Import decoding is local; test representative files in the target app before production use.

`FileBrowser` now composes `ModelViewer` and the optional `SpatialFileBrowser`. The index opens collapsed ancestors before focusing and scrolling to its target; scrollspy ignores closed groups and accounts for the header landing area. The folder browser has a separate `spatial-files` ID. All eleven index destinations were exercised; model controls and navigation-state retention were checked at desktop and mobile widths. Automated preview cannot select a local file, so native file-picker imports were not exercised.


### Nested index, viewer slider, and standalone chrome

- `SystemIndex` in `App.jsx` supports optional child points with independent disclosure buttons and real section links. Motion, viewer, and application-window examples include subpoints. Collapsed destination ancestors open on navigation.
- Viewer zoom now uses `.fw-range` and computes its filled track from the current value and 50–200% bounds. Reset restores 100% and the corresponding fill.
- **Application window** in the index opens the standalone-shell example. File changes its sample document; Options changes its grid/layout; Help has inline guidance and a return action. Window controls minimize/restore, expand within the page, or close/reopen while preserving the document. All actions are local simulations, not operating-system integration.
- Reuse `ApplicationWindow` with its existing `SectionHeading`/button dependencies, or adapt the `.fw-window*` primitives from `tokens.css`. Use native Tab/Enter/Space for commands and Escape to dismiss menus. `examples/window-frame-starter.jsx` is the unmodified browser-frame scaffold used as a structural seed, **not** the authoritative standalone implementation or a Fieldwork-compliant reusable component. The living implementation is in `App.jsx`.



## Phone application example

Open **System index → Phone application → Interactive app**. Fieldwork Inspect adapts the shared system into a phone-sized operations app without replacing the reference.

Try these connected journeys:
1. Open a work order, check the three inspection items, add notes, and complete it. Open Activity, undo completion, and return to the same order.
2. Use + New, submit an empty form to see validation, then create a local record with a name and location. Search, status filters, and counts use that same record set.
3. Open Models to orbit the sample or inspect a local OBJ/STL file. Wireframe, the shared zoom slider, and reset are available. Geometry is not an actual work-order attachment.
4. Change scheme and mode in Settings. Notes, checklist state, search, filters, and model state remain in memory. In-app messages can be turned off without disabling Activity.

Implementation: `PhoneApplication`, `phoneInitialJobs`, and app-local `phoneStyles` live in `App.jsx`; they consume the existing system tokens. `ModelViewer` accepts an optional `idPrefix` so this embedded instance and the standalone viewer retain unique control IDs. Native dialog handles focus containment and Escape dismissal. Everything is simulated locally and resets on reload; no push notification, backend, account, or OS integration is provided.

Verification for this addition: desktop checklist completion/Undo/back; narrow-screen creation validation, record counts, note retention across scheme/mode changes, search-empty recovery, dialog Escape/keyboard reopening, and model wireframe/zoom-reset were exercised. Native file-picker imports, touch gestures, and a full accessibility audit remain manual. Existing unresolved blank-preview reports are not diagnosed by isolated preview success.
