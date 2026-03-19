import Link from "next/link";
import { notFound } from "next/navigation";
import { getBriefById, generateAndUpdateBrief } from "@/lib/actions";

export default async function BriefDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const brief = await getBriefById(id);
  if (!brief) notFound();

  return (
    <div className="flex flex-1 flex-col gap-6 px-6 py-10">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← Dashboard
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">{brief.title}</h1>
      </div>

      <div className="max-w-2xl space-y-6">
        <section>
          <h2 className="mb-2 text-lg font-medium tracking-tight">Notes</h2>
          <p className="whitespace-pre-wrap text-sm text-zinc-600 dark:text-zinc-400">
            {brief.notes}
          </p>
        </section>

        {brief.generated_json ? (
          <section className="space-y-6">
            <h2 className="text-lg font-medium tracking-tight">Generated assets</h2>

            <div>
              <h3 className="mb-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">Homepage</h3>
              <div className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-900">
                <p className="text-base font-semibold">{brief.generated_json.headline}</p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {brief.generated_json.subheadline}
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">Feature bullets</h3>
              <ul className="list-disc list-inside space-y-1 rounded-md bg-zinc-100 p-4 dark:bg-zinc-900">
                {brief.generated_json.featureBullets.map((bullet: string, i: number) => (
                  <li key={i} className="text-sm text-zinc-700 dark:text-zinc-300">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">Onboarding checklist</h3>
              <ul className="list-inside space-y-1 rounded-md bg-zinc-100 p-4 dark:bg-zinc-900">
                {brief.generated_json.onboardingChecklist.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <span className="mt-0.5 h-4 w-4 rounded border border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-800" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">First launch email</h3>
              <div className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-900">
                <p className="text-sm font-medium">{brief.generated_json.launchEmail.subject}</p>
                <pre className="mt-2 whitespace-pre-wrap text-xs text-zinc-700 dark:text-zinc-300">
                  {brief.generated_json.launchEmail.body}
                </pre>
              </div>
            </div>
          </section>
        ) : (
          <section className="rounded-md border border-dashed border-zinc-300 p-6 text-center dark:border-zinc-700">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              No generated assets yet. Generate launch-ready content from your notes.
            </p>
            <form
              action={async () => {
                "use server";
                await generateAndUpdateBrief(brief.id);
              }}
            >
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Generate assets
              </button>
            </form>
          </section>
        )}

        {brief.generated_json && (
          <section className="pt-4">
            <form
              action={async () => {
                "use server";
                await generateAndUpdateBrief(brief.id);
              }}
            >
              <button
                type="submit"
                className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-200 px-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
              >
                Regenerate
              </button>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}
