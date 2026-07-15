# Project Guide — Gustavo Sepulveda Portfolio

A technical reference for this codebase: where everything lives, how each
piece works, and where to go when you want to change something. If you come
back to this project after months away, start here.

> **TL;DR — where do I edit my content?**
> Almost everything you'll want to change (projects, experience, skills, nav
> links) lives in **[`lib/data.ts`](lib/data.ts)**. Your resume is
> **[`public/CV.pdf`](public/CV.pdf)**. Images are in **[`public/`](public/)**.
> Bio text is written directly in **[`components/intro.tsx`](components/intro.tsx)**
> and **[`components/about.tsx`](components/about.tsx)**.

---

## 1. What this is

A single-page personal portfolio built with the **Next.js App Router**. The
whole site is one scrolling page (`app/page.tsx`) made of stacked sections. As
you scroll, the nav bar highlights the section you're looking at. It has a
light/dark theme toggle and a working contact form that emails you.

There are no other routes — it's intentionally a one-pager.

---

## 2. Tech stack

| Concern | Tool | Notes |
| --- | --- | --- |
| Framework | **Next.js 14.2** (App Router) | Stable release. Server Components by default. |
| Language | **TypeScript** | Strict-ish; config in `tsconfig.json`. |
| Styling | **Tailwind CSS 3.4** | Utility classes. Dark mode is **class-based**. |
| Animation | **Framer Motion** | Entrance animations, scroll-linked project cards. |
| Scroll tracking | **react-intersection-observer** | Powers the active-section nav highlight. |
| Email | **Resend v4** | Called from a Server Action. Needs an API key. |
| Toasts | **react-hot-toast** | Contact-form success/error feedback. |
| Icons | **react-icons** | Bootstrap (`Bs`), Font Awesome (`Fa`), etc. |
| Timeline UI | **react-vertical-timeline-component** | The "My experience" section. |
| Image optimizer | **sharp** | Used automatically by `next/image` in production. |

---

## 3. Directory map

```
next-portfolio/
├── app/                      # Next.js App Router entry points
│   ├── layout.tsx            # Root HTML shell: providers, header, footer, toaster
│   ├── page.tsx              # The single page — stacks all the sections
│   ├── globals.css           # Tailwind directives + a couple custom utilities
│   └── favicon.ico
├── components/               # All the UI pieces (see §5 for each)
├── context/                  # React context providers (global state)
│   ├── active-section-context.tsx   # Which nav section is "active"
│   └── theme-context.tsx            # Light/dark theme state
├── lib/                      # Non-UI logic and data
│   ├── data.ts               # ★ YOUR CONTENT: nav links, experience, projects, skills
│   ├── types.ts              # Shared TypeScript types
│   └── hooks.ts              # useSectionInView custom hook
├── actions/
│   └── sendEmail.ts          # Server Action that sends the contact email
├── public/                   # Static assets served at the site root
│   ├── CV.pdf                # ★ Your downloadable resume
│   ├── gus-profile-pic.jpg   # Hero profile photo
│   └── *.png                 # Project screenshots
├── .env.example              # Template for required env vars
├── next.config.mjs           # Next.js config (currently empty/default)
├── tailwind.config.ts        # Tailwind config — dark mode enabled here
├── postcss.config.mjs        # PostCSS (loads Tailwind + autoprefixer)
├── tsconfig.json             # TypeScript config; note the "@/*" path alias
├── README.md                 # Short getting-started for visitors
└── DOCS.md                   # ← You are here
```

> **Path alias:** `@/` maps to the project root (see `tsconfig.json`
> `compilerOptions.paths`). So `@/components/header` === `./components/header`.
> Use it everywhere; it's what all imports use.

---

## 4. How the app boots (request → render)

1. **`app/layout.tsx`** runs first (Server Component). It renders the `<html>`
   / `<body>` shell, the two blurred gradient "blobs" in the background, and
   wraps everything in two context providers:
   - `ThemeContextProvider` (outermost) — theme state.
   - `ActiveSectionContextProvider` — which nav item is highlighted.
   It also mounts the persistent UI: `<Header />`, `<Footer />`, the
   `<Toaster />` (for toasts), and `<ThemeSwitch />` (the floating toggle).
2. **`app/page.tsx`** renders as `children` inside the layout. It's just a
   vertical stack of the section components:
   `Intro → SectionDivider → About → Projects → Skills → Experience → Contact`.
3. Client-interactive components are marked `"use client"` (most of
   `components/`). Purely static ones (`footer.tsx`, `section-heading.tsx`)
   are Server Components.

---

## 5. Component-by-component reference

All components live in `components/`. Each section component also has an
`id` (e.g. `id="about"`) so the nav's hash links (`#about`) scroll to it.

