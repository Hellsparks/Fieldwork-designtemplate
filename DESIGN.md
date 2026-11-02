---
version: alpha
name: Fieldwork Design System
description: Original industrial-minimalist system for technical products, independent of Blacksmith
colors:
  background: "#F5F3EC"
  surface: "#ECEAE2"
  surfaceRaised: "#FFFDF7"
  text: "#252820"
  muted: "#64675C"
  border: "#D2D3C7"
  accent: "#DA4B27"
  accentHover: "#BF3D1C"
  onAccent: "#FFFFFF"
  inverse: "#252820"
  onInverse: "#F5F3EC"
  success: "#386348"
  warning: "#795A12"
  danger: "#B02E25"
  info: "#345F87"
  focus: "#345F87"
typography:
  display:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 64px
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: -0.045em
  heading:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.025em
  body:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: ui-monospace, SFMono-Regular, Consolas, monospace
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.06em
rounded:
  control: 2px
  panel: 0px
  pill: 999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  section: 64px
  page: 96px
components:
  primaryButton:
    backgroundColor: "{colors.accentHover}"
    textColor: "{colors.onAccent}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: 16px
    minHeight: 44px
  panel:
    backgroundColor: "{colors.surfaceRaised}"
    textColor: "{colors.text}"
    rounded: "{rounded.panel}"
    padding: 24px
  input:
    backgroundColor: "{colors.surfaceRaised}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    height: 44px
    padding: 12px
---

## Overview

**Fieldwork** is an original reusable system in the industrial-minimalist / utilitarian-tech family. It combines Swiss-inspired typographic hierarchy, warm paper surfaces, technical mono annotations, exposed grids, and a single signal-orange accent. It is appropriate for developer tools, infrastructure products, operational dashboards, and technical marketing.

Reference: https://www.blacksmith.sh/ (content accessed 2026-11-02). The page text was available, but rendered visuals and source styles were not verified. All tokens here are deliberate original proposals, not extracted Blacksmith brand specifications. No Blacksmith marks, illustrations, or proprietary fonts are included. “Industrial minimalism” is a descriptive category, not an official site designation.

Authority: this file defines design intent; `tokens.css` is the portable CSS implementation; `App.jsx` is the living reference with local sample interactions. Start future apps with this file and tokens.css. No runtime dependencies or external font licensing required.

## Colors

Use background for the canvas; surface for recessed groups; surfaceRaised for inputs and panels. Text is olive-black rather than pure black. Muted is for secondary prose, not disabled opacity on important information. Border is structural, not sufficient on its own to identify interactive controls: input borders use muted. Accent is limited to primary actions, active markers, and key annotations; avoid large orange text fields. On-accent white is reserved for button labels. Semantic colors always accompany a word or icon. Do not reuse orange as a success indicator.

Signal orange is reserved for decorative emphasis, not normal-size text backgrounds. Primary buttons use **14px bold** mono labels on the darker accentHover background to meet the 4.5:1 normal-text requirement. Bold 14px text is not considered large text. Diagram annotations use paper-backed labels rather than ink directly on orange. Body ink on paper is high contrast. Do not infer contrast from token names; audit new pairings.

## Typography

System Arial/Helvetica is intentional: neutral, portable, and no font downloads. Monospace labels use the native platform stack. Display 64/65, heading 32/37, subheading 24/29, body 16/26, UI 14/21, technical labels 12/18. Display weight 500; body 400; buttons 600. Use uppercase only for short mono labels, never body paragraphs. At <=640px display becomes 40/42 and headings 28/33. Body text stays 16px; UI may be 14px. Keep prose at 55–75 characters. Tabular numbers for all metrics. No tight letter spacing below 24px.

## Layout

4px base scale: 4, 8, 12, 16, 24, 32, 48, 64, 96. Use 16px within controls, 24px in panels, 32px between groups, 64px between sections. App content max-width 1440px; marketing 1200px; form max-width 560px. Desktop optional navigation rail 224px; main gutter 48px. Tablet (641–1024px): rail 180px, gutter 24px, two-column content. Mobile <=640px: navigation becomes in-flow horizontal links, gutter 20px, single column. No fixed footer or horizontal page overflow. Wide tables scroll within a labelled region; preserve column headers. Empty states explain context and offer one recovery action.

## Elevation & Depth

Level 0 canvas; level 1 panels differentiated by fill and 1px border; level 2 menus use raised fill and 0 4px 16px #2528201A; level 3 dialogs add #25282066 scrim. No default card shadows. Prefer structural lines to floating cards. No gradients, gloss, or blur. Noise is optional at low opacity but not needed by this implementation.

