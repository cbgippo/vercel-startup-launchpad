# Startup Program Kit — Workshop

## Title
From idea → deployed MVP on Vercel (auth + DB + AI workflow)

## Audience
Pre-seed / seed founders and small engineering teams.

## Duration
30 minutes (hands-on) + 10 minutes Q&A

## Learning goals
- Deploy a realistic MVP on Vercel with a production URL.
- Understand Preview Deployments as the default iteration loop.
- Wire in managed services (auth + Postgres) without running servers.
- Add an AI workflow using Vercel AI SDK.

## Prereqs (send ahead)
- GitHub account
- Vercel account
- Clerk account
- (Optional) OpenAI API key

## Workshop outline

### 1) Story framing (3 minutes)
- What startups buy is the fastest path from idea → live product → iteration.
- Demo is a realistic MVP shape: auth, persistence, and an AI workflow.

### 2) Deploy (7 minutes)
1. Import repo into Vercel
2. Set env vars:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `DATABASE_URL`
   - `OPENAI_API_KEY` (optional)
3. Deploy → confirm the production URL loads

### 3) Provision Postgres (5 minutes)
- Use Vercel Storage → Neon
- Confirm connection string is set
- Run migration:
  - `POST /api/migrate`

### 4) Walkthrough the app (10 minutes)
- Sign in
- Create brief
- Generate assets
- Show persistence + generated JSON

### 5) Preview deployments (5 minutes)
- Open a small PR (copy change in README)
- Show preview URL
- Merge → show production updates

## Talk tracks (SE notes)
- Vercel reduces ops overhead early: no server layer to manage.
- The stack supports growth: edge/serverless, observability, managed integrations.
- Preview deployments turn product iteration into a habit.

## Q&A prompts
- What are you building? Where are the bottlenecks today?
- How do you handle previews, staging, and production right now?
- Do you anticipate AI-native features? Where would they fit?