### `header.tsx` — the floating nav bar
- Fixed pill-shaped nav, animated in with Framer Motion.
- Renders one link per entry in `links` (from `lib/data.ts`).
- Reads `activeSection` from the active-section context to render the sliding
  highlight pill (the `layoutId="activeSection"` motion span animates between
  links). Clicking a link sets the active section immediately and records the
  click time (see §6 for why).

### `intro.tsx` — the hero
- Profile photo, headline bio sentence, and the CTA buttons:
  **Contact me** (scrolls to contact), **Download Resume** (links to
  `/CV.pdf`), and LinkedIn / GitHub icon links.
- **To edit your name/tagline:** the text is inline JSX here, not in `data.ts`.
- **To change social URLs:** edit the `href`s on the `<a>` tags here.
- Uses `useSectionInView("Home", 0.5)` to report itself as active.

### `about.tsx` — the "About Me" paragraph
- Static prose. **Edit your bio directly in this file.**

### `projects.tsx` + `project.tsx` — the projects section
- `projects.tsx` maps over `projectsData` (from `lib/data.ts`) and renders a
  `<Project />` for each.
- `project.tsx` is a single project card. It:
  - Scroll-animates (scales/fades in) using Framer Motion's `useScroll` +
    `useTransform` tied to the card's position.
  - Renders the title, description, tag pills, screenshot, and — **if you
    provide them** — "Live demo" and "Code" link buttons.
- **★ Project links:** each project in `data.ts` has `liveUrl` and `repoUrl`.
  Fill them in to show the buttons; leave them as `""` to hide them.

### `skills.tsx` — the skills grid
- Maps over `skillsData` (from `lib/data.ts`) into animated pills.
- **To add/remove a skill:** edit the `skillsData` array in `data.ts`.

### `experience.tsx` — the vertical timeline
- Maps over `experiencesData` (from `lib/data.ts`) into a
  `react-vertical-timeline-component` timeline.
- **Theme-aware:** it reads the current theme via `useTheme()` and switches the
  timeline's inline colors (the library uses inline styles, not Tailwind
  classes, so dark mode has to be applied in JS here).

### `contact.tsx` — the contact form
- A `<form>` whose `action` is an async function that calls the `sendEmail`
  Server Action, then shows a success or error **toast** based on the result.
- Fields: `senderEmail` (email input) and `message` (textarea). **The field
  `name`s must match what `actions/sendEmail.ts` reads** — don't rename one
  without the other.
- The submit button is a separate component (`submit-btn.tsx`) so it can use
  `useFormStatus()` to show a spinner while the action is pending.

### `submit-btn.tsx` — the form's submit button
- Client component. Uses React's `useFormStatus()` (must live *inside* the
  `<form>`) to disable itself and show a spinner during submission.

### `theme-switch.tsx` — the floating dark-mode toggle
- The little sun/moon button fixed to the bottom-right corner.
- Calls `toggleTheme()` from the theme context.

### `footer.tsx` — the footer
- Static. Copyright line (auto-updates the year) + a short "built with" note.

### `section-heading.tsx` — reusable section title
- Small presentational component. Renders an `<h2>` with consistent styling.
  Used by About, Projects, Skills, Experience, Contact.

### `section-divider.tsx` — the little vertical bar between hero and About
- Purely decorative, animated in. Hidden on mobile.

---

## 6. Key mechanisms (the non-obvious stuff)

### Active-section highlighting (scroll spy)
- **State** lives in `context/active-section-context.tsx`: `activeSection`
  (the currently highlighted nav item) and `timeOfLastClick`.
- **The hook** `lib/hooks.ts → useSectionInView(name, threshold)` wraps
  `react-intersection-observer`. When a section scrolls into view *and* it's
  been more than 1 second since the last nav click, it sets that section as
  active.
- **Why the 1-second click guard?** When you click a nav link, the page
  smooth-scrolls through intermediate sections. Without the guard, those
  passing sections would fight the click and flicker the highlight. Recording
  `timeOfLastClick` and ignoring the observer for 1s after a click prevents
  that. This is why every nav link and the hero's "Contact me" button call
  `setTimeOfLastClick(Date.now())`.
- Each section component calls `useSectionInView(...)` and spreads the returned
  `ref` onto its root element.

### Dark mode
- **Enabled in** `tailwind.config.ts` via `darkMode: "class"` — Tailwind
  applies `dark:` styles only when a `dark` class is present on a parent.
- **State + effect** in `context/theme-context.tsx`:
  - On mount, it reads `localStorage.theme`; if absent, it falls back to the OS
    preference (`prefers-color-scheme`).
  - `toggleTheme()` flips the value, writes it to `localStorage`, and
    adds/removes the `dark` class on `document.documentElement` (`<html>`).
- **Consuming it:** components use Tailwind `dark:` variants (e.g.
  `dark:bg-white/10`). The one exception is `experience.tsx`, which reads
  `useTheme()` directly because that library uses inline styles.