## Shapes

Panels and section frames have square corners. Controls have 2px radii; status pills may be fully rounded only if compact. Icons use a 16/20px box and consistent 1.5px strokes; square markers and simple arrows are appropriate. Use original inline SVG or licensed assets only. Decorative diagrams should communicate architecture, not fabricate product performance.

## Components

- **Button**: 44px minimum height, 16px horizontal padding, 14px bold mono. Primary dark orange + white; hover darkens; active translates 1px. Secondary paper with ink border. Quiet uses underline on hover. One primary per action group. Disabled native controls use reduced contrast and an adjacent reason. Pending uses a persistent label and aria-busy; never fabricate a service request.
- **Text field / select / textarea**: visible persistent label, 8px label gap, 44px field height, raised surface, 1px muted border, 12px inset. Help text below; errors use aria-invalid + aria-describedby. Keep values on errors; submit focuses first invalid input. Never placeholder-only labels. Textareas minimum 120px.
- **Checkbox / switch**: native checkbox or button role=switch with aria-checked; 44px hit area and an explicit text label. Focusable and operable by keyboard. Do not use a switch for a multi-step submit action.
- **Badge**: 12px mono, 4px 8px inset, text + a symbol; semantic text on pale matching surface. Not interactive unless rendered as a button.
- **Navigation**: plain text links, active area tinted with a small orange marker; aria-current on the current location. Never remove labels for icons alone. Mobile links remain available without a drawer.
- **Tabs**: use ARIA tab semantics, selected state, roving tabindex, arrow/Home/End keys, and linked panels; for simple filtering prefer native buttons with aria-pressed (as the reference does).
- **Panel**: title, body, optional footer action; 24px padding and structural border, no redundant nested rounded cards.
- **Table / list**: 12px mono headers, 14px cells, 56px minimum row height; left-align text, right-align numbers. Status has text. Whole row is not clickable if it contains actions. Sort buttons must state direction; do not imply sorting without implementing it.
- **Alert**: icon or short status word, concise message, optional recovery action. role=alert only for urgent errors; role=status for nonblocking updates. Toasts never replace actual state mutation.
- **Dialog**: native dialog.showModal(), named heading, visible close, Escape, focus containment and restoration. Not implemented in the reference because no modal task is required; apply this contract when added.
- **Tooltip / popover**: supplemental content only, available on keyboard focus, Escape dismisses; never put essential instructions in hover-only content.
- **Progress / loading**: aria-busy for actual waiting, determinate progress where known. Skeletons mirror the final layout, are aria-hidden, and avoid flashing. No artificial loading delays.

### Product patterns

App shell: navigation rail + title/action row + a focused work area. Settings: single-column groups, local help, explicit save, saved confirmation tied to state. Data view: heading, search/filter row, visible count, shared records, helpful zero-results state with reset. Detail view: keep record identity and back context. Destructive actions need an explicit label and confirmation or undo; never rely on a color alone. Marketing: oversized sentence-case headline, narrow supporting prose, primary CTA, technical evidence diagram; never invent metrics or customer proof.

## Interaction & Accessibility

Target WCAG 2.2 AA; this is guidance, not certification. Minimum 4.5:1 normal text, 3:1 large text and meaningful control boundaries. Focus is a 2px blue outline with 3px offset; never remove it. All targets >=44px in this system. Provide skip navigation, landmarks, logical headings, labels, visible error text, reduced-motion support, and a keyboard path equivalent to pointer use. Use native Enter/Space behavior. Hover is never the only way to reveal functionality. Tooltips and dialogs require additional keyboard/focus testing when introduced. The reference tests local validation, saved preferences, search, reset, and filter state; no backend or reload persistence is promised.

Motion: 120ms for color/border changes; 180ms for small disclosures; avoid layout movement except a 1px button press. Respect prefers-reduced-motion by disabling nonessential transitions and smooth scrolling.

## Do's and Don'ts

Do use quiet warm surfaces, generous macro-spacing, denser functional rows, and precise language. Do keep orange scarce. Do use the same spacing and status roles across apps. Don't add decorative terminal windows, fake charts, large gradients, heavy shadows, arbitrary pill shapes, or invented outcomes to make a page look technical.

### Adoption checklist

