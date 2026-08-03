# AEIS Cambridge Learning App — Math Kingdom

Soft pastel practice app for **AEIS Primary 2 entrance Mathematics** (Primary 1 MOE-aligned topics).

## What's new (modernisation)

- **Soft pastel visual system** — calm cream / mint / peach / sky (no dark glassmorphism)
- **Math Kingdom home** — topic islands with mastery bars
- **Captain Number mascot** — growth-mindset feedback
- **Local progress** — accuracy, streak, weak topics saved on device (`localStorage`)
- **Today's Quest** — quick practise of a weak topic
- **Accessibility settings** — high contrast, reduced motion, text size, dyslexia-friendly font
- Math-first navigation (English remains available as bonus)

## Run locally

```bash
npm install --legacy-peer-deps
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm test` | Vitest unit tests |

## Stack

React 19 · Vite · Tailwind CSS · Framer Motion · Vitest

## Deploy

Configured for Vercel (`vercel.json`). Push to `main` to deploy if GitHub integration is enabled.
