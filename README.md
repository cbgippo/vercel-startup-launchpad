# Launch Brief

Launch Brief is a Vercel-native starter app for early-stage teams shipping an AI-native product.

- **Built with** Next.js (App Router) + TypeScript + Tailwind
- **Auth** via Clerk
- **Persistence** via Neon Postgres (provisioned through Vercel Storage)
- **AI workflow** implemented as a structured mock (easy to swap to Vercel AI SDK later)

## Why I built this

This repo is a mini “founder launch kit” app — the kind of lightweight SaaS a pre-seed/seed team could spin up in a weekend. It’s intentionally scoped to show how I’d guide a startup from idea → deploy → production-ish MVP using a Vercel-friendly stack.

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
