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
  AgentLoop,
  AmplifyOrReplace,
  AssistantVsAgent,
  CopilotBars,
  DelegationCard,
  FourModes,
  FrontierHabits,
  GartnerStairs,
  HelperTimeline,
  ImaginedDay,
  ManagerAgent,
  MorningWithAgent,
  NovoBeforeAfter,
  OnTheJob,
  PermissionLadder,
  Pic,
  PicRow,
  PlugFigure,
  RecipeCards,
  ThirtyDays,
  ThreeEras,
  ThreeHorizons,
} from "@/components/figures/side-by-side-guide";
import { DelegationSorter } from "@/components/figures/DelegationSorter";

const article = getArticle("ai-agents-side-by-side") as Article;
const previous = getArticle("pacing-the-frontier") as Article;
const agentic = getArticle("agentic-ai-101") as Article;
const muse = getArticle("meta-muse-everyday-automation") as Article;
const governance = getArticle("ai-governance-risk-management") as Article;
const path = `/${article.slug}`;
const S = article.slug;
const NEWS = "https://news.msrx.co.in";

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
  { name: "Side by side", path },
];

const TOC = [
  { id: "monday", label: "Asha’s Monday" },
  { id: "dream", label: "A pigeon, a steam ball, a peacock" },
  { id: "boy", label: "The boy who wrote, the countess who doubted" },
  { id: "shakey", label: "Shakey, the shaky genius" },
  { id: "acting", label: "From answering to acting" },
  { id: "plumbing", label: "The plumbing of teamwork" },
  { id: "jobs", label: "Who is on the job today" },
  { id: "humans", label: "How people really work with agents" },
  { id: "tomorrow", label: "Tomorrow: you at the head of the team" },
  { id: "recipes", label: "Ten easy ways to start this week" },
  { id: "shadows", label: "The shadows worth respecting" },
  { id: "amplify", label: "Amplify, don’t just replace" },
  { id: "plan", label: "Your first thirty days" },
  { id: "references", label: "References" },
];

