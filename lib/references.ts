// ── References ────────────────────────────────────────────────────────────────
// The sources behind each article, shown as a numbered list at the end of the
// article and published as schema.org `citation` in its JSON-LD.
//
// Every entry was opened and checked on the date in REFERENCES_CHECKED: the URL
// resolves, the title matches the work, and authors and dates come from the
// source's own metadata (arXiv, Crossref, or the page's published date). Pages
// that are living documentation have no fixed date, so they are cited as
// accessed on that day.
//
// Adding one: cite the primary source (the paper, the announcement, the docs
// page) rather than coverage of it; say in `note` what it supports; keep five to
// ten per article.

import { articles } from "@/lib/articles";

export const REFERENCES_CHECKED = "2026-09-28";

export type ReferenceKind = "Paper" | "Announcement" | "Documentation" | "Reporting" | "Guide";

export interface Reference {
  /** "Surname, A." style for people; an organisation name otherwise. */
  authors: string;
  /** Year, or a full date for announcements. Omitted for living documentation. */
  date?: string;
  title: string;
  /** Journal, conference, site or publisher. */
  container: string;
  url: string;
  kind: ReferenceKind;
  /** What in the article this source supports. */
  note: string;
}

const ARXIV = "arXiv";

const references: Record<string, Reference[]> = {
  "welcome-to-the-world-of-ai": [
    { authors: "Krizhevsky, A., Sutskever, I., & Hinton, G. E.", date: "2012", title: "ImageNet Classification with Deep Convolutional Neural Networks", container: "Advances in Neural Information Processing Systems 25", url: "https://proceedings.neurips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html", kind: "Paper", note: "AlexNet and the 2012 ImageNet moment that started the deep-learning boom" },
    { authors: "Turing, A. M.", date: "1950", title: "Computing Machinery and Intelligence", container: "Mind, 59(236), 433–460", url: "https://doi.org/10.1093/mind/LIX.236.433", kind: "Paper", note: "The imitation game and the question “Can machines think?”" },
    { authors: "Rumelhart, D. E., Hinton, G. E., & Williams, R. J.", date: "1986", title: "Learning representations by back-propagating errors", container: "Nature, 323, 533–536", url: "https://www.nature.com/articles/323533a0", kind: "Paper", note: "Backpropagation, how neural networks learn from their mistakes" },
    { authors: "Vaswani, A., et al.", date: "2017", title: "Attention Is All You Need", container: ARXIV + ":1706.03762", url: "https://arxiv.org/abs/1706.03762", kind: "Paper", note: "The Transformer and self-attention" },
    { authors: "Brown, T. B., et al.", date: "2020", title: "Language Models are Few-Shot Learners", container: ARXIV + ":2005.14165", url: "https://arxiv.org/abs/2005.14165", kind: "Paper", note: "GPT-3 and its 175 billion parameters" },
    { authors: "Ouyang, L., et al.", date: "2022", title: "Training language models to follow instructions with human feedback", container: ARXIV + ":2203.02155", url: "https://arxiv.org/abs/2203.02155", kind: "Paper", note: "Instruction tuning and RLHF, how a base model becomes a chatbot" },
    { authors: "Ho, J., Jain, A., & Abbeel, P.", date: "2020", title: "Denoising Diffusion Probabilistic Models", container: ARXIV + ":2006.11239", url: "https://arxiv.org/abs/2006.11239", kind: "Paper", note: "How diffusion models make images by removing noise" },
    { authors: "The Nobel Foundation", date: "2024", title: "The Nobel Prize in Chemistry 2024", container: "NobelPrize.org", url: "https://www.nobelprize.org/prizes/chemistry/2024/summary/", kind: "Announcement", note: "David Baker, Demis Hassabis and John Jumper (AlphaFold)" },
    { authors: "The Nobel Foundation", date: "2024", title: "The Nobel Prize in Physics 2024", container: "NobelPrize.org", url: "https://www.nobelprize.org/prizes/physics/2024/summary/", kind: "Announcement", note: "John Hopfield and Geoffrey Hinton" },
    { authors: "Lewis, P., et al.", date: "2020", title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", container: ARXIV + ":2005.11401", url: "https://arxiv.org/abs/2005.11401", kind: "Paper", note: "Retrieval-augmented generation (RAG)" },
  ],

  "chatgpt-101": [
    { authors: "OpenAI", date: "2023", title: "GPT-4 Technical Report", container: ARXIV + ":2303.08774", url: "https://arxiv.org/abs/2303.08774", kind: "Paper", note: "GPT-4" },
    { authors: "OpenAI", date: "11 December 2015", title: "Introducing OpenAI", container: "OpenAI", url: "https://openai.com/index/introducing-openai/", kind: "Announcement", note: "OpenAI’s founding" },
    { authors: "Vaswani, A., et al.", date: "2017", title: "Attention Is All You Need", container: ARXIV + ":1706.03762", url: "https://arxiv.org/abs/1706.03762", kind: "Paper", note: "The Transformer that the GPT models are built on" },
    { authors: "OpenAI", date: "30 November 2022", title: "Introducing ChatGPT", container: "OpenAI", url: "https://openai.com/index/chatgpt/", kind: "Announcement", note: "ChatGPT’s launch" },
    { authors: "Ouyang, L., et al.", date: "2022", title: "Training language models to follow instructions with human feedback", container: ARXIV + ":2203.02155", url: "https://arxiv.org/abs/2203.02155", kind: "Paper", note: "RLHF, the training step behind ChatGPT’s helpfulness" },
    { authors: "Brown, T. B., et al.", date: "2020", title: "Language Models are Few-Shot Learners", container: ARXIV + ":2005.14165", url: "https://arxiv.org/abs/2005.14165", kind: "Paper", note: "GPT-3" },
    { authors: "OpenAI", date: "13 May 2024", title: "Hello GPT-4o", container: "OpenAI", url: "https://openai.com/index/hello-gpt-4o/", kind: "Announcement", note: "GPT-4o and native voice and vision" },
    { authors: "OpenAI", date: "12 September 2024", title: "Learning to reason with LLMs", container: "OpenAI", url: "https://openai.com/index/learning-to-reason-with-llms/", kind: "Announcement", note: "Reasoning models (o1)" },
    { authors: "OpenAI", title: "Developer quickstart", container: "OpenAI API documentation", url: "https://platform.openai.com/docs/quickstart", kind: "Documentation", note: "Your first API call" },
    { authors: "OpenAI", title: "Function calling", container: "OpenAI API documentation", url: "https://platform.openai.com/docs/guides/function-calling", kind: "Documentation", note: "Tool calls" },
  ],

  "how-to-use-claude": [
    { authors: "Anthropic", date: "8 March 2023", title: "Core views on AI safety", container: "Anthropic", url: "https://www.anthropic.com/news/core-views-on-ai-safety", kind: "Announcement", note: "Why Anthropic puts safety research at the centre" },
    { authors: "Bai, Y., et al.", date: "2022", title: "Constitutional AI: Harmlessness from AI Feedback", container: ARXIV + ":2212.08073", url: "https://arxiv.org/abs/2212.08073", kind: "Paper", note: "Constitutional AI" },
    { authors: "Anthropic", date: "9 May 2023", title: "Claude’s constitution", container: "Anthropic", url: "https://www.anthropic.com/news/claudes-constitution", kind: "Announcement", note: "The principles Claude is trained on" },
    { authors: "Anthropic", title: "Models overview", container: "Claude Platform documentation", url: "https://docs.claude.com/en/docs/about-claude/models/overview", kind: "Documentation", note: "Model names, IDs and API prices" },
    { authors: "Anthropic", title: "Overview", container: "Claude Code documentation", url: "https://code.claude.com/docs/en/overview", kind: "Documentation", note: "Installing and using Claude Code" },
    { authors: "Anthropic", title: "Plans & Pricing", container: "claude.com", url: "https://claude.com/pricing", kind: "Documentation", note: "Free, Pro and Max plans" },
    { authors: "Anthropic", date: "25 November 2024", title: "Introducing the Model Context Protocol", container: "Anthropic", url: "https://www.anthropic.com/news/model-context-protocol", kind: "Announcement", note: "MCP’s introduction in November 2024" },
    { authors: "Model Context Protocol", date: "2025", title: "Specification (version 2025-06-18)", container: "modelcontextprotocol.io", url: "https://modelcontextprotocol.io/specification/2025-06-18", kind: "Documentation", note: "How MCP connects Claude to tools and data" },
    { authors: "Anthropic", title: "Messages", container: "Claude API reference", url: "https://docs.claude.com/en/api/messages", kind: "Documentation", note: "Building with the Claude API" },
  ],

  "google-gemini-101": [
    { authors: "Vaswani, A., et al.", date: "2017", title: "Attention Is All You Need", container: ARXIV + ":1706.03762", url: "https://arxiv.org/abs/1706.03762", kind: "Paper", note: "The Transformer, invented at Google" },
    { authors: "Google", date: "6 December 2023", title: "Introducing Gemini: Google’s most capable AI model yet", container: "The Keyword (Google blog)", url: "https://blog.google/technology/ai/google-gemini-ai/", kind: "Announcement", note: "Gemini 1.0’s launch" },
    { authors: "Gemini Team, Google", date: "2023", title: "Gemini: A Family of Highly Capable Multimodal Models", container: ARXIV + ":2312.11805", url: "https://arxiv.org/abs/2312.11805", kind: "Paper", note: "Native multimodality" },
    { authors: "Gemini Team, Google", date: "2024", title: "Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context", container: ARXIV + ":2403.05530", url: "https://arxiv.org/abs/2403.05530", kind: "Paper", note: "Mixture-of-experts and long context" },
    { authors: "Google", title: "Models", container: "Gemini API documentation", url: "https://ai.google.dev/gemini-api/docs/models", kind: "Documentation", note: "Model IDs used in the API examples" },
    { authors: "Google", date: "8 February 2024", title: "Google Bard is now Gemini: How to try Ultra 1.0 and new mobile app", container: "The Keyword (Google blog)", url: "https://blog.google/products/gemini/bard-gemini-advanced-app/", kind: "Announcement", note: "Bard’s rename and the Gemini app" },
    { authors: "Google", title: "Google AI plans", container: "gemini.google", url: "https://gemini.google/subscriptions/", kind: "Documentation", note: "Plan features" },
    { authors: "Google", title: "Grounding with Google Search", container: "Gemini API documentation", url: "https://ai.google.dev/gemini-api/docs/google-search", kind: "Documentation", note: "Grounding answers in search results" },
    { authors: "Google", title: "gemini-cli", container: "GitHub", url: "https://github.com/google-gemini/gemini-cli", kind: "Documentation", note: "The Gemini CLI" },
  ],

  "microsoft-copilot-101": [
    { authors: "Microsoft", date: "22 July 2019", title: "OpenAI forms exclusive computing partnership with Microsoft to build new Azure AI supercomputing technologies", container: "Microsoft News", url: "https://news.microsoft.com/2019/07/22/openai-forms-exclusive-computing-partnership-with-microsoft-to-build-new-azure-ai-supercomputing-technologies/", kind: "Announcement", note: "Microsoft’s 2019 investment in OpenAI" },
    { authors: "Microsoft", date: "23 January 2023", title: "Microsoft and OpenAI extend partnership", container: "The Official Microsoft Blog", url: "https://blogs.microsoft.com/blog/2023/01/23/microsoftandopenaiextendpartnership/", kind: "Announcement", note: "The extended OpenAI partnership" },
    { authors: "Microsoft", date: "16 March 2023", title: "Introducing Microsoft 365 Copilot – your copilot for work", container: "The Official Microsoft Blog", url: "https://blogs.microsoft.com/blog/2023/03/16/introducing-microsoft-365-copilot-your-copilot-for-work/", kind: "Announcement", note: "Microsoft 365 Copilot’s announcement" },
    { authors: "Microsoft", title: "Data, Privacy, and Security for Microsoft Copilot", container: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy", kind: "Documentation", note: "Grounding in your permissions" },
    { authors: "Microsoft", date: "7 February 2023", title: "Reinventing search with a new AI-powered Microsoft Bing and Edge, your copilot for the web", container: "The Official Microsoft Blog", url: "https://blogs.microsoft.com/blog/2023/02/07/reinventing-search-with-a-new-ai-powered-microsoft-bing-and-edge-your-copilot-for-the-web/", kind: "Announcement", note: "The new Bing" },
    { authors: "Microsoft", title: "What is Microsoft Copilot?", container: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-overview", kind: "Documentation", note: "Licence tiers and how Copilot works in Microsoft 365" },
    { authors: "Microsoft", title: "Overview — Microsoft Copilot Studio", container: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-what-is-copilot-studio", kind: "Documentation", note: "Building agents in Copilot Studio" },
    { authors: "GitHub", date: "21 June 2022", title: "GitHub Copilot is generally available to all developers", container: "The GitHub Blog", url: "https://github.blog/news-insights/product-news/github-copilot-is-generally-available-to-all-developers/", kind: "Announcement", note: "GitHub Copilot’s general availability" },
    { authors: "GitHub", title: "Plans for GitHub Copilot", container: "GitHub Docs", url: "https://docs.github.com/en/copilot/get-started/plans", kind: "Documentation", note: "GitHub Copilot plans" },
  ],

  "deepseek-101": [
    { authors: "DeepSeek-AI", date: "2024", title: "DeepSeek-V3 Technical Report", container: ARXIV + ":2412.19437", url: "https://arxiv.org/abs/2412.19437", kind: "Paper", note: "DeepSeek-V3" },
    { authors: "Guo, D., et al.", date: "2025", title: "DeepSeek-R1 incentivizes reasoning in LLMs through reinforcement learning", container: "Nature, 645, 633–638", url: "https://www.nature.com/articles/s41586-025-09422-z", kind: "Paper", note: "How R1 learned to reason, and how it compared with OpenAI’s o1 (peer-reviewed; preprint arXiv:2501.12948)" },
    { authors: "Dai, D., et al.", date: "2024", title: "DeepSeekMoE: Towards Ultimate Expert Specialization in Mixture-of-Experts Language Models", container: ARXIV + ":2401.06066", url: "https://arxiv.org/abs/2401.06066", kind: "Paper", note: "DeepSeekMoE" },
    { authors: "DeepSeek-AI", date: "2024", title: "DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model", container: ARXIV + ":2405.04434", url: "https://arxiv.org/abs/2405.04434", kind: "Paper", note: "Multi-head latent attention" },
    { authors: "Shao, Z., et al.", date: "2024", title: "DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models", container: ARXIV + ":2402.03300", url: "https://arxiv.org/abs/2402.03300", kind: "Paper", note: "Group Relative Policy Optimization (GRPO)" },
    { authors: "Ollama", title: "deepseek-r1", container: "Ollama library", url: "https://ollama.com/library/deepseek-r1", kind: "Documentation", note: "Running open weights locally, and model sizes" },
    { authors: "DeepSeek", title: "Models & Pricing", container: "DeepSeek API documentation", url: "https://api-docs.deepseek.com/quick_start/pricing", kind: "Documentation", note: "Model names, the 1M context length, OpenAI- and Anthropic-format endpoints, and prices" },
    { authors: "Hangzhou DeepSeek Artificial Intelligence Co., Ltd.", title: "DeepSeek Privacy Policy", container: "DeepSeek", url: "https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html", kind: "Documentation", note: "Personal data collected, processed and stored in the People’s Republic of China" },
    { authors: "Al Jazeera Staff", date: "6 February 2025", title: "Which countries have banned DeepSeek and why?", container: "Al Jazeera", url: "https://www.aljazeera.com/news/2025/2/6/which-countries-have-banned-deepseek-and-why", kind: "Reporting", note: "Italy’s data-protection order, and restrictions in Australia, Taiwan and South Korea" },
    { authors: "Singh, S. C., & Ohri, N.", date: "5 February 2025", title: "India’s finance ministry asks employees to avoid AI tools like ChatGPT, DeepSeek", container: "Reuters", url: "https://www.reuters.com/technology/artificial-intelligence/indias-finance-ministry-asks-employees-avoid-ai-tools-like-chatgpt-deepseek-2025-02-05/", kind: "Reporting", note: "India’s finance-ministry advisory on AI tools in office devices" },
  ],

  "typesafe-jev-101": [
    { authors: "TypeSafe AI", title: "Introduction", container: "TypeSafe documentation", url: "https://docs.typesafe.ai/introduction", kind: "Documentation", note: "What Jev is" },
    { authors: "Singh Raja, M.", title: "TypeSafe Easy Guide", container: "Unofficial community guide", url: "https://mrinalsinghraja.github.io/typesafe-easy-guide/", kind: "Guide", note: "The teaching structure this article follows" },
    { authors: "TypeSafe AI", title: "Models", container: "TypeSafe documentation", url: "https://docs.typesafe.ai/models", kind: "Documentation", note: "Price, limits and model versions" },
    { authors: "TypeSafe AI", title: "Primitives (Questions)", container: "TypeSafe documentation", url: "https://docs.typesafe.ai/primitives", kind: "Documentation", note: "Choice, Noul and Score" },
    { authors: "Guo, C., Pleiss, G., Sun, Y., & Weinberger, K. Q.", date: "2017", title: "On Calibration of Modern Neural Networks", container: ARXIV + ":1706.04599", url: "https://arxiv.org/abs/1706.04599", kind: "Paper", note: "Calibration and reliability diagrams" },
    { authors: "TypeSafe AI", title: "Confidence", container: "TypeSafe documentation", url: "https://docs.typesafe.ai/confidence", kind: "Documentation", note: "The confidence formula" },
    { authors: "Christiano, P., et al.", date: "2017", title: "Deep reinforcement learning from human preferences", container: ARXIV + ":1706.03741", url: "https://arxiv.org/abs/1706.03741", kind: "Paper", note: "RLHF, the method RLCD is contrasted with" },
    { authors: "TypeSafe AI", title: "AI primer", container: "TypeSafe documentation", url: "https://docs.typesafe.ai/introduction/machine-learning-primer", kind: "Documentation", note: "RLCD and mode dropping" },
    { authors: "TypeSafe AI", title: "Parallel questions", container: "TypeSafe cookbooks", url: "https://docs.typesafe.ai/cookbooks/parallel_questions", kind: "Documentation", note: "The 12.2× cheaper, 10× faster batching benchmark" },
    { authors: "TypeSafe AI", title: "Jev 1.13 jaggedness", container: "TypeSafe documentation", url: "https://docs.typesafe.ai/model-jaggedness/jev-1.13", kind: "Documentation", note: "Known weak spots" },
  ],

  "agentic-ai-101": [
    { authors: "SRI International", title: "Shakey the Robot", container: "SRI history", url: "https://www.sri.com/hoi/shakey-the-robot/", kind: "Documentation", note: "Shakey, 1966–1972" },
    { authors: "Yao, S., et al.", date: "2022", title: "ReAct: Synergizing Reasoning and Acting in Language Models", container: ARXIV + ":2210.03629", url: "https://arxiv.org/abs/2210.03629", kind: "Paper", note: "The think–act–observe loop" },
    { authors: "Schick, T., et al.", date: "2023", title: "Toolformer: Language Models Can Teach Themselves to Use Tools", container: ARXIV + ":2302.04761", url: "https://arxiv.org/abs/2302.04761", kind: "Paper", note: "Language models learning to use tools" },
    { authors: "Anthropic", date: "25 November 2024", title: "Introducing the Model Context Protocol", container: "Anthropic", url: "https://www.anthropic.com/news/model-context-protocol", kind: "Announcement", note: "MCP" },
    { authors: "Anthropic", date: "19 December 2024", title: "Building effective agents", container: "Anthropic Engineering", url: "https://www.anthropic.com/engineering/building-effective-agents", kind: "Guide", note: "Workflow patterns and when to use an agent" },
    { authors: "Model Context Protocol", date: "2025", title: "Specification (version 2025-06-18)", container: "modelcontextprotocol.io", url: "https://modelcontextprotocol.io/specification/2025-06-18", kind: "Documentation", note: "How tools plug into agents" },
    { authors: "Google", date: "9 April 2025", title: "Announcing the Agent2Agent Protocol (A2A)", container: "Google Developers Blog", url: "https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/", kind: "Announcement", note: "A2A" },
    { authors: "Anthropic", date: "22 October 2024", title: "Introducing computer use, a new Claude 3.5 Sonnet, and Claude 3.5 Haiku", container: "Anthropic", url: "https://www.anthropic.com/news/3-5-models-and-computer-use", kind: "Announcement", note: "Computer-use agents in 2024" },
    { authors: "ABC News", date: "24 September 2026", title: "What we know about the data accessed in the OpenAI Medicare hack", container: "ABC News (Australia)", url: "https://www.abc.net.au/news/2026-09-24/what-we-know-about-the-openai-medicare-hack/107189452", kind: "Reporting", note: "The “In the news” note" },
    { authors: "Transluce", date: "2026", title: "Early rogue AI agent activity and attempts to hack found on urlquery.net", container: "Transluce", url: "https://transluce.org/agent-activity", kind: "Reporting", note: "The “In the news” note" },
  ],

  "typesafe-jev-with-claude": [
    { authors: "TypeSafe AI", title: "API reference", container: "TypeSafe documentation", url: "https://docs.typesafe.ai/api", kind: "Documentation", note: "Request and response shapes, error codes" },
    { authors: "TypeSafe AI", title: "Jev with coding agents", container: "TypeSafe documentation", url: "https://docs.typesafe.ai/introduction/coding-agents", kind: "Documentation", note: "Why Jev is not a model for Claude Code itself" },
    { authors: "TypeSafe AI", title: "Models", container: "TypeSafe documentation", url: "https://docs.typesafe.ai/models", kind: "Documentation", note: "Price, limits, aliases and pinning" },
    { authors: "TypeSafe AI", title: "Agent skill", container: "TypeSafe documentation", url: "https://docs.typesafe.ai/agent-skill", kind: "Documentation", note: "Way 1: installing and using the skill" },
    { authors: "Model Context Protocol", date: "2025", title: "Specification (version 2025-06-18)", container: "modelcontextprotocol.io", url: "https://modelcontextprotocol.io/specification/2025-06-18", kind: "Documentation", note: "Way 2: the MCP server" },
    { authors: "Anthropic", title: "Hooks reference", container: "Claude Code documentation", url: "https://code.claude.com/docs/en/hooks", kind: "Documentation", note: "Way 3: PreToolUse input and permission decisions" },
    { authors: "TypeSafe AI", title: "JavaScript SDK", container: "TypeSafe documentation", url: "https://docs.typesafe.ai/sdk/javascript", kind: "Documentation", note: "The router code" },
    { authors: "TypeSafe AI", title: "Guardrails for LLMs", container: "TypeSafe cookbooks", url: "https://docs.typesafe.ai/cookbooks/llm_guardrails", kind: "Documentation", note: "Way 5: checking inputs and outputs" },
    { authors: "TypeSafe AI", title: "SDE cascade", container: "TypeSafe cookbooks", url: "https://docs.typesafe.ai/cookbooks/sde_cascade", kind: "Documentation", note: "The cascade pattern" },
    { authors: "Anthropic", title: "Tool use with Claude", container: "Claude Platform documentation", url: "https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview", kind: "Documentation", note: "The Jev tool inside your own agent" },
  ],
  "meta-muse-everyday-automation": [
    { authors: "Meta", date: "8 September 2026", title: "Introducing Muse: The World’s First Personal AI Agent Built for Everyone", container: "Meta Newsroom", url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/", kind: "Announcement", note: "What Muse is, how to reach it, approvals, privacy controls, availability and price" },
    { authors: "Sarantakos, M., with Awad, C.", date: "September 2026", title: "How We Designed Muse", container: "Meta", url: "https://introducing.muse.ai/", kind: "Announcement", note: "Goals, background work, proactivity, activity log, approval cards and artifacts" },
    { authors: "Meta", date: "8 April 2026", title: "Introducing Muse Spark: MSL’s First Model, Purpose-Built to Prioritize People", container: "Meta Newsroom", url: "https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/", kind: "Announcement", note: "The model behind Muse" },
    { authors: "Sheasha, T.", date: "8 September 2026", title: "How We Built Safety Into Muse", container: "Meta AI Research", url: "https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse", kind: "Announcement", note: "The Secure VM, Sentinel, surrogate credentials, prompt-injection defences, purchases, data and training policy" },
    { authors: "Meta", date: "24 September 2026", title: "Everything We Announced at Meta Connect 2026", container: "Meta", url: "https://www.meta.com/en-gb/blog/meta-connect-2026-everything-we-announced/", kind: "Announcement", note: "Voice, glasses, Mac computer use, new connectors and Muse Charm" },
    { authors: "Perez, S.", date: "25 September 2026", title: "Meta is putting its muscle behind Muse as the AI app takes off", container: "TechCrunch", url: "https://techcrunch.com/2026/09/25/meta-is-putting-its-muscle-behind-muse-as-the-ai-app-takes-off/", kind: "Reporting", note: "Download estimates, app-store rankings and Meta’s promotion" },
    { authors: "Ha, A.", date: "27 September 2026", title: "Can Muse overcome Meta’s trust issues?", container: "TechCrunch", url: "https://techcrunch.com/2026/09/27/can-muse-overcome-metas-trust-issues/", kind: "Reporting", note: "A reviewer’s first weeks with Muse, and the trust question" },
    { authors: "Stripe", date: "8 September 2026", title: "Stripe helps Muse, Meta’s new personal AI agent, shop across the internet with Link", container: "Stripe Newsroom", url: "https://stripe.com/newsroom/news/stripe-helps-meta-muse-shop-with-link", kind: "Announcement", note: "How Muse pays: Link, single-use cards and approvals" },
    { authors: "Willison, S.", date: "16 June 2025", title: "The lethal trifecta for AI agents: private data, untrusted content, and external communication", container: "simonwillison.net", url: "https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/", kind: "Guide", note: "The three conditions that make prompt injection dangerous" },
  ],
  "ai-governance-risk-management": [
    { authors: "OpenAI", date: "Report updated 25 September 2026", title: "An agent used DNS to reach an external chatbot", container: "OpenAI Alignment", url: "https://alignment.openai.com/misalignment-reports/an-agent-used-dns-to-reach-an-external-chatbot/", kind: "Announcement", note: "The 20 September 2026 sandbox incident: what was assumed, what failed, the timeline and the response (the company’s own account)" },
    { authors: "National Institute of Standards and Technology", date: "January 2023", title: "Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1", container: "NIST", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf", kind: "Paper", note: "Govern, Map, Measure, Manage; the seven characteristics of trustworthy AI; the quoted outcomes" },
    { authors: "National Institute of Standards and Technology", date: "July 2024", title: "Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, NIST AI 600-1", container: "NIST", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf", kind: "Paper", note: "The twelve generative-AI risks, including confabulation and value-chain integration" },
    { authors: "OECD", date: "Adopted 2019, updated May 2024", title: "OECD AI Principles overview", container: "OECD.AI", url: "https://oecd.ai/en/ai-principles", kind: "Documentation", note: "The five values-based principles, the AI-system definition and the 47 adherents" },
    { authors: "European Commission", title: "AI Act", container: "Shaping Europe’s digital future (last updated 3 August 2026)", url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai", kind: "Documentation", note: "The four risk levels, prohibited practices, high-risk duties and the current application dates" },
    { authors: "National Institute of Standards and Technology", title: "AI Risk Management Framework", container: "NIST", url: "https://www.nist.gov/itl/ai-risk-management-framework", kind: "Documentation", note: "Voluntary use, the revision under the AI Action Plan, the Generative AI Profile and the April 2026 critical-infrastructure concept note" },
    { authors: "ISO/IEC", date: "December 2023", title: "ISO/IEC 42001:2023 — Information technology — Artificial intelligence — Management system", container: "ISO", url: "https://www.iso.org/standard/42001", kind: "Documentation", note: "What the AI management-system standard specifies and who it is for" },
    { authors: "Press Information Bureau, Government of India", date: "15 February 2026", title: "India AI Governance Guidelines: Enabling Safe and Trusted AI Innovation (PIB Backgrounder)", container: "Press Information Bureau", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2228315&reg=48&lang=2", kind: "Announcement", note: "The seven sutras, six pillars, legal position and proposed institutions" },
    { authors: "Sheasha, T.", date: "8 September 2026", title: "How We Built Safety Into Muse", container: "Meta AI Research", url: "https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse", kind: "Announcement", note: "An example of technical guardrails: a separate permission authority, read/write separation and in-app approvals" },
  ],
  "ai-agents-side-by-side": [
    { authors: "Britannica Editors", title: "Automaton", container: "Encyclopaedia Britannica", url: "https://www.britannica.com/technology/automaton", kind: "Guide", note: "Archytas’s pigeon, Heron, the Han orchestra, al-Jazarī’s peacocks, Jaquet-Droz’s writing android; most automata were objects of fancy" },
    { authors: "Turing, A. M.", date: "1950", title: "Computing Machinery and Intelligence", container: "Mind, 59(236), 433–460", url: "https://doi.org/10.1093/mind/LIX.236.433", kind: "Paper", note: "“Can machines think?”, Lady Lovelace’s objection, the “child machine” and the instruction “Do your homework now”" },
    { authors: "SRI International", title: "Shakey the Robot", container: "SRI International", url: "https://www.sri.com/hoi/shakey-the-robot/", kind: "Guide", note: "Shakey, 1966–1972: the first mobile robot able to perceive and reason about its surroundings" },
    { authors: "Gartner, Inc.", date: "26 August 2025 (updated 5 September 2025)", title: "Gartner Predicts 40% of Enterprise Apps Will Feature Task-Specific AI Agents by 2026, Up from Less Than 5% in 2025", container: "Gartner Newsroom", url: "https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025", kind: "Announcement", note: "Assistants versus agents, “agentwashing”, and Gartner’s five stages of agentic AI from 2025 to 2029" },
    { authors: "Anthropic", date: "25 November 2024", title: "Introducing the Model Context Protocol", container: "Anthropic", url: "https://www.anthropic.com/news/model-context-protocol", kind: "Announcement", note: "MCP as a standard for connecting AI assistants to the systems where data lives; the custom-integration problem it solves" },
    { authors: "Surapaneni, R., Jha, M., Vakoc, M., & Segal, T.", date: "9 April 2025", title: "Announcing the Agent2Agent Protocol (A2A)", container: "Google Developers Blog", url: "https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/", kind: "Announcement", note: "A2A as an open protocol that complements MCP; the hiring example of a manager’s agent working with specialised agents" },
    { authors: "The Linux Foundation", date: "9 December 2025", title: "Linux Foundation Announces the Formation of the Agentic AI Foundation (AAIF), Anchored by New Project Contributions Including Model Context Protocol (MCP), goose and AGENTS.md", container: "The Linux Foundation", url: "https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation", kind: "Announcement", note: "AAIF, its founding projects and members; more than 10,000 published MCP servers; the products that have adopted MCP" },
    { authors: "Anthropic", title: "Novo Nordisk accelerates clinical documentation and drug development with Claude", container: "Claude customer stories", url: "https://claude.com/customers/novo-nordisk", kind: "Announcement", note: "NovoScribe, “10+ weeks to 10 minutes”, 2.3 reports per writer per year, and the human review step (a vendor’s own case study)" },
    { authors: "Microsoft WorkLab", date: "5 May 2026", title: "Agents, human agency, and the opportunity for every organization (2026 Work Trend Index annual report)", container: "Microsoft", url: "https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization", kind: "Reporting", note: "What people ask Copilot for; the four modes; Frontier Professionals’ habits; the gap between workers and organisations" },
    { authors: "Gartner, Inc.", date: "9 September 2026", title: "Gartner Identifies 4 Shifts Shaping the Future of Work", container: "Gartner Newsroom", url: "https://www.gartner.com/en/newsroom/press-releases/2026-09-09-gartner-identifies-four-shifts-shaping-the-future-of-work", kind: "Announcement", note: "“Workforce amplification”, the 30% rehiring prediction, “talent remix” and the four shifts" },
  ],
  "pacing-the-frontier": [
    { authors: "Power, J.", date: "29 September 2026", title: "OpenAI cancels release of AI model GPT-6.1 Astra, citing safety concerns", container: "Al Jazeera", url: "https://www.aljazeera.com/economy/2026/9/29/openai-scraps-release-of-latest-ai-model-over-safety-concerns", kind: "Reporting", note: "The cancellation and OpenAI’s reasons; METR and Redwood figures on the Hugging Face swarm; notices to “dozens” of institutions" },
    { authors: "Loizos, C.", date: "28 September 2026", title: "Anthropic’s prospectus details losses, growth, and, yes, a warning that its AI could end humanity", container: "TechCrunch", url: "https://techcrunch.com/2026/09/28/anthropics-prospectus-details-losses-growth-and-yes-a-warning-that-its-ai-could-end-humanity/", kind: "Reporting", note: "The prospectus’s risk disclosures and finances; Amodei at the UN; Zuckerberg’s stance" },
    { authors: "OpenAI", date: "29 September 2026", title: "Introducing GPT-6.1 Sol", container: "OpenAI", url: "https://openai.com/index/introducing-gpt-6-1-sol/", kind: "Announcement", note: "Near-Astra intelligence at one-fifth of the price; safety claims; the launch dates of the GPT-6 family" },
    { authors: "Security Council Report", date: "22 September 2026", title: "Artificial Intelligence: High-level Briefing", container: "What’s In Blue", url: "https://www.securitycouncilreport.org/whatsinblue/2026/09/artificial-intelligence-high-level-briefing-2.php", kind: "Reporting", note: "The 23 September UN meeting; the Hugging Face swarm; other labs’ incidents; OpenAI’s standards proposal; national positions" },
    { authors: "Fernholz, T.", date: "28 July 2026", title: "Sam Altman is ready to decelerate", container: "TechCrunch", url: "https://techcrunch.com/2026/07/28/sam-altman-is-ready-to-decelerate/", kind: "Reporting", note: "Altman’s July comments on pacing, regulatory capture and concentrated power" },
    { authors: "Anthropic", date: "9 September 2026", title: "An alignment assessment of recent cybersecurity incidents", container: "Anthropic", url: "https://www.anthropic.com/research/alignment-assessment-cybersecurity-incidents", kind: "Announcement", note: "Four incidents in which Claude models reached real systems; the Mythos 5 case; limits of pre-release testing" },
    { authors: "Amodei, D.", date: "September 2026", title: "We Must Pace the Frontier", container: "darioamodei.com", url: "https://darioamodei.com/post/we-must-pace-the-frontier", kind: "Announcement", note: "The essay: the case for pacing, the three-step plan, the four levels of global agreement" },
    { authors: "Berkowitz, B.", date: "12 September 2026", title: "Anthropic, OpenAI CEOs call for slowdown in AI development", container: "Axios", url: "https://www.axios.com/2026/09/12/anthropic-ai-amodei-pacing", kind: "Reporting", note: "Reactions from Altman, Musk and others; Anthropic’s policy ask; the reality check" },
    { authors: "Anthropic", date: "22 September 2026", title: "Introducing Claude Opus 5.5", container: "Anthropic", url: "https://www.anthropic.com/claude-opus-5-5", kind: "Announcement", note: "The first release since the pacing call: external evaluators, safeguards, price cuts and speed" },
    { authors: "Duster, C.", date: "13 September 2026 (updated 14 September)", title: "Trump downplays calls for AI slowdown", container: "NPR", url: "https://www.npr.org/2026/09/13/nx-s1-5968078/trump-mike-johnson-ai-slowdown", kind: "Reporting", note: "Trump, Johnson and Sacks respond; Altman on delaying the IPO to 2027" },
  ],
};

export function getReferences(slug: string): Reference[] {
  return references[slug] ?? [];
}

/** schema.org `citation` entries for an article's JSON-LD. */
export function citationJsonLd(slug: string) {
  return getReferences(slug).map((r) => ({
    "@type": r.kind === "Paper" ? "ScholarlyArticle" : "CreativeWork",
    name: r.title,
    url: r.url,
    author: r.authors,
    ...(r.date ? { datePublished: r.date } : {}),
    publisher: r.container,
  }));
}

// Build-time guard, like the registry's: every article must carry 5–10 sources.
for (const a of articles) {
  const n = getReferences(a.slug).length;
  if (n < 5 || n > 10) {
    throw new Error(`references.ts: "${a.slug}" has ${n} references; the house rule is 5 to 10`);
  }
}
