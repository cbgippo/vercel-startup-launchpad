# Launch Brief

Launch Brief is a small “founder launch kit” app built to demonstrate how I’d help an early-stage startup ship quickly on Vercel.

- **Framework**: Next.js (App Router) + TypeScript + Tailwind
- **Auth**: Clerk
- **DB**: Neon Postgres (via Vercel Storage)
- **AI workflow**: Vercel AI SDK (OpenAI provider) with a mock fallback for local development

## Live demo

- Production: **[https://vercel-startup-launchpad-jet.vercel.app/](https://vercel-startup-launchpad-jet.vercel.app/)**

## 2-minute walkthrough (what to click)

1) Visit `/` and click **Sign in**

2) Go to `/dashboard` and click **Create brief**

3) Add a title + rough notes (product, audience, positioning)

4) Open the brief detail page and click **Generate assets**

5) You’ll see structured output saved to Postgres:

- Homepage headline + subheadline
- Feature bullets
- Onboarding checklist
- First launch email

## Why I built this (interviewer context)

For a Vercel SE (Startups), I’m not trying to show “a cool demo app.” I’m trying to show how I’d partner with a startup to get from **idea → deployed MVP → iteration loop** with minimal operational overhead.

## Why this is a good Vercel SE (Startups) demo

Startups aren’t buying “hosting.” They’re buying **the fastest path from idea → live product → iteration**.

This project is designed to demonstrate those outcomes:

1) **Speed to first deploy**
   - Git push → live URL
   - Minimal setup to get something real into production

2) **Developer velocity**
   - Preview deployments as the default iteration loop
   - Tight frontend + backend integration with Next.js

3) **Low operational burden**
   - Managed auth + managed Postgres
   - Serverless-by-default deployment model

4) **Ability to evolve without replatforming**
   - Real SaaS shape: auth, persistence, request boundaries
   - Clear seam to swap the AI mock → provider-backed workflow

## What to review (code tour)

- **Auth + request boundary**
  - `src/proxy.ts` (Clerk request middleware)
  - `src/app/dashboard/layout.tsx` (server-side protection + redirect)

- **Briefs persistence (multi-tenant by user)**
  - `src/lib/schema.sql` (table definition)
  - `src/lib/db.ts` (Neon connection)
  - `src/lib/actions.ts` (server actions: list/create/get/update)

- **AI workflow seam**
  - `src/lib/mock-ai.ts` (mock generator)
  - `generateAndUpdateBrief()` in `src/lib/actions.ts` (where a real model call would slot in)

- **UX surfaces**
  - `src/app/dashboard/page.tsx` (brief list)
  - `src/app/dashboard/briefs/new/page.tsx` (create brief)
  - `src/app/dashboard/briefs/[id]/page.tsx` (generate + render outputs)

## Architecture (high level)

- **UI**: Next.js server components + server actions
- **Auth**: Clerk (session → `userId`)
- **DB**: Neon Postgres, with per-user row scoping via `user_id`
- **AI**: mock generator writes JSON to `generated_json`

More detail:

- `docs/architecture.md`
- `docs/startup-onboarding-playbook.md`

## Why this stack for startups

- **Fast to ship**: minimal infra, Vercel deploy workflow, previews by default
- **Low ops**: managed auth + managed Postgres, no bespoke backend service to maintain
- **Easy to evolve**: replace the mock generator with Vercel AI SDK + model provider without rewriting the product surface

## Tradeoffs (intentional)

- **AI can run provider-backed or mocked**: if `OPENAI_API_KEY` is set, generation uses the Vercel AI SDK; otherwise it falls back to a structured mock.
- **Schema is minimal** (single table) to keep the MVP crisp; expand after usage patterns are real.
- **Migration endpoint** is intentionally simple for a demo; production would use a real migration workflow.

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

#### Vercel AI SDK (OpenAI)

```bash
OPENAI_API_KEY=sk_...
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
