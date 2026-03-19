import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { getBriefsForUser } from "@/lib/actions";

type Brief = {
  id: string;
  title: string;
  notes: string;
  generated_json: Record<string, any> | null;
  created_at: string;
  updated_at: string;
};

export default async function DashboardPage() {
  const briefs = await getBriefsForUser();

  return (
    <div className="flex flex-1 flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/briefs/new"
            className="inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Create brief
          </Link>
          <UserButton />
        </div>
      </div>
      {briefs.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-lg font-medium tracking-tight">No briefs yet</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Create your first brief to turn rough notes into launch-ready content.
          </p>
          <Link
            href="/dashboard/briefs/new"
            className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Create brief
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {briefs.map((brief) => (
            <li key={brief.id}>
              <Link
                href={`/dashboard/briefs/${brief.id}`}
                className="block rounded-md border border-zinc-200 px-4 py-3 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
              >
                <div className="font-medium">{brief.title}</div>
                <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {new Date(brief.created_at).toLocaleDateString()}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