1. Copy tokens.css and import it through the future app's normal bundler; scope or map tokens to the chosen framework.
2. Retain semantic token names; change primitive values here and in tokens.css together.
3. Reuse the button, field, badge, panel, and row contracts before inventing variants.
4. Build all success, empty, invalid, disabled, focus, and narrow-screen states.
5. Test long labels, keyboard navigation, contrast, zoom to 200%, and mobile widths.
6. Keep domain data shared across views. Add real integrations separately; demo state is in-memory only.

The living reference duplicates the CSS token block inline for the host preview. When changing tokens, reconcile all three files. There are deliberately no host tweak defaults: the portable semantic tokens are the single customization surface.



## Appearance extension — v0.2

This section extends the original light foundation without replacing its frontmatter tokens. The live reference now opens in **Fieldwork dark** to demonstrate the new mode; the portable CSS keeps **Fieldwork light** as its attribute-free fallback. Existing applications need not change. Typography, spacing, radii, motion, component contracts, and accessible behavior remain shared across every scheme.

### Original scheme families

- **Fieldwork** (`fieldwork`): warm olive-black neutrals and signal orange. Original industrial minimalism, adjacent in spirit to the initial Blacksmith reference, not a verified reproduction.
- **Vector** (`vector`): acid-lime signal, green graphite, violet focus. A Marathon-inspired science-fiction direction, not an official game palette; no proprietary marks, typography, or artwork.
- **Foundry** (`foundry`): neutral grey surfaces and monochrome emphasis. For industrial tools where structure should lead. Semantic feedback retains restrained status colors and text labels.
- **Olive** (`olive`): canvas and olive drab in light mode; equipment-green and pale khaki in dark mode. Military-equipment inspired, not an organization’s identity. Do not confuse olive brand accents with success.

### Canonical appearance values

The rows below are the authoritative scheme overrides. `tokens.css` implements these values. All other primitive tokens retain their original values.

| Scheme / mode | background | surface | raised | text | muted | border | accent | accent-hover (button fill) | on-accent | button-hover | focus |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Fieldwork light | #F5F3EC | #ECEAE2 | #FFFDF7 | #252820 | #64675C | #D2D3C7 | #DA4B27 | #BF3D1C | #FFFFFF | #A93216 | #345F87 |
| Fieldwork dark | #191B18 | #232620 | #2C3028 | #F0F0E5 | #AFB4A6 | #484D42 | #F57951 | #F57951 | #1C2119 | #FF9574 | #9CC7F0 |
| Vector light | #F1F3E9 | #E5E9DA | #FAFCF3 | #192119 | #59634E | #C8CFBC | #C4E830 | #455900 | #FFFFFF | #344400 | #4F398A |
| Vector dark | #101510 | #1B231A | #242E22 | #EDF4DB | #AFBE9B | #43503C | #D5FA39 | #D5FA39 | #192000 | #E6FF82 | #C1A7FF |
| Foundry light | #F1F1F1 | #E5E5E5 | #FFFFFF | #202020 | #606060 | #CCCCCC | #595959 | #3D3D3D | #FFFFFF | #242424 | #454545 |
| Foundry dark | #151515 | #212121 | #2B2B2B | #EEEEEE | #AFAFAF | #4A4A4A | #D5D5D5 | #D5D5D5 | #171717 | #FFFFFF | #DDDDDD |
| Olive light | #F0EDDF | #E5E0CD | #FAF7EA | #282C20 | #62664F | #CBCBB7 | #8A7438 | #5D622D | #FFFFFF | #44491D | #385D7A |
| Olive dark | #1B2017 | #262E20 | #303A28 | #EEEEDD | #B5B99F | #505B43 | #C2C78D | #C2C78D | #202717 | #DDE2A8 | #A5C5DF |

`inverse` aliases `text`; `on-inverse` aliases `background`. Brand accent is decorative and is **not** automatically a text color or button fill. In light schemes use `accent-hover` as the base button fill (legacy token name); use `button-hover` for the hover fill. Dark schemes use a bright base fill with dark `on-accent` ink. Never hardcode white button text across modes. Keep the existing 14px bold mono button labels.

### Mode-specific feedback and overlays

| Role | Light | Dark |
|---|---|---|
| success / success-bg | #386348 / #E3EBDD | #A8D6B1 / #263C2C |
| warning / warning-bg | #795A12 / #F1E9CF | #EAD08E / #3E3521 |
| danger / danger-bg | #B02E25 / #F5E2DB | #FFB4A4 / #432C27 |
| info / info-bg | #345F87 / #E1E8EF | #A9CDED / #283745 |
| scrim | #25282066 | #00000099 |
| shadow-overlay | 0 4px 16px #2528201A | 0 4px 16px #00000055 |

