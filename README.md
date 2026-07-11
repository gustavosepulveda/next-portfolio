# Gustavo Sepulveda — Portfolio

A personal portfolio website built with the Next.js App Router. It's a single-page
site with animated sections for an intro, about, projects, skills, experience, and a
working contact form.

## Tech stack

- **Next.js 14** (App Router + Server Actions)
- **TypeScript**
- **Tailwind CSS** (with class-based dark mode)
- **Framer Motion** for animations
- **React Intersection Observer** for scroll-based active-section tracking
- **Resend** for sending contact-form emails
- **react-hot-toast** for form feedback

## Features

- Responsive layout with a fixed, animated navigation bar
- Scroll spy that highlights the active section
- Light/dark theme toggle (persisted to `localStorage`, respects system preference)
- Contact form powered by a Server Action + Resend, with success/error toasts
- Project cards with optional live-demo and source-code links

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file (see `.env.example`) and add your Resend API key:

   ```bash
   RESEND_API_KEY=your_key_here
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Making it your own

- **Content** lives in [`lib/data.ts`](lib/data.ts) — edit the experience, projects,
  and skills arrays.
- **Project links:** set `liveUrl` and `repoUrl` on each project in `lib/data.ts`
  to show "Live demo" / "Code" buttons on the cards (leave them as `""` to hide).
- **Images** (profile picture, project screenshots) live in [`public/`](public).
- **Resume:** replace [`public/CV.pdf`](public/CV.pdf) with your own.

## Deploy

The easiest way to deploy is [Vercel](https://vercel.com/new). Remember to add the
`RESEND_API_KEY` environment variable in your project settings.
