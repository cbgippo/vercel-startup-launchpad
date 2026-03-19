export function generateMockLaunchAssets(notes: string) {
  // Extremely naive keyword extraction for demo purposes
  const lower = notes.toLowerCase();
  const isB2B = lower.includes("business") || lower.includes("enterprise") || lower.includes("team");
  const isAI = lower.includes("ai") || lower.includes("machine learning") || lower.includes("llm");
  const isDevTool = lower.includes("developer") || lower.includes("api") || lower.includes("sdk");

  const base = {
    headline:
      isAI && isDevTool
        ? "AI-powered dev tools that ship faster"
        : isAI
        ? "AI-native workflows that just work"
        : isDevTool
        ? "Ship better APIs, faster"
        : isB2B
        ? "The platform teams actually adopt"
        : "Launch your product with confidence",
    subheadline:
      isAI && isDevTool
        ? "From prototype to production in minutes, not weeks."
        : isAI
        ? "Automate the repetitive, focus on the product."
        : isDevTool
        ? "Simple APIs, clear docs, happy developers."
        : isB2B
        ? "Built for how modern teams work."
        : "Turn rough ideas into launch-ready assets.",
    featureBullets: [
      isAI
        ? "AI-generated launch assets in seconds"
        : "One-click launch content generation",
      isDevTool
        ? "Developer-first onboarding checklists"
        : "Product-focused onboarding checklists",
      "Email drafts you can actually send",
    ],
    onboardingChecklist: [
      "Define your value proposition",
      "Draft your first launch email",
      "Set up analytics and feedback loops",
      "Prepare a quick-start guide",
      "Schedule a launch day sync",
    ],
    launchEmail: {
      subject: isAI
        ? "Introducing Launch Brief: AI-native launch assets in minutes"
        : "Introducing Launch Brief: From notes to launch-ready content",
      body: `Hi there,

We’re excited to introduce Launch Brief — a tiny founder launch kit that turns rough product notes into launch-ready content.

Whether you’re shipping an AI-native tool or a B2B platform, Launch Brief helps you generate:
- Homepage headlines and subheadlines
- Onboarding checklists
- First launch email drafts
- Feature bullets that resonate

Get started in seconds and go from idea to launch without the guesswork.

Cheers,
The Launch Brief team`,
    },
  };

  return base;
}
