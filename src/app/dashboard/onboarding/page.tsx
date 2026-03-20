import Link from "next/link";
import { redirect } from "next/navigation";
import {
  completeOnboardingStep3,
  createBriefFromTemplate,
  getOnboardingProgress,
} from "@/lib/actions";

export default async function OnboardingPage() {
  const progress = await getOnboardingProgress();

  async function handleCreateFromTemplate(formData: FormData) {
    "use server";
    const templateId = formData.get("templateId") as string;
    const brief = await createBriefFromTemplate(templateId);
    redirect(`/dashboard/briefs/${brief.id}`);
  }

  async function handleCompleteStep3() {
    "use server";
    await completeOnboardingStep3();
    redirect("/dashboard/onboarding");
  }

  return (
    <div className="flex flex-1 flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            ← Dashboard
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Startup onboarding</h1>
        </div>
      </div>

      <div className="max-w-3xl space-y-8">
        <section className="rounded-md border border-zinc-200 p-5 dark:border-zinc-800">
          <h2 className="text-lg font-medium tracking-tight">Progress</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="font-medium">1) Create your first brief</div>
              <div className={progress.step1CreatedBrief ? "text-green-600" : "text-zinc-500"}>
                {progress.step1CreatedBrief ? "Done" : "Not started"}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="font-medium">2) Generate assets</div>
              <div className={progress.step2GeneratedAssets ? "text-green-600" : "text-zinc-500"}>
                {progress.step2GeneratedAssets ? "Done" : "Not started"}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="font-medium">3) Production checklist</div>
              <div className={progress.step3Completed ? "text-green-600" : "text-zinc-500"}>
                {progress.step3Completed ? "Done" : "Not started"}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium tracking-tight">Templates</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Use a template to create a realistic brief quickly (great for workshops and demos).
          </p>

          <form action={handleCreateFromTemplate} className="grid gap-3 sm:grid-cols-3">
            <button
              name="templateId"
              value="ai-saas"
              className="rounded-md border border-zinc-200 p-4 text-left hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <div className="font-medium">AI SaaS</div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Customer research copilot
              </div>
            </button>

            <button
              name="templateId"
              value="devtool"
              className="rounded-md border border-zinc-200 p-4 text-left hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <div className="font-medium">Devtool</div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                CI safety rails
              </div>
            </button>

            <button
              name="templateId"
              value="b2b"
              className="rounded-md border border-zinc-200 p-4 text-left hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <div className="font-medium">B2B</div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Ops hub for founders
              </div>
            </button>
          </form>
        </section>

        <section className="rounded-md border border-zinc-200 p-5 dark:border-zinc-800">
          <h2 className="text-lg font-medium tracking-tight">Production checklist</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            This mirrors what I’d walk a pre-seed/seed team through (env vars, auth, DB, observability).
          </p>
          <div className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <div>1. Add env vars in Vercel (Clerk, DATABASE_URL, OPENAI_API_KEY)</div>
            <div>2. Run migration in production</div>
            <div>3. Verify auth redirect + dashboard access</div>
            <div>4. Validate generate flow + DB writes</div>
            <div>5. Enable Analytics + Speed Insights</div>
          </div>

          {!progress.step3Completed ? (
            <form action={handleCompleteStep3} className="mt-4">
              <button
                type="submit"
                className="inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Mark checklist complete
              </button>
            </form>
          ) : (
            <div className="mt-4 text-sm text-green-600">Checklist completed.</div>
          )}
        </section>
      </div>
    </div>
  );
}
