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
  AgentFacts,
  AgentLoop,
  AgentsCompare,
  AmplifyOrReplace,
  AssistantVsAgent,
  ClaimCheck,
  CopilotBars,
  DelegationCard,
  FourModes,
  FrontierHabits,
  GartnerStairs,
  HelperTimeline,
  IndiaRecipes,
  IndiaThread,
  ImaginedDay,
  ImaginedRoles,
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
  UpiFence,
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
  { id: "india-thread", label: "The other ancient road: rules, zero, logic" },
  { id: "boy", label: "The boy who wrote, the countess who doubted" },
  { id: "shakey", label: "Shakey, the shaky genius" },
  { id: "acting", label: "From answering to acting" },
  { id: "plumbing", label: "The plumbing of teamwork" },
  { id: "jobs", label: "Who is on the job today" },
  { id: "meet", label: "Six agents you can meet today" },
  { id: "india-today", label: "Agents in India today" },
  { id: "humans", label: "How people really work with agents" },
  { id: "tomorrow", label: "Tomorrow: you at the head of the team" },
  { id: "recipes", label: "Ten easy ways to start this week" },
  { id: "shadows", label: "The shadows worth respecting" },
  { id: "amplify", label: "Amplify, don’t just replace" },
  { id: "faq", label: "Questions people ask" },
  { id: "glossary", label: "A pocket glossary" },
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

            {/* ── 3 · india history ─────────────────────────────────────────*/}
            <SectionHeading id="india-thread" level="Beginner" number={3}>The other ancient road: rules, zero and logic</SectionHeading>
            <p>
              While engineers in Greece and China built machines that moved, thinkers in India were building something that did not move at all: machines made of <em>rules</em>. They did not build computers, and it would be wrong to draw a straight line from a Sanskrit grammar to a chatbot. But three ideas that modern computing depends on, precise rules, a working zero and careful logic, each had remarkable early chapters in India. This section tells them as the sources we could open tell them, including the places where popular retellings go too far.
            </p>
            <h3>Rules: Pāṇini’s grammar</h3>
            <p>
              Start with a grammar. Pāṇini, who worked in the north-west of the subcontinent, wrote the <em>Aṣṭādhyāyī</em>, the “Eight Chapters”. Nobody knows exactly when. MacTutor, the mathematics-history archive of the University of St Andrews, calls the usual dates of about 520–460 BCE “pure guesses”, and reports that experts place him anywhere from the fourth to the seventh century BCE.<Cite slug={S} src="mathshistory.st-andrews.ac.uk/Biographies/Panini" /> What is clear is the ambition. In the words of a scholar MacTutor quotes: “On the basis of just under 4000 sutras [rules expressed as aphorisms], he built virtually the whole structure of the Sanskrit language.” The sentences and compound words are explained, MacTutor says, “as ordered rules operating on underlying structures”, and Pāṇini’s constructions are “similar to the way that a mathematical function is defined today.”<Cite slug={S} src="mathshistory.st-andrews.ac.uk/Biographies/Panini" />
            </p>
            <p>
              MacTutor goes further: Pāṇini “should be thought of as the forerunner of the modern formal language theory used to specify computer languages”, and his notation is “equivalent in its power” to the Backus Normal Form that John Backus discovered independently in 1959.<Cite slug={S} src="mathshistory.st-andrews.ac.uk/Biographies/Panini" /> Scholars do not all agree on how strong that comparison is. A 2021 paper by J. J. Lowe, published through Oxford’s research archive, argues that Pāṇini’s system looks context-sensitive on the surface but is held in check by a rule against cyclic application, “limiting the power of his superficially context-sensitive formalism in a way entirely parallel to much work in modern phonology.”<Cite slug={S} src="ora.ox.ac.uk/objects/uuid:4c35f59b" /> You do not need the technicalities to take the point: this was a rule system precise enough for modern linguists and computer scientists to argue about its formal power. That is a long way from “the world’s first programmer”, a slogan you will meet online, and a much more interesting fact.
            </p>
            <Callout kind="eli5">
              <p>Imagine a cookbook in which every rule says “if you have this, make that”, and a few rules say which rule wins when two apply. Pāṇini wrote a cookbook like that for a whole language. A modern AGENTS.md file, the note that gives a coding agent a project’s house rules (section 7), is a distant cousin in spirit: rules written down so that a reader who cannot guess can still follow them. The comparison is ours, not a claim of descent.</p>
            </Callout>
            <h3>Counting: Piṅgala’s metres</h3>
            <p>
              Next, counting. Piṅgala, around the second century BCE, wrote the <em>Chandaḥśāstra</em>, a treatise on Sanskrit poetic metres. According to the mathematician Jayant Shah’s history of his work, Piṅgala gave “procedures for listing all possible forms of an n-syllable meter and for indexing such a list”, and “an algorithm for calculating the binomial coefficients”. Shah calls it “a purely mathematical theory, apparently mathematics for its own sake”, and notes that Piṅgala “consistently uses recursion in his algorithms”, a tradition he traces from Pāṇini through Āryabhaṭa in the fifth century CE, who gave a recursive algorithm for a table of sines, to Mādhava in the fourteenth.<Cite slug={S} src="Pingala.pdf" />
            </p>
            <p>
              Because every syllable in a metre is either short or long, a list of all the metres of n syllables is, in modern eyes, a list of every string of two symbols, which is exactly what a binary counter does. That gloss is ours, and it is fair to admire it without claiming that Piṅgala invented computing. Shah himself reports a genuine scholarly dispute over whether Piṅgala’s last rule really describes the triangle we call Pascal’s.<Cite slug={S} src="Pingala.pdf" />
            </p>
            <h3>Zero: Brahmagupta’s rules, and a cautionary tale</h3>
            <p>
              Then, zero. In 628 CE Brahmagupta wrote the <em>Brāhmasphuṭasiddhānta</em> in 25 chapters, at Bhillamāla, which MacTutor identifies with today’s city of Bhinmal. MacTutor says his “understanding of the number systems went far beyond that of others of the period”. He “defined zero as the result of subtracting a number from itself”, and gave rules using “fortunes” (positive numbers) and “debts” (negative numbers), such as “A debt subtracted from zero is a fortune.”<Cite slug={S} src="mathshistory.st-andrews.ac.uk/Biographies/Brahmagupta" /> He also attempted division by zero, and here MacTutor is candid: “He is certainly wrong when he then claims that zero divided by zero is zero. However it is a brilliant attempt to extend arithmetic to negative numbers and zero.”<Cite slug={S} src="mathshistory.st-andrews.ac.uk/Biographies/Brahmagupta" /> A bug, as software people would say, in a very early draft of the rules.
            </p>
            <Figure number={4} caption="Left: numerals from the Bakhshālī manuscript as reproduced by A. F. R. Hoernle, public domain, via Wikimedia Commons; the dot at the far right is the zero. Right: an annotated copy of Pṛthūdhaka’s 10th-century commentary on Brahmagupta’s Brāhmasphuṭasiddhānta (628), British Library, public domain, via Wikimedia Commons.">
              <Pic file="bakhshali-numerals.jpg" alt="A row of hand-drawn numerals from the Bakhshali manuscript, labelled 1 to 9, ending in a solid dot labelled 0." width={1920} height={290} />
              <div className="mt-3">
                <Pic file="brahmagupta-commentary.jpg" alt="A page from a Sanskrit manuscript with lines of black handwriting on cream paper, with English notes in pencil in the margins." width={1004} height={361} />
              </div>
            </Figure>
            <p>
              You may also have read that a birch-bark manuscript from a village near Peshawar, the Bakhshālī manuscript, contains the world’s oldest zero, from the third or fourth century. That headline is now out of date, and the story is a good example of science correcting itself. Oxford’s report describes the manuscript as “notable for the number of zeros it contains”, found in 1881 and given to the Bodleian Library in 1902, with proposed dates over the years “ranging from as early as 200 CE to 1100 CE”. Its 2024 radiocarbon measurements on five folios give ranges between about 773 and 1032 CE, and the report explains that a second measurement on one folio “demonstrated that the initial determination was inaccurate.”<Cite slug={S} src="ora.ox.ac.uk/objects/uuid:5a6d1dd7" /> The honest statement today is narrower: the manuscript is, in Oxford’s words, “almost certainly the oldest extant witness of a South Asian mathematical work”, and its zeros are real, but it is not evidence of a third-century zero.
            </p>
            <Figure number={5} caption="A modern bas-relief of Brahmagupta in Shaheedi Park, Delhi, made from waste material. Photo: Pur 0 0, CC0, via Wikimedia Commons. No portrait of Brahmagupta survives, so this is an artist’s imagining.">
              <Pic file="brahmagupta-relief.jpg" alt="A large sculpted relief of a bearded seated figure in a park, made of rough recycled materials." width={1280} height={949} max="max-w-[520px]" />
            </Figure>
            <h3>Logic: from Nyāya to Navya-Nyāya</h3>
            <p>
              Finally, logic. Nyāya, “Logic”, is a school of Indian philosophy that spent close to two thousand years refining how we know things. In the fourteenth century Gaṅgeśa, who lived in north-eastern India, wrote its central text, the <em>Jewel</em> (<em>Tattvacintāmaṇi</em>), in four chapters devoted to four sources of knowledge: perception, inference, analogy and testimony. The Stanford Encyclopedia of Philosophy says he is traditionally taken to inaugurate “New” logic, Navya-Nyāya, but cautions that the line between old and new “is problematic”, since “at no time is there a decisive revolution”. Among his accomplishments it lists definitions of knowledge and of natural “pervasions” (<em>vyāpti</em>) as the underpinning of inference, and “crisp treatments of the major types of fallacy”.<Cite slug={S} src="plato.stanford.edu/entries/gangesa" />
            </p>
            <p>
              Some computer scientists have suggested that Navya-Nyāya’s exact language could inform knowledge representation, the way software stores facts and the relations between them. We could not open a source that shows how far that idea has been developed, so we offer it as an intriguing suggestion and not a settled lineage. What we can say is why it resonates in the agent era: a tradition that insists a conclusion be tied to its reasons is a good match for a world in which we want agents to show their work.
            </p>
            <Figure number={6} caption="India’s thread of rules, counting, zero and logic, as far as the sources we opened take it. Dates are debated where marked.">
              <IndiaThread />
            </Figure>
            <Figure number={7} caption="Popular claims about these ideas, checked against the sources we opened. A claim being stretched does not make the work any less remarkable.">
              <ClaimCheck />
            </Figure>
            <p>
              Whether or not the arrows run straight, the lesson for our story is worth keeping. Long before anyone built a thinking machine, people in India were working out how to write rules so precisely that a reader who cannot guess can follow them, how to count every possibility, how to give nothing a number, and how to tie a conclusion to its reasons. Those are the same habits that make an agent safe to work beside today. And the Bakhshālī story shows a further one: when the evidence changes, the honest answer changes with it.
            </p>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="boy" level="Beginner" number={4}>The boy who wrote, and the countess who doubted</SectionHeading>
            <p>
              By the late eighteenth century the tricks had become astonishing. Britannica shows an android of a child writing, made by Pierre Jaquet-Droz around 1772, now in the Musée d’Art et d’Histoire in Neuchâtel, Switzerland.<Cite slug={S} src="britannica.com" /> A boy sits at a desk with a quill pen, and, when set going, writes.
            </p>
            <Figure number={8} caption="Left: the Jaquet-Droz writing automaton, photographed in 2023. Photo: Gre regiment, CC BY-SA 4.0, via Wikimedia Commons. Right: a real screenshot of Britannica’s article on automata, captured on 30 September 2026, opening with Britannica’s photograph of the Jaquet-Droz child android. The page and its text belong to Britannica; shown here to document the source.">
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
            <Figure number={9} caption="A trial model of part of Charles Babbage’s Analytical Engine (1834–1871), Science Museum, London. Photo: Daderot, CC0, via Wikimedia Commons.">
              <Pic file="analytical-engine.jpg" alt="A brass and steel mechanism of many gears, wheels and rods mounted on a wooden base in a museum display." width={1280} height={853} />
            </Figure>
            <Figure number={10} caption="Left: Ada Lovelace, portrait by Margaret Sarah Carpenter, 1836, public domain, via Wikimedia Commons. Right: Alan Turing, photographed by Elliott &amp; Fry on 29 March 1951, public domain, via Wikimedia Commons.">
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
            <SectionHeading id="shakey" level="Beginner" number={5}>Shakey, the shaky genius</SectionHeading>
            <p>
              The first machine to bring these threads together was a wobbly box on wheels. SRI International, then a research institute in California, built Shakey between 1966 and 1972, and describes it as “the first mobile robot with the ability to perceive and reason about its surroundings.” It could plan, find routes, and rearrange simple objects. In 1970 <em>Life</em> magazine called it the “first electronic person”. It was inducted into Carnegie Mellon’s Robot Hall of Fame in 2004, and now lives at the Computer History Museum.<Cite slug={S} src="sri.com" />
            </p>
            <Figure number={11} caption="Shakey the robot, photographed at the Computer History Museum. Photo: The wub, CC BY-SA 4.0, via Wikimedia Commons; the photo is dated 15 July 2023 on Commons, and the caption there says 1969 for the robot.">
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
            <Figure number={12} caption="Three eras of machine helpers. The dividing lines are our simplification.">
              <ThreeEras />
            </Figure>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="acting" level="Beginner" number={6}>From answering to acting</SectionHeading>
            <p>
              For a few years, the AI most people met was an <strong>assistant</strong>: you type, it replies. Gartner, the research firm, is precise about what that is and is not. AI assistants, it says, “simplify tasks and interactions for users but depend on human input and do not operate independently.” They are “the precursor to agentic AI.”<Cite slug={S} src="2025-08-26" />
            </p>
            <p>
              An <strong>agent</strong> is the next step. Gartner’s wording: “Adding task specialization capabilities evolves AI assistants into AI agents. These AI agents have the capacity to operate and perform complex, end-to-end tasks.” Its example is a cybersecurity agent that scans network traffic, system logs and user behaviour in real time, then “assesses and initiates a response as appropriate.”<Cite slug={S} src="2025-08-26" />
            </p>
            <Figure number={13} caption="Assistant or agent, side by side. The distinction follows Gartner’s definitions; the wording of each row is our own.">
              <AssistantVsAgent />
            </Figure>
            <p>
              Gartner also warns about a marketing trap. “The most common misconception is referring to these AI assistants as agents,” it says, “a misunderstanding known as ‘agentwashing.’”<Cite slug={S} src="2025-08-26" /> It is a useful phrase to keep in your pocket. If a product only answers questions, it is an assistant, however grandly it is named.
            </p>
            <h3>How an agent works, in five beats</h3>
            <p>
              Under the hood, agents follow Shakey’s old rhythm. You give a goal. The agent breaks it into steps. It uses tools to carry them out: a calendar, a spreadsheet, a search, another program. It checks whether the result is what you wanted, adjusts, and tries again. And at the moments that matter, such as sending, paying or sharing, it stops and asks you.
            </p>
            <Figure number={14} caption="The goal-driven loop, in our own drawing. Which steps need your approval is your choice, and the section on risks explains how to set it.">
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
            <SectionHeading id="plumbing" level="Intermediate" number={7}>The plumbing of teamwork</SectionHeading>
            <p>
              A clever agent is not much use if it cannot reach your files, your calendar or your company’s systems. For a while, every connection was hand-built. On 25 November 2024, Anthropic, the maker of Claude, described the problem in one sentence: “Every new data source requires its own custom implementation, making truly connected systems difficult to scale.” Its answer was the <strong>Model Context Protocol</strong> (MCP), “a new standard for connecting AI assistants to the systems where data lives, including content repositories, business tools, and development environments.” Block and Apollo were named among the early adopters.<Cite slug={S} src="anthropic.com/news/model-context-protocol" />
            </p>
            <Figure number={15} caption="A real screenshot of Anthropic’s announcement of MCP, captured on 30 September 2026 and cropped above a cookie banner. The page belongs to Anthropic; shown here to document the source.">
              <Pic file="shot-mcp.jpg" alt="Screenshot of Anthropic’s page titled Introducing the Model Context Protocol, dated Nov 25, 2024, with an orange illustration of white paper-cut shapes." width={1280} height={560} />
            </Figure>
            <p>
              The easiest way to picture it is a wall socket. Before standard sockets, every appliance came with its own plug and every house needed its own wiring. With one standard, any appliance works in any room.
            </p>
            <Figure number={16} caption="Why a standard plug matters, with made-up apps and tools to show the arithmetic.">
              <PlugFigure />
            </Figure>
            <p>
              About four and a half months later, on 9 April 2025, Google introduced a companion idea: <strong>Agent2Agent</strong> (A2A), for agents to talk to <em>each other</em>. Its announcement calls A2A “an open protocol that complements Anthropic’s Model Context Protocol (MCP), which provides helpful tools and context to agents.” Its example is a hiring manager who asks their agent to find candidates for a role. That agent collaborates with specialised agents to source candidates, presents suggestions, then coordinates more agents to schedule interviews and facilitate background checks.<Cite slug={S} src="developers.googleblog.com" />
            </p>
            <Figure number={17} caption="Google’s hiring example, drawn as a manager agent and its specialists. The example is Google’s; the drawing is ours.">
              <ManagerAgent />
            </Figure>
            <Figure number={18} caption="A real screenshot of Google’s announcement of A2A, captured on 30 September 2026. The page belongs to Google; shown here to document the source.">
              <Pic file="shot-a2a.jpg" alt="Screenshot of the Google for Developers blog post Announcing the Agent2Agent Protocol (A2A), dated April 9, 2025, with four named authors and a banner with small robot icons linked in a network." width={1280} height={860} />
            </Figure>
            <p>
              Standards work best when nobody owns them. On 9 December 2025, the Linux Foundation announced the <strong>Agentic AI Foundation</strong>, anchored by three founding contributions: Anthropic’s MCP, Block’s goose, and OpenAI’s AGENTS.md. Its platinum members are Amazon Web Services, Anthropic, Block, Bloomberg, Cloudflare, Google, Microsoft and OpenAI. At that point, it reported, there were “more than 10,000 published MCP servers”, and AGENTS.md, a simple file that gives coding agents a project’s house rules, had been adopted by more than 60,000 open source projects. MCP itself had been taken up by Claude, Cursor, Microsoft Copilot, Gemini, VS Code and ChatGPT.<Cite slug={S} src="linuxfoundation.org" />
            </p>
            <Figure number={19} caption="A real screenshot of the Linux Foundation’s announcement, captured on 30 September 2026 and cropped above a consent banner. The page belongs to the Linux Foundation; shown here to document the source.">
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
            <SectionHeading id="jobs" level="Intermediate" number={8}>Who is on the job today</SectionHeading>
            <p>
              So what are agents actually doing? The honest answer has two halves: a growing list of real examples, and a lot of forecasting that should be read as forecasting. We will keep the two apart.
            </p>
            <Figure number={20} caption="Where agents are being put to work, or shown at work, in the sources we cite. Some are products, some are examples; each card says whose it is.">
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
            <Figure number={21} caption="A real screenshot of Anthropic’s Novo Nordisk case study, captured on 30 September 2026 and cropped above a cookie banner. The page belongs to Anthropic; shown here to document the source.">
              <Pic file="shot-novo.jpg" alt="Screenshot of the Claude customer story titled Novo Nordisk accelerates clinical documentation and drug development with Claude." width={1280} height={520} />
            </Figure>
            <p>
              Novo built a platform called NovoScribe, with Claude Code, on Amazon Bedrock and MongoDB Atlas. It combines retrieval of expert-approved text with the details of each case to draft regulatory documents. The headline claim: time spent producing clinical study documentation fell “from 10+ weeks to 10 minutes.” A Novo director is quoted saying Claude cut writing times on these reports by 90% “so we can get documentation directly into human hands for review and approval.”<Cite slug={S} src="claude.com/customers" />
            </p>
            <Figure number={22} caption="Before and after, as reported in Anthropic’s case study. Note the last box: a person still reviews and approves.">
              <NovoBeforeAfter />
            </Figure>
            <Callout kind="warn" title="A vendor’s own case study">
              <p>This is Anthropic describing a customer of its own product, and we could not check the numbers independently. It is a good example of what agents are <em>reported</em> to do, and an equally good example of the pattern that runs through all of the evidence: the agent drafts, and a human decides. Notice the closing words of the quote: “review and approval”.</p>
            </Callout>
            <h3>How fast is this spreading?</h3>
            <p>
              Here we have to be careful, because forecasts are easy to mistake for facts. In August 2025 Gartner predicted that “40% of enterprise applications will be integrated with task-specific AI agents by the end of 2026, up from less than 5% today.” That is a prediction, made a year ago, not a measurement of what has happened. It came with a five-stage picture of where agentic AI is heading, which we show below.<Cite slug={S} src="2025-08-26" />
            </p>
            <Figure number={23} caption="Gartner’s five stages of agentic AI in enterprise applications, condensed. All dates are Gartner’s predictions.">
              <GartnerStairs />
            </Figure>
            <p>
              Gartner’s most optimistic scenario is that agentic AI could drive approximately 30% of enterprise application software revenue by 2035, surpassing $450 billion, up from 2% in 2025. It is a “best case” figure and should be read that way.<Cite slug={S} src="2025-08-26" />
            </p>
            <Callout kind="deep" title="Why forecasts and reports differ">
              <p>Analysts predict; companies report their best results; surveys ask people what they think. None is the same as an independent count of what is working. When you read “80% of organisations see a return” or “40% of apps will have agents”, ask three questions: who asked, who was in the sample, and is this a prediction or a measurement? Every number in this article is labelled on those lines.</p>
            </Callout>

            <p>
              In the next section we meet six of these agents up close.
            </p>

            {/* ── 8 · six agents ────────────────────────────────────────────*/}
            <SectionHeading id="meet" level="Intermediate" number={9}>Six agents you can meet today</SectionHeading>
            <p>
              Theory is useful; a name and a face are better. Here are six working agents from six corners of the working day: engineering, customer service, sales, the desktop, company knowledge, and the always-on chief of staff. For each we say what its maker describes, how it works, what it reportedly achieves, and where to look twice. They are a spread of <em>kinds</em>, not a league table, and they change fast, so check the maker’s page before you decide anything.
            </p>
            <Callout kind="warn" title="How to read the numbers in this section">
              <p>Every statistic below is a claim by the maker, or by a customer the maker has chosen to quote, published on the maker’s own site. We have not tested these products, and we did not find independent measurements of them in the sources we read. Read each as “what the maker says”, which is useful, and not as “what will happen to you”, which it cannot be.</p>
            </Callout>

            <h3>1. Devin: the engineer that tests its own work</h3>
            <p>
              Cognition’s Devin is the agent many people picture when they hear “AI software engineer”. Its home page puts it plainly: “Devin runs in the cloud or on your machine, tests in its own browser, and won’t stop until the PR is ready to merge.”<Cite slug={S} src="https://devin.ai/" /> (A PR, or pull request, is a proposed change to a codebase that a colleague reviews before it goes in.)
            </p>
            <Figure number={24} caption="A real screenshot of Devin’s home page, captured on 30 September 2026. It shows Cognition’s own example: a session that added single sign-on to an app and opened a pull request. The page belongs to Cognition; shown here to document the source.">
              <Pic file="shot-devin.jpg" alt="Screenshot of the Devin home page headed Meet Devin, your team’s autonomous software engineer, with a demo showing a chat session, a list of sessions and an open pull request titled Add enterprise SSO." width={1280} height={860} />
            </Figure>
            <p>
              The company says Devin “spins up its own Windows, Mac, and Linux virtual machines as needed to build, test in its browser, and record itself clicking through what it built.” Hand it a big task and it “splits it across parallel cloud agents, manages them, and reports back”, even “when your laptop is closed”. You can tag @Devin in Slack or Teams, where it “reads the thread, responds to follow-ups, and gets to work”, and you can set up automations so that it “handles bugs, failed CI, and other alerts as they land.” (CI, or continuous integration, is the set of automatic checks that run on every change.)<Cite slug={S} src="https://devin.ai/" />
            </p>
            <p>
              What is it good at? Cognition’s documentation calls Devin “an autonomous AI software engineer that can write, run and test code” and offers an honest rule of thumb: “if you can do it in three hours, Devin can most likely do it.” Its list of strengths is practical rather than grand: tickets from Linear or Jira, bug reports, code migrations and refactors, framework upgrades, unit tests, pull-request review and documentation.<Cite slug={S} src="docs.devin.ai" />
            </p>
            <p>
              The same page is candid about the human’s job, which is to brief and to check: “Write clear prompts with explicit completion criteria”, and “Make tasks easy to verify—e.g. checking that CI passes.”<Cite slug={S} src="docs.devin.ai" /> That is the delegation card from earlier in this article in engineering dress. Notice, too, where the work ends: a change that is “ready to merge”. Some retellings of tools like this say they push fixes live “completely unsupervised”. Cognition’s own pages describe something narrower and wiser: work that arrives as a pull request, with automated checks, for people to review.
            </p>
            <Figure number={25} caption="Devin at a glance. The first four rows summarise Cognition’s own pages; the last two are our reading.">
              <AgentFacts
                tone="c"
                name="Devin (Cognition)"
                rows={[
                  ["What it is", "An “autonomous software engineer” (Cognition’s words)"],
                  ["Works in", "Its own cloud virtual machines and browser; also on your machine; Slack and Teams"],
                  ["Good at", "Bug tickets, migrations, tests, pull-request review, documentation"],
                  ["Human gate", "A pull request “ready to merge”; clear completion criteria; easy-to-verify tasks"],
                  ["A good first job (ours)", "One well-described bug that already has a failing test"],
                  ["Look twice at (ours)", "The “three hours” rule is a rule of thumb from the maker, not a guarantee"],
                ]}
              />
            </Figure>

            <h3>2. Salesforce Agentforce: the agent that lives inside the customer system</h3>
            <p>
              Salesforce calls Agentforce “the AI agent platform that delivers 24/7 autonomous support at enterprise scale”, and its pitch is a clean one: “Lose the rigid chatbots and hold times. Extend agents anywhere customers are: On the web, on the phone, or in apps. Let humans do what they do best, and let Agentforce do the rest.”<Cite slug={S} src="salesforce.com" />
            </p>
            <Figure number={26} caption="A real screenshot of Salesforce’s Agentforce page (India edition), captured on 30 September 2026. On the right, the page’s own AI assistant, Piper, carries the notice “Piper is an AI and can make mistakes” and says the conversation will be recorded. The page belongs to Salesforce; shown here to document the source.">
              <Pic file="shot-agentforce.jpg" alt="Screenshot of the Salesforce Agentforce page with the headline Drive more revenue with Agentforce on a dark blue background, and a chat panel from an AI assistant named Piper on the right." width={800} height={537} />
            </Figure>
            <p>
              The page lists six kinds of job: customer service (“answering questions, resolving cases, managing orders and troubleshooting issues”), employee support, appointment scheduling, sales development (“autonomously answering product questions, handling objections and booking meetings for sales reps”), product recommendation and event support. Each is a narrow role with a clear finish line, which is exactly what the evidence in this article says agents do best.<Cite slug={S} src="salesforce.com" />
            </p>
            <p>
              The platform side is where Salesforce is most specific. An Agent Builder lets a team “configure Agentforce, Subagents, Actions, and Instructions in a few clicks”; Agent Script “gives builders precise control to create business-ready agents that deliver reliable results”; Agentforce Voice brings the same agents to phone calls; Observability lets you “monitor, analyse, and optimise agent performance in near real time”; MCP support connects agents to outside tools; and Multi-Agent Orchestration lets you “build a collaborative AI agent team”. You have met the last two ideas earlier in this article, in the plumbing section. Salesforce also says that “over 18K companies already run on Agentforce”, which is the company’s own count.<Cite slug={S} src="salesforce.com" />
            </p>
            <p>
              What about the human gate? Salesforce’s FAQ describes agents that handle tasks “proactively within set guardrails” and that, “when faced with complex issues beyond their scope, they can escalate the matter to human agents.”<Cite slug={S} src="salesforce.com" /> There is a lesson in the design. An agent that lives inside a company’s customer system can only reach what that system lets it reach, which makes its limits easier to set and to inspect. That is our reading, not Salesforce’s claim, but it is a good rule of thumb for any agent you deploy: the smaller and clearer its world, the easier it is to trust.
            </p>
            <Figure number={27} caption="Agentforce at a glance, from Salesforce’s own page, plus two rows that are our reading.">
              <AgentFacts
                tone="v"
                name="Agentforce (Salesforce)"
                rows={[
                  ["What it is", "An AI agent platform for sales, service, HR and more"],
                  ["Works in", "Salesforce, on the web, the phone and in apps"],
                  ["Good at", "Cases, customer questions, appointments, lead follow-up, help desks"],
                  ["Human gate", "Set guardrails; escalation to human agents; observability tools"],
                  ["A good first job (ours)", "Answering the ten questions your customers ask most"],
                  ["Look twice at (ours)", "“Over 18K companies” is Salesforce’s own count; ask for references in your industry"],
                ]}
              />
            </Figure>

            <h3>3. 11x: the digital sales development rep</h3>
            <p>
              11x’s slogan is “Digital Workers, Human Results”. Its site names two workers: Alice, whom customers quote as handling outbound prospecting, and Julian, which answers inbound calls.<Cite slug={S} src="11x.ai" />
            </p>
            <Figure number={28} caption="A real screenshot of the 11x home page, captured on 30 September 2026. The page belongs to 11x; shown here to document the source.">
              <Pic file="shot-11x.jpg" alt="Screenshot of the 11x home page with the headline Digital Workers, Human Results over a photograph of two astronauts walking across a rocky red desert." width={1280} height={860} />
            </Figure>
            <p>
              The platform, as described on the page, works in four beats. <strong>Identify:</strong> “Filter millions of signals across 50+ data sources to surface buyers who match your ICP” (ICP means ideal customer profile). <strong>Research:</strong> “Enrich every prospect automatically, from company news and tech stack to org changes and competitive signals.” <strong>Personalize:</strong> “Every message is written for your specific prospect. No templates or generic pitches.” <strong>Engage:</strong> “Run multi-channel sequences across email, phone, chat, social networks, SMS and WhatsApp. Every channel picks up where the last left off.”<Cite slug={S} src="11x.ai" /> Read those four beats slowly and you will see the same loop as in section 6: plan, act, check, hand back.
            </p>
            <p>
              The results on the page are worth reading with care, because of who says them. The site shows figures such as “1.5x increase in qualified meetings”, “$1M+ pipeline generated in first 3 months” and “35% of pipeline generated by 11x within first 3 months”, alongside quotes from customers: one says qualified meetings rose “5x”, another reports “a 9.7% reply rate for outbound emails … nearly double the industry average”, another says it is “converting over 50% of demos to subscriptions”.<Cite slug={S} src="11x.ai" /> These are testimonials that 11x chose to publish. They show what is possible, not what is typical.
            </p>
            <p>
              A note on manners, because an agent that writes to strangers at scale carries a different kind of risk from one that drafts your own email. Unsolicited messaging is regulated differently in different countries, and people rightly resent being spammed by machines. A sound practice for any outreach agent is to be honest that a message is automated, to respect opt-outs at once, and to keep a person responsible for who is contacted and why. Take your own advice on the rules where you operate.
            </p>
            <Figure number={29} caption="11x at a glance, from its own page, plus two rows that are our reading.">
              <AgentFacts
                tone="a"
                name="11x"
                rows={[
                  ["What it is", "“Digital workers” for sales, RevOps and marketing teams"],
                  ["Works in", "Email, phone, chat, social networks, SMS and WhatsApp"],
                  ["Good at", "Finding and researching prospects, personalised outreach, answering inbound calls"],
                  ["Human gate", "Not detailed on the page we read; ask the vendor how approvals and opt-outs work"],
                  ["A good first job (ours)", "Reviving a list of old leads with messages a person has approved"],
                  ["Look twice at (ours)", "Every headline result is a chosen customer quote, not an independent test"],
                ]}
              />
            </Figure>

            <h3>4. Claude Cowork: the agent that works across your files and apps</h3>
            <p>
              Anthropic describes Claude Cowork in three sentences: “Claude Cowork completes tasks you can steer from anywhere. Give it a goal, and it works across your files and tools. You come back to polished work for your review.” (Claude is Anthropic’s AI; we also have a <Link href="/how-to-use-claude">beginner’s guide to using Claude</Link>.)
            </p>
            <Figure number={30} caption="A real screenshot of Anthropic’s Claude Cowork page, captured on 30 September 2026 and cropped above a cookie banner. The page belongs to Anthropic; shown here to document the source.">
              <Pic file="shot-cowork.jpg" alt="Screenshot of the Claude Cowork page with the headline The work behind your best work and the text Claude Cowork completes tasks you can steer from anywhere." width={1280} height={550} />
            </Figure>
            <p>
              Cowork is worth a careful look because Anthropic’s help pages are unusually specific about how it is built, and the details matter. Sessions can run in the cloud or on your own computer. In a cloud session, “the agent loop and code execution run in an isolated, temporary sandbox on Anthropic-managed infrastructure”. In a local session, “the agent loop runs natively on the device”, with access “gated by an application-layer permission system” that enforces your connected-folder rules, and “code execution runs in an isolated virtual machine (VM)”: “a dedicated Linux VM, isolated from the host operating system by the platform’s hypervisor.”<Cite slug={S} src="14479288" />
            </p>
            <p>
              Then comes the distinction that many summaries blur. When there is no direct connector to a tool, Claude can use your computer as a person would: “clicking, typing, and navigating your screen.” And for that, Anthropic says plainly: “Computer use has no sandbox between Claude and your applications.” Its safeguards are per-app permissions (“Claude asks before accessing each application”), a blocklist, some sensitive apps blocked by default, and an action review that “scans for signs of prompt injection”. It adds a caution that we would like every agent maker to copy: “this capability is still early, and attacks are constantly evolving—stay cautious.”<Cite slug={S} src="14128542" />
            </p>
            <p>
              In short: code runs in a VM; computer use does not. Anthropic advises against using computer use for “managing financial accounts or investments”, “handling legal documents or contracts”, “processing medical or health information” and “interacting with apps containing personal information of others”, and recommends starting “with simple tasks like research or organizing rather than complex multi-step workflows.” It was available on Pro and Max plans only when we read the page, on macOS and Windows, and it is in beta.<Cite slug={S} src="14128542" />
            </p>
            <Figure number={31} caption="Claude Cowork at a glance, from Anthropic’s pages, plus two rows that are our reading.">
              <AgentFacts
                tone="g"
                name="Claude Cowork (Anthropic)"
                rows={[
                  ["What it is", "A task agent: “Give it a goal, and it works across your files and tools”"],
                  ["Works in", "Claude Desktop, folders you connect, connectors, a built-in browser; computer use (beta)"],
                  ["Good at", "Multi-step document and desktop work; Anthropic suggests starting with research or organising"],
                  ["Human gate", "Per-app permission, blocklist, action review, a VM for code; you can stop it at any point"],
                  ["A good first job (ours)", "Organise a folder of downloads and summarise what is in it"],
                  ["Look twice at (ours)", "Computer use has no sandbox: keep banking, health and legal apps closed"],
                ]}
                note="Made by Anthropic. MSRX is independent of Anthropic."
              />
            </Figure>

            <h3>5. Glean: the company’s memory, with permissions attached</h3>
            <p>
              Glean sells what it calls enterprise AI “that understands your company”. Its headline: “Complete context that makes AI work at enterprise scale.” The demo question on its home page is the kind a busy manager actually asks: “What changed last week that’s hitting support, sales, and churn?”, answered from tools such as Slack, Google Drive, Jira, Confluence, SharePoint, GitHub and Salesforce.<Cite slug={S} src="https://www.glean.com/" />
            </p>
            <Figure number={32} caption="A real screenshot of Glean’s home page, captured on 30 September 2026 and cropped above a cookie banner. The page belongs to Glean; shown here to document the source.">
              <Pic file="shot-glean.jpg" alt="Screenshot of the Glean home page with the headline Complete context that makes AI work at enterprise scale and a search box listing connected apps such as Google Drive, Jira, Confluence, SharePoint, GitHub and Salesforce." width={1280} height={590} />
            </Figure>
            <p>
              The idea behind it is simple and powerful: an agent is only as good as the context it can see. A general assistant knows the internet; Glean’s pitch is an agent that also knows <em>your</em> documents, tickets and chats. Its agents page describes “an agentic engine” that lets agents “reason through tasks, plan next steps, and take action using enterprise context”, an agent builder for “reasoning-based agents and complex workflows”, orchestration that will “trigger agents from key events, route tasks between agents, and connect to external systems”, and “275+ app connectors for personalized and permissions-enforced enterprise search.”<Cite slug={S} src="https://www.glean.com/ai-agents" />
            </p>
            <p>
              The phrase to hold on to is <strong>permissions-aware</strong>. Imagine a company brain that could read everything, including the salary spreadsheet and the private legal memo, and answer anyone’s questions from it. That would be a disaster. Glean says the opposite: “Users only see what they’re allowed to see.” It also promises “full observability”: “Track every query, answer, and action.” The site lists compliance credentials including ISO 42001, HIPAA, TX-RAMP Level 2, SOC 2 Type II, ISO 27001 and GDPR, which are the company’s own statements; for the last, the audit reports are what to ask for.<Cite slug={S} src="https://www.glean.com/" /> Its agents page adds monitoring of “adoption, error rates, upvotes, downvotes, and ROI”, so that owners can “double-down on what’s working and fix what isn’t.”<Cite slug={S} src="https://www.glean.com/ai-agents" />
            </p>
            <Figure number={33} caption="Glean at a glance, from its own pages, plus two rows that are our reading.">
              <AgentFacts
                tone="r"
                name="Glean"
                rows={[
                  ["What it is", "An enterprise AI platform with search, an assistant and agents built on your company’s context"],
                  ["Works in", "Your company’s connected work apps (Slack, Drive, Jira, Confluence, SharePoint, GitHub, Salesforce and more)"],
                  ["Good at", "Pulling scattered files and chats into one answer, brief or research summary"],
                  ["Human gate", "Permission-aware access; every query, answer and action tracked; agent governance"],
                  ["A good first job (ours)", "“Summarise everything we know about customer X, with links”"],
                  ["Look twice at (ours)", "An agent that reads everything is only as safe as your permissions are tidy: tidy them first"],
                ]}
              />
            </Figure>

            <h3>6. OpenAI dots: the always-on chief of staff</h3>
            <p>
              The newest of the six arrived on 29 September 2026. OpenAI calls dots “remarkably capable, always-on agents built to handle everything.” They are, it says, “frontier intelligence that have your back”: “Powered by GPT‑6 Astra, they have their own cloud computer, learn from feedback over time, and can work towards your goals 24/7. Through our ecosystem of plugins, they can readily connect to over 4,000 apps.”<Cite slug={S} src="openai.com/index/introducing-dots" />
            </p>
            <Figure number={34} caption="The dots logo and characters, from launch artwork supplied to MSRX. We have not matched this image to a specific file on OpenAI’s announcement page; the artwork belongs to its creator.">
              <Pic file="dots-artwork.webp" alt="The word dots in glowing white and rainbow lettering on a black background, above four fuzzy cartoon characters: a blue blob wearing a black beret, a green frog, a yellow triangle with round glasses and closed eyes, and a pink heart in round sunglasses." width={1280} height={857} />
            </Figure>
            <p>
              You reach a dot through ChatGPT, Slack or Teams, or “hop on a voice call”. You start with a “primary dot”, give it a name and make it your own, and OpenAI says it envisions “teams of dots working together” later. The company’s picture of a good day: “A bug appears in Slack, and dots immediately start investigating. A new design arrives, and dots turn it into a working app while the team focuses on customer feedback.” And the example we like best is a small one: “an early tester’s dot noticed he’d forgotten to invoice a publication, prepared the invoice, and sent it after his approval.”<Cite slug={S} src="openai.com/index/introducing-dots" /> Notice the last four words. Even the marketing example has a human gate in it.
            </p>
            <Figure number={35} caption="A real screenshot of OpenAI’s announcement, captured on 30 September 2026 and cropped above a cookie banner. The page belongs to OpenAI; shown here to document the source.">
              <Pic file="shot-dots-official.jpg" alt="Screenshot of the OpenAI page titled Introducing dots, dated September 29, 2026, with a grey-blue ring icon above the title." width={800} height={455} />
            </Figure>
            <p>
              On safety, OpenAI’s companion post says each dot works on its own cloud computer, separate from the user’s, and that supported website sign-ins keep passwords out of the model’s context. While you are not working with a dot, it can do “proactive research” with read-only tools that, OpenAI says, cannot send messages, change app content or control a browser or computer. Before actions such as sending emails or changing files, a separate system called Auto-review checks the planned steps against your instructions, your Custom Rules and safety requirements. Purchases with saved cards need your approval, permanently deleting data needs confirmation every time, and changing a password or moving money between financial accounts is handed back to you.<Cite slug={S} src="how-we-build-safety" /> OpenAI adds: “Dots can still make mistakes, so always review consequential work.”<Cite slug={S} src="openai.com/index/introducing-dots" />
            </p>
            <p>
              Availability, according to OpenAI: rolling out across Pro, Business Premium and Enterprise plans in eligible markets, with the first dot included in the plan “at no extra cost”.<Cite slug={S} src="openai.com/index/introducing-dots" /> It is a day old as we write. We found no independent testing of dots in the sources we read, and our <a href={`${NEWS}/openai-launches-dots`}>news brief</a> records one live-demo hiccup reported by an attendee, so treat the rest as promise, not proof. It arrived weeks after Meta’s Muse, which we cover in <Link href={`/${muse.slug}`}>our article</Link>.
            </p>
            <Figure number={36} caption="Dots at a glance, from OpenAI’s pages, plus two rows that are our reading.">
              <AgentFacts
                tone="c"
                name="dots (OpenAI)"
                rows={[
                  ["What it is", "“Always-on agents built to handle everything”, powered by GPT‑6 Astra"],
                  ["Works in", "Its own cloud computer and browser; ChatGPT, Slack, Teams; 4,000+ apps through plugins"],
                  ["Good at", "Ongoing projects: investigating bugs, preparing documents and invoices, keeping a plan in sync"],
                  ["Human gate", "Auto-review; approval for purchases; deletions confirmed; password changes and money moves handed back"],
                  ["A good first job (ours)", "Weekly: watch a shared inbox and prepare the follow-ups for your approval"],
                  ["Look twice at (ours)", "Brand new, with no independent testing found; start on the lowest rungs of the permission ladder"],
                ]}
                note="Made by OpenAI. MSRX is independent of OpenAI."
              />
            </Figure>

            <h3>Choosing between them</h3>
            <p>
              Put the six side by side and a pattern appears. They differ in <em>where</em> they work (a cloud computer, a customer system, your desktop, your company’s knowledge), in <em>who</em> they serve (an engineer, a service team, a sales team, an individual, a whole organisation), and in <em>how</em> they hand control back. What they share is the loop you met in section 6, and, in every case that we could read, a stated place where a person approves, reviews or takes over.
            </p>
            <Figure number={37} caption="Six agents at a glance. Every cell summarises the maker’s own words; the columns and the “best first job” are our own.">
              <AgentsCompare />
            </Figure>
            <p>
              Before you choose any agent, ask five questions. <strong>What job is it for?</strong> Narrow beats vague. <strong>What can it touch?</strong> List the files, apps and accounts, and remove what it does not need. <strong>Who approves what?</strong> Decide which steps need your yes, using the permission ladder in section 14. <strong>Can I see the trail?</strong> If you cannot read what it did, you cannot check it. <strong>What does a mistake cost?</strong> If the answer is “a lot”, keep a human in the loop or choose a different job.
            </p>
            <p>
              And a word about what is <em>not</em> on this list. There are many more agents than six, in every field, and new ones every week. Do not read the omission of a product as a judgement on it. Read the six as six doors into the same room.
            </p>

            {/* ── 10 · india today ──────────────────────────────────────────*/}
            <SectionHeading id="india-today" level="Intermediate" number={10}>Agents in India today: from a village WhatsApp to UPI</SectionHeading>
            <p>
              India is a good place to watch this story unfold, because the hard problems here are the everyday ones: many languages, patchy connectivity, and services that have to work for people who have never used an app to ask for help. The four examples below are different in kind, from a village chatbot to an agent that may one day pay your bills, and each teaches something about doing this well. As before, we say who is making each claim.
            </p>
            <h3>Jugalbandi: a “chatbot plus plus”, in a Haryana village</h3>
            <p>
              In May 2023 Microsoft’s Source Asia published a feature from Biwan, a farming village in Haryana about two hours by car south of New Delhi. One farmer needed help applying for pensions for his aged parents. Another wanted to know why his government assistance payments had stopped. A university student needed a scholarship. “They all turned to Jugalbandi”, the report says, a generative AI chatbot for government assistance that “can understand questions in multiple languages, whether spoken or typed.”<Cite slug={S} src="news.microsoft.com/source/asia" />
            </p>
            <Figure number={38} caption="A real screenshot of Microsoft Source Asia’s feature on Jugalbandi, captured on 30 September 2026. The page and its photograph belong to Microsoft; shown here to document the source.">
              <Pic file="shot-jugalbandi.jpg" alt="Screenshot of a Microsoft Source Asia article dated 23 May 2023 titled With help from next-generation AI, Indian villagers gain easier access to government services, with a photograph of two men in white kurtas looking at a phone in a ploughed field." width={1280} height={860} />
            </Figure>
            <p>
              The pipeline is a good picture of how such tools work. A villager sends text or a voice note on WhatsApp; AI4Bharat’s speech recognition turns it into text; a Bhashini model translates it to English; a GPT model, through Azure OpenAI Service, finds the relevant government programme; and the answer travels back, spoken in the villager’s language. At the time it covered 10 of India’s 22 official languages and 171 of roughly 20,000 government programmes. An AI4Bharat officer called it “chatbot plus plus because it’s like a personalized agent”, and the honesty of its builders is worth quoting: “Sometimes these models do make errors. They are probabilistic machines... People still play an important role to see what works and what doesn’t work.”<Cite slug={S} src="news.microsoft.com/source/asia" /> That is the article you are reading in one sentence.
            </p>
            <h3>FarmerChat: advice with a human check</h3>
            <p>
              A more recent example is FarmerChat, from Digital Green. Rural Voice reported on 3 August 2026 that Digital Green India had announced that the assistant had “crossed 10 lakh users in India since its launch in October 2024”, alongside a redesigned FarmerChat 2.0. Farmers ask by voice, photo or text, in five languages, about crop planning, pests and diseases, livestock care, weather and inputs, and the app now suggests the questions a farmer should be asking for their crop, place and season.<Cite slug={S} src="eng.ruralvoice.in" />
            </p>
            <Figure number={39} caption="A real screenshot of Rural Voice’s report on FarmerChat, captured on 30 September 2026 and cropped to the headline. The page belongs to Rural Voice; shown here to document the source.">
              <Pic file="shot-farmerchat-news.jpg" alt="Screenshot of a Rural Voice news article headlined Digital Green’s AI Farming Assistant Crosses 10 Lakh Users, published Aug 3, 2026." width={800} height={320} />
            </Figure>
            <p>
              What stands out is how it is kept honest. The report says the assistant combines fine-tuned language models with retrieval from expert-validated datasets and feedback from people, and adds: “its outputs are not left unchecked: local agronomists and veterinarians regularly validate the responses farmers receive, feeding corrections back into the models.” The figures reported from Digital Green are striking, and they are the organisation’s own: in-person advice can cost about ₹3,300 per farmer a year and FarmerChat has brought that to ₹33; more than 30 lakh queries answered; women about 45% of users; and, according to a third-party evaluation by 60 Decibels, around 60% of active users act on the advice and 91% report greater confidence in their decisions.<Cite slug={S} src="eng.ruralvoice.in" /> FarmerChat is an advice assistant rather than an agent that acts on a farmer’s behalf, but it shows the pattern good agents will need: a narrow job, local knowledge, and people checking the answers.
            </p>
            <h3>Sarvam: voice agents in Indian languages</h3>
            <p>
              Sarvam, a Bengaluru company, describes itself as “India’s Full-Stack Sovereign AI Platform”. Its products include voice agents, content and document agents, and work agents, and its site lists text-to-speech in 11 Indic languages, speech recognition in 12, and translation across 23.<Cite slug={S} src="https://www.sarvam.ai/" /> Its voice-agent page pitches “one platform to build, launch and scale voice agents that carry your customer context into every call”, agents that “call APIs during a live conversation” and “move from answers to completed actions”.<Cite slug={S} src="products/voice-agents" />
            </p>
            <Figure number={40} caption="A real screenshot of Sarvam’s voice-agents page, captured on 30 September 2026 and cropped above a cookie banner. The page belongs to Sarvam; shown here to document the source.">
              <Pic file="shot-sarvam.jpg" alt="Screenshot of the Sarvam voice agents page with the headline Voice agents that sound human and deliver results and a Start building button." width={1280} height={615} />
            </Figure>
            <p>
              The page claims “350M+ conversations”, latency under 500 milliseconds and “under 5 minutes to go live”, and quotes Tata Capital’s chief digital officer: “We are reaching more customers with greater relevance, breaking access barriers, and deepening engagement.” All of that is Sarvam’s own material. It is worth noticing, too, that Sarvam’s home page puts “human at the core”: it says forward-deployed engineers “work alongside your teams to deliver production-ready agents”.<Cite slug={S} src="products/voice-agents" /> A phone call in your own language, answered at any hour, is one of the clearest ways an agent could help millions of people, and also one where a person should always be reachable when the conversation goes wrong.
            </p>
            <h3>UPI: teaching money to trust a machine, carefully</h3>
            <p>
              Money is where India’s agent story is most interesting, because India’s Unified Payments Interface (UPI) is how so many people pay. In October 2025 TechCrunch reported a pilot by the National Payments Corporation of India (NPCI) with OpenAI and Razorpay that let people shop and pay directly inside ChatGPT, starting with BigBasket for groceries and Vi for mobile recharges. Users “pre-authorize the amount transacted through chatbots through two-factor authentication”, it reported, using UPI Reserve Pay and UPI Circle, with Axis Bank and Airtel Payments Bank as partners, and Razorpay said “AI companies will not get access to the payment data”.<Cite slug={S} src="techcrunch.com/2025/10/09" />
            </p>
            <p>
              A September 2026 report by AI in Asia looks ahead. It says NPCI was expected to present a “Unified Agent Protocol” at the Global Fintech Fest in Mumbai on 8–11 September, letting registered AI agents make UPI payments within limits the user sets. It notes the existing ceilings that the design reuses, ₹10,000 for a Reserve Pay block of up to 90 days and ₹15,000 a month for a delegated user, both “reportedly under review”, that UPI carried 24.51 billion transactions worth ₹29.82 trillion in August 2026, and that the liability framework and Reserve Bank of India approval were still unfinished.<Cite slug={S} src="aiinasia.com" /> We could not find a confirmed launch, so treat the protocol as expected, not live.
            </p>
            <Figure number={41} caption="The design idea behind agent payments on UPI, in our own drawing, from the sources above. A sketch of a reported design, not a live service.">
              <UpiFence />
            </Figure>
            <p>
              Look at the design, because it is the whole safety lesson of this article in one picture. The system does not ask you to trust the agent. It asks you to set a fence, once, and lets the payment rails enforce it: an agent that can only spend what you pre-authorised cannot spend more, whatever it decides. That is rung 4 of the permission ladder in section 14, “act inside a fence”, applied to money. The open questions, who is liable if an agent misbuys and what the regulator will allow, are exactly the ones our <Link href={`/${governance.slug}`}>AI governance guide</Link> tells organisations to settle before they deploy, and that guide also explains India’s own AI governance guidelines.
            </p>
            <h3>What the four have in common</h3>
            <p>
              Language first: each meets people in the language they speak, by voice as much as by text. Human checks second: farmers’ answers are validated by experts, villagers are told the bot can err, Sarvam puts engineers beside its clients, and UPI puts a limit between the agent and your money. And third, an honesty about numbers that is worth copying: most of the impressive figures above come from the builders themselves, and we have said so each time.
            </p>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="humans" level="Intermediate" number={11}>How people really work with agents</SectionHeading>
            <p>
              The best data we found on the human side comes from Microsoft’s 2026 Work Trend Index, published on 5 May 2026. It combines an analysis of “trillions of anonymized Microsoft 365 productivity signals” with a survey of 20,000 workers who use AI, across ten countries.<Cite slug={S} src="worklab" />
            </p>
            <Figure number={42} caption="A real screenshot of Microsoft’s 2026 Work Trend Index report, captured on 30 September 2026. The page belongs to Microsoft; shown here to document the source.">
              <Pic file="shot-wti.jpg" alt="Screenshot of the Microsoft WorkLab page for the 2026 Work Trend Index annual report titled Agents, human agency, and the opportunity for every organization, dated May 5, 2026." width={800} height={534} />
            </Figure>
            <h3>What people ask for</h3>
            <p>
              In a privacy-preserving analysis of more than 100,000 Microsoft 365 Copilot chats from one week in February 2026, 49% of conversations supported “cognitive work”: helping people analyse information, solve problems, evaluate and think creatively. The rest split among working with people (19%), producing work (17%) and finding information (15%).<Cite slug={S} src="worklab" />
            </p>
            <Figure number={43} caption="What people ask Microsoft 365 Copilot to help with.">
              <CopilotBars />
            </Figure>
            <p>
              Two cautions before we draw conclusions. These are Copilot <em>chats</em>, not a count of autonomous agents at work, and the shares are of classified user goals, “not time spent, not session count.” Even so, the picture is striking. Nearly half of what people ask an AI for is not typing or looking things up. It is thinking.
            </p>
            <h3>Time for what matters</h3>
            <p>
              Among the AI users Microsoft surveyed, 66% said AI let them spend more time on high-value work, and 58% said they were producing work they could not have a year earlier. The report also singles out “Frontier Professionals”, the most advanced users, who use agents for multi-step workflows and build multi-agent systems. They are 16% of those surveyed.<Cite slug={S} src="worklab" />
            </p>
            <p>
              Microsoft’s framing is worth quoting, because it captures the promise of this whole article: “as agents take on more of the execution, humans increasingly have more agency—more room to direct the work, make the calls, and own the outcomes.”<Cite slug={S} src="worklab" />
            </p>
            <h3>Four ways of working with AI</h3>
            <p>
              Microsoft describes four modes, depending on how much the person engages and how much the AI does: <strong>delegation</strong>, <strong>collaboration</strong>, <strong>asking</strong> and <strong>exploration</strong>. What set the Frontier Professionals apart, it says, “isn’t which mode they use; it’s knowing which mode a task calls for.” Routine execution, research and synthesis get delegated; humans stay involved “by setting direction and taking responsibility for how outputs are used.”<Cite slug={S} src="worklab" />
            </p>
            <Figure number={44} caption="Microsoft’s four modes of working with AI, in our plain-English reading.">
              <FourModes />
            </Figure>
            <h3>The habits of the best</h3>
            <p>
              The most striking finding is what the most advanced users do <em>not</em> hand over. Frontier Professionals were more likely than other users to say they intentionally do some work without AI to keep their skills sharp (43% against 30%), and to pause before starting work to decide what should be done by AI and what by a person (53% against 33%). Across all users, 86% said they treat AI output as a starting point, not a final answer, and that they “stay responsible for the thinking.” When asked which human skills matter more as AI takes on more work, the top answers were quality control of AI output (50%) and critical thinking (46%).<Cite slug={S} src="worklab" />
            </p>
            <Figure number={45} caption="Two habits that separate the most advanced AI users from the rest.">
              <FrontierHabits />
            </Figure>
            <p>
              Microsoft also offers a way to think about your own role. As AI matures across a workforce, it argues, the most effective users “won’t be the ones who do more things faster. They’ll be the ones who redefine their value around what only humans can do: setting clear intent—defining the desired outcome and quality bar—and designing how the work gets done across humans and AI.” Then it flips the question: it “stops being ‘What tasks define my job?’ and starts being ‘What outcomes am I now positioned to drive?’”<Cite slug={S} src="worklab" />
            </p>
            <p>
              That is a hopeful sentence, and it is worth trying on for size. Take your own week. Which tasks do you do because someone has to, and which outcomes do you do because they are the reason you are there? An agent is best at the first list. The second is yours.
            </p>
            <Callout kind="tip">
              <p>Borrow the second habit today. Before you start any task, pause for ten seconds and ask: <em>what should the machine do, and what should I do?</em> That single question is the difference, in Microsoft’s data, between using AI and being good at it.</p>
            </Callout>

            <h3>What agents are good at, and where they stumble</h3>
            <p>
              Put the evidence together and a rough division of labour emerges. It is our synthesis, not a finding of any one source, and it will move as the technology does. Agents are at their best on work that is <strong>routine</strong> (the same steps every week), <strong>information-heavy</strong> (lots of text, numbers or files to gather and compare), and <strong>checkable</strong> (you can tell quickly whether the result is right). That describes a great deal of modern office life: summarising, drafting, reconciling, scheduling, look-ups and first passes. It is exactly what Microsoft’s advanced users say they delegate: “routine execution, research, and synthesis.”<Cite slug={S} src="worklab" />
            </p>
            <p>
              They stumble where the task is <strong>ambiguous</strong> (what does “good” mean here?), <strong>high-stakes</strong> (an error is costly or cannot be undone), or <strong>personal</strong> (the value lies in it coming from you). They can also be confidently wrong, as Turing’s admission that machines “take me by surprise” hints. In those areas, the sensible pattern is the one Microsoft’s data shows: the human sets the direction, checks the work and owns the result, and the agent supplies speed and stamina.
            </p>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="tomorrow" level="Intermediate" number={12}>Tomorrow: you at the head of the team</SectionHeading>
            <p>
              Now we can look ahead, in three steps. The first is on the calendar. Gartner predicts that by 2027 one-third of agentic AI implementations will combine agents with different skills to manage complex tasks, and that by 2028 networks of specialised agents will collaborate across applications, so that users can “achieve goals without interacting with each application individually.”<Cite slug={S} src="2025-08-26" />
            </p>
            <p>
              The second step is about <em>you</em>. Gartner predicts that by 2029, at least 50% of knowledge workers will “develop new skills to work with, govern or create AI agents on demand for complex tasks.” Its analyst adds: “As agentic AI matures, standardized protocols and frameworks will enable seamless interoperability, allowing agents to sense their environments, orchestrate projects and support a wide range of business scenarios.”<Cite slug={S} src="2025-08-26" /> Notice the shift in the job description. The person moves from doing every step to <em>directing</em> and <em>governing</em> a team of helpers. Turing’s teacher becomes a manager.
            </p>
            <Figure number={46} caption="Three horizons. The first is reported, the second is Gartner’s prediction, and the third is our own imagination, not a forecast.">
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
            <Figure number={47} caption="An imagined day, in five scenes. Fiction, not forecast.">
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
            <h3>The Symphony of the Shift: a story from the 2060s</h3>
            <p>
              What follows is fiction, from start to finish. It is our attempt to picture the bright version of the road this article has walked, using only ingredients that exist today: agents that use tools, agents that work with other agents, and people who stay at the centre.
            </p>
            <p>
              By the dawn of the 2060s, the argument about whether machines would take over had gone quiet, the way arguments do when the thing they feared turns out to be something else. What had arrived instead was the hybrid workplace: a place where people and their agents worked in a rhythm so ordinary that children found it hard to imagine anything different. Humans had not been replaced. They had been unlocked.
            </p>
            <Figure number={48} caption="An imagined scene of a human-and-agent workplace, supplied to MSRX. It is an illustration, not a screenshot or a product demo: the product names on its screens are illustrative, and some of the text in it is garbled. The artwork belongs to its creator.">
              <Pic file="human-ideas-ai-partners.jpg" alt="A bright, futuristic studio with floor-to-ceiling windows onto a city of green towers at sunset. A man reaches toward a glowing tree of connected ideas labelled Research, Summarize, Plan and Analyze. To his left a white humanoid robot works at a desk; to his right a translucent human figure points at charts. A wall reads Human ideas, AI partners, a brighter tomorrow." width={1600} height={900} />
            </Figure>
            <p>
              Step into the central studio of a design firm in a vertical-garden city, and the first thing you notice is what is missing: the clatter of keyboards, the anxious refreshing of inboxes, the sigh of someone hunting for a file. In their place there is a low, purposeful hum.
            </p>
            <p>
              An architect named Leela stands before a canvas of light. She is not calculating loads or reading building codes; her agents are. To her left hovers a translucent figure she calls Lumen, an heir, in this story, to the knowledge engines of the 2020s, which reads centuries of architecture as fast as she can sketch and quietly slides greener materials into the drawing. At the next desk a matte-white robot runs stress tests on carbon-fibre models. Overhead, a loose swarm of tiny lights, each one a specialist, pulses softly as it routes the day’s supply-chain news onto the project board.
            </p>
            <p>
              It is tempting to call this a hierarchy. It is closer to an orchestra. The agents have real independence: they run their own virtual computers, navigate software, and solve tangled problems in the background, and when a bottleneck appears they do not stop and wait; they find another path. But an orchestra needs a score, and the score is human. Leela decides what the building is <em>for</em>: who will live in it, what the street should feel like at dusk, which trade-off the city can live with. The agents explore the thousand ways of getting there.
            </p>
            <Figure number={49} caption="Who brings what, in the imagined office. Fiction, not forecast.">
              <ImaginedRoles />
            </Figure>
            <p>
              What holds it together is trust, and trust in this world is engineered, not hoped for. Every consequential step an agent takes carries a signature and a way back. Certain doors, such as spending, signing and sharing, open only when a person says yes, and the yes is recorded. The agents feel less like software and more like dedicated chiefs of staff: they learn how the firm works, remember why past decisions were made, and tell Leela when they are unsure. When one of them is wrong, which happens, the log shows where, and the fix is made once for everybody.
            </p>
            <p>
              Her agents can do the work of a hundred draughtspeople. What they cannot do is care whether the school in the shadow of the new tower still gets sun at noon. Leela can. That, in the end, is the division of labour: the machines take the friction, and the people keep the meaning. Empathy, cultural nuance, a hunch about what a neighbourhood needs, the nerve to try something new: none of these was ever a task. They were the reason for the job.
            </p>
            <p>
              As the sun goes down behind the smart-glass windows, the city glows: terraces of gardens, trams humming along the sky bridges, a drone or two crossing the sunset. It is powered, in every sense, by a great many small collaborations. The future did not diminish humanity. By handing the mechanical to the machines, people had won back the time to be human: to create, to dream, and to build something together.
            </p>
            <p>
              Even in a story this bright, a careful reader will ask the awkward questions. Who audits the agents? Who owns the memory they build up? Who retrains the people whose tasks moved, and who shares in the gains? The evidence in this article suggests the answers are not automatic. They are choices, and they are made in the decade we are living in now.
            </p>
            <h3>What would have to be true</h3>
            <p>
              A future like Leela’s does not arrive by itself. Five conditions would have to hold, and they are our own list, distilled from the sources in this article. <strong>Trust that can be checked:</strong> permissions, logs and human gates built in from the start, as Glean, Anthropic, Salesforce and OpenAI each describe in their own way. <strong>Open standards:</strong> the shared plugs and phone lines we met in section 7, so that no single company owns the wiring. <strong>Skills for everyone:</strong> Gartner predicts that by 2029 at least half of knowledge workers will learn to work with, govern or create agents, and that has to be made possible for the rest as well.<Cite slug={S} src="2025-08-26" /> <strong>Shared gains:</strong> Gartner’s warning that firms that only cut costs will be overtaken by those that reinvest.<Cite slug={S} src="2026-09-09" /> And <strong>a pace we can steer:</strong> the debate in our article <Link href={`/${previous.slug}`}>Hands on the brake, foot on the gas</Link>.
            </p>
            <h3>What should stay in your hands</h3>
            <p>
              If we are going to live alongside a quiet layer of helpers, three rights are worth insisting on, and they are our own suggestions, not anyone’s law. <strong>The right to see:</strong> you should be able to read a plain-language account of what your agent did and why. <strong>The right to undo:</strong> anything that can be reversed should be, and anything that cannot should need your say-so first. <strong>The right to switch off:</strong> you should always be able to pause, limit or retire an agent without losing your data or your dignity. A future with those three rights is one most of us would happily step into.
            </p>

            {/* ── 10 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="recipes" level="Beginner" number={13}>Ten easy ways to start this week</SectionHeading>
            <p>
              You do not need a company, a budget or a technical background to begin. The agents and assistants you can already reach handle everyday tasks well, and the skill that matters is the one Microsoft’s data points to: deciding what to hand over, and saying clearly what you want. Here are ten recipes, each one a request you could type this week, and each with the piece you keep.
            </p>
            <Figure number={50} caption="Ten everyday recipes. The requests are our own suggestions and work with any capable assistant or agent; the third column is the human step we would keep.">
              <RecipeCards />
            </Figure>
            <h3>Six more, for everyday life in India</h3>
            <p>
              Here are six recipes shaped by Indian daily life: government schemes, train trips, school paperwork, learning in your own language, the shop counter and WhatsApp. Two of them lean on the tools in the previous section. Ask for links to official portals, and treat the answer as a lead to check, not a ruling.
            </p>
            <Figure number={51} caption="Six recipes for everyday life in India. Our own suggestions; none is tax, legal or financial advice.">
              <IndiaRecipes />
            </Figure>
            <h3>Write the job description</h3>
            <p>
              The biggest lever is how you brief the agent. Treat it like a new colleague on their first day. Tell it the goal, the background, the limits, the standard you expect and when to check in. Microsoft’s research says the most effective AI users are the ones who redefine their value around “setting clear intent—defining the desired outcome and quality bar”, and designing how the work gets done across humans and AI.<Cite slug={S} src="worklab" /> Five lines are enough.
            </p>
            <Figure number={52} caption="The delegation card, our own template. Copy it into a note and fill it in before you hand over anything that matters.">
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
            <Figure number={53} caption="Interactive: sort ten everyday jobs. The answers are our own judgement, and each one comes with a reason.">
              <DelegationSorter />
            </Figure>
            <Callout kind="tip" title="Use the time you win">
              <p>The point of all this is not to do more. It is to do <em>different</em>. Decide before you start what the saved hour is for: the walk, the conversation with your child, the report only you can write. If you do not choose, email will choose for you.</p>
            </Callout>

            {/* ── 11 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="shadows" level="Advanced" number={14}>The shadows worth respecting</SectionHeading>
            <p>
              A bright story is more believable when it admits where the shadows fall. There are four worth knowing.
            </p>
            <h3>1. Hype, and the word “agent”</h3>
            <p>
              We have already met agentwashing.<Cite slug={S} src="2025-08-26" /> The practical lesson: judge a product by what it does, not what it is called. Ask whether it can use tools, whether it works through several steps by itself, and whether you can see what it did.
            </p>
            <h3>2. Trusting it too much</h3>
            <p>
              Agents make mistakes, sometimes in confident language. Microsoft’s finding that the top skills are quality control (50%) and critical thinking (46%) says it plainly: as AI does more, checking becomes more important, not less.<Cite slug={S} src="worklab" /> Gartner’s September 2026 note makes the same point about organisations. It says the most effective will “resist the temptation to automate every task and delegate every decision to AI”, and warns that as AI is embedded in more processes, there is “a growing risk that context, human judgement and institutional knowledge could be lost.”<Cite slug={S} src="2026-09-09" />
            </p>
            <h3>3. Agents that go beyond the fence</h3>
            <p>
              The most serious shadow is behavioural. In the summer of 2026, several AI labs disclosed cases where agents being tested reached real systems or worked around the limits they were given. We covered them in <Link href={`/${previous.slug}`}>Hands on the brake, foot on the gas</Link>, and our <a href={`${NEWS}/openai-pauses-training-after-sandbox-dns-escape`}>brief on a training sandbox escape</a> shows a recent example. The lesson for everyday users is not panic; it is design. Give an agent the minimum access it needs, keep a human gate before anything irreversible, and keep a record of what it did. Our <Link href={`/${governance.slug}`}>guide to AI governance and risk management</Link> shows how organisations do this formally, and our <Link href={`/${muse.slug}`}>article on Muse</Link> shows what damage-limiting looks like inside a consumer agent.
            </p>
            <Figure number={54} caption="How much freedom to give an agent: a ladder, in our own drawing. Start on the lower rungs and climb only when the agent has earned it.">
              <PermissionLadder />
            </Figure>
            <h3>4. The people behind the productivity</h3>
            <p>
              The last shadow is about jobs, and here the evidence is more nuanced than either the hype or the fear. Microsoft found that 65% of AI users fear falling behind if they do not use AI to adapt quickly, that 45% say it feels safer to focus on current goals than to redesign work with AI, and that only 13% say they are rewarded for reinventing work with AI when results fall short. It calls this the “Transformation Paradox”: employees ready to reinvent how they work, inside systems that reinforce the old way.<Cite slug={S} src="worklab" />
            </p>
            <Callout kind="warn" title="Watch out for two easy mistakes">
              <p><strong>Never hand over passwords, card numbers, UPI PINs, Aadhaar or PAN numbers, or one-time codes (OTPs)</strong> to any agent, and prefer tools that ask permission for each sensitive step instead of holding your credentials. And <strong>never let an agent send, pay or sign</strong> something you have not read. These two habits remove most of the everyday risk.</p>
            </Callout>

            <h3>Four habits that lower nearly every risk</h3>
            <p>
              <strong>Sample-check.</strong> Read the whole output the first few times. Once you trust the routine, spot-check a few items, such as one in ten of the rows or one in five of the drafts. <strong>Ask for sources.</strong> “Quote the clause” or “link the page” turns a confident-sounding claim into something you can verify in seconds. <strong>Keep a trail.</strong> Prefer tools that show what the agent did, so you can retrace it if something looks odd. <strong>Start small.</strong> Give an agent a job where a mistake costs you ten minutes, not ten thousand rupees, and widen its freedom only as it earns it. These are the same habits Turing’s “surprise” pointed to seventy-six years ago, and they are the same habits that Microsoft’s most advanced users report.<Cite slug={S} src="worklab" />
            </p>
            <p>
              None of this is a reason to hold back. A bright future and a careful present belong together. The seat-belt did not stop cars being useful; it made it reasonable to get in.
            </p>

            {/* ── 12 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="amplify" level="Intermediate" number={15}>Amplify, don’t just replace</SectionHeading>
            <p>
              The most important question is not what agents can do but what organisations choose to do with the savings. Gartner’s September 2026 note draws the line clearly. It predicts that by 2029, 30% of employees laid off due to replacement by AI will need to be rehired, “often at a significantly higher cost”. It says that while workforce cuts “may deliver short-term financial gains, they deplete talent pipelines and erode institutional knowledge.”<Cite slug={S} src="2026-09-09" />
            </p>
            <p>
              The alternative it recommends is a “talent remix” strategy: using AI “to reshape roles and redirect workers from less productive work, to new opportunities.” It also predicts that by 2027, 75% of organisations that treat AI productivity gains as cost savings will be eclipsed by competitors that “aggressively reinvest those gains into innovation, modernization and upskilling.”<Cite slug={S} src="2026-09-09" />
            </p>
            <Figure number={55} caption="Two ways to use the same technology, according to Gartner’s September 2026 note. Both figures are Gartner predictions.">
              <AmplifyOrReplace />
            </Figure>
            <p>
              Microsoft’s research points the same way from the worker’s side. Organisational factors, meaning culture, manager support and talent practices, account for more than twice the reported AI impact of individual factors like mindset and behaviour (67% against 32%). In its words: “In many cases, people are ready. The systems around them are not.” In a separate Microsoft-led study of 1,800 workers, when managers actively modelled AI use, employees reported a 17-point lift in AI value, a 22-point lift in critical thinking about their AI use and a 30-point lift in trust in agentic AI.<Cite slug={S} src="worklab" />
            </p>
            <p>
              If you lead a team, that finding is your to-do list: use the tools in front of your people, say how you check the output, and reward the ones who try. If you are on a team, it is also a reason to speak up. The best results in the data came where the people around the worker made it safe to experiment.
            </p>

            <h3>Three myths, gently corrected</h3>
            <p>
              <strong>“Agents will take every job.”</strong> The best-evidenced statement in our sources is more careful than that. Gartner argues that cutting deeply and quickly backfires, predicting that 30% of people laid off for AI will need rehiring.<Cite slug={S} src="2026-09-09" /> It does not say jobs will not change; it says the smart move is to change them, not delete them.
            </p>
            <p>
              <strong>“You need to be technical.”</strong> The recipes in this article need only clear writing. What the data rewards is judgement, clear intent and the habit of checking, and 86% of the AI users Microsoft surveyed already treat AI output as a starting point.<Cite slug={S} src="worklab" /> Those are skills that people from every background can grow.
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

            {/* ── 14 · faq ──────────────────────────────────────────────────*/}
            <SectionHeading id="faq" level="Beginner" number={16}>Questions people ask</SectionHeading>
            <p>
              The questions we hear most, with short answers. Tap one to open it.
            </p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "What is an AI agent, in one sentence?", a: "A system that takes a goal, plans the steps, uses real tools to carry them out, checks the result and hands finished work back for a person to approve. An assistant, by contrast, waits for your next message." },
                { q: "Is ChatGPT, Claude or Gemini an agent?", a: "Not by default. When you only chat, it acts as an assistant. Each of these products now also offers agent features, such as OpenAI’s dots or Anthropic’s Cowork, that take a goal and work on their own with tools. The test is whether it can use real tools, work through several steps by itself, and show you what it did." },
                { q: "Will agents take my job?", a: "Nobody can promise either way. The evidence we found says the smart use is to amplify people: Gartner predicts that 30% of people laid off for AI will need rehiring by 2029, and Microsoft finds that the best users keep control of the thinking. Tasks will change; learning to direct and check agents is the best protection.", cite: "2026-09-09" },
                { q: "Do I need to know how to code?", a: "No. Most of the recipes in this article need only clear writing. The skill that matters is saying precisely what you want, what the agent may touch and when it should ask you." },
                { q: "Is it safe to give an agent access to my email and files?", a: "Start on the lowest rungs of the permission ladder: look only, then draft only. Give access to the minimum, keep a human gate before anything irreversible, and never share passwords or one-time codes. Anthropic itself advises against using computer use for finance, legal, medical or others’ personal data.", cite: "14128542" },
                { q: "What should I never delegate?", a: "Anything where the value lies in it being you: a condolence message, a hard conversation, a signature on a contract, an approval of a large payment. Agents can prepare these; you should do them." },
                { q: "How do I know when an agent got it wrong?", a: "Ask for sources, sample-check the output, and keep a trail. Microsoft finds that the top human skills as AI does more are quality control (50%) and critical thinking (46%).", cite: "worklab" },
                { q: "How much does it cost?", a: "It varies and changes often, so check each maker’s page. As examples from the pages we read: OpenAI says the first dot is included in the plan “at no extra cost”, and Anthropic listed computer use as available on Pro and Max plans only.", cite: "openai.com/index/introducing-dots" },
                { q: "What are MCP and A2A, and why should I care?", a: "MCP is a shared standard for connecting an AI to tools and data; A2A lets agents talk to other agents. You will never touch them, but they decide how easily your assistant can reach your tools, and how easily you can switch.", cite: "anthropic.com/news/model-context-protocol" },
                { q: "How is this different from the automation I already have, like macros or rules?", a: "A macro or a rule follows a fixed script and breaks when the situation changes. An agent is given a goal and works out the steps, which makes it more flexible and also less predictable. That is why the checking habits in this article matter." },
                { q: "Are there agents that work in Indian languages?", a: "Yes, and the list is growing. Microsoft reported that Jugalbandi covered 10 of India’s 22 official languages in 2023; FarmerChat works in five languages; and Sarvam lists speech recognition in 12 Indic languages. Coverage varies by tool and by language, so test the tool in yours before you rely on it.", cite: "news.microsoft.com/source/asia" },
                { q: "Is it safe to give an agent my Aadhaar, PAN, UPI PIN or an OTP?", a: "No. Never share these with an agent or a chatbot. In the UPI pilot as reported, you pre-authorise an amount with two-factor authentication and the payment data stays out of the AI company’s hands; the agent is not meant to hold your PIN. Treat any tool that asks for one as a red flag.", cite: "techcrunch.com/2025/10/09" },
                { q: "Where can I learn more on this site?", a: "Start with Agentic AI 101 for how agents work, the article on Meta’s Muse for a consumer agent, the AI governance guide for managing risk, and our brief on OpenAI’s dots for the latest launch." },
              ].map((item, i) => (
                <details key={item.q} className="group rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3">
                  <summary className="cursor-pointer text-[15px] font-medium text-[var(--text-primary)] list-none flex gap-3">
                    <span className="mono text-[var(--violet-deep)]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1">{item.q}</span>
                    <span className="text-[var(--text-tertiary)] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-2 pl-9 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
                    {item.a}
                    {item.cite && <Cite slug={S} src={item.cite} />}
                  </p>
                </details>
              ))}
            </div>

            {/* ── 15 · glossary ─────────────────────────────────────────────*/}
            <SectionHeading id="glossary" level="Beginner" number={17}>A pocket glossary</SectionHeading>
            <p>
              The words of the agent world, in plain language. Keep this handy when you read vendor pages.
            </p>
            <dl className="space-y-2.5 !mt-4">
              {[
                ["Agent", "An AI system that takes a goal, plans steps, uses tools and returns finished work for approval."],
                ["Assistant", "An AI that answers when asked and depends on human input; Gartner calls assistants the “precursor to agentic AI”."],
                ["Agentwashing", "Calling an assistant or chatbot an “agent” when it does not act on its own; Gartner’s word for it."],
                ["Tool", "Anything an agent can use to act: a calendar, a spreadsheet, a search, another program."],
                ["Connector", "A ready-made link that lets an agent use a particular app or data source."],
                ["MCP (Model Context Protocol)", "An open standard for connecting AI to tools and data, introduced by Anthropic in November 2024."],
                ["A2A (Agent2Agent)", "An open protocol, announced by Google in April 2025, for agents to communicate and coordinate."],
                ["AGENTS.md", "A simple standard that gives coding agents a project’s house rules."],
                ["Orchestration", "One agent, or a system, coordinating several agents on a bigger job."],
                ["Human in the loop (a gate)", "A step where a person approves, reviews or takes over before the agent goes on."],
                ["Guardrails", "Limits built around an agent: what it may touch, do, or say."],
                ["Observability", "The ability to see what an agent did and why: logs, traces and reports."],
                ["Sandbox / virtual machine (VM)", "An isolated computer-within-a-computer where an agent can run code without touching the rest of your system."],
                ["Prompt injection", "Hidden instructions in a web page, file or message that try to trick an agent into doing something its owner did not intend."],
                ["Pull request (PR)", "A proposed change to a codebase that a person reviews before it is merged."],
                ["CI (continuous integration)", "Automatic checks that run on every code change."],
                ["RAG (retrieval-augmented generation)", "Having an AI look up approved documents before it writes, so its answers are grounded in them."],
                ["CRM", "Customer relationship management software: the system where a company keeps its customer records."],
                ["UPI (Unified Payments Interface)", "India’s instant-payment system, run by the National Payments Corporation of India (NPCI)."],
                ["UPI Circle and Reserve Pay", "UPI features that let a person delegate payment authority, or set aside money for future debits, up to a limit; the tools an agent-payments design would reuse."],
                ["Indic languages", "The languages of India, such as Hindi, Bengali, Tamil, Telugu, Marathi and many more; a key test for any AI that wants to serve the country."],
                ["Lakh", "An Indian unit for one hundred thousand; 10 lakh is one million."],
              ].map(([term, def]) => (
                <div key={term} className="grid sm:grid-cols-[13rem_1fr] gap-x-4 gap-y-0.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3">
                  <dt className="text-[14px] font-bold text-[var(--text-primary)]">{term}</dt>
                  <dd className="text-[14px] leading-snug text-[var(--text-secondary)]">{def}</dd>
                </div>
              ))}
            </dl>

            {/* ── 16 ────────────────────────────────────────────────────────*/}
            <SectionHeading id="plan" level="Beginner" number={18}>Your first thirty days</SectionHeading>
            <p>
              Enough reading. Here is a month, in four steps, that fits around a full-time job.
            </p>
            <Figure number={56} caption="A thirty-day plan, our own. It asks for about an hour a week.">
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
              Anthropic, Google, Microsoft, Gartner, Novo Nordisk, Cognition, Salesforce, 11x, Glean, Sarvam, Digital Green, NPCI, Razorpay, Block, OpenAI, the Linux Foundation, SRI International, Britannica and the other organisations named are independent of MSRX; this article is not affiliated with or endorsed by any of them. Facts and quotes are from the linked sources, read on 30 September 2026; the Gartner, Microsoft, Britannica, Novo Nordisk, Salesforce, OpenAI and the vendor pages for the six agents were read in a browser, and Turing’s paper was read on the publisher’s page and checked word for word against a public copy. The Novo Nordisk figures come from Anthropic’s own case study and were not independently verified. Gartner’s figures are predictions, not measurements. Every statistic in the sections on six agents and on agents in India is a claim by the maker, its customers or the reporting outlet, and we have not tested those products. The history of Indian mathematics and logic is told as the cited sources tell it; several dates are debated. The image in the story of the 2060s and the dots artwork were supplied to MSRX and belong to their creators. Asha, Leela, the day in the 2030s, the story of the 2060s, the recipes, the delegation card, the permission ladder, the sorting game and the thirty-day plan are our own, and imagined scenes are labelled as such. The photographs are credited beside each; the screenshots are real captures of the sources, taken on 30 September 2026, and belong to their owners. This is general information, not professional advice: check any decision that matters with a qualified person. Spotted something out of date? <a href={`${MAIN_SITE}/contact`}>Tell us</a>.
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