Use foreground/background status pairs together, always with words or an icon. Input borders use `muted`; structural `border` is intentionally subtle and not a sufficient control boundary. Mode-specific `focus` must be visible on the adjacent neutral surfaces. Do not apply opacity to body or muted text. Decorative diagrams may use accent fields; essential diagram annotations need a raised-surface label, not arbitrary text on accent.

### Integration and behavior

Load `tokens.css`, then set both `data-fw-theme="vector"` and `data-fw-mode="dark"` on the document’s `html` element. Allowed themes: `fieldwork`, `vector`, `foundry`, `olive`; allowed modes: `light`, `dark`. The CSS also sets `color-scheme` so native controls follow the selected mode. Use semantic `--fw-*` roles, not scheme-specific hex values in components.

Appearance switches must not reset search, selected filters, form inputs, or saved in-memory settings. The live reference uses labelled, keyboard-operable pressed-state buttons; active selection is communicated by outline and text, not color alone. Its status announces the current scheme/mode. It deliberately does not persist preferences: reload restores Fieldwork dark. Production apps may choose system-preference detection or storage separately, with denial-safe handling.

Source-backed edit controls expose `themeScheme` and `darkMode`; these initialize the same live selectors, not a separate styling layer. All eight variants share the same components. The color swatches and copyable color-override snippet follow the active appearance; the full reusable primitive set remains in `tokens.css`.


## Interactive controls (v0.3)

The live **Interactive controls** section and portable `.fw-*` classes extend the same four schemes and two modes. All examples are local, in-memory preferences; appearance changes and section navigation preserve values. Reset restores the control demo only, never the selected theme.

### Semantic state tokens

- `--fw-control-active: var(--fw-accent-hover)` — selected fill. This historical token is the dark action fill in light mode and bright signal fill in dark mode. Do not substitute raw accent: light Vector lime would lose boundary contrast.
- `--fw-control-on: var(--fw-on-accent)` — contrasting check, radio dot, and switch thumb.
- `--fw-control-off: var(--fw-surface)` — neutral, unselected track/box.
- `--fw-control-boundary: var(--fw-muted)` — meaningful unselected boundaries.
- Keyboard focus always uses `--fw-focus`, independent of selected color. Selection is not success; do not use success/danger just to indicate on/off.

### Component contracts

| Primitive | Contract |
|---|---|
| `.fw-control.fw-control--switch` | Label wrapping native checkbox with `role="switch"`. 44×24px squared track, 16px thumb, 48px label row. Off: neutral with left thumb. On: active fill, contrasting right thumb. Stable accessible name; optional visible ON/OFF is aria-hidden. Apply immediately only to local reversible settings. |
| `.fw-control.fw-control--check` | Native checkbox, 22px square with 2px corners; selected fill + checkmark. Independent multi-selection. Group related choices in a fieldset with legend. |
| `.fw-control.fw-control--radio` | Native radio, 22px circle with contrasting center dot. Shared name and controlled value; fieldset and legend. Native arrow-key selection. Only circular primitive besides status dots. |
| `.fw-range` | Native labelled range with min/max/step and readable output including units. Set `--fw-range-fill` to `(value-min)/(max-min)*100%` on every change. Selected track uses active fill; remaining track is neutral. 20×24px thumb; vertical margins create a 44px interaction region. Preserve native keyboard arrows/Home/End and supply unit-aware aria-valuetext. |
| `.fw-segment` | Named group of native buttons with `aria-pressed`. Active segment uses contrasting action fill. Minimum 44px height. Use for preferences, not navigation or unimplemented tabs. |
| `.fw-stepper` | Named group, decrement/increment buttons with descriptive accessible names, readable output. 44px buttons, disable at explicit limits. Announce count changes politely. |

Disabled controls use native disabled, neutral fill, dashed boundaries where relevant, muted labels, and a visible reason; never merely dim an important label. Do not hide disabled-only help in tooltips. Keep on/off labels readable in monochrome Foundry. Use `.fw-control-copy` for label/help and `.fw-state` for supplemental state text. Native input checked state remains the assistive-technology source of truth. Pointer hover never changes selection; keyboard focus is visibly outlined with 4px offset. Switch thumb motion is 120ms and removed under reduced motion.

The reference contains six control families plus a dependent live configuration summary and reset action. A future application must wire actual task behavior and persistence separately. React implementations are readable examples in App.jsx; tokens.css supplies dependency-free styles rather than a packaged component runtime.
