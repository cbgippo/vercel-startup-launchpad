# Startup Onboarding Playbook (Sales Engineer View)

How I’d onboard a pre-seed/seed startup onto Launch Brief and Vercel, from MVP to production-ready.

---

## Day 1: Deploy MVP

**Goal**: Ship a working, authed app with persistence in <30 minutes.

**Steps**
1. **Clone the repo** and set up Clerk
   - Create Clerk application → copy `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` to `.env.local`
   - Verify sign-in flow works
2. **Provision Neon Postgres**
   - In Vercel Storage → Neon → create DB
   - Attach to project → pull `DATABASE_URL` to `.env.local`
   - Run one-time migration (`POST /api/migrate`)
3. **Deploy to Vercel**
   - Connect GitHub repo → enable auto-deploys
   - Add env vars in Vercel dashboard (Clerk + Neon)
   - Confirm production auth + briefs work

**Outcome**: Founder can sign up, create a brief, generate assets, and see a live URL.

---

## Week 1: Add Production Essentials

**Goal**: Make the app feel real and ready for early users.

**Features to add**
- **Analytics**: Vercel Analytics (add to dashboard)
- **Environment management**: Separate dev/staging/prod branches with preview deploys
- **Error handling**: Better UI errors + logging (e.g., Vercel Logs or third-party)
- **SEO/metadata**: Update `metadata` in layout.tsx; add `sitemap.ts`/`robots.ts`

**Vercel-native configs**
- Enable Preview Deployments on PRs
- Add `VERCEL_ENV`-conditional feature flags
- Set up Domain (custom domain) and SSL

**Outcome**: Team can iterate via previews; metrics are visible; app is discoverable.

---

## Week 2: Optimize Performance & Reliability

**Goal**: Prepare for first 100 users and smooth launch day.

**Performance**
- **Edge vs Server**: Move static pages to Edge (e.g., marketing page); keep server actions for DB/AI
- **Caching**: Add `revalidate` tags where appropriate; consider ISR for briefs list
- **Bundle analysis**: Run `@next/bundle-analyzer` and trim unused deps

**Reliability**
- **Database**: Add connection pooling; add basic health check (`/api/health`)
- **Rate limiting**: Simple in-memory limit on create/generate endpoints
- **Monitoring**: Vercel Logs + optional uptime check

**Outcome**: App feels fast; basic guardrails in place; team can troubleshoot.

---

## Expansion: Production Hardening & Team Workflows

**Goal**: Scale beyond first 1,000 users and support a team.

**Infrastructure**
- **Multi-environment CI**: GitHub Actions with branch deploys; automated schema migrations
- **Edge Functions**: Move AI generation to Edge for lower latency
- **CDN**: Vercel Edge Cache for static assets

**Team workflows**
- **Collaboration**: Vercel Comments on previews; team role-based access in Vercel
- **Testing**: Add unit tests for server actions; E2E tests for auth/CRUD
- **Compliance**: Add data retention policies; audit logs for Briefs CRUD

**Business features**
- **Real AI**: Swap mock generator for Vercel AI SDK + OpenAI/Anthropic
- **Teams/Permissions**: Extend `briefs` schema with `team_id`; add Clerk Organizations
- **Export**: CSV/JSON export for generated assets

**Outcome**: Startup can confidently onboard customers, onboard engineers, and iterate quickly.

---

## Tradeoffs to Communicate Early

- **When not to over-engineer**: Don’t add complex state management yet; keep DB schema simple.
- **Serverless is enough now**: Avoid containers/VMs until you hit DB connection limits.
- **Optimize only after usage grows**: Don’t add heavy caching or edge functions until you see latency issues.

---

## How This Maps to Vercel’s Value Props

- **Developer velocity**: Ship MVP in a day; preview deploys for every PR.
- **Low ops**: Neon + Clerk + Vercel = no infra to manage.
- **Scalable foundation**: Start serverless, add edge/CDN later without rewrites.
- **Team collaboration**: Built-in commenting, environments, and role-based access.