- **Adding dark styles to new markup:** just add `dark:` utility classes. No
  JS needed unless you're styling a third-party component with inline styles.

### The contact email flow
1. User submits the form in `contact.tsx`.
2. The form `action` calls `sendEmail(formData)` — a **Server Action**
   (`actions/sendEmail.ts`, marked `"use server"`, runs on the server only).
3. `sendEmail` validates the inputs, checks that `RESEND_API_KEY` is set,
   constructs a Resend client, and sends the email (with the sender's address
   as `replyTo` so you can just hit reply).
4. It returns either `{ data }` or `{ error }` — it **never throws** to the
   client, so the form can show a clean toast either way.
5. Back in `contact.tsx`, a `{ error }` result shows an error toast; otherwise
   a success toast.
- **Recipient** is hard-coded in `sendEmail.ts` (`to: "...@ymail.com"`).
- **From address** is Resend's shared `onboarding@resend.dev` until you verify
  your own domain in Resend (then change the `from`).

---

## 7. Environment variables

| Variable | Required for | Where to set |
| --- | --- | --- |
| `RESEND_API_KEY` | The contact form to actually send email | `.env.local` (local) and your host's env settings (prod) |

- See **[`.env.example`](.env.example)** for the template.
- Locally: create a file named `.env.local` (git-ignored) with
  `RESEND_API_KEY=your_key`. Get a key at <https://resend.com/api-keys>.
- **Without the key**, the site still runs fine — the contact form just shows
  a friendly "email service is not configured" toast instead of crashing.

---

## 8. Common tasks — "how do I…?"

| I want to… | Go to |
| --- | --- |
| Change my name / hero tagline | `components/intro.tsx` (inline text) |
| Edit the About paragraph | `components/about.tsx` (inline text) |
| Add/edit/remove a project | `lib/data.ts` → `projectsData` |
| Add a live-demo or repo link to a project | Set `liveUrl` / `repoUrl` on that project in `lib/data.ts` |
| Change a project screenshot | Replace the `.png` in `public/`, keep the import name in `data.ts` |
| Add/remove a skill | `lib/data.ts` → `skillsData` |
| Edit the experience timeline | `lib/data.ts` → `experiencesData` |
| Add/rename a nav item | `lib/data.ts` → `links` (the `name` also drives the active-section type) |
| Update my resume | Replace `public/CV.pdf` (keep the filename) |
| Change social links | `components/intro.tsx` (`href`s on the LinkedIn/GitHub `<a>` tags) |
| Change who contact emails go to | `actions/sendEmail.ts` → the `to:` field |
| Change the page `<title>` / SEO | `app/layout.tsx` → `metadata` |
| Tweak background colors / blobs | `app/layout.tsx` (the two blurred `<div>`s) |

> **Heads up on `lib/data.ts`:** the arrays are declared `as const`, and the
> nav `links` array's `name`s feed the `SectionName` type in `lib/types.ts`,
> which is used by the active-section context and `useSectionInView`. If you
> **rename or add a nav link**, TypeScript will flag every place that needs to
> agree — follow the errors and you'll stay consistent.

---

## 9. Running, building, deploying

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:3000
npm run build     # production build (also type-checks & lints)
npm run start     # serve the production build locally
npm run lint      # run ESLint
```

**Deploy:** the natural home is [Vercel](https://vercel.com/new) (same makers
as Next.js). Import the repo, and **add `RESEND_API_KEY` in the project's
Environment Variables** or the contact form won't send. Every push to `main`
then auto-deploys. (No Vercel config is committed yet — that's a future step.)

---

## 10. Branch / repo notes

- Default branch: **`main`** (currently up to date with all the work below).
- The improvements were developed on `claude/portfolio-repo-review-i3j98a` and
  fast-forward-merged into `main`.

### What changed in the review pass (for context)
- Fixed the contact form (it was reading the wrong field name, so it silently
  never set a reply-to) and made it fail gracefully with toasts.
- Implemented a real, working dark mode (toggle, persistence, system default)
  — the codebase had `dark:` classes but nothing enabling them.
- Added the footer, SEO/Open-Graph metadata, and accessibility fixes.
- Scaffolded optional project demo/repo links.
- Upgraded Next.js off a canary build to stable 14.2 and Resend to v4; added
  `sharp`; cleaned up config.

---

## 11. Still to do (your content)

These are intentionally left for you — the site is wired up and waiting:

1. **Replace the placeholder projects** in `lib/data.ts` (they're currently
   tutorial demos: CorpComment, rmtDev, Word Analytics) with your real work,
   and fill in their `liveUrl` / `repoUrl`.
2. **Confirm `public/CV.pdf`** is your real, current resume.
3. **Confirm the project screenshots** in `public/` are yours.
4. **Set `RESEND_API_KEY`** wherever you deploy so the contact form sends.
5. **Deploy** (Vercel) to get a live, shareable URL.
