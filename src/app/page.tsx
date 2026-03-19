import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex flex-1 flex-col bg-white px-6 py-12 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <div className="text-sm font-medium tracking-tight">Launch Brief</div>
        <div className="flex items-center gap-3">
          {!userId ? (
            <Link
              href="/sign-in"
              className="inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Sign in
            </Link>
          ) : (
            <>
            <Link
              href="/dashboard"
              className="inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Go to dashboard
            </Link>
            <UserButton />
            </>
          )}
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-16">
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Turn rough product notes into launch-ready content.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Launch Brief is a tiny founder launch kit: create a product brief, generate
          a homepage headline, onboarding checklist, launch email, and feature bullets —
          then save and revisit them in your dashboard.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {!userId ? (
            <Link
              href="/sign-in"
              className="inline-flex h-11 items-center justify-center rounded-md bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Sign in to get started
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center justify-center rounded-md bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Open dashboard
            </Link>
          )}
          <Link
            href="https://vercel.com"
            className="inline-flex h-11 items-center justify-center rounded-md border border-zinc-200 px-5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900"
            target="_blank"
            rel="noreferrer"
          >
            Built for Vercel-native teams
          </Link>
        </div>
      </main>
    </div>
  );
}
