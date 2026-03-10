# Systemic Landing — Project Instructions

## Stack
- Next.js 16, React 19, TypeScript, Tailwind CSS 4
- i18n: next-intl (uk default + en)
- Deploy: Vercel (systemic-landing.vercel.app)
- Repo: github.com/JarkiTecnhicolor/systemic-landing

## Structure
- `messages/uk.json`, `messages/en.json` — all content
- `src/components/landing/` — 9 section components
- `src/components/layout/` — Header, Footer, LocaleSwitcher, MobileMenu
- `src/components/ui/` — Button, Badge, Accordion, FeatureCard, AnimateOnScroll
- `src/app/[locale]/page.tsx` — main landing page
- `src/app/[locale]/pricing/page.tsx` — pricing page

## Brand colors (from CRM)
- Primary: #1D546D (teal), Dark: #061E29 (navy)
- Accent: #6366F1 (indigo), Hover: #4F46E5
- Font: Inter

## Rules
- Static site — no API calls, no database
- All text content lives in messages/*.json, not hardcoded
- Both languages must stay in sync
