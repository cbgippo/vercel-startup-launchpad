# Startup Program Kit — Deployment Checklist

## Pre-deploy
- [ ] Repo imports cleanly into Vercel
- [ ] Framework preset set to **Next.js**
- [ ] Root directory correct (repo root)

## Environment variables
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] `CLERK_SECRET_KEY`
- [ ] `DATABASE_URL`
- [ ] `OPENAI_API_KEY` (optional)

## Postgres
- [ ] Provision Neon Postgres via Vercel Storage
- [ ] Run schema migration: `POST /api/migrate`

## Auth
- [ ] Verify sign-in and sign-up flows
- [ ] Verify `/dashboard` requires auth

## AI generation
- [ ] Click "Generate assets" and confirm output persists
- [ ] If OpenAI key is set, confirm provider-backed generation

## Observability & performance
- [ ] Enable Vercel Analytics
- [ ] Enable Speed Insights
- [ ] Verify `/api/health` returns `{ ok: true }`

## Launch readiness
- [ ] Add a custom domain
- [ ] Confirm production env vars are set
- [ ] Confirm logging/monitoring strategy