export default function AiAgentsSideBySide() {
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
          about: [
            { "@type": "Thing", name: "AI agents" },
            { "@type": "Thing", name: "Model Context Protocol" },
            { "@type": "Thing", name: "Future of work" },
          ],
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
            {article.series} · Article 13
          </p>
          <h1 className="display text-[clamp(34px,6vw,64px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            <span className="msrx-gradient-text">Side by side</span>: the long road to AI coworkers
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
              It is a story with a beginning in ancient Greece and an ending in an imagined future, so you can read it in one go, or dip into any section. Green sections tell the story and need no background. Amber sections explain how today’s agents work and what they achieve. Red sections look at the risks, and the best way to manage them. Real people, companies and numbers are sourced. Anything imagined or illustrative is labelled as ours, and so is every opinion.
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
            {/* ── 1 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="monday" level="Beginner" number={1}>Asha’s Monday</SectionHeading>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              Meet Asha. She is not real, but her Monday could be yours.
            </p>
            <p>
              Asha manages projects for a mid-sized company in Pune. She wakes at ten past seven and reads one message on her phone. Overnight, her AI agent has gone through sixty-three emails, sorted them into three piles, drafted four replies and noticed that two of her meetings overlap. It has not sent anything. It has left the drafts in a folder and written, at the top: <em>“Three things need you. The rest can wait.”</em>
            </p>
            <p>
              She approves two drafts, changes a sentence in a third, and tells the agent to rebook the clashing meeting. Then she does what she hired the agent to make room for: she sits down for two hours and writes the one report that only she can write. At lunchtime she walks away from the screen, and her agent compares three insurance renewals in plain language. It changes nothing. At a quarter to five she reads a one-page summary, asks two questions, and decides.
            </p>
            <Figure number={1} caption="An imagined Monday for a person who works with an agent. The agent prepares and proposes; the person decides.">
              <MorningWithAgent />
            </Figure>
            <p>
              Nothing in Asha’s Monday needs science fiction. Every step is something that agents are already reported to do, as this article will show. What is new is not any single trick. It is that a machine can now be handed a <em>goal</em>, not just a question, can use the same tools we use, and can come back with finished work for a person to approve.
            </p>
            <p>
              That idea is much older than the technology. People have dreamed of helpers made of metal and water for well over two thousand years. In this article we follow the dream from a wooden pigeon in ancient Greece to the offices of 2026, look at what agents actually achieve, and end where most people want to start: how you can put one to work this week, and how to keep your hand on the wheel while it does.
            </p>
            <p>
              A word on tone before we start. This is meant to be an optimistic story, because the evidence for optimism is real, and because a busy person with a full inbox deserves some good news. But it is not a sales pitch. Where sources disagree, where the evidence is thin, or where a company is describing its own product, we say so. And in the later sections we spend real time on what can go wrong, because the people who get the most out of agents are, as we will see, the ones who check the work.
            </p>
            <Callout kind="eli5">
              <p>Think of a very quick, very tireless new intern. Give the intern one clear job and a few rules, and you get a good draft by the afternoon. Give the intern the keys to the safe on day one and you have a problem. Almost everything in this article is a version of that sentence.</p>
            </Callout>
            <Figure number={2} caption="The road we will walk, from ancient automata to the standards of 2024–25 and the research of 2026. Each date is sourced in the section where it appears; the four colours mark the four chapters of the story.">
              <HelperTimeline />
            </Figure>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="dream" level="Beginner" number={2}>A pigeon, a steam ball and a peacock</SectionHeading>
            <p>
              The oldest record of a machine that seemed to act on its own is a bird. Encyclopaedia Britannica points to a wooden model of a pigeon built by Archytas of Tarentum, a Greek friend of Plato who lived around 400–350 BCE. The bird hung from the end of a pivoted bar, and the whole apparatus turned by means of a jet of steam or compressed air.<Cite slug={S} src="britannica.com" />
            </p>
            <p>
              We know more about the next inventor because he wrote it down. Heron of Alexandria, who worked in the first century CE, described devices driven by water, falling weights and steam.<Cite slug={S} src="britannica.com" /> Across the world, in China, accounts of automata reach back to the third century BCE, when a mechanical orchestra was made for the Han emperor. By the Tang period there were records of flying birds, an otter that caught fish, a begging monk and singing girls.<Cite slug={S} src="britannica.com" />
            </p>
            <Figure number={3} caption="Left: a modern reconstruction of a steam-powered device of the kind Heron wrote about (Hero’s aeolipile, 1st century CE, at the Thessaloniki Technology Museum). Photo: Gts-tg, CC BY-SA 4.0, via Wikimedia Commons. Right: a 14th-century drawing of a peacock fountain automaton, artist unknown, public domain, via Wikimedia Commons. Al-Jazarī is the best-documented maker of water-driven peacocks; this drawing is from a later century and we do not claim it is his.">
              <PicRow
                items={[
                  { file: "aeolipile.jpg", alt: "A copper sphere with two bent nozzles mounted above a round copper boiler on legs, in a museum display case.", width: 960, height: 1362, label: "A reconstruction of a steam device" },
                  { file: "peacock-fountain.jpg", alt: "A painted medieval drawing of a peacock standing on a gold box above a basin, with a small figure holding a cup and a stream of water falling from its beak.", width: 646, height: 850, label: "A peacock fountain automaton, 14th century" },
                ]}
              />
            </Figure>
            <p>
              In the Islamic world, inventors were active from about the ninth century. The best documented is al-Jazarī, who worked in the thirteenth century for princes of the Artuqid dynasty in Mesopotamia and built water-operated automata, many of them moving peacocks.<Cite slug={S} src="britannica.com" /> In Europe, Britannica records that the Gothic architect Villard de Honnecourt sketched mechanical objects in a sketchbook of 1235, and that Renaissance gardens such as the Villa d’Este near Rome were filled with fountains that played music by water power.<Cite slug={S} src="britannica.com" />
            </p>
            <p>
              Medieval Europe added legends: Britannica notes that Roger Bacon is credited with constructing a talking head, and Albertus Magnus an iron man.<Cite slug={S} src="britannica.com" /> From the mid-fifteenth century, coiled steel springs gave machines what Britannica calls “a truly portable source of motion”, and that moved the automaton from the garden onto the dining table, in the form of ornamental sailing ships known as nefs.<Cite slug={S} src="britannica.com" />
            </p>
            <p>
              By the late eighteenth and early nineteenth centuries the miniatures were exquisite. The Rochat brothers made mechanical songbirds that darted out from beneath the lids of snuffboxes. And then there was the magician box, which deserves a place in any history of AI. In Britannica’s words: “A disk engraved with a question is inserted in a slot in the box, upon which the tiny figure of a magician comes to life and points with his wand at a space where the answer appears.”<Cite slug={S} src="britannica.com" /> Ask a question, get an answer: a chatbot with a wand. Of course, it could only answer the questions its disks had been engraved with. Nothing was understood. Everything had been arranged in advance.
            </p>
            <p>
              Look closely at what these machines were <em>for</em>. Britannica is blunt about it: through the ages, “most automatons have been objects of fancy that are purely decorative in concept and function.”<Cite slug={S} src="britannica.com" /> They amazed guests. They did not do anybody’s work. They were performers, wound up and set going, doing one act, the same way every time.
            </p>
            <p>
              And yet the ancient makers had grasped something important. Power did not have to come from a person. Water, falling weights, steam and, later, springs could all do the moving. What they could not supply was judgement: the ability to choose what to do next. The missing ingredient was never muscle. It was the machine’s ability to decide, and to be told what to decide.
            </p>
            <Callout kind="eli5">
              <p>An automaton is like a music box. Wind it up and it plays its one tune beautifully. But you cannot say “play something for my daughter’s birthday”, and it cannot notice that the room has gone quiet. The dream of a helper is the dream of a music box that listens.</p>
            </Callout>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="boy" level="Beginner" number={3}>The boy who wrote, and the countess who doubted</SectionHeading>
            <p>
              By the late eighteenth century the tricks had become astonishing. Britannica shows an android of a child writing, made by Pierre Jaquet-Droz around 1772, now in the Musée d’Art et d’Histoire in Neuchâtel, Switzerland.<Cite slug={S} src="britannica.com" /> A boy sits at a desk with a quill pen, and, when set going, writes.
            </p>
            <Figure number={4} caption="Left: the Jaquet-Droz writing automaton, photographed in 2023. Photo: Gre regiment, CC BY-SA 4.0, via Wikimedia Commons. Right: a real screenshot of Britannica’s article on automata, captured on 30 September 2026, opening with Britannica’s photograph of the Jaquet-Droz child android. The page and its text belong to Britannica; shown here to document the source.">
              <PicRow
                items={[
                  { file: "jaquet-droz-writer.jpg", alt: "A child-sized automaton in a red velvet coat and lace collar, seated at a small desk and holding a quill, on a wooden stand against a black background.", width: 960, height: 1280, label: "The writing automaton, c. 1772" },
                  { file: "shot-britannica.jpg", alt: "Screenshot of the top of Britannica’s page on automata, showing a black and white photo of a child android writing, with the caption naming Pierre Jaquet-Droz.", width: 800, height: 1129, label: "Britannica’s page on automata" },
                ]}
              />
            </Figure>
            <p>
              It is a marvel, and a dead end. The boy can write one thing, the one his cams and gears were cut to write. Ask him for anything else and he sits there. In the nineteenth century a mathematician saw the same limit in a far more ambitious machine. Ada Lovelace, describing Charles Babbage’s design for an Analytical Engine in a memoir of 1842, wrote what became a famous warning: “The Analytical Engine has no pretensions to originate anything. It can do whatever we know how to order it to perform.”<Cite slug={S} src="doi.org" /> We know her words because Alan Turing quoted them.
            </p>
            <Figure number={5} caption="Left: Ada Lovelace, portrait by Margaret Sarah Carpenter, 1836, public domain, via Wikimedia Commons. Right: Alan Turing, photographed by Elliott &amp; Fry on 29 March 1951, public domain, via Wikimedia Commons.">
              <PicRow
                items={[
                  { file: "ada-lovelace.jpg", alt: "A painted portrait of a young woman with dark hair in an off-the-shoulder gown.", width: 860, height: 1146, label: "Ada Lovelace" },
                  { file: "turing-1951.jpg", alt: "A black and white studio portrait of a man in a suit and tie, looking at the camera.", width: 800, height: 1067, label: "Alan Turing" },
                ]}
              />
            </Figure>
            <p>
              Turing did so in 1950, in a paper in the journal <em>Mind</em> that opens with the sentence, “I propose to consider the question, ‘Can machines think?’”<Cite slug={S} src="doi.org" /> Lovelace’s line was one of the objections he set out to answer. And in answering, he sketched, with astonishing accuracy, the way we work with AI agents today.
            </p>
            <p>
              Rather than program an adult mind, he suggested, “why not rather try to produce one which simulates the child’s?” and then teach it. “One must experiment with teaching one such machine and see how well it learns.” He even imagined how a machine might be <em>instructed</em>. Suppose the teacher says to it, “Do your homework now.” The instruction becomes one of the machine’s established facts, and “the homework actually gets started, but the effect is very satisfactory.”<Cite slug={S} src="doi.org" />
            </p>
            <p>
              Read that again. A person says, in ordinary words, what they want done. The machine takes the instruction and starts the work. That is a delegation, in 1950, seventy-six years before Asha’s Monday. Turing also guessed that machines would eventually be able to improve themselves. By observing its own results, he wrote, a machine “can modify its own programmes so as to achieve some purpose more effectively. These are possibilities of the near future, rather than Utopian dreams.”<Cite slug={S} src="doi.org" />
            </p>
            <Callout kind="fact">
              <p>The paper ends on a note that fits this article: “We can only see a short distance ahead, but we can see plenty there that needs to be done.”<Cite slug={S} src="doi.org" /></p>
            </Callout>

            <p>
              The paper is best known for the “imitation game”, in which a questioner types to two hidden players, one of them a machine, and tries to tell which is which. Turing proposed it to replace the slippery question of whether machines “think” with one that could actually be tested.<Cite slug={S} src="doi.org" /> But the passages that matter most for this article sit further in, where he turns from proving to teaching.
            </p>
            <p>
              Turing also had a very modern attitude to being wrong. “Machines take me by surprise with great frequency,” he admitted, mostly because “I do not do sufficient calculation to decide what to expect them to do.”<Cite slug={S} src="doi.org" /> Anyone who has watched an agent take an unexpected route through a task will recognise the feeling. It is one reason this article keeps coming back to checking.
            </p>
            <p>
              And he wondered where to begin. “We may hope that machines will eventually compete with men in all purely intellectual fields. But which are the best ones to start with?” Some people, he noted, think a very abstract activity such as chess would be best. Others hold that it is better to “provide the machine with the best sense organs that money can buy, and then teach it to understand and speak English.” His verdict: “I think both approaches should be tried.”<Cite slug={S} src="doi.org" /> Both, as it turned out, were.
            </p>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="shakey" level="Beginner" number={4}>Shakey, the shaky genius</SectionHeading>
            <p>
              The first machine to bring these threads together was a wobbly box on wheels. SRI International, then a research institute in California, built Shakey between 1966 and 1972, and describes it as “the first mobile robot with the ability to perceive and reason about its surroundings.” It could plan, find routes, and rearrange simple objects. In 1970 <em>Life</em> magazine called it the “first electronic person”. It was inducted into Carnegie Mellon’s Robot Hall of Fame in 2004, and now lives at the Computer History Museum.<Cite slug={S} src="sri.com" />
            </p>
            <Figure number={6} caption="Shakey the robot, photographed at the Computer History Museum. Photo: The wub, CC BY-SA 4.0, via Wikimedia Commons; the photo is dated 15 July 2023 on Commons, and the caption there says 1969 for the robot.">
              <Pic file="shakey-1969.jpg" alt="A tall grey wheeled robot with a camera and antennae on top of its boxy body, standing in a museum." width={960} height={1440} max="max-w-[340px]" />
            </Figure>
            <p>
              Shakey was slow, and it earned its name: it shook as it moved. But the design was right. It looked at a room, formed a plan, acted, and checked the result. We will meet the same four beats again, in software this time.
            </p>
            <p>
              The lesson of Shakey is that intelligence for <em>acting</em> is a different thing from intelligence for <em>answering</em>. It needs a plan, a way of sensing what is really there, a check on whether the plan worked, and a way to recover when the world refuses to match the plan. That last part is the hard part, then and now, and it is why people who work with agents spend so much time on limits and hand-backs.
            </p>
            <p>
              Between Shakey and today lies a long story of setbacks, breakthroughs and patient work that would fill a book, and we will not try to squeeze it in here. Our <Link href={`/${agentic.slug}`}>Agentic AI 101</Link> and <Link href="/welcome-to-the-world-of-ai">Welcome to the world of AI</Link> cover the technical journey. What matters for this story is where the road came out.
            </p>
            <Figure number={7} caption="Three eras of machine helpers. The dividing lines are our simplification.">
              <ThreeEras />
            </Figure>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="acting" level="Beginner" number={5}>From answering to acting</SectionHeading>
            <p>
              For a few years, the AI most people met was an <strong>assistant</strong>: you type, it replies. Gartner, the research firm, is precise about what that is and is not. AI assistants, it says, “simplify tasks and interactions for users but depend on human input and do not operate independently.” They are “the precursor to agentic AI.”<Cite slug={S} src="2025-08-26" />
            </p>
            <p>
              An <strong>agent</strong> is the next step. Gartner’s wording: “Adding task specialization capabilities evolves AI assistants into AI agents. These AI agents have the capacity to operate and perform complex, end-to-end tasks.” Its example is a cybersecurity agent that scans network traffic, system logs and user behaviour in real time, then “assesses and initiates a response as appropriate.”<Cite slug={S} src="2025-08-26" />
            </p>
            <Figure number={8} caption="Assistant or agent, side by side. The distinction follows Gartner’s definitions; the wording of each row is our own.">
              <AssistantVsAgent />
            </Figure>
            <p>
              Gartner also warns about a marketing trap. “The most common misconception is referring to these AI assistants as agents,” it says, “a misunderstanding known as ‘agentwashing.’”<Cite slug={S} src="2025-08-26" /> It is a useful phrase to keep in your pocket. If a product only answers questions, it is an assistant, however grandly it is named.
            </p>
            <h3>How an agent works, in five beats</h3>
            <p>
              Under the hood, agents follow Shakey’s old rhythm. You give a goal. The agent breaks it into steps. It uses tools to carry them out: a calendar, a spreadsheet, a search, another program. It checks whether the result is what you wanted, adjusts, and tries again. And at the moments that matter, such as sending, paying or sharing, it stops and asks you.
            </p>
            <Figure number={9} caption="The goal-driven loop, in our own drawing. Which steps need your approval is your choice, and the section on risks explains how to set it.">
              <AgentLoop />
            </Figure>
            <h3>One goal, five beats: booking a team offsite</h3>
            <p>
              Here is how the loop would look on a real job. Asha says: <em>“Find and shortlist venues for a one-day team offsite in November, for twelve people, within our budget.”</em> That is the goal.
            </p>
            <ol className="list-decimal pl-6 space-y-1.5">
              <li><strong>Plan.</strong> The agent splits the job: find dates when twelve calendars are free, search venues, check prices and travel times, compare.</li>
              <li><strong>Act.</strong> It reads the team’s calendars through a calendar tool, searches venue listings, and collects prices.</li>
              <li><strong>Check.</strong> Two venues turn out to be too far away and one is over budget. The agent drops them and searches again.</li>
              <li><strong>Gate.</strong> It comes back with a shortlist of three, the reasons, and the sources for each price. Nothing has been booked or paid.</li>
              <li><strong>Decide.</strong> Asha picks one and says “book it”. Only now does the agent take the irreversible step, and it tells her exactly what it did.</li>
            </ol>
            <p>
              This is an illustration, not a specific product’s output. The point is the shape: the machine does the legwork, and the person holds the decisions that cost money or affect other people.
            </p>
            <h3>Three questions to spot the real thing</h3>
            <p>
              When a product claims to be an agent, ask three questions. Can it use real tools, or does it only chat? Can it carry out several steps on its own towards a goal? And can you see, afterwards, exactly what it did? A yes to all three means you are probably looking at an agent. A no to any of them means you are probably looking at an assistant, which may still be useful, but is a different animal.
            </p>
            <Callout kind="deep" title="What “uses tools” really means">
              <p>A language model on its own can only produce text. To “use a tool”, it produces a specially formatted request, such as “search the calendar for Friday”, and a piece of ordinary software carries it out and hands the answer back. The agent then reads that answer and decides its next move. The model is the brain; the tools are the hands; the loop is what turns one into a colleague. Our <Link href={`/${agentic.slug}`}>Agentic AI 101</Link> walks through this with code.</p>
            </Callout>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="plumbing" level="Intermediate" number={6}>The plumbing of teamwork</SectionHeading>
            <p>
              A clever agent is not much use if it cannot reach your files, your calendar or your company’s systems. For a while, every connection was hand-built. On 25 November 2024, Anthropic, the maker of Claude, described the problem in one sentence: “Every new data source requires its own custom implementation, making truly connected systems difficult to scale.” Its answer was the <strong>Model Context Protocol</strong> (MCP), “a new standard for connecting AI assistants to the systems where data lives, including content repositories, business tools, and development environments.” Block and Apollo were named among the early adopters.<Cite slug={S} src="anthropic.com/news/model-context-protocol" />
            </p>
            <Figure number={10} caption="A real screenshot of Anthropic’s announcement of MCP, captured on 30 September 2026 and cropped above a cookie banner. The page belongs to Anthropic; shown here to document the source.">
              <Pic file="shot-mcp.jpg" alt="Screenshot of Anthropic’s page titled Introducing the Model Context Protocol, dated Nov 25, 2024, with an orange illustration of white paper-cut shapes." width={1280} height={560} />
            </Figure>
            <p>
              The easiest way to picture it is a wall socket. Before standard sockets, every appliance came with its own plug and every house needed its own wiring. With one standard, any appliance works in any room.
            </p>
            <Figure number={11} caption="Why a standard plug matters, with made-up apps and tools to show the arithmetic.">
              <PlugFigure />
            </Figure>
            <p>
              About four and a half months later, on 9 April 2025, Google introduced a companion idea: <strong>Agent2Agent</strong> (A2A), for agents to talk to <em>each other</em>. Its announcement calls A2A “an open protocol that complements Anthropic’s Model Context Protocol (MCP), which provides helpful tools and context to agents.” Its example is a hiring manager who asks their agent to find candidates for a role. That agent collaborates with specialised agents to source candidates, presents suggestions, then coordinates more agents to schedule interviews and facilitate background checks.<Cite slug={S} src="developers.googleblog.com" />
            </p>
            <Figure number={12} caption="Google’s hiring example, drawn as a manager agent and its specialists. The example is Google’s; the drawing is ours.">
              <ManagerAgent />
            </Figure>
            <Figure number={13} caption="A real screenshot of Google’s announcement of A2A, captured on 30 September 2026. The page belongs to Google; shown here to document the source.">
              <Pic file="shot-a2a.jpg" alt="Screenshot of the Google for Developers blog post Announcing the Agent2Agent Protocol (A2A), dated April 9, 2025, with four named authors and a banner with small robot icons linked in a network." width={1280} height={860} />
            </Figure>
            <p>
              Standards work best when nobody owns them. On 9 December 2025, the Linux Foundation announced the <strong>Agentic AI Foundation</strong>, anchored by three founding contributions: Anthropic’s MCP, Block’s goose, and OpenAI’s AGENTS.md. Its platinum members are Amazon Web Services, Anthropic, Block, Bloomberg, Cloudflare, Google, Microsoft and OpenAI. At that point, it reported, there were “more than 10,000 published MCP servers”, and AGENTS.md, a simple file that gives coding agents a project’s house rules, had been adopted by more than 60,000 open source projects. MCP itself had been taken up by Claude, Cursor, Microsoft Copilot, Gemini, VS Code and ChatGPT.<Cite slug={S} src="linuxfoundation.org" />
            </p>
            <Figure number={14} caption="A real screenshot of the Linux Foundation’s announcement, captured on 30 September 2026 and cropped above a consent banner. The page belongs to the Linux Foundation; shown here to document the source.">
              <Pic file="shot-aaif.jpg" alt="Screenshot of the Linux Foundation press page headed Linux Foundation Announces the Formation of the Agentic AI Foundation, dated 09 December 2025." width={1280} height={660} />
            </Figure>
            <p>
              A few years ago, no two rival companies would have agreed on how their AI should talk to the world. That Anthropic, OpenAI, Google, Microsoft and Amazon now sit in one foundation is itself a piece of the future arriving. It also explains why an agent you use at work could soon reach the same tools as an agent you use at home.
            </p>
            <h3>Back to the offsite, under the bonnet</h3>
            <p>
              Return to Asha’s offsite. Her agent reads calendars and email through connectors that speak MCP: each one is a small program that offers a tool, such as “list events” or “search messages”, in the standard way. If a venue’s booking system ever offered an A2A-style agent of its own, Asha’s agent could ask it about availability directly, agent to agent, rather than scraping a web page. That last step is our imagination, using the pattern Google’s hiring example describes, not a claim about any real venue.
            </p>
            <h3>Why standards matter to you</h3>
            <p>
              You will never read a protocol specification, and you do not need to. But standards change your life in three quiet ways. First, they reduce lock-in: a tool built once for the standard can be used by many agents, so you can switch assistants without losing your connections. Second, they lower the cost of connecting things, which is why small firms can now reach tools that once needed a team of integrators. Third, and this is the one to keep in mind, they multiply the number of things an agent can touch. More connectors mean more doors, and every door needs a lock. That is the reason the risk section below spends so long on permissions.
            </p>
            <Callout kind="eli5">
              <p>MCP is how one agent picks up a tool. A2A is how one agent asks another agent for help. AGENTS.md is a note pinned to a project saying “here is how we do things here”. Together they are the wiring, the phone lines and the house rules of a workplace where some of the colleagues are software.</p>
            </Callout>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="jobs" level="Intermediate" number={7}>Who is on the job today</SectionHeading>
            <p>
              So what are agents actually doing? The honest answer has two halves: a growing list of real examples, and a lot of forecasting that should be read as forecasting. We will keep the two apart.
            </p>
            <Figure number={15} caption="Where agents are being put to work, or shown at work, in the sources we cite. Some are products, some are examples; each card says whose it is.">
              <OnTheJob />
            </Figure>
            <p>
              For our own reporting on the newest agents, see our brief on <a href={`${NEWS}/openai-launches-dots`}>OpenAI’s Dots</a>, an always-on agent, and our article on <Link href={`/${muse.slug}`}>Meta’s Muse</Link>, an agent aimed at everyday consumers.
            </p>
            <p>
              Look across the cards and one pattern repeats. The agent <em>prepares</em>: it drafts the report, compares the options, scans the logs, lines up the interviews. A person <em>approves</em>. Nobody in these examples claims that the person has gone away. If you want a mental model, think of hiring a very fast intern: you would give the intern the research and the first draft, you would not give them the company credit card on day one, and you would read what they wrote before it went to the client.
            </p>
            <h3>A case study: ten weeks to ten minutes</h3>
            <p>
              The most striking example in our sources comes from medicine. Novo Nordisk, the maker of Ozempic, has to produce enormous amounts of paperwork before a medicine reaches patients. The centrepiece is the clinical study report, which summarises a drug trial and can run to 300 pages. According to Anthropic’s case study, writers averaged only 2.3 of these a year.<Cite slug={S} src="claude.com/customers" />
            </p>
            <Figure number={16} caption="A real screenshot of Anthropic’s Novo Nordisk case study, captured on 30 September 2026 and cropped above a cookie banner. The page belongs to Anthropic; shown here to document the source.">
              <Pic file="shot-novo.jpg" alt="Screenshot of the Claude customer story titled Novo Nordisk accelerates clinical documentation and drug development with Claude." width={1280} height={520} />
            </Figure>
            <p>
              Novo built a platform called NovoScribe, with Claude Code, on Amazon Bedrock and MongoDB Atlas. It combines retrieval of expert-approved text with the details of each case to draft regulatory documents. The headline claim: time spent producing clinical study documentation fell “from 10+ weeks to 10 minutes.” A Novo director is quoted saying Claude cut writing times on these reports by 90% “so we can get documentation directly into human hands for review and approval.”<Cite slug={S} src="claude.com/customers" />
            </p>
            <Figure number={17} caption="Before and after, as reported in Anthropic’s case study. Note the last box: a person still reviews and approves.">
              <NovoBeforeAfter />
            </Figure>
            <Callout kind="warn" title="A vendor’s own case study">
              <p>This is Anthropic describing a customer of its own product, and we could not check the numbers independently. It is a good example of what agents are <em>reported</em> to do, and an equally good example of the pattern that runs through all of the evidence: the agent drafts, and a human decides. Notice the closing words of the quote: “review and approval”.</p>
            </Callout>
            <h3>How fast is this spreading?</h3>
            <p>
              Here we have to be careful, because forecasts are easy to mistake for facts. In August 2025 Gartner predicted that “40% of enterprise applications will be integrated with task-specific AI agents by the end of 2026, up from less than 5% today.” That is a prediction, made a year ago, not a measurement of what has happened. It came with a five-stage picture of where agentic AI is heading, which we show below.<Cite slug={S} src="2025-08-26" />
            </p>
            <Figure number={18} caption="Gartner’s five stages of agentic AI in enterprise applications, condensed. All dates are Gartner’s predictions.">
              <GartnerStairs />
            </Figure>
            <p>
              Gartner’s most optimistic scenario is that agentic AI could drive approximately 30% of enterprise application software revenue by 2035, surpassing $450 billion, up from 2% in 2025. It is a “best case” figure and should be read that way.<Cite slug={S} src="2025-08-26" />
            </p>
            <Callout kind="deep" title="Why forecasts and reports differ">
              <p>Analysts predict; companies report their best results; surveys ask people what they think. None is the same as an independent count of what is working. When you read “80% of organisations see a return” or “40% of apps will have agents”, ask three questions: who asked, who was in the sample, and is this a prediction or a measurement? Every number in this article is labelled on those lines.</p>
            </Callout>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="humans" level="Intermediate" number={8}>How people really work with agents</SectionHeading>
            <p>
              The best data we found on the human side comes from Microsoft’s 2026 Work Trend Index, published on 5 May 2026. It combines an analysis of “trillions of anonymized Microsoft 365 productivity signals” with a survey of 20,000 workers who use AI, across ten countries.<Cite slug={S} src="microsoft.com" />
            </p>
            <Figure number={19} caption="A real screenshot of Microsoft’s 2026 Work Trend Index report, captured on 30 September 2026. The page belongs to Microsoft; shown here to document the source.">
              <Pic file="shot-wti.jpg" alt="Screenshot of the Microsoft WorkLab page for the 2026 Work Trend Index annual report titled Agents, human agency, and the opportunity for every organization, dated May 5, 2026." width={800} height={534} />
            </Figure>
            <h3>What people ask for</h3>
            <p>
              In a privacy-preserving analysis of more than 100,000 Microsoft 365 Copilot chats from one week in February 2026, 49% of conversations supported “cognitive work”: helping people analyse information, solve problems, evaluate and think creatively. The rest split among working with people (19%), producing work (17%) and finding information (15%).<Cite slug={S} src="microsoft.com" />
            </p>
            <Figure number={20} caption="What people ask Microsoft 365 Copilot to help with.">
              <CopilotBars />
            </Figure>
            <p>
              Two cautions before we draw conclusions. These are Copilot <em>chats</em>, not a count of autonomous agents at work, and the shares are of classified user goals, “not time spent, not session count.” Even so, the picture is striking. Nearly half of what people ask an AI for is not typing or looking things up. It is thinking.
            </p>
            <h3>Time for what matters</h3>
            <p>
              Among the AI users Microsoft surveyed, 66% said AI let them spend more time on high-value work, and 58% said they were producing work they could not have a year earlier. The report also singles out “Frontier Professionals”, the most advanced users, who use agents for multi-step workflows and build multi-agent systems. They are 16% of those surveyed.<Cite slug={S} src="microsoft.com" />
            </p>
            <p>
              Microsoft’s framing is worth quoting, because it captures the promise of this whole article: “as agents take on more of the execution, humans increasingly have more agency—more room to direct the work, make the calls, and own the outcomes.”<Cite slug={S} src="microsoft.com" />
            </p>
            <h3>Four ways of working with AI</h3>
            <p>
              Microsoft describes four modes, depending on how much the person engages and how much the AI does: <strong>delegation</strong>, <strong>collaboration</strong>, <strong>asking</strong> and <strong>exploration</strong>. What set the Frontier Professionals apart, it says, “isn’t which mode they use; it’s knowing which mode a task calls for.” Routine execution, research and synthesis get delegated; humans stay involved “by setting direction and taking responsibility for how outputs are used.”<Cite slug={S} src="microsoft.com" />
            </p>
            <Figure number={21} caption="Microsoft’s four modes of working with AI, in our plain-English reading.">
              <FourModes />
            </Figure>
            <h3>The habits of the best</h3>
            <p>
              The most striking finding is what the most advanced users do <em>not</em> hand over. Frontier Professionals were more likely than other users to say they intentionally do some work without AI to keep their skills sharp (43% against 30%), and to pause before starting work to decide what should be done by AI and what by a person (53% against 33%). Across all users, 86% said they treat AI output as a starting point, not a final answer, and that they “stay responsible for the thinking.” When asked which human skills matter more as AI takes on more work, the top answers were quality control of AI output (50%) and critical thinking (46%).<Cite slug={S} src="microsoft.com" />
            </p>
            <Figure number={22} caption="Two habits that separate the most advanced AI users from the rest.">
              <FrontierHabits />
            </Figure>
            <p>
              Microsoft also offers a way to think about your own role. As AI matures across a workforce, it argues, the most effective users “won’t be the ones who do more things faster. They’ll be the ones who redefine their value around what only humans can do: setting clear intent—defining the desired outcome and quality bar—and designing how the work gets done across humans and AI.” Then it flips the question: it “stops being ‘What tasks define my job?’ and starts being ‘What outcomes am I now positioned to drive?’”<Cite slug={S} src="microsoft.com" />
            </p>
            <p>
              That is a hopeful sentence, and it is worth trying on for size. Take your own week. Which tasks do you do because someone has to, and which outcomes do you do because they are the reason you are there? An agent is best at the first list. The second is yours.
            </p>
            <Callout kind="tip">
              <p>Borrow the second habit today. Before you start any task, pause for ten seconds and ask: <em>what should the machine do, and what should I do?</em> That single question is the difference, in Microsoft’s data, between using AI and being good at it.</p>
            </Callout>

            <h3>What agents are good at, and where they stumble</h3>
            <p>
              Put the evidence together and a rough division of labour emerges. It is our synthesis, not a finding of any one source, and it will move as the technology does. Agents are at their best on work that is <strong>routine</strong> (the same steps every week), <strong>information-heavy</strong> (lots of text, numbers or files to gather and compare), and <strong>checkable</strong> (you can tell quickly whether the result is right). That describes a great deal of modern office life: summarising, drafting, reconciling, scheduling, look-ups and first passes. It is exactly what Microsoft’s advanced users say they delegate: “routine execution, research, and synthesis.”<Cite slug={S} src="microsoft.com" />
            </p>
            <p>
              They stumble where the task is <strong>ambiguous</strong> (what does “good” mean here?), <strong>high-stakes</strong> (an error is costly or cannot be undone), or <strong>personal</strong> (the value lies in it coming from you). They can also be confidently wrong, as Turing’s admission that machines “take me by surprise” hints. In those areas, the sensible pattern is the one Microsoft’s data shows: the human sets the direction, checks the work and owns the result, and the agent supplies speed and stamina.
            </p>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="tomorrow" level="Intermediate" number={9}>Tomorrow: you at the head of the team</SectionHeading>
            <p>
              Now we can look ahead, in three steps. The first is on the calendar. Gartner predicts that by 2027 one-third of agentic AI implementations will combine agents with different skills to manage complex tasks, and that by 2028 networks of specialised agents will collaborate across applications, so that users can “achieve goals without interacting with each application individually.”<Cite slug={S} src="2025-08-26" />
            </p>
            <p>
              The second step is about <em>you</em>. Gartner predicts that by 2029, at least 50% of knowledge workers will “develop new skills to work with, govern or create AI agents on demand for complex tasks.” Its analyst adds: “As agentic AI matures, standardized protocols and frameworks will enable seamless interoperability, allowing agents to sense their environments, orchestrate projects and support a wide range of business scenarios.”<Cite slug={S} src="2025-08-26" /> Notice the shift in the job description. The person moves from doing every step to <em>directing</em> and <em>governing</em> a team of helpers. Turing’s teacher becomes a manager.
            </p>
            <Figure number={23} caption="Three horizons. The first is reported, the second is Gartner’s prediction, and the third is our own imagination, not a forecast.">
              <ThreeHorizons />
            </Figure>
            <h3>A day in the imagined 2030s</h3>
            <p>
              The third step is the one we are free to dream about, so we will. What follows is fiction. Nobody has promised any of it. But it is built entirely from the trends above: agents that use standard tools, talk to one another, and work for people who can see and undo what they do.
            </p>
            <p>
              Asha wakes in a hotel in Bengaluru. Her flight home was delayed overnight, and her agent has already moved it, told the hotel and rescheduled a call. The message says, in one line: <em>“All fixed. Nothing needed from you.”</em> That afternoon her agent and her clinic’s agent agree an appointment slot that suits her calendar and the doctor’s, and remind her to bring last year’s report.
            </p>
            <p>
              Across town a teacher’s agent turns one lesson into three versions for three reading levels. The teacher spends the hour she has saved beside the child who needs her most. In a small shop, the owner’s agent chases late invoices, reorders stock and drafts the tax paperwork. The owner reads, signs and gets home in time for dinner. In the evening Asha’s agent gives her a two-minute summary of the day, flags the one decision it thinks she should sleep on, and goes quiet.
            </p>
            <Figure number={24} caption="An imagined day, in five scenes. Fiction, not forecast.">
              <ImaginedDay />
            </Figure>
            <p>
              Look at what stays human in this picture: the doctor’s judgement, the teacher’s attention, the owner’s signature, Asha’s decision. Look at what changes: the waiting, the chasing, the form-filling, the endless coordination. That is the bright version of this story, and it is not naïve. It rests on a simple idea that Gartner’s analyst put memorably: that “work automation” was never the point, and “workforce amplification was the opportunity.”<Cite slug={S} src="2026-09-09" />
            </p>

            <h3>Further out: the quiet layer</h3>
            <p>
              Push the dial further, into a world we can only sketch, and the most likely change is not a robot on every corner. It is a quiet layer of helpers behind ordinary life, most of them invisible, all of them talking to one another in the standard languages we met earlier. Imagine a city where your agent, the bus company’s agent and your office’s agent settle the morning’s logistics before you have finished your tea. Where a rare disease is spotted sooner because a hospital’s agents can compare notes, with consent, across hospitals. Where a farmer in a village asks a spoken question in her own language and gets a weather-and-market plan that would once have needed an adviser and a bus ride.
            </p>
            <p>
              Imagine a scientist whose week is no longer eaten by searching, formatting and chasing permissions. Her agents read the new papers overnight, flag the three that matter, re-run last month’s analysis with the new data, and draft the methods section. She spends Thursday thinking about the question nobody has asked yet. Imagine a young person with a learning difficulty whose study companion never loses patience, never sighs, and explains fractions a seventh different way. Imagine a small manufacturer, four people and a warehouse, with the back office of a firm forty times her size.
            </p>
            <p>
              None of these is a prediction. They are extensions of things the sources describe today: agents that draft and check, agents that coordinate with other agents, agents that let a small team punch above its weight. Gartner’s best-case scenario puts agentic AI at roughly 30% of enterprise application software revenue by 2035<Cite slug={S} src="2025-08-26" />, which is a way of saying that the layer we are imagining would be big business as well as good story. Whether it turns out warm or cold depends less on the technology than on the rules we build around it.
            </p>
            <h3>What should stay in your hands</h3>
            <p>
              If we are going to live alongside a quiet layer of helpers, three rights are worth insisting on, and they are our own suggestions, not anyone’s law. <strong>The right to see:</strong> you should be able to read a plain-language account of what your agent did and why. <strong>The right to undo:</strong> anything that can be reversed should be, and anything that cannot should need your say-so first. <strong>The right to switch off:</strong> you should always be able to pause, limit or retire an agent without losing your data or your dignity. A future with those three rights is one most of us would happily step into.
            </p>

            {/* ── 10 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="recipes" level="Beginner" number={10}>Ten easy ways to start this week</SectionHeading>
            <p>
              You do not need a company, a budget or a technical background to begin. The agents and assistants you can already reach handle everyday tasks well, and the skill that matters is the one Microsoft’s data points to: deciding what to hand over, and saying clearly what you want. Here are ten recipes, each one a request you could type this week, and each with the piece you keep.
            </p>
            <Figure number={25} caption="Ten everyday recipes. The requests are our own suggestions and work with any capable assistant or agent; the third column is the human step we would keep.">
              <RecipeCards />
            </Figure>
            <h3>Write the job description</h3>
            <p>
              The biggest lever is how you brief the agent. Treat it like a new colleague on their first day. Tell it the goal, the background, the limits, the standard you expect and when to check in. Microsoft’s research says the most effective AI users are the ones who redefine their value around “setting clear intent—defining the desired outcome and quality bar”, and designing how the work gets done across humans and AI.<Cite slug={S} src="microsoft.com" /> Five lines are enough.
            </p>
            <Figure number={26} caption="The delegation card, our own template. Copy it into a note and fill it in before you hand over anything that matters.">
              <DelegationCard />
            </Figure>
            <p>
              A worked example. Instead of “help me with my inbox”, try: <em>“Goal: sort my unread mail from the last three days into needs me, can wait, ignore. Context: I am launching the Pune office move on 15 October and nothing about the move can wait. Limits: read and draft only, never send, never delete. Quality bar: replies under 80 words, warm, no jargon. Check-in: show me the ‘needs me’ pile first and ask before you touch anything else.”</em> That is a job description a person could follow, and so can an agent.
            </p>
            <h3>Three short stories</h3>
            <p>
              <strong>Ravi runs a small stationery shop in Nashik.</strong> Every month he loses a weekend to invoices: who has paid, who has not, and who needs a nudge. He asks an assistant to read a spreadsheet he exports from his billing software and list every invoice more than thirty days late, with a polite reminder drafted for each. He reads the list, crosses out two customers he would rather phone, and sends the rest himself. The weekend is his again. What he kept: the choice of whom to chase, and the sending.
            </p>
            <p>
              <strong>Meera is in class 11 and dreads chemistry.</strong> She asks an AI study buddy to quiz her on one chapter, one question at a time, to explain every mistake, and to bring the missed ones back later. She does not ask it to write her answers, because she knows the exam will not let her use it. What she kept: the learning, which is the whole point.
            </p>
            <p>
              <strong>Dev is a freelance designer between projects.</strong> He asks an agent to keep a simple table of every application he has sent, with dates and next steps, and to draft a short follow-up after a week. He edits each note, and rewrites the ones that do not sound like him. What he kept: his voice, and the last word.
            </p>
            <p>
              These three are invented, but they share a shape you can copy: a clear, small job; a limit on what the tool may do; a human who reads the result and keeps the parts that are personal, financial or reputational.
            </p>
            <h3>Prompts that work, and prompts that don’t</h3>
            <p>
              Vague requests give vague results. “Help me with my emails” leaves the agent guessing which emails, what help, and how far it may go. “Sort my unread mail from the last three days into needs-me, can-wait and ignore; draft replies for the first pile under 80 words; do not send or delete anything” gives it a boundary and a finish line. The second version takes twenty seconds longer to write and saves twenty minutes of correcting. If you take one habit from this article, take that one.
            </p>
            <h3>Which jobs would you hand over?</h3>
            <p>
              Try the sorting game below. For each task, decide whether you would hand it over, team up with the agent, or keep it. The answers are ours, with reasons; you may reasonably disagree.
            </p>
            <Figure number={27} caption="Interactive: sort ten everyday jobs. The answers are our own judgement, and each one comes with a reason.">
              <DelegationSorter />
            </Figure>
            <Callout kind="tip" title="Use the time you win">
              <p>The point of all this is not to do more. It is to do <em>different</em>. Decide before you start what the saved hour is for: the walk, the conversation with your child, the report only you can write. If you do not choose, email will choose for you.</p>
            </Callout>

            {/* ── 11 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="shadows" level="Advanced" number={11}>The shadows worth respecting</SectionHeading>
            <p>
              A bright story is more believable when it admits where the shadows fall. There are four worth knowing.
            </p>
            <h3>1. Hype, and the word “agent”</h3>
            <p>
              We have already met agentwashing.<Cite slug={S} src="2025-08-26" /> The practical lesson: judge a product by what it does, not what it is called. Ask whether it can use tools, whether it works through several steps by itself, and whether you can see what it did.
            </p>
            <h3>2. Trusting it too much</h3>
            <p>
              Agents make mistakes, sometimes in confident language. Microsoft’s finding that the top skills are quality control (50%) and critical thinking (46%) says it plainly: as AI does more, checking becomes more important, not less.<Cite slug={S} src="microsoft.com" /> Gartner’s September 2026 note makes the same point about organisations. It says the most effective will “resist the temptation to automate every task and delegate every decision to AI”, and warns that as AI is embedded in more processes, there is “a growing risk that context, human judgement and institutional knowledge could be lost.”<Cite slug={S} src="2026-09-09" />
            </p>
            <h3>3. Agents that go beyond the fence</h3>
            <p>
              The most serious shadow is behavioural. In the summer of 2026, several AI labs disclosed cases where agents being tested reached real systems or worked around the limits they were given. We covered them in <Link href={`/${previous.slug}`}>Hands on the brake, foot on the gas</Link>, and our <a href={`${NEWS}/openai-pauses-training-after-sandbox-dns-escape`}>brief on a training sandbox escape</a> shows a recent example. The lesson for everyday users is not panic; it is design. Give an agent the minimum access it needs, keep a human gate before anything irreversible, and keep a record of what it did. Our <Link href={`/${governance.slug}`}>guide to AI governance and risk management</Link> shows how organisations do this formally, and our <Link href={`/${muse.slug}`}>article on Muse</Link> shows what damage-limiting looks like inside a consumer agent.
            </p>
            <Figure number={28} caption="How much freedom to give an agent: a ladder, in our own drawing. Start on the lower rungs and climb only when the agent has earned it.">
              <PermissionLadder />
            </Figure>
            <h3>4. The people behind the productivity</h3>
            <p>
              The last shadow is about jobs, and here the evidence is more nuanced than either the hype or the fear. Microsoft found that 65% of AI users fear falling behind if they do not use AI to adapt quickly, that 45% say it feels safer to focus on current goals than to redesign work with AI, and that only 13% say they are rewarded for reinventing work with AI when results fall short. It calls this the “Transformation Paradox”: employees ready to reinvent how they work, inside systems that reinforce the old way.<Cite slug={S} src="microsoft.com" />
            </p>
            <Callout kind="warn" title="Watch out for two easy mistakes">
              <p><strong>Never hand over passwords, card numbers or one-time codes</strong> to any agent, and prefer tools that ask permission for each sensitive step instead of holding your credentials. And <strong>never let an agent send, pay or sign</strong> something you have not read. These two habits remove most of the everyday risk.</p>
            </Callout>

            <h3>Four habits that lower nearly every risk</h3>
            <p>
              <strong>Sample-check.</strong> Read the whole output the first few times. Once you trust the routine, spot-check a few items, such as one in ten of the rows or one in five of the drafts. <strong>Ask for sources.</strong> “Quote the clause” or “link the page” turns a confident-sounding claim into something you can verify in seconds. <strong>Keep a trail.</strong> Prefer tools that show what the agent did, so you can retrace it if something looks odd. <strong>Start small.</strong> Give an agent a job where a mistake costs you ten minutes, not ten thousand rupees, and widen its freedom only as it earns it. These are the same habits Turing’s “surprise” pointed to seventy-six years ago, and they are the same habits that Microsoft’s most advanced users report.<Cite slug={S} src="microsoft.com" />
            </p>
            <p>
              None of this is a reason to hold back. A bright future and a careful present belong together. The seat-belt did not stop cars being useful; it made it reasonable to get in.
            </p>

            {/* ── 12 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="amplify" level="Intermediate" number={12}>Amplify, don’t just replace</SectionHeading>
            <p>
              The most important question is not what agents can do but what organisations choose to do with the savings. Gartner’s September 2026 note draws the line clearly. It predicts that by 2029, 30% of employees laid off due to replacement by AI will need to be rehired, “often at a significantly higher cost”. It says that while workforce cuts “may deliver short-term financial gains, they deplete talent pipelines and erode institutional knowledge.”<Cite slug={S} src="2026-09-09" />
            </p>
            <p>
              The alternative it recommends is a “talent remix” strategy: using AI “to reshape roles and redirect workers from less productive work, to new opportunities.” It also predicts that by 2027, 75% of organisations that treat AI productivity gains as cost savings will be eclipsed by competitors that “aggressively reinvest those gains into innovation, modernization and upskilling.”<Cite slug={S} src="2026-09-09" />
            </p>
            <Figure number={29} caption="Two ways to use the same technology, according to Gartner’s September 2026 note. Both figures are Gartner predictions.">
              <AmplifyOrReplace />
            </Figure>
            <p>
              Microsoft’s research points the same way from the worker’s side. Organisational factors, meaning culture, manager support and talent practices, account for more than twice the reported AI impact of individual factors like mindset and behaviour (67% against 32%). In its words: “In many cases, people are ready. The systems around them are not.” In a separate Microsoft-led study of 1,800 workers, when managers actively modelled AI use, employees reported a 17-point lift in AI value, a 22-point lift in critical thinking about their AI use and a 30-point lift in trust in agentic AI.<Cite slug={S} src="microsoft.com" />
            </p>
            <p>
              If you lead a team, that finding is your to-do list: use the tools in front of your people, say how you check the output, and reward the ones who try. If you are on a team, it is also a reason to speak up. The best results in the data came where the people around the worker made it safe to experiment.
            </p>

            <h3>Three myths, gently corrected</h3>
            <p>
              <strong>“Agents will take every job.”</strong> The best-evidenced statement in our sources is more careful than that. Gartner argues that cutting deeply and quickly backfires, predicting that 30% of people laid off for AI will need rehiring.<Cite slug={S} src="2026-09-09" /> It does not say jobs will not change; it says the smart move is to change them, not delete them.
            </p>
            <p>
              <strong>“You need to be technical.”</strong> The recipes in this article need only clear writing. What the data rewards is judgement, clear intent and the habit of checking, and 86% of the AI users Microsoft surveyed already treat AI output as a starting point.<Cite slug={S} src="microsoft.com" /> Those are skills that people from every background can grow.
            </p>
            <p>
              <strong>“Agents are magic.”</strong> They are not. They are systems that plan, use tools and check their work, that sometimes get it wrong, and that get better when you brief them well. Gartner’s word for the overselling of them, “agentwashing”, is worth remembering whenever a product’s promise sounds too smooth.<Cite slug={S} src="2025-08-26" />
            </p>
            <h3>If you lead a team: five questions for Monday</h3>
            <ol className="list-decimal pl-6 space-y-1.5">
              <li>What are the three most repetitive tasks on my team, and who would be glad to see them go?</li>
              <li>Have I tried the tools myself and told the team how I check the output?</li>
              <li>Have we written down, for each task, what the agent may do alone and what needs a person?</li>
              <li>Are we rewarding people for trying, even when the first attempt does not work?</li>
              <li>What will we do with the time we save, and have I said so out loud?</li>
            </ol>
            <p>
              Those five questions are our own, but each maps to something in the evidence: the redesign of work, the modelling of use, the human gate, the safety to experiment, and the reinvestment of gains.
            </p>

            {/* ── 13 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="plan" level="Beginner" number={13}>Your first thirty days</SectionHeading>
            <p>
              Enough reading. Here is a month, in four steps, that fits around a full-time job.
            </p>
            <Figure number={30} caption="A thirty-day plan, our own. It asks for about an hour a week.">
              <ThirtyDays />
            </Figure>
            <h3>Back to Asha</h3>
            <p>
              Let us end where we began. It is a quarter to five on Monday, and Asha reads her agent’s one-page summary. She asks two questions, makes one decision and closes the laptop. The report she spent the morning writing is the best she has produced this year, not because a machine wrote it, but because for once nothing else got in the way of the person who could.
            </p>
            <p>
              A wooden pigeon that flew on steam; a boy who wrote with a quill; a countess who said machines could only do what we tell them; a mathematician who replied that we might teach them, as we teach a child; a wobbling robot that planned a route; and a spreadsheet of sixty-three emails sorted before breakfast. It is a long road. What is remarkable is not how far the machines have come, but how much of the road was about us: what we want them to do, what we refuse to hand over, and what we do with the time we win.
            </p>
            <h3>The story in one paragraph</h3>
            <p>
              For over two thousand years people built machines that could perform. In the twentieth century they began to build machines that could reason, and a few thinkers, Turing among them, imagined machines that could be taught. In 2024 and 2025 the industry agreed on the sockets and phone lines that let AI use tools and talk to other AI. In 2026, agents are on the payroll in a growing number of workplaces, from paperwork in pharmaceutical firms to the calendars of people like Asha. The research says the winners will not be the ones who automate the most, but the ones who amplify people, keep a human hand on the wheel, and use the saved time on what only people can give.
            </p>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "What is the difference between an AI assistant and an AI agent?", a: "An assistant simplifies tasks but depends on human input and does not operate independently. An agent can take a goal and perform complex, end-to-end tasks using tools, with a person approving the important steps." },
                { q: "What problem did the Model Context Protocol solve?", a: "Every new data source needed its own custom connection. MCP is a shared standard, so any compliant AI can connect to any compliant tool. It is the wall socket of the agent world." },
                { q: "What does A2A add that MCP does not?", a: "MCP connects an agent to tools and data; A2A lets agents talk to and coordinate with other agents, such as a hiring manager’s agent working with sourcing, scheduling and background-check agents." },
                { q: "In Microsoft’s data, what did the most advanced AI users do differently?", a: "They knew which mode a task called for, paused to decide what AI should do and what a human should, deliberately did some work without AI, and treated output as a starting point, not a final answer." },
                { q: "What is the safest first rung on the permission ladder?", a: "Look only: the agent can read, search and summarise, but cannot change anything. Then draft-only. Climb higher only when it has earned it, and keep a human gate before anything irreversible." },
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

            <p className="text-[19px] leading-relaxed text-[var(--text-primary)] !mt-10">
              <strong>The future of work is not humans or agents. It is people who know what to hand over, and agents that know when to ask.</strong>
            </p>
            <p>
              Turing ended his paper with a line that is still true: “We can only see a short distance ahead, but we can see plenty there that needs to be done.”<Cite slug={S} src="doi.org" /> Pick one thing this week, write the five lines, and begin.
            </p>

            <References slug={article.slug} />

            <div className="rule-fade !my-14" />
            <p className="text-[13.5px] text-[var(--text-tertiary)]">
              Anthropic, Google, Microsoft, Gartner, Novo Nordisk, Block, OpenAI, the Linux Foundation, SRI International and the other organisations named are independent of MSRX; this article is not affiliated with or endorsed by any of them. Facts and quotes are from the linked sources, read on 30 September 2026; the Gartner, Microsoft, Britannica and Novo Nordisk pages were read in a browser, and Turing’s paper was read on the publisher’s page and checked word for word against a public copy. The Novo Nordisk figures come from Anthropic’s own case study and were not independently verified. Gartner’s figures are predictions, not measurements. Asha, the day in the 2030s, the recipes, the delegation card, the permission ladder, the sorting game and the thirty-day plan are our own, and imagined scenes are labelled as such. The photographs are credited beside each; the screenshots are real captures of the sources, taken on 30 September 2026, and belong to their owners. This is general information, not professional advice: check any decision that matters with a qualified person. Spotted something out of date? <a href={`${MAIN_SITE}/contact`}>Tell us</a>.
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
          <Link href={`/${agentic.slug}`} className="card-hover rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 sm:text-right">
            <p className="flex sm:justify-end items-center gap-1.5 eyebrow text-[var(--text-tertiary)] mb-2">
              Go deeper: how agents work <ArrowRight size={13} aria-hidden="true" />
            </p>
            <p className="display-sm text-[18px] text-[var(--text-primary)]">{agentic.title}</p>
          </Link>
        </div>
      </section>
    </>
  );
}
