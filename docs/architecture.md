# Architecture

## High-level diagram

```
┌─────────────────┐    ┌──────────────────┐    ┌──────────────────────┐
│ Next.js 15 App  │◄──►│ Clerk Auth       │◄──►│ Clerk Dashboard      │
│ (App Router)    │    │ (middleware)     │    │ (sign-in/up/user)    │
└─────────────────┘    └──────────────────┘    └──────────────────────┘
        │
        ▼
┌─────────────────┐    ┌──────────────────┐    ┌──────────────────────┐
│ Server Actions  │◄──►│ Neon Postgres    │◄──►│ Vercel Storage UI    │
│ (CRUD + AI)     │    │ (briefs table)   │    │ (connection strings) │
└─────────────────┘    └──────────────────┘    └──────────────────────┘
        │
        ▼
┌─────────────────┐
│ Mock AI Generator│
│ (structured output)│
└─────────────────┘
```

## Data flow

1) **Auth**
   - Clerk middleware protects `/dashboard(.*)`
   - `auth()` in server actions returns `userId` for row-level security

2) **Briefs CRUD**
   - `createBrief(title, notes)` → INSERT into `briefs` with `userId`
   - `getBriefsForUser()` → SELECT WHERE `user_id = userId`
   - `getBriefById(id)` → SELECT WHERE `id = id AND user_id = userId`
   - `updateBriefGeneratedJson(id, json)` → UPDATE `generated_json`

3) **AI workflow (mock)**
   - `generateAndUpdateBrief(id)` loads brief → calls `generateMockLaunchAssets(notes)` → saves JSON

## Key implementation details

- **Server Actions**: All DB writes happen in server actions with Clerk auth checks
- **Schema**: `briefs` table with `user_id` for multi-tenancy
- **Mock AI**: Simple keyword-based generator in `src/lib/mock-ai.ts`
- **UI**: Server components for auth state, client forms for create/generate

## Why this stack for startups

- **Low ops overhead**: Neon handles Postgres; Clerk handles auth; Vercel handles deploys
- **Fast time to first deploy**: No complex CI/CD; preview deploys out of the box
- **Team collaboration**: Clerk dashboard for user management; Vercel for env vars/preview
- **Room to scale**: Swap mock AI for Vercel AI SDK later; add more tables; add edge functions
