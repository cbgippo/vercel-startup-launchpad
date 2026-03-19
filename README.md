# Launch Brief

Launch Brief is a Vercel-native starter app for early-stage teams shipping an AI-native product.

- **Built with** Next.js (App Router) + TypeScript + Tailwind
- **Auth** via Clerk
- **Persistence** via Neon Postgres (provisioned through Vercel Storage)
- **AI workflow** implemented as a structured mock (easy to swap to Vercel AI SDK later)

## Why I built this

This repo is a mini “founder launch kit” app — the kind of lightweight SaaS a pre-seed/seed team could spin up in a weekend. It’s intentionally scoped to show how I’d guide a startup from idea → deploy → production-ish MVP using a Vercel-friendly stack.

## Why this is a good Vercel SE (Startups) demo

Startups aren’t buying “hosting.” They’re buying **the fastest path from idea → live product → iteration**.

This project is designed to be a small, realistic MVP that demonstrates that motion end-to-end.

### What a Vercel SE is really selling (to startups)

1) **Speed to first deploy**
   - Git push → live URL
   - Minimal setup to get something real into production

2) **Developer velocity**
   - Preview deployments as the default workflow for iteration
   - Tight frontend + backend integration (Next.js)

3) **Low operational burden**
   - Managed auth and managed Postgres
   - Serverless-by-default deployment model

4) **Ability to evolve without replatforming**
   - A structure that looks like a real SaaS, not a toy demo
   - Clear seams to swap the mock AI workflow for a provider-backed workflow later

### How this demo maps to those outcomes

- **Speed to first deploy**
  - You can deploy a working app with auth + persistence quickly, without standing up bespoke infrastructure.

- **Developer velocity**
  - The app is organized around Next.js App Router conventions (server actions, route segments), which supports fast iteration.

- **Low operational burden**
  - No custom backend service layer to run.
  - Auth (Clerk) + DB (Neon) are configured via environment variables and managed dashboards.

- **AI-native product support**
  - The workflow is implemented in a way that is easy to swap to the Vercel AI SDK later (keep the UI + persistence, replace the generator).

### How I’d explain this in an interview

What I wanted to demonstrate with this project wasn’t just the application itself, but how I’d work with an early-stage team adopting Vercel.

I built a small SaaS-style app that mirrors a realistic startup MVP (auth, persistence, and an AI workflow) so I can talk through:

- How to get to a first deploy quickly
- How to set up an iteration loop (previews, environments)
- How to keep ops overhead low so the team stays focused on product
- How to evolve the architecture as the company grows

## What it does

1. Sign in
2. Create a product brief (title + rough notes)
3. Generate launch-ready assets:
   - Homepage headline + subheadline
   - 3 feature bullets
   - Onboarding checklist
   - First launch email draft
4. Save and revisit briefs in an authenticated dashboard

## Architecture & enablement docs

- `docs/architecture.md`
- `docs/startup-onboarding-playbook.md`

## Local development

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create `.env.local` in the repo root.

#### Clerk

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

#### Neon Postgres

Provision a Neon database via **Vercel Storage → Neon** and add:

```bash
DATABASE_URL=postgresql://...
```

### 3) Run the dev server

```bash
npm run dev
```

Open:

- `http://localhost:3000` (marketing)
- `http://localhost:3000/sign-in`
- `http://localhost:3000/dashboard`

## Database setup (one-time)

Create the `briefs` table by running the included migration endpoint:

```bash
curl -X POST http://localhost:3000/api/migrate
```

If you prefer, you can also run the SQL in `src/lib/schema.sql` directly in the Neon SQL editor.
