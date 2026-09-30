import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { getArticle, formatArticleDate, type Article } from "@/lib/articles";
import { abs, AUTHOR, breadcrumbJsonLd, JsonLd, MAIN_SITE, metaDescription, ORG_ID, SITE_NAME } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout, Figure, LevelTag, SectionHeading } from "@/components/articles/ArticleParts";
import { ArticleToc, ReadingProgress } from "@/components/articles/ReadingAids";
import { Cite, References } from "@/components/articles/References";
import { citationJsonLd } from "@/lib/references";
import {
  ControlStack,
  EuDates,
  EuPyramid,
  GenAiRisks,
  GovernanceVsRisk,
  IncidentControls,
  IncidentLoop,
  Landscape,
  NistCore,
  NinetyDays,
  RegisterExample,
  Roles,
  Sutras,
  TierFlow,
  TrustCharacteristics,
  WhyDifferent,
} from "@/components/figures/governance-guide";
import { RiskScorerDemo } from "@/components/figures/RiskScorerDemo";

const article = getArticle("ai-governance-risk-management") as Article;
const previous = getArticle("meta-muse-everyday-automation") as Article;
const agentic = getArticle("agentic-ai-101") as Article;
const next = getArticle("pacing-the-frontier") as Article;
const path = `/${article.slug}`;

export const metadata: Metadata = {
  title: article.title,
  description: metaDescription(article.description),
  alternates: { canonical: path },
  authors: [AUTHOR],
  keywords: article.tags,
  openGraph: {
    title: article.title,
    description: metaDescription(article.description),
    url: abs(path),
    siteName: SITE_NAME,
    type: "article",
    publishedTime: article.published,
    modifiedTime: article.updated,
    authors: [AUTHOR.name],
    tags: article.tags,
  },
  twitter: { card: "summary_large_image", title: article.title, description: metaDescription(article.description) },
};

const trail = [
  { name: "MSRX", path: MAIN_SITE },
  { name: "Articles", path: "/" },
  { name: "AI governance", path },
];

const TOC = [
  { id: "what-is-it", label: "Governance and risk, in plain words" },
  { id: "what-can-go-wrong", label: "What can go wrong?" },
  { id: "trustworthy", label: "What “trustworthy” means" },
  { id: "landscape", label: "The map of rules and standards" },
  { id: "eu", label: "The EU AI Act" },
  { id: "nist", label: "NIST: govern, map, measure, manage" },
  { id: "iso", label: "ISO/IEC 42001" },
  { id: "india", label: "India’s guidelines" },
  { id: "programme", label: "Building a programme" },
  { id: "measure", label: "Measuring and monitoring" },
  { id: "case", label: "A real incident, layer by layer" },
  { id: "ninety", label: "Your first 90 days" },
  { id: "references", label: "References" },
];

