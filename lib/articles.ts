// ── MSRX articles ─────────────────────────────────────────────────────────────
// Single source of truth for the articles published on articles.msrx.co.in.
// Powers the index, each article's metadata and JSON-LD, the sitemap, the RSS
// feed and llms.txt. See README.md for how to add one.
//
// The article bodies themselves are hand-written pages under app/<slug>,
// because each one carries its own diagrams. This file holds only what is shown
// *about* an article elsewhere on the site, so a listing never has to import a
// whole article to render a card.
//
// Every field is published, so every field has to be true. Before publishing,
// check each dated fact in an article against its primary source (the paper,
// the prize announcement) — README.md has the checklist.

export type ArticleLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Article {
  /** URL path: articles.msrx.co.in/<slug>. Stable once published. */
  slug: string;
  title: string;
  /** One line under the title. Sentence case, no period. */
  subtitle: string;
  /** Two or three sentences. Used on cards, meta description and JSON-LD. */
  description: string;
  /** ISO date first published. */
  published: string;
  /** ISO date of the last substantive edit. */
  updated: string;
  /** Rounded to the minute at ~230 words per minute. */
  readingMinutes: number;
  /** Levels the article covers, from where it starts to where it ends. */
  levels: ArticleLevel[];
  /** Series the article belongs to. One today; kept as data. */
  series: "The AI World";
  tags: string[];
  /** AA against white, like the app accents. */
  accent: string;
}

