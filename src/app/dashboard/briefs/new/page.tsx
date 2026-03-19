import { redirect } from "next/navigation";
import Link from "next/link";
import { createBrief } from "@/lib/actions";

export default async function NewBriefPage() {
  async function handleCreate(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const notes = formData.get("notes") as string;

    if (!title || !notes) {
      throw new Error("Title and notes are required");
    }

    const brief = await createBrief(title, notes);
    redirect(`/dashboard/briefs/${brief.id}`);
  }

  return (
    <div className="flex flex-1 flex-col gap-6 px-6 py-10">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← Dashboard
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Create brief</h1>
      </div>

      <form action={handleCreate} className="flex max-w-2xl flex-col gap-4">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-400 dark:focus:ring-zinc-500"
            placeholder="e.g., Launch Brief for AI SaaS"
          />
        </div>

        <div>
          <label htmlFor="notes" className="mb-1 block text-sm font-medium">
            Rough notes
          </label>
          <textarea
            id="notes"
            name="notes"
            required
            rows={8}
            className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-400 dark:focus:ring-zinc-500"
            placeholder="Describe your product, target audience, positioning, and any rough ideas you have for messaging or features..."
          />
        </div>

        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          Create brief
        </button>
      </form>
    </div>
  );
}