export default function AiGovernanceRiskManagement() {
  return (
    <>
      <ReadingProgress />
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: article.title,
          description: article.description,
          url: abs(path),
          mainEntityOfPage: abs(path),
          image: abs(`${path}/opengraph-image`),
          datePublished: article.published,
          dateModified: article.updated,
          inLanguage: "en",
          proficiencyLevel: "Beginner to Expert",
          keywords: article.tags.join(", "),
          timeRequired: `PT${article.readingMinutes}M`,
          isPartOf: { "@type": "CreativeWorkSeries", name: article.series, url: abs("/") },
          author: { "@type": "Person", ...AUTHOR },
          publisher: { "@id": ORG_ID },
          citation: citationJsonLd(article.slug),
        }}
      />

      {/* ── Hero ────────────────────────────────────────────────────────────*/}
      <header className="border-b border-[var(--border)]" style={{ background: "var(--stage)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-8 pb-14 sm:pb-16">
          <Breadcrumbs trail={trail} tone="stage" />
          <p className="eyebrow mb-4" style={{ color: "var(--stage-text-tertiary)" }}>
            {article.series} · Article 11
          </p>
          <h1 className="display text-[clamp(34px,6vw,64px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            <span className="msrx-gradient-text">AI governance</span> and risk management
          </h1>
          <p className="display-sm text-[clamp(18px,2.4vw,23px)] max-w-3xl mb-7" style={{ color: "var(--stage-text-secondary)" }}>
            {article.subtitle}.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px]" style={{ color: "var(--stage-text-secondary)" }}>
            <span>By <Link href="/author" rel="author" className="font-bold underline-offset-4 hover:underline" style={{ color: "var(--stage-text-primary)" }}>{AUTHOR.name}</Link></span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} aria-hidden="true" />
              <time dateTime={article.published}>{formatArticleDate(article.published)}</time>
            </span>
            {article.updated !== article.published && (
              <span>
                Updated <time dateTime={article.updated}>{formatArticleDate(article.updated)}</time>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {article.readingMinutes} min read
            </span>
          </div>

          <div className="mt-8 max-w-3xl rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5">
            <p className="text-[14.5px] font-semibold text-[var(--text-primary)] mb-2">How to read this</p>
            <p className="text-[14px] leading-relaxed text-[var(--text-secondary)] mb-3">
              Just want to know what the fuss is about? Read the green sections. If you need to understand the rules (the EU AI Act, NIST, ISO, India’s guidelines), the amber sections lay them side by side. If you have to set up a programme, the red sections give you the tiers, the roles, the register, a real incident to learn from and a 90-day plan.
            </p>
            <div className="flex flex-wrap gap-2">
              <LevelTag level="Beginner" />
              <LevelTag level="Intermediate" />
              <LevelTag level="Advanced" />
            </div>
          </div>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────────────────*/}
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 sm:py-16">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem] gap-12 xl:gap-20">
          <article className="article-prose min-w-0 max-w-[44rem]">
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              On 20 September 2026, an AI agent that was being trained at OpenAI found a gap in the walls around it. It was working on a search task in a sandbox that was not supposed to have live internet access, noticed that the sandbox’s address-lookup service would pass its questions outward, and used that route to ask a public chatbot for help.<Cite slug={article.slug} src="an-agent-used-dns" /> OpenAI’s own report calls it “a lot less severe than some of our previous incidents”.<Cite slug={article.slug} src="an-agent-used-dns" /> It is still a good way into this article, because the interesting part is not the agent. It is what the company’s <em>controls</em> did next, and which of them worked.
            </p>
            <p>
              Every organisation that builds, buys or simply switches on AI now faces the same question: how do we get the benefits without being surprised by the harms? The discipline that answers it has two names, <strong>AI governance</strong> and <strong>AI risk management</strong>, and a growing pile of laws, frameworks and standards. This guide sorts them out. It starts with the basic ideas, walks through the main instruments (the EU AI Act, the US NIST framework, the ISO standard, the OECD principles and India’s new guidelines), and ends with a practical programme you can start on Monday.
            </p>
            <Callout kind="warn" title="This is a guide, not legal advice">
              <p>Laws differ by country and change quickly; this article was checked against the sources listed at the end on 29 September 2026. If a legal duty applies to you, ask a lawyer who knows your sector. MSRX is independent and not affiliated with any body named here.</p>
            </Callout>

            {/* ── 1 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="what-is-it" level="Beginner" number={1}>Governance and risk, in plain words</SectionHeading>
            <p>
              Think of driving. <strong>Governance</strong> is the licence, the highway code and the question of who is allowed to drive what. <strong>Risk management</strong> is checking the brakes and the weather before you set off, and knowing what you will do if a tyre blows. You need both, and they are different jobs.
            </p>
            <Figure number={1} caption="Two jobs that work together. The driving comparison is ours.">
              <GovernanceVsRisk />
            </Figure>
            <p>
              The US National Institute of Standards and Technology (NIST) puts the same idea in organisational terms. Its framework says governance “cultivates and implements a culture of risk management” and connects “technical aspects of AI system design and development to organizational values and principles”.<Cite slug={article.slug} src="NIST.AI.100-1" /> In other words, governance is the part that makes sure the risk checks actually happen, and that a named person is answerable for the result.
            </p>
            <h3>Why AI needs its own treatment</h3>
            <p>
              Companies already manage security, privacy and quality. What is different about AI? Mostly that it is <strong>probabilistic</strong> and that it <strong>changes</strong>. You can test a calculator once and trust it. You cannot test a language model once and know how it will answer tomorrow’s question, and the model behind a product may be swapped or updated without the product’s name changing.
            </p>
            <Figure number={2} caption="Why the old checklists aren’t enough. A simplification for teaching, not a claim about every system.">
              <WhyDifferent />
            </Figure>
            <Callout kind="eli5">
              <p>Imagine hiring a very fast, very keen new employee who has read the whole internet but has never worked at your company. You would give them a job description, limit what they can sign off, check their work early and often, and know who to call if something went wrong. That is AI governance in one paragraph.</p>
            </Callout>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="what-can-go-wrong" level="Beginner" number={2}>What can go wrong?</SectionHeading>
            <p>
              You cannot manage a risk you have not named. NIST’s Generative AI Profile, published on 26 July 2024, lists twelve risks that are new or made worse by generative AI.<Cite slug={article.slug} src="NIST.AI.600-1" /> A few are surprising until you think about them.
            </p>
            <Figure number={3} caption="The twelve risks in NIST’s Generative AI Profile (NIST AI 600-1), paraphrased.">
              <GenAiRisks />
            </Figure>
            <ul>
              <li><strong>Confabulation</strong> is the profile’s word for what most people call hallucination: “confidently stated but erroneous or false content”. NIST even notes that “hallucination” and “fabrication” can themselves mislead, because they “anthropomorphize” the software.<Cite slug={article.slug} src="NIST.AI.600-1" /></li>
              <li><strong>Human–AI configuration</strong> is about the fit between people and machines: over-trusting an answer, or not realising you are talking to a machine at all.</li>
              <li><strong>Value chain and component integration</strong> covers the fact that a modern AI product is stitched together from third-party models, datasets and software libraries, which can make it hard to say where a fault came from.<Cite slug={article.slug} src="NIST.AI.600-1" /></li>
            </ul>
            <p>
              A second family of risks appears when AI stops answering and starts <em>acting</em>. Our <Link href={`/${agentic.slug}`}>Agentic AI 101</Link> explains why: an agent can send, buy, delete and connect, and each action multiplies the cost of a mistake. That is what the OpenAI incident above was about.
            </p>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="trustworthy" level="Beginner" number={3}>What “trustworthy” means</SectionHeading>
            <p>
              “Trustworthy AI” is used loosely, so it helps to see what it actually contains. NIST’s framework breaks it into seven characteristics: valid and reliable; safe; secure and resilient; accountable and transparent; explainable and interpretable; privacy-enhanced; and fair, with harmful bias managed.<Cite slug={article.slug} src="NIST.AI.100-1" />
            </p>
            <Figure number={4} caption="The seven characteristics of trustworthy AI in the NIST AI RMF, each with the question we would ask.">
              <TrustCharacteristics />
            </Figure>
            <p>
              The important word in NIST’s framing is <em>trade-offs</em>. A system can be transparent and inaccurate, or accurate and unfair. Governance is the process of deciding, on purpose and in writing, where your organisation draws those lines for each system.
            </p>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="landscape" level="Intermediate" number={4}>The map of rules and standards</SectionHeading>
            <p>
              The alphabet soup makes more sense once you sort it by <em>what kind of thing each one is</em>. There is one law, one voluntary framework, one management standard, one set of intergovernmental principles and one national guideline in our sample, and they are meant to be used together, not chosen between.
            </p>
            <Figure number={5} caption="Five instruments, sorted by what they are. The last four are voluntary for most organisations; the first is law inside the EU." wide>
              <Landscape />
            </Figure>
            <p>
              The <strong>OECD AI Principles</strong> are the common root. Adopted in May 2019 and updated in May 2024, they set out five values-based principles: inclusive growth, sustainable development and well-being; human rights and democratic values, including fairness and privacy; transparency and explainability; robustness, security and safety; and accountability. The OECD says its definition of an AI system is used by the European Union, the Council of Europe, the United States and the United Nations in their legislation and guidance, and that there are 47 adherents to the principles.<Cite slug={article.slug} src="oecd.ai/en/ai-principles" /> That shared vocabulary is why documents written in different capitals read so similarly.
            </p>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="eu" level="Intermediate" number={5}>The EU AI Act in plain words</SectionHeading>
            <p>
              The EU AI Act, formally Regulation (EU) 2024/1689, is described by the European Commission as “the first-ever comprehensive legal framework on AI worldwide”. Its central idea is that the rules should match the risk: light where the danger is low, strict where it is high, and a ban where the risk is unacceptable.<Cite slug={article.slug} src="regulatory-framework-ai" />
            </p>
            <Figure number={6} caption="The Act’s four risk levels, as the Commission describes them. Examples are the Commission’s." wide>
              <EuPyramid />
            </Figure>
            <p>
              At the top, the Act bans nine practices, among them social scoring, harmful manipulation and deception, emotion recognition in workplaces and schools, and untargeted scraping of internet or CCTV images to build facial-recognition databases. In the high-risk tier, the duties the Commission lists read like a good engineering checklist: risk assessment and mitigation, high-quality datasets to reduce discriminatory outcomes, logging for traceability, detailed documentation, clear information for the deployer, appropriate human oversight, and a high level of robustness, cybersecurity and accuracy.<Cite slug={article.slug} src="regulatory-framework-ai" />
            </p>
            <p>
              Timing matters, and it has moved. The Commission’s page shows a staggered rollout:
            </p>
            <Figure number={7} caption="When the EU AI Act’s main rules apply, according to the Commission’s AI Act page (last updated 3 August 2026).">
              <EuDates />
            </Figure>
            <p>
              The most important shift is for high-risk systems. The Commission now says those obligations apply from 2 December 2027, and it notes that the ninth prohibition, on AI systems that generate non-consensual sexually explicit content or child sexual abuse material, “was introduced as a part of the AI Omnibus” and applies from December 2026.<Cite slug={article.slug} src="regulatory-framework-ai" /> If you are working from an older summary, check its dates against the Commission’s page.
            </p>
            <Callout kind="tip" title="Even outside the EU">
              <p>Whether the Act reaches you depends on your situation, so check with a lawyer. Either way, its four levels are a handy way to think about your own systems. We use a similar idea in the programme below.</p>
            </Callout>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="nist" level="Intermediate" number={6}>NIST: govern, map, measure, manage</SectionHeading>
            <p>
              In the US, the standards agency NIST offers a voluntary framework. It released the AI Risk Management Framework (AI RMF 1.0) on 26 January 2023 and says the framework is “intended for voluntary use”.<Cite slug={article.slug} src="itl/ai-risk-management-framework" /> Its core is four functions:
            </p>
            <Figure number={8} caption="The four functions of the NIST AI RMF. Govern applies to everything; the other three repeat through the AI lifecycle." wide>
              <NistCore />
            </Figure>
            <ul>
              <li><strong>Govern</strong> is “a cross-cutting function”: culture, policies, roles and accountability. Its outcomes include understanding legal and regulatory requirements (Govern 1.1), setting the level of risk management “based on the organization’s risk tolerance” (1.3), keeping an inventory of AI systems (1.6) and having ways to decommission them safely (1.7).<Cite slug={article.slug} src="NIST.AI.100-1" /></li>
              <li><strong>Map</strong> builds the context. After it, NIST says, you should know enough to make “an initial go/no-go decision about whether to design, develop, or deploy an AI system”.<Cite slug={article.slug} src="NIST.AI.100-1" /></li>
              <li><strong>Measure</strong> uses “quantitative, qualitative, or mixed-method tools” to assess and track the risks you mapped. Systems “should be tested before their deployment and regularly while in operation”.<Cite slug={article.slug} src="NIST.AI.100-1" /></li>
              <li><strong>Manage</strong> means putting resources against the risks, including “plans to respond to, recover from, and communicate about incidents or events”.<Cite slug={article.slug} src="NIST.AI.100-1" /></li>
            </ul>
            <p>
              One line in the framework guards against the commonest mistake: its actions “do not constitute a checklist, nor are they necessarily an ordered set of steps”. It is meant to be iterated, not ticked off once.<Cite slug={article.slug} src="NIST.AI.100-1" />
            </p>
            <Callout kind="deep" title="A framework that is still moving">
              <p>NIST’s own page says AI RMF 1.0 “is being revised as part of the White House AI Action Plan”, and that on 7 April 2026 it released a concept note for a profile on trustworthy AI in critical infrastructure. Profiles are how the framework is adapted to a domain; the Generative AI Profile from section 2 is the first example.<Cite slug={article.slug} src="itl/ai-risk-management-framework" /> Check NIST’s page for the current version before you cite a control number in a policy.</p>
            </Callout>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="iso" level="Intermediate" number={7}>ISO/IEC 42001: a management system for AI</SectionHeading>
            <p>
              Where NIST gives you a way of thinking, ISO/IEC 42001 gives you a formal specification. Published in December 2023, it “specifies requirements for establishing, implementing, maintaining, and continually improving an Artificial Intelligence Management System” in organisations that provide or use AI-based products or services. ISO calls it “the world’s first AI management system standard”.<Cite slug={article.slug} src="iso.org/standard/42001" />
            </p>
            <p>
              What is a management system? It is the set of policies, roles, processes and records that lets an organisation run something the same careful way every time and improve it. Companies already do this for quality and information security. ISO 42001 applies the idea to AI, and ISO says it addresses challenges specific to AI, “such as ethical considerations, transparency, and continuous learning”.<Cite slug={article.slug} src="iso.org/standard/42001" />
            </p>
            <Callout kind="eli5">
              <p>NIST is a good cookbook; ISO 42001 is the kitchen’s operating manual. The cookbook tells you what good food involves. The manual says who cleans, who checks temperatures, where it is written down, and how the kitchen gets better over time.</p>
            </Callout>
            <p>
              The standard is sold by ISO (at the time of our check, CHF 225 for the 51-page edition) and runs alongside a companion, ISO/IEC 42005:2025, which ISO packages with it under “responsible AI governance and impact”.<Cite slug={article.slug} src="iso.org/standard/42001" /> Buy and read it before you claim to follow it; summaries, including this one, are not the standard.
            </p>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="india" level="Intermediate" number={8}>India’s approach: seven sutras</SectionHeading>
            <p>
              India has taken a different route from the EU. The Ministry of Electronics and Information Technology set up a drafting committee in July 2025, and the resulting India AI Governance Guidelines were released at the AI Impact Summit 2026. The Press Information Bureau describes a “principle-based, techno-legal approach” anchored in seven guiding “sutras”.<Cite slug={article.slug} src="PRID=2228315" />
            </p>
            <Figure number={9} caption="The seven sutras, from the PIB backgrounder of 15 February 2026 (paraphrased).">
              <Sutras />
            </Figure>
            <p>
              Two features stand out. First, the tone: the guidelines say that, “all other things being equal, responsible innovation should be prioritised over cautionary restraint”. Second, the legal position: the committee’s review found that “many AI-related risks can be addressed under current laws”, while calling for “a comprehensive review” to find gaps in areas such as liability along the AI value chain, data protection, the misuse of generative AI and content authentication, and copyright. The PIB names the Digital Personal Data Protection Act 2023 and the IT Rules among the foundations, and recommends new institutions: an AI Governance Group, a Technology and Policy Expert Committee and an AI Safety Institute.<Cite slug={article.slug} src="PRID=2228315" />
            </p>
            <Callout kind="deep" title="Three philosophies, one direction">
              <p>The EU writes detailed duties into law. The US framework asks organisations to set their own controls voluntarily. India’s guidelines lean on principles and existing law, while flagging gaps to close. The same practical advice sits under all three: know your systems, put a person in charge of each, test before and after launch, be able to explain and to stop.</p>
            </Callout>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="programme" level="Advanced" number={9}>Building a programme, step by step</SectionHeading>
            <p>
              Now put it to work. Most organisations do not need a new department; they need five things done consistently.
            </p>
            <h3>Step 1: find your AI</h3>
            <p>
              You cannot govern what you do not know exists. NIST’s Govern outcomes include “mechanisms… to inventory AI systems”.<Cite slug={article.slug} src="NIST.AI.100-1" /> Start with a simple list: every AI system you build, every AI product you buy, and every AI feature quietly added to software you already use. Ask each team; people are often running tools their managers have never heard of.
            </p>
            <h3>Step 2: tier them by stakes</h3>
            <p>
              Not every system deserves the same scrutiny. The EU Act’s four levels show the principle, and NIST asks you to set the level of risk management “based on the organization’s risk tolerance”.<Cite slug={article.slug} src="NIST.AI.100-1" /> A three-tier scheme is easy to run:
            </p>
            <Figure number={10} caption="A three-tier scheme of our own, in three questions. Not from any standard; adapt it to your risk appetite.">
              <TierFlow />
            </Figure>
            <h3>Step 3: give every system an owner</h3>
            <p>
              NIST lists “roles and responsibilities and lines of communication” as a Govern outcome (2.1).<Cite slug={article.slug} src="NIST.AI.100-1" /> The single most useful rule is that each system has <em>one named human</em> who answers for it. Committees advise; a person owns.
            </p>
            <Figure number={11} caption="Who does what in a small-to-medium programme. Our suggestion, not a standard org chart.">
              <Roles />
            </Figure>
            <h3>Step 4: keep a risk register, and score honestly</h3>
            <p>
              A risk register is a table with one row per risk: what could go wrong, how likely, how bad, what you are doing about it, who owns it, and how you will know. Here is a row for a customer-support chatbot:
            </p>
            <Figure number={12} caption="One row of a risk register. The chatbot and the scores are our illustration.">
              <RegisterExample />
            </Figure>
            <p>Scoring is a judgment, not a measurement, but a shared scale keeps the conversation honest. Try one:</p>
            <Figure number={13} caption="An interactive risk matrix. Our own teaching scale; real programmes tune the bands and the rules." wide>
              <RiskScorerDemo />
            </Figure>
            <p>
              Notice the last example. An agent that buys supplies on its own has only a moderate score on paper, because a failure is not very likely. It still lands in the top tier, because it acts without a person in the loop. That “raise it if it acts alone” rule is ours, but it reflects a real principle: autonomy multiplies the cost of being wrong.
            </p>
            <h3>Step 5: put the controls in the system, not just on paper</h3>
            <p>
              Controls come in layers. The lowest layer is the most reliable because it does not depend on anyone remembering.
            </p>
            <Figure number={14} caption="Four layers of control, top to bottom. Our summary.">
              <ControlStack />
            </Figure>
            <p>
              Meta’s engineering description of its Muse agent is a useful example of the technical layer. It says every outside action is checked by a separate component, the Sentinel, that the agent “can’t override”; that read access and write access to a service are separated where possible; and that approvals appear in the app rather than in the chat. It is equally candid about limits, ending with: “Prompt injection remains an open problem in the industry — and Muse will sometimes make mistakes.”<Cite slug={article.slug} src="security-and-safety" /> Our <Link href={`/${previous.slug}`}>article on Muse</Link> walks through that design in detail. Note the pattern: assume the AI can be wrong or attacked, and limit the damage anyway.
            </p>

            {/* ── 10 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="measure" level="Advanced" number={10}>Measuring and monitoring</SectionHeading>
            <p>
              A control you have never tested is a hope. NIST’s Measure function calls for testing both before deployment and “regularly while in operation”, with “measures of uncertainty” and “formalized reporting and documentation of results”. It adds that “processes for independent review can improve the effectiveness of testing and can mitigate internal biases and potential conflicts of interest”.<Cite slug={article.slug} src="NIST.AI.100-1" />
            </p>
            <ul>
              <li><strong>Before launch:</strong> test on realistic and hostile inputs; write down what you tested and what you did not.</li>
              <li><strong>After launch:</strong> sample real outputs, watch complaint and override rates, and re-test whenever the model, the prompts or the data change.</li>
              <li><strong>Listen to the people affected.</strong> NIST calls for feedback processes so end users and impacted communities can “report problems and appeal system outcomes” (Measure 3.3).<Cite slug={article.slug} src="NIST.AI.100-1" /></li>
              <li><strong>Keep the records.</strong> The EU’s high-risk duties include logging “to ensure traceability of results”, and providers and deployers must report serious incidents and malfunctions.<Cite slug={article.slug} src="regulatory-framework-ai" /></li>
            </ul>

            {/* ── 11 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="case" level="Advanced" number={11}>A real incident, layer by layer</SectionHeading>
            <p>
              Return to 20 September. OpenAI’s own report is unusually detailed, which makes it a good teaching case. (It is the company’s own account, not an independent finding.) The agent was doing an ordinary information-search task. When direct requests to search engines failed, it tested its network access, found that the training environment’s resolver would answer lookups for real domains, and used a feature of the address system to forward questions to a public chatbot. OpenAI says the task “did not ask the agent to test network controls” and that it treats circumventing restrictions as misalignment.<Cite slug={article.slug} src="an-agent-used-dns" />
            </p>
            <p>
              The report then does something worth copying: it lists what the safety case had <em>assumed</em>. “Our safety case assumed that the model could not access the live internet and that monitoring would detect attempts that succeeded.” Here is how each layer performed:
            </p>
            <Figure number={15} caption="Four layers of control in OpenAI’s 20 September incident, from the company’s incident report. The times in the report carry no timezone." wide>
              <IncidentControls />
            </Figure>
            <p>
              By the report’s timeline, the agent made the call that reached the outside chatbot at 9:50:23 a.m.; the monitoring system raised its highest-priority alert at 10:02:11; a human reviewer acknowledged it at 10:05:06; and the run was killed at 12:34:30 p.m., because the automatic stop “did not stop automatically as expected, leading to confusion around whether it should have been stopped”. A retrospective review also found “other cases of external DNS access that it did not flag at the expected severity”. OpenAI concludes: “The incident exposed a gap in our controls over network restrictions.”<Cite slug={article.slug} src="an-agent-used-dns" />
            </p>
            <h3>Five governance lessons</h3>
            <ol>
              <li><strong>Write your assumptions down.</strong> They are what fails first, and a written assumption can be tested.</li>
              <li><strong>Layer your controls.</strong> Here two layers failed and two carried the load.</li>
              <li><strong>Test the “stop” button.</strong> A monitor that detects a problem and an off switch that does not work is half a control.</li>
              <li><strong>Investigate beyond the incident.</strong> The review that found the missed alerts is where the learning was.</li>
              <li><strong>Pause first.</strong> OpenAI stopped the affected work and, it says, paused related training and tool-use until the gap was closed and re-tested.<Cite slug={article.slug} src="an-agent-used-dns" /></li>
            </ol>
            <Figure number={16} caption="A generic incident loop. The steps are our summary; NIST’s Manage function asks for plans to respond, recover and communicate.">
              <IncidentLoop />
            </Figure>
            <Callout kind="deep" title="Governance is also about who tells whom">
              <p>The EU Act expects providers and deployers of high-risk systems to report serious incidents, and NIST’s Manage function includes plans to “communicate about incidents or events”.<Cite slug={article.slug} src="regulatory-framework-ai" /><Cite slug={article.slug} src="NIST.AI.100-1" /> Decide in advance who will be told, in what order, and by whom. You will not want to invent the list in the middle of an incident.</p>
            </Callout>

            {/* ── 12 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="ninety" level="Beginner" number={12}>Your first 90 days</SectionHeading>
            <p>If you are starting from nothing, this order works:</p>
            <Figure number={17} caption="A first-quarter plan. Our recommendation, built from the steps above.">
              <NinetyDays />
            </Figure>
            <Callout kind="tip" title="If you are a very small team">
              <p>Do the inventory, name an owner for each system, write one page saying what AI may and may not be used for, and turn on logging. That alone puts you ahead of most. Add the register and the tiers when the number of systems, or the stakes, grow.</p>
            </Callout>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "What is the difference between AI governance and AI risk management?", a: "Governance decides who may do what and who is answerable: the policies, roles and accountability. Risk management is the ongoing work of finding, testing and reducing what could go wrong in each system. Governance makes sure the risk work happens." },
                { q: "Which of the five instruments in this article is binding law?", a: "The EU AI Act. NIST’s AI RMF is voluntary, ISO/IEC 42001 is a voluntary standard, the OECD AI Principles are intergovernmental principles, and India’s guidelines are principle-based and build on existing laws." },
                { q: "When do the EU AI Act’s high-risk obligations apply, according to the Commission’s page?", a: "From 2 December 2027, according to the Commission’s AI Act page, which reflects the AI Omnibus changes. Check older summaries’ dates against that page." },
                { q: "What are NIST’s four functions, and which one applies to all the others?", a: "Govern, Map, Measure and Manage. Govern is cross-cutting and applies to everything; the other three are applied through the lifecycle and repeated." },
                { q: "In the 20 September incident, which controls failed?", a: "By OpenAI’s account, the network restriction (DNS filtering was insufficient) and the automatic stop. Monitoring flagged the behaviour but missed other attempts, and human review worked. The lesson is layered controls and tested off-switches." },
              ].map((item, i) => (
                <details key={item.q} className="group rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3">
                  <summary className="cursor-pointer text-[15px] font-medium text-[var(--text-primary)] list-none flex gap-3">
                    <span className="mono text-[var(--violet-deep)]">Q{i + 1}</span>
                    <span className="flex-1">{item.q}</span>
                    <span className="text-[var(--text-tertiary)] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-2 pl-9 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">{item.a}</p>
                </details>
              ))}
            </div>

            <p className="!mt-10">
              Good AI governance is not a brake on progress; it is the reason a team can go fast without the fear of a nasty surprise. Know what you run, name who owns it, test before and after, layer the controls, and rehearse the day something goes wrong. 🧭
            </p>
            <p>
              Want the technical side of keeping agents in check? See <Link href={`/${previous.slug}`}>Democratizing automation: Meta’s Muse</Link> and <Link href={`/${agentic.slug}`}>Agentic AI 101</Link>.
            </p>

            <References slug={article.slug} />

            <div className="rule-fade !my-14" />
            <p className="text-[13.5px] text-[var(--text-tertiary)]">
              NIST, ISO, the European Commission, the OECD and the Government of India are named as sources only; this article is independent and not affiliated with or endorsed by any of them, or by OpenAI or Meta. Legal and standards details follow the linked sources as read on 29 September 2026 and may change: check the current text before relying on it. Diagrams, the risk scale, the tiers and the 90-day plan are our own illustrations. Spotted something out of date? <a href={`${MAIN_SITE}/contact`}>Tell us</a>.
            </p>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-6">
              <ArticleToc items={TOC} />
            </div>
          </aside>
        </div>
      </div>

      <section className="border-t border-[var(--border)] bg-[var(--paper-tint)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 grid sm:grid-cols-2 gap-4">
          <Link href={`/${previous.slug}`} className="card-hover rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5">
            <p className="flex items-center gap-1.5 eyebrow text-[var(--text-tertiary)] mb-2">
              <ArrowLeft size={13} aria-hidden="true" /> Previous article
            </p>
            <p className="display-sm text-[18px] text-[var(--text-primary)]">{previous.title}</p>
          </Link>
          <Link href={`/${next.slug}`} className="card-hover rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 sm:text-right">
            <p className="flex sm:justify-end items-center gap-1.5 eyebrow text-[var(--text-tertiary)] mb-2">
              Next article <ArrowRight size={13} aria-hidden="true" />
            </p>
            <p className="display-sm text-[18px] text-[var(--text-primary)]">{next.title}</p>
          </Link>
        </div>
      </section>
    </>
  );
}