/** Newest first. */
export const articles: Article[] = [
  {
    slug: "ai-governance-risk-management",
    title: "AI governance and risk management: a practical guide",
    subtitle: "What governance and risk management mean, how the EU AI Act, NIST’s framework, ISO/IEC 42001, the OECD principles and India’s guidelines fit together, and how to build a working programme with tiers, owners, a risk register and a 90-day plan",
    description:
      "A beginner-to-advanced guide to AI governance and risk management: why AI needs its own treatment, NIST’s twelve generative-AI risks and seven trust characteristics, the EU AI Act’s risk levels and current dates, NIST’s govern–map–measure–manage core, ISO/IEC 42001, the OECD principles and India’s seven sutras, then a step-by-step programme, a real incident analysed layer by layer, and a 90-day plan.",
    published: "2026-09-29",
    updated: "2026-09-29",
    readingMinutes: 16,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["AI governance", "AI risk management", "EU AI Act", "NIST AI RMF", "ISO/IEC 42001", "OECD AI Principles", "India AI guidelines", "AI safety"],
    accent: "#B45309",
  },
  {
    slug: "meta-muse-everyday-automation",
    title: "Democratizing automation: bringing Meta’s Muse into everyday life",
    subtitle: "What Meta’s personal AI agent is, how to hand it real errands step by step, how much access to give it, how it pays, and how its secure computer, Sentinel and surrogate passwords try to keep an agent for everyone safe",
    description:
      "A beginner-to-advanced guide to Muse, Meta’s personal AI agent: what makes it an agent rather than a chatbot, where it came from, everyday uses, getting started, writing goals, least-privilege access, paying with Link, the Muse Secure VM and Sentinel, prompt injection and the lethal trifecta, privacy and ads, and a first-month plan — from Meta’s own posts and independent reporting.",
    published: "2026-09-28",
    updated: "2026-09-28",
    readingMinutes: 18,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["Meta", "Muse", "Personal AI agent", "AI agents", "Automation", "Prompt injection", "AI safety", "Privacy"],
    accent: "#1D4ED8",
  },
  {
    slug: "typesafe-jev-with-claude",
    title: "How to use TypeSafe Jev with Claude: a step-by-step guide",
    subtitle: "Five ways to make a fast judgment model and a thinking model work as one team — the Claude Code skill, an MCP tool, hooks that guard what runs, a router in front of Claude and a verifier behind it — with real runs, real code and the thresholds that hold it together",
    description:
      "A hands-on, beginner-to-advanced guide to using TypeSafe’s Jev with Anthropic’s Claude: what each model is for, setting up a key safely, the TypeSafe skill in Claude Code, a zero-dependency MCP server, a PreToolUse hook that asks before destructive commands, a Jev router in front of the Claude API, verifying Claude’s drafts, cascades, and a production checklist — built on real runs.",
    published: "2026-09-28",
    updated: "2026-09-28",
    readingMinutes: 20,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["TypeSafe", "Jev", "Claude", "Claude Code", "MCP", "Claude Code hooks", "Claude API", "AI engineering"],
    accent: "#0E7490",
  },
  {
    slug: "agentic-ai-101",
    title: "Agentic AI 101: from AI that answers to AI that acts",
    subtitle: "What agents are, where they came from, how the think–act–observe loop works, what they change at home and at work, how to keep them safe, and how to start your own agentic journey",
    description:
      "A beginner-to-advanced guide to agentic AI: from Shakey the robot to today’s coding and browser agents, levels of autonomy, the anatomy and ReAct loop of an agent, examples from daily life and every office team, workflow patterns, MCP and A2A, memory, reliability, guardrails, a first agent in code, and a five-step journey to get started.",
    published: "2026-09-24",
    updated: "2026-09-28",
    readingMinutes: 18,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["Agentic AI", "AI agents", "ReAct", "MCP", "AI safety", "Future of work"],
    accent: "#7C3AED",
  },
  {
    slug: "typesafe-jev-101",
    title: "TypeSafe and Jev: how typed AI judgments are changing the way we use AI",
    subtitle: "Why software shouldn’t chat with AI, System One models, Choice, Noul and Score, calibrated confidence, your first app step by step, and the patterns that cut AI costs by orders of magnitude",
    description:
      "A beginner-to-advanced guide to TypeSafe’s Jev: from prompt-and-parse to typed judgments, Kahneman’s System 1, the three question types, calibration and RLCD, building a support-ticket sorter step by step, batching and cost, the layered blueprint, patterns, limits and the Claude Code skill.",
    published: "2026-09-24",
    updated: "2026-09-28",
    readingMinutes: 19,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["TypeSafe", "Jev", "System One models", "Calibrated AI", "AI cost", "AI engineering"],
    accent: "#047857",
  },
  {
    slug: "deepseek-101",
    title: "DeepSeek 101: from the app to running it on your own computer",
    subtitle: "The Chinese lab that shook Silicon Valley, how R1 learned to reason, mixture-of-experts and latent attention, the app, the API, open weights and privacy",
    description:
      "A beginner-to-advanced guide to DeepSeek: its story from a Hangzhou hedge fund to the V4 models, the January 2025 shock, how R1 learned to reason with GRPO, DeepSeekMoE and multi-head latent attention, the app, the API, running open weights locally with Ollama, and privacy trade-offs.",
    published: "2026-09-24",
    updated: "2026-09-28",
    readingMinutes: 18,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["DeepSeek", "DeepSeek-R1", "Open weights", "GRPO", "Mixture of experts", "Ollama"],
    accent: "#1E40AF",
  },
  {
    slug: "microsoft-copilot-101",
    title: "Microsoft Copilot 101: from your first chat to building agents",
    subtitle: "Every Copilot explained — at home, in Office, at work and in code — how it grounds answers in your data, prompting with GCSE, GitHub Copilot, Copilot Studio and Microsoft Foundry",
    description:
      "A beginner-to-advanced guide to Microsoft Copilot: its history from Cortana and the OpenAI partnership, the consumer app on Windows, Edge and phones, Copilot in Word, Excel, PowerPoint, Outlook and Teams, how Microsoft 365 Copilot grounds answers in your permissions, GitHub Copilot, agents in Copilot Studio, and Microsoft Foundry.",
    published: "2026-09-24",
    updated: "2026-09-28",
    readingMinutes: 18,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["Microsoft Copilot", "Microsoft 365 Copilot", "GitHub Copilot", "Copilot Studio", "Microsoft Foundry", "AI agents"],
    accent: "#0E7490",
  },
  {
    slug: "google-gemini-101",
    title: "Google Gemini 101: from your first chat to the API",
    subtitle: "Google’s AI story, why Gemini is built multimodal, the app on web and Android, Gems and Deep Research, Workspace, AI Studio, the Gemini API and the Gemini CLI",
    description:
      "A beginner-to-advanced guide to Google Gemini: its history from the Transformer to Gemini 3, native multimodality and mixture-of-experts, the app on web, Android and iPhone, Gems, Deep Research, Live, Gmail and Docs, grounding, AI Studio, the Gemini API and the Gemini CLI.",
    published: "2026-09-24",
    updated: "2026-09-28",
    readingMinutes: 19,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["Google Gemini", "Gemini API", "Gemini CLI", "Google AI Studio", "Multimodal AI", "Deep Research"],
    accent: "#1D4ED8",
  },
  {
    slug: "how-to-use-claude",
    title: "How to use Claude: web, desktop, mobile, terminal and API",
    subtitle: "Anthropic’s story, how Claude is trained, every way to use it step by step, Claude Code in the terminal, and building with the API",
    description:
      "A beginner-to-advanced guide to Anthropic’s Claude: its history and Constitutional AI, choosing a model, using Claude in the browser, desktop, phone and Chrome, Projects and Artifacts, Claude Code in the terminal, MCP, and building with the Claude API.",
    published: "2026-09-24",
    updated: "2026-09-28",
    readingMinutes: 20,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["Claude", "Anthropic", "Claude Code", "MCP", "Claude API", "Prompt caching"],
    accent: "#B45309",
  },
  {
    slug: "chatgpt-101",
    title: "ChatGPT 101: from your first chat to the API",
    subtitle: "Its history, how it works, step-by-step setup, prompting that works, every major feature, and building with it in code",
    description:
      "A complete beginner-to-advanced guide to ChatGPT: where it came from, what happens when you press Enter, setting it up, the six ingredients of a great prompt, features from files to agents, staying safe, context windows, tool calls and your first API call.",
    published: "2026-09-24",
    updated: "2026-09-28",
    readingMinutes: 22,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["ChatGPT", "Prompting", "Custom GPTs", "OpenAI API", "Structured outputs", "AI for beginners"],
    accent: "#15803D",
  },
  {
    slug: "welcome-to-the-world-of-ai",
    title: "Welcome to the awesome world of Artificial Intelligence",
    subtitle: "From “what even is AI?” to attention heads, gradients and agents, in one sitting",
    description:
      "A guided tour of artificial intelligence that starts with everyday examples and ends inside a transformer. Machine learning, neural networks, how ChatGPT-style models are built, diffusion, RAG, agents, risks and a learning roadmap, with diagrams throughout.",
    published: "2026-09-24",
    updated: "2026-09-28",
    readingMinutes: 22,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["AI basics", "Machine learning", "Neural networks", "LLMs", "Transformers", "Agents"],
    accent: "#6D28D9",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** "24 September 2026" — the site writes dates day-first, in words. */
export function formatArticleDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
