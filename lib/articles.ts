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
  /** A long feature (over about 6,000 words, many products or sources) may cite up to 45 references instead of 10. */
  longFeature?: boolean;
}

/** Newest first. */
export const articles: Article[] = [
  {
    slug: "can-ai-tell-a-scam-from-a-real-message",
    title: "Can an AI model tell a scam from a real message? Real tests of pattern rules and a judgment model on Indian scam SMS",
    subtitle: "Fourteen hand-written messages, one live checker: where written-down rules and TypeSafe’s Jev each succeed and fail, why the two together never say “safe”, and what a score of 0.99 or 0.12 really means",
    description:
      "A real-run look at how a small judgment model (TypeSafe’s Jev) and plain pattern rules judge Indian scam messages: phishing, “digital arrest”, job and e-challan scams against genuine bank texts. It covers the thresholds that combine the two, sentence-level negation, masking before anything is sent, fail-open design, the failures we found, and why a probability is not an accuracy.",
    published: "2026-10-30",
    updated: "2026-10-30",
    readingMinutes: 15,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["Scam detection", "Jev", "TypeSafe", "Calibrated probabilities", "Digital arrest", "UPI fraud", "Rules vs AI", "Case study"],
    accent: "#B45309",
  },
  {
    slug: "ai-made-scams-india",
    title: "AI-made scams in India: cloned voices, deepfake video and “digital arrest”, and the checks that still work",
    subtitle: "How generative AI makes scam calls more convincing, what Indian government sources actually say about digital arrest, fake telecom threats and call forwarding, and the low-tech checks that beat all of it",
    description:
      "A sourced guide to AI-made scams in India. It separates what official sources say (the Ministry of Home Affairs on digital arrest, DoT and TRAI on fake disconnection calls, RBI on unauthorised transactions) from what the AI evidence shows (an FTC alert on cloned voices, a PLOS ONE study of deepfake audio, one deepfake video-call case), says plainly where only press reports exist, and ends with five checks that work whether or not the voice is real: call back on a number you hold, a family code word, refusing secrecy, slowing money down, and reporting to 1930 within hours.",
    published: "2026-10-30",
    updated: "2026-10-30",
    readingMinutes: 15,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["AI scams", "Voice cloning", "Deepfakes", "Digital arrest", "India", "Cyber fraud", "1930", "Online safety"],
    accent: "#B91C1C",
  },
  {
    slug: "ai-security-scan-70-repositories",
    title: "I let AI scan all 70 of my repositories: what it found, what it fixed, and why you should do the same",
    subtitle: "A positive, practical story of an AI-assisted security sweep: 14 findings, one critical Next.js advisory across 25 apps, 11 closed and verified, and a rhythm you can copy to scan your own apps regularly",
    description:
      "How one developer uses AI tools to scan 70 repositories and 28 live sites for security problems, fix them and keep them fixed. It covers what was scanned and how, the critical Next.js advisories, the fixes, why a merged fix is not always live, CSP and speed hardening, Dependabot and CI, and a starter plan and safe-use rules so you can scan your own apps with AI.",
    published: "2026-10-25",
    updated: "2026-10-27",
    readingMinutes: 14,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["AI security scanning", "Next.js", "Dependabot", "Content-Security-Policy", "Application security", "DevSecOps", "Case study"],
    accent: "#15803D",
  },
  {
    slug: "black-october-php2shell",
    title: "Black October: PHP2Shell, the flaws AI found in the code behind about 70% of websites",
    subtitle: "How AI found two critical PHP flaws, what it could do before and what it does now, why governments, Wikimedia and others took sites offline, and what the sources say comes next",
    description:
      "A sourced look at PHP2Shell, the two critical PHP flaws (CVE-2026-109618 and CVE-2026-109619) fixed on 21 October 2026. Using the BBC, iTWire, The Register and pages from the PHP project, OpenAI, Wiz, Amazon and Google Project Zero, it covers how AI found the bugs, how AI helps defenders and attackers, which government sites and Wikimedia systems went offline, and what experts expect next.",
    published: "2026-10-24",
    updated: "2026-10-24",
    readingMinutes: 16,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["PHP2Shell", "PHP", "AI security", "Vulnerability disclosure", "Cybersecurity", "OpenAI", "Wiz", "Patch the Planet"],
    accent: "#BE123C",
  },
  {
    slug: "claude-duet-proactive-agent",
    title: "Claude Duet: Anthropic’s proactive assistant, what it does, how it works and how to get ready",
    subtitle: "A plain guide to the research preview announced on 21 October 2026: the morning brief, the cloud computer, what it asks you first, how it is kept safe, who can use it, and what is still unknown",
    description:
      "A sourced guide to Claude Duet, the proactive agent Anthropic announced on 21 October 2026. Using Anthropic’s announcement, product page and X thread, plus its pages on trustworthy agents, Managed Agents and auto mode, it covers what Duet does, how it works, the approval rules, the safety design, the connectors, who can join the waitlist, the usage limits and a practical way to get ready.",
    published: "2026-10-22",
    updated: "2026-10-22",
    readingMinutes: 12,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["Claude Duet", "Anthropic", "Claude", "AI agents", "Proactive assistant", "AI safety", "Research preview"],
    accent: "#C2410C",
  },
  {
    slug: "tesla-roadster-flying-launch",
    title: "Tesla’s flying Roadster: what was shown, and what was only said",
    subtitle: "The 15 October 2026 reveal checked against Tesla’s own pages and four news reports: the three versions, the thrusters, the deposits, the regulators, and four AI claims we could not find",
    description:
      "A sourced look at Tesla’s Roadster reveal on 15 October 2026. Using Tesla’s Roadster and reservation pages and reports from TechCrunch, CBS News, Fox Business and Space.com, it covers what happened on stage, the Performance, Thrust and Rocket versions, how the suction and cold-gas thrusters work, what reserving costs, safety and regulators, and which AI claims are not supported.",
    published: "2026-10-18",
    updated: "2026-10-18",
    readingMinutes: 12,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["Tesla Roadster", "Elon Musk", "SpaceX", "Cold-gas thrusters", "Flying car", "Fact-check", "Electric vehicles"],
    accent: "#B91C1C",
  },
  {
    slug: "typesafe-jev-real-usage-cost",
    title: "What $1.26 bought: a real day of TypeSafe Jev, and what the same tokens cost elsewhere",
    subtitle: "One real usage page, 54,890 requests and 38 million tokens: how to read it, what the same tokens cost at other published prices, and what the screenshot cannot show",
    description:
      "A sourced case study built on a real TypeSafe console usage page: 54,890 requests, 38.3 million tokens and an estimated $1.26 in 24 hours. It recomputes the bill, prices the same tokens at Anthropic’s published list prices (about 5.7 to 570 times as much), explains batching and Jev’s limits, and says what the page cannot prove.",
    published: "2026-10-15",
    updated: "2026-10-15",
    readingMinutes: 12,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["TypeSafe", "Jev", "AI inference cost", "System One", "Token pricing", "Case study", "LLM cost comparison"],
    accent: "#6D28D9",
  },
  {
    slug: "redesigning-source-control",
    title: "When AI writes the code, source control becomes the bottleneck",
    subtitle: "Anthropic went from about 2,500 merges a day to over 30,000 and replaced git for its monorepo in five months: what it built, why, and what its post does and does not claim",
    description:
      "A sourced walk through Anthropic’s 13 October 2026 engineering post on Scion, its in-house version-control system. It explains why git’s offline-first design strained under agent-scale merging, the five design principles, how changesets and cache tiers work, the results Anthropic reports, and what is and is not claimed.",
    published: "2026-10-14",
    updated: "2026-10-14",
    readingMinutes: 13,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["Source control", "Git", "Anthropic", "Scion", "Monorepo", "AI coding agents", "Developer infrastructure", "CI"],
    accent: "#0E7490",
  },
  {
    slug: "ai-electricity-and-india",
    title: "AI runs on electricity, and India is where demand is growing fastest",
    subtitle: "A post about electricity and a chart about India sent us to the energy agencies’ own tables: what AI will ask of the world’s grids by 2030, what it means for India, and why “India leads” needs careful words",
    description:
      "A sourced look at how much electricity AI will use and where India fits. Using the IEA’s 2025 and 2026 reports and the Energy Institute’s data, it explains the units, the 485-to-950 TWh projection for data centres, India’s demand growth, grid strain and data-centre build-out, and checks a widely shared chart that put India at 60,000 TWh by 2051 against the agencies’ numbers.",
    published: "2026-10-12",
    updated: "2026-10-12",
    readingMinutes: 16,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["AI electricity demand", "Data centres", "India", "Energy", "IEA", "Power grid", "AI infrastructure", "Fact-check"],
    accent: "#B45309",
  },
  {
    slug: "ai-agents-side-by-side",
    title: "Side by side: the long road to AI coworkers, and how to work with them today",
    subtitle: "From Greek steam-powered birds to a robot called Shakey, and from a standard plug for AI to the office of 2026. A story of how machines went from performing tricks to sharing our work, six real agents profiled with their makers’ own pages, the risks worth respecting, a bright story of the 2060s, and ten easy ways to put one to work for you this week",
    description:
      "A story-led, sourced journey through two thousand years of machine helpers: ancient automata, Lovelace and Turing, Shakey the robot, the new standards that let AI agents use tools and talk to each other, what Gartner, Microsoft and Novo Nordisk report about agents at work, six working agents profiled in depth (Devin, Agentforce, 11x, Claude Cowork, Glean and OpenAI’s dots), an honest look at the risks, India’s early rules, zero and logic (with a claim check), agents in India today (Bhashini, Jugalbandi, FarmerChat, Sarvam, Swiggy, Flipkart, UPI and the IT giants), with photographs, screenshots and infographics, an imagined day in the 2030s and a story from the 2060s, practical everyday recipes including six for life in India, a delegation card, an FAQ, a glossary and a 30-day plan.",
    published: "2026-09-30",
    updated: "2026-09-30",
    readingMinutes: 66,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["AI agents", "Agentic AI", "Future of work", "Model Context Protocol", "Agent2Agent", "Productivity", "Human-AI collaboration", "History of AI"],
    longFeature: true,
    accent: "#0E7490",
  },
  {
    slug: "pacing-the-frontier",
    title: "Hands on the brake, foot on the gas: the month AI’s leaders asked the world to slow down",
    subtitle: "In September 2026 the heads of Anthropic and OpenAI called for “pacing the frontier”. The same month, prices fell, faster models shipped and one company moved toward the biggest stock-market debut ever. The story of that contradiction, told with the quotes, the numbers and the photographs, and what it means for everyone outside the room",
    description:
      "A story-driven, sourced account of September 2026, when Dario Amodei and Sam Altman called for slowing the pace of AI capability jumps while their companies kept launching cheaper, faster models: the summer of rogue agents, the essay, the UN Security Council session, the money, the critics, a scorecard of what each lab said and did, and what a real brake would look like.",
    published: "2026-09-30",
    updated: "2026-09-30",
    readingMinutes: 25,
    levels: ["Beginner", "Intermediate", "Advanced"],
    series: "The AI World",
    tags: ["Anthropic", "OpenAI", "Dario Amodei", "Sam Altman", "AI safety", "Pacing the frontier", "AI policy", "Recursive self-improvement"],
    accent: "#BE123C",
  },
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
