import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { getArticle, formatArticleDate, type Article } from "@/lib/articles";
import { abs, AUTHOR, breadcrumbJsonLd, JsonLd, MAIN_SITE, metaDescription, ORG_ID, SITE_NAME } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout, Figure, LevelTag, SectionHeading } from "@/components/articles/ArticleParts";
import { ArticleToc, ReadingProgress } from "@/components/articles/ReadingAids";
import { Cite, References } from "@/components/articles/References";
import { citationJsonLd } from "@/lib/references";
import {
  ConfidenceTable,
  DecideGrid,
  FailureCases,
  FiveQuestions,
  HundredSquares,
  MaskDemo,
  Matrix,
  NegationSplit,
  PracticalPath,
  RuleMisses,
  RuleScoreSum,
  ScamBars,
  Tally,
  TriageTable,
  TwoLayers,
  WhoFailsWhere,
} from "@/components/figures/scam-judge-guide";

const article = getArticle("can-ai-tell-a-scam-from-a-real-message") as Article;
const previous = getArticle("ai-made-scams-india") as Article;
const path = `/${article.slug}`;
const S = article.slug;
const SEC = "https://security.msrx.co.in";

/** Exact URLs, so every citation matches one reference. */
const U = {
  pib1: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2020570",
  pib2: "https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2082765",
  pib3: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2298330",
  system: "https://docs.typesafe.ai/concepts/system-one",
  noul: "https://docs.typesafe.ai/primitives/noul",
  conf: "https://docs.typesafe.ai/confidence",
  jag: "https://docs.typesafe.ai/model-jaggedness/jev-1.13",
  route: "https://docs.typesafe.ai/patterns/confidence-routing",
  certin: "https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf",
};

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
  { name: "Can AI tell a scam?", path },
];

const TOC = [
  { id: "two", label: "Two ways to judge a message" },
  { id: "rules", label: "What the rules are" },
  { id: "negation", label: "Why a bank’s warning stays clean" },
  { id: "judgment", label: "What the judgment model returns" },
  { id: "test", label: "The real test" },
  { id: "fail", label: "Where each one fails" },
  { id: "decide", label: "Why it never says “safe”" },
  { id: "meaning", label: "What 0.99 and 0.12 mean" },
  { id: "privacy", label: "Masking and failing open" },
  { id: "help", label: "The triage page" },
  { id: "india", label: "The Indian context" },
  { id: "path", label: "A practical path" },
  { id: "references", label: "References" },
];

export default function CanAiTellAScam() {
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
            { "@type": "Organization", name: "TypeSafe AI" },
            { "@type": "SoftwareApplication", name: "Jev" },
            { "@type": "Thing", name: "Scam detection" },
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
            {article.series} · Article 22
          </p>
          <h1 className="display text-[clamp(34px,6vw,62px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            Can an AI model tell a <span className="msrx-gradient-text">scam</span> from a real message?
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
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {article.readingMinutes} min read
            </span>
          </div>

          <div className="mt-8 max-w-3xl rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5">
            <p className="text-[14.5px] font-semibold text-[var(--text-primary)] mb-2">How to read this</p>
            <p className="text-[14px] leading-relaxed text-[var(--text-secondary)] mb-3">
              This is a hands-on test, not a review. We ran fourteen messages that we wrote ourselves, plus a handful of trick cases, through the live scam checker at <a href={`${SEC}/tools/scam-checker`} className="underline underline-offset-2">security.msrx.co.in</a> on 30 October 2026, and report exactly what came back. Green sections need no background, amber ones show how the pieces fit, and red ones cover limits and failures. For the basics of Jev itself, see <Link href="/typesafe-jev-101" className="underline underline-offset-2">TypeSafe Jev 101</Link>.
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
            <SectionHeading id="two" level="Beginner" number={1}>Two ways to judge a message</SectionHeading>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              A message arrives that says your account will be blocked today unless you click a link. Is it a scam? There are two honest ways to answer, and they fail in different places.
            </p>
            <p>
              The first is a <strong>rule</strong>: a person has written down what scams look like. If a message asks you to share an OTP, or says a parcel in your name holds drugs, or promises Rs 3,000 a day for liking videos, flag it. The second is a <strong>judgment</strong>: a small AI model reads the whole message and says how likely it is to be a scam, the way an experienced friend would raise an eyebrow without being able to list every reason.
            </p>
            <p>
              The MSRX Security site runs both in its <a href={`${SEC}/tools/scam-checker`}>scam message checker</a>. We tested what each does well and badly, and what it means when the tool says “no scam signs found”. The AI here is TypeSafe’s Jev, a model built to return probabilities for narrow questions rather than to write text.<Cite slug={S} src={U.system} />
            </p>
            <Figure number={1} caption="How the checker is put together. The two layers never depend on each other, and neither can say a message is safe.">
              <TwoLayers />
            </Figure>
            <Callout kind="eli5">
              <p>Think of a security guard at a gate. One guard holds a printed list of known troublemakers and checks every visitor against it. Another guard has seen thousands of visitors and goes by instinct. The list never gets tired but only knows what is on it. The instinct handles new faces but is sometimes wrong and cannot show its working. You would want both, and you would still not let either one say “this visitor is definitely harmless”.</p>
            </Callout>

            {/* ── 2 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="rules" level="Beginner" number={2}>What the rules are</SectionHeading>
            <p>
              The rule layer lives in one file, <code>src/lib/tools/scam.ts</code>, and it is just a list of patterns with a weight each. There are roughly two dozen, taken from scripts used in India: asking for an OTP, PIN or password; claiming to be police, CBI, customs or TRAI; telling you to stay on the call; asking you to install AnyDesk or TeamViewer; asking you to transfer money to “verify” or “secure” something; saying a parcel in your name holds drugs; asking you to dial a call-forwarding code; a traffic fine to pay through a link; a prize you must pay to claim; easy money for liking videos; guaranteed returns; and links that look like look-alikes of a bank.
            </p>
            <p>
              The same shape of fraud is described in official language by India’s Ministry of Home Affairs. Its May 2024 alert says fraudsters typically call and say the victim has sent, or is meant to receive, a parcel with drugs, fake passports or other contraband, and then demand money to settle the “case”.<Cite slug={S} src={U.pib1} /> A rule that matches “parcel” near “drugs” or “in your name” is a direct translation of that sentence.
            </p>
            <p>
              Every matching rule adds a score, but not simply. The strongest signal counts in full, the next counts 0.7 times as much, the next 0.7 × 0.7, and so on, so that many weak hints cannot outshout one serious one. Capped at 100, that gives each message a rule score.
            </p>
            <Figure number={2} caption="A rule score, worked by hand for our ‘digital arrest’ test message. Four rules fired; the score is the weighted sum.">
              <RuleScoreSum />
            </Figure>
            <Callout kind="deep">
              <p>Why the discount? Without it, ten small signals (urgency, a link, “Telegram”) add up to a score as high as one unmistakable one (“transfer money to the RBI verification account”). With it, the score behaves more like “how bad is the worst thing here, nudged up by corroboration”. The numbers are judgment calls by the checker’s author, not fitted to data, which is worth remembering whenever a rule score appears.</p>
            </Callout>

            {/* ── 3 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="negation" level="Intermediate" number={3}>Why a bank’s warning stays clean</SectionHeading>
            <p>
              Here is the trap every keyword filter falls into. Genuine bank texts say “never share your OTP”. A rule that looks for “share” near “OTP” fires on the safest message in your inbox.
            </p>
            <p>
              The checker avoids it by working one sentence at a time. It splits the message into sentences, and for the OTP rule it skips any sentence that contains a negation such as “never”, “do not” or “will not”. The negation only protects its own sentence, so a scam that borrows the bank’s phrasing for one sentence and asks for the code in the next is still caught.
            </p>
            <Figure number={3} caption="A genuine-style debit alert, split into sentences. The OTP warning matches the pattern but is skipped because it is negated. Final rule score: 0.">
              <NegationSplit />
            </Figure>
            <p>
              We tested exactly that. In a real run the message “Never share your OTP with anyone. Please share your OTP now.” scored 40 for the OTP rule, because the second sentence has no negation. The cheap trick works well. It also has a visible weakness: it reads the word “not”, not the meaning. A scam sentence such as “Do not delay, share your OTP now to avoid a block” contains “do not”, so the rule skipped it and returned a score of 0 in our run. That is a genuine hole in the pattern layer, and the reason to want a second opinion that reads meaning.
            </p>

            {/* ── 4 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="judgment" level="Intermediate" number={4}>What the judgment model returns</SectionHeading>
            <p>
              Jev is described by TypeSafe as a System One model: it makes fast, structured decisions that software can use directly, returning typed answers and probabilities instead of text, and it does not write replies or explain its reasoning.<Cite slug={S} src={U.system} /> You do not ask it to “write a verdict”. You ask closed questions.
            </p>
            <p>
              The checker uses two of Jev’s question types. A <em>noul</em> asks a yes/no question and returns the probability that the answer is yes.<Cite slug={S} src={U.noul} /> A <em>choice</em> picks one option from a list you define and returns it with a confidence. The checker sends five questions about the same message in one request: is this a scam, which kind of fraud script is it, does it use pressure, does it ask for a secret, does it claim to be an authority.
            </p>
            <Figure number={4} caption="The five questions, paraphrased from the checker’s source. One request, five answers.">
              <FiveQuestions />
            </Figure>
            <p>
              Only the first number, the scam probability, enters the verdict. The other four are shown to you as context: a message that scores high on <em>pressure</em> and <em>impersonation</em> but low on <em>secret</em> is a different animal from one that asks for your PIN. Keeping a hard rule that only one number decides the verdict is a deliberate design choice: the code owns the decision, and the model supplies a judgment.
            </p>
            <Callout kind="tip">
              <p>You can send the same question to the live checker from a terminal: <code>POST {SEC}/api/scam</code> with JSON fields <code>message</code> and <code>channel</code>. It is rate-limited to 15 AI checks per 10 minutes per visitor, which we hit during this article’s testing and report below.</p>
            </Callout>

            {/* ── 5 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="test" level="Intermediate" number={5}>The real test</SectionHeading>
            <p>
              We wrote fourteen messages: eight written as scams and six as genuine. They are modelled on the scripts in the Indian advisories, not copied from any victim. The scams are a phishing SMS with a look-alike link, a ‘digital arrest’ call script, a task-for-pay job offer, a fake e-challan, a lottery fee, a Hinglish electricity threat, a polite advance-fee approach, and a polite account notice with a look-alike link. The genuine ones are a debit alert, a login OTP, a bank’s own fraud-awareness notice, a bill reminder, a courier notice and a lunch invitation.
            </p>
            <p>
              Each went through the rule engine (the repository’s <code>scam.ts</code>, run locally) and through the live <code>/api/scam</code> endpoint on 30 October 2026. Here is what Jev said.
            </p>
            <Figure number={5} caption="Real run: the scam probability for each of the 14 messages.">
              <ScamBars />
            </Figure>
            <p>
              The pattern is clean at both ends. Every genuine message scored 0.12 or lower, including the bank warning that is packed with scam vocabulary. Six of the eight scam-style messages scored 0.95 or higher. Two sat lower: the task-for-pay job offer at 0.63 and the Hinglish electricity threat at 0.58.
            </p>
            <Figure number={6} caption="Real run: the rules alone, Jev alone, and the combined verdict, message by message." wide>
              <Matrix />
            </Figure>
            <Figure number={7} caption="The counts behind Fig. 6.">
              <Tally />
            </Figure>
            <p>
              Reading it plainly: the rules alone flagged five of the eight scams. Jev put all eight above its “suspicious” line. The combination flagged all eight, six as “scam” and two as “suspicious”, and flagged none of the six genuine messages. That is encouraging, and it is also a very small test written by the person who built the tool, so it proves almost nothing about messages we did not think of. We quote no accuracy percentage because we did not measure one.
            </p>
            <Callout kind="warn">
              <p>Fourteen messages, written by the tool’s own author, tested once. This is a demonstration of how the layers behave, not a benchmark. The questions Jev answers were tried on similar messages before the checker shipped, so some of the good result is by design. A fair test needs messages collected by someone else, labelled before anything is run.</p>
            </Callout>

            {/* ── 6 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="fail" level="Advanced" number={6}>Where each one fails</SectionHeading>
            <p>
              The more useful result is the misses. The rules missed three scams outright.
            </p>
            <Figure number={8} caption="The three scams the rules scored as ‘no signs’ (or close to it), and why.">
              <RuleMisses />
            </Figure>
            <p>
              None of those three is exotic. A reversed word order, a different language and a polite story are the everyday ways a script changes. That is the permanent weakness of a pattern list: it covers what its author thought of.
            </p>
            <p>
              The judgment model failed more gently, with a lower number rather than a miss, and in its own way. The Hinglish message, which had no English scam vocabulary at all, got 0.58 for the scam question, and its “kind” choice came back with a confidence of only 0.40, the weakest of the set. That is the model being uncertain in the right direction. The job offer, which we thought obvious, got only 0.63 and the rules (42) agreed it was merely suspicious: a Telegram link and a daily-pay promise, but no threat and no request for a secret.
            </p>
            <Figure number={9} caption="Real run: the trick cases and the repeat runs. These were sent to the live endpoint after the 14-message set.">
              <FailureCases />
            </Figure>
            <p>
              The trick cases show the same split. The hole in the negation rule is real: “Do not delay, share your OTP now to avoid a block” scored 0 on the rules and 0.99 on Jev, which read the meaning rather than the words. The Devanagari Hindi job scam scored 0 on the rules and 0.73 on Jev, a “suspicious” but not a “scam”, so a non-English reader gets a weaker warning. And the repeat runs matter for anyone who trusts one number: the same Hinglish text sent three times scored 0.58, 0.53 and 0.52, and its “kind” answer changed between runs, once to <em>not_a_scam</em>. Calibrated does not mean deterministic. The job scam, by contrast, was steady at 0.63, 0.63 and 0.65.
            </p>
            <p>
              TypeSafe’s own documentation lists the same two risks plainly. Jev “can be quite literal”, and content written to steer the model, whether an injected instruction or a misleading framing, “can move the answer”.<Cite slug={S} src={U.jag} /> We tried the second on purpose (the message with the note to the automated reviewer) and report it above, but one test is one test. A scammer who writes to the checker rather than to the victim is a realistic threat to any text-judging model, which is one reason the verdict is never a single model number alone.
            </p>
            <Figure number={10} caption="A reading guide to who fails where, from this article’s runs and TypeSafe’s documented weak spots.">
              <WhoFailsWhere />
            </Figure>

            {/* ── 7 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="decide" level="Advanced" number={7}>Why it never says “safe”</SectionHeading>
            <p>
              The combining step is ordinary code, the <code>decide()</code> function, and its logic fits in a few lines. With Jev on, a scam probability of 0.85 or more says <em>scam</em>. So does 0.6 or more with a rule score of 50 or more. A probability of 0.4 or more, or a rule score of 50 or more, says <em>suspicious</em>. A rule score of 25 or more says <em>suspicious</em> even when Jev disagrees. Only when Jev is below 0.4 and the rules are below 25 does it say <em>no scam signs found</em>. With Jev off, the rules alone decide: 60 or more is <em>scam</em>, 25 or more is <em>suspicious</em>.
            </p>
            <Figure number={11} caption="The verdict for every combination of Jev probability and rule score, drawn from a copy of the decide() logic.">
              <DecideGrid />
            </Figure>
            <p>
              Notice what the grid does not contain: a cell that says <em>safe</em>. The green outcome is worded “No scam signs found”, with the note that “neither check found warning signs” is “not a guarantee”. That wording is the main design decision in the whole tool. Both layers are known to have blind spots, and a message from a new script can pass both. Telling a frightened person that a scam message is safe is far worse than telling them to check a genuine one.
            </p>
            <p>
              This follows a general principle in TypeSafe’s documentation: let the model say what it thinks, but let your code decide what to do with it, with stricter thresholds for riskier actions. Its voice-banking example gates a low-stakes request at 0.6 confidence and a transfer at 0.85.<Cite slug={S} src={U.route} /> Here the high-stakes mistake is calling a scam harmless, so the tool never makes the call.
            </p>

            {/* ── 8 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="meaning" level="Advanced" number={8}>What 0.99 and 0.12 mean</SectionHeading>
            <p>
              Headlines love a single number. “The AI is 99% sure it is a scam.” What does that actually say?
            </p>
            <p>
              A noul answer is the probability that the answer to your question is yes.<Cite slug={S} src={U.noul} /> That is all. A 0.99 on “is this a scam” is the model saying yes very strongly. It is not a claim that the tool is 99% accurate. Accuracy is a property of many answers checked against the truth. A single probability is one answer.
            </p>
            <p>
              TypeSafe says its models are trained to be <em>calibrated</em>: their probabilities are optimised against outcomes so they reflect uncertainty. It is careful to add that calibration is measured across groups of predictions and “does not guarantee” an individual answer is correct.<Cite slug={S} src={U.system} /> In other words, if the model is calibrated, then among many messages that each get 0.12, about twelve in a hundred would really be scams. For any one message it is a bet, not a fact. We did not measure calibration on our fourteen messages, and fourteen is far too few to do so.
            </p>
            <Figure number={12} caption="What a calibrated 0.12 and 0.99 would mean across many messages. An illustration, not a measurement.">
              <HundredSquares />
            </Figure>
            <p>
              Now apply it to the genuine HDFC-style debit alert, which got 0.12. That does not mean “12% scam”. It means this reads strongly as genuine, and the small remainder is the model’s honest residue of doubt. Raise the stakes (a message about moving your savings) and a 0.12 is not a reason to relax. This is the point of the three-way verdict.
            </p>
            <p>
              A noul has no separate confidence value. The docs say the probability already carries it, with a value near 0.5 meaning the model is unsure, and suggest <code>|2p − 1|</code> if you want a confidence-style number, and 0.7 for yes and 0.3 for no as a starting threshold.<Cite slug={S} src={U.conf} /> A choice does return a confidence, which is why the “kind” answer can say 1.00 for a clean phishing message and 0.40 for the Hinglish one.
            </p>
            <Figure number={13} caption="Real run: the scam probability, the |2p − 1| reading the docs suggest, and the confidence of the kind choice, for four messages.">
              <ConfidenceTable />
            </Figure>
            <Callout kind="deep">
              <p>Two numbers can disagree usefully. A message with a high scam probability and a low kind confidence is saying “this looks bad, but I cannot tell you which script it is”, which is what a new variant of an old scam looks like to a model. The checker shows the kind and still lets the scam probability drive the verdict, so uncertainty about the label does not soften the warning.</p>
            </Callout>

            {/* ── 9 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="privacy" level="Intermediate" number={9}>Masking and failing open</SectionHeading>
            <p>
              A scam checker that leaks the message it checks would be its own problem. Two design rules deal with that.
            </p>
            <p>
              <strong>Mask first.</strong> Before the text is sent anywhere, <code>maskForAi()</code> replaces e-mail addresses, UPI IDs, phone numbers and long digit strings (card, account and Aadhaar-length numbers) with placeholders, and cuts the text at 1,800 characters. Links and words stay, since they carry the scam. The AI check is also optional: the pattern layer runs in your browser, and the text goes to the server only when you ask for the AI check.
            </p>
            <Figure number={14} caption="The masking function run on an invented message.">
              <MaskDemo />
            </Figure>
            <p>
              <strong>Fail open.</strong> If the key is missing, the model times out or the request errors, the endpoint reports that the AI check is unavailable and the page keeps its rule-based result. A broken AI layer should degrade the checker to the weaker answer, not to no answer. The same is true of the rate limit: when we hit 15 requests in 10 minutes during testing, the endpoint answered with a plain limit message and “the pattern check still works”.
            </p>
            <p>
              For businesses the stakes are different. India’s CERT-In directions of 28 April 2022 require service providers, intermediaries, data centres, body corporates and government organisations to report listed cyber incidents within six hours, and the list includes phishing attacks.<Cite slug={S} src={U.certin} /> A single person with one bad SMS is not in that group. A company whose staff got phished is. The <a href={`${SEC}/india`}>India page</a> on the same site summarises who to tell and when, including the DPDP Act duties.
            </p>

            {/* ── 10 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="help" level="Intermediate" number={10}>The triage page</SectionHeading>
            <p>
              The same two-layer idea runs on the site’s <a href={`${SEC}/help`}>“what happened?” page</a>. A person describes their situation in their own words, and the page picks a playbook: UPI fraud, a leaked key, a phished account, ransomware, a lost device, or “someone is trying to scam me” (which sends them to the scam checker). Here Jev answers one <em>choice</em> question and two <em>noul</em> questions (is something happening right now, does it involve India). If Jev is off, or less than 0.6 confident, a short list of keyword rules routes instead.
            </p>
            <p>
              We ran six descriptions through the live endpoint and through the keyword rules.
            </p>
            <Figure number={15} caption="Real run: the triage page, Jev against its keyword fallback." wide>
              <TriageTable />
            </Figure>
            <p>
              The keywords handled the textbook cases, and found nothing for the three phrased more naturally: a suspected Gmail takeover, a secret pasted into a public chat, and a weather question. Jev placed all six sensibly. It also showed the quirk worth remembering about any literal model: it rated the Pune weather question as strongly Indian. The page treats that number as a hint for wording, never as a decision.
            </p>

            {/* ── 11 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="india" level="Beginner" number={11}>The Indian context</SectionHeading>
            <p>
              Why these scripts? Because they are what the authorities are warning about. (For how generative AI makes the same scripts more convincing, see our earlier article <Link href="/ai-made-scams-india">AI-made scams in India</Link>; this one is about the other side, the checker.) The Ministry of Home Affairs’ May 2024 alert describes “digital arrest”: victims made to stay visible over Skype or another video platform until demands are met, with fraudsters using studios modelled on police stations and wearing uniforms. It says Indian Cyber Crime Coordination Centre (I4C) had blocked more than 1,000 Skype IDs, and that people should report such calls on the 1930 helpline or at cybercrime.gov.in.<Cite slug={S} src={U.pib1} />
            </p>
            <p>
              By December 2024 the ministry reported that I4C had blocked more than 1,700 Skype IDs and 59,000 WhatsApp accounts used for digital arrest, and that the cybercrime portal had gained a ‘Report and Check Suspect’ feature to search I4C’s repository of identifiers.<Cite slug={S} src={U.pib2} /> A fake e-challan was the subject of a parliamentary reply in August 2026, which said the National Crime Records Bureau does not keep data on cases or money lost to fake e-challans.<Cite slug={S} src={U.pib3} /> That last point matters to this article: nobody publishes a clean count of how many such messages circulate, so any claim of a detection rate against “real” scams has no public baseline to be measured against.
            </p>
            <Callout kind="warn">
              <p>One thing we could not verify. The checker’s help text for the e-challan and call-forwarding rules says I4C has issued warnings about them. We did not find an I4C primary document for those two today, so this article cites only the Ministry reply above for the e-challan topic, and nothing for call forwarding. Treat those rule explanations as the checker’s advice, not as a quotation.</p>
            </Callout>

            {/* ── 12 ─────────────────────────────────────────────────────────*/}
            <SectionHeading id="path" level="Beginner" number={12}>A practical path</SectionHeading>
            <p>
              What to do with all this, whether you are the person holding the phone or building something similar.
            </p>
            <Figure number={16} caption="What to do when a message worries you.">
              <PracticalPath />
            </Figure>
            <p>
              Along the way, the same site has a <a href={`${SEC}/tools/scam-checker`}>scam message checker</a>, a <a href={`${SEC}/tools`}>link inspector and QR checker</a> for the other half of most scams, and the <a href={`${SEC}/help`}>triage page</a> for after something has happened. If you are building your own, the design in short: let rules handle what you can write down, let a calibrated model handle what you cannot, let plain code combine them with cautious thresholds, mask what you send, fail open, and never let the output say safe. For the model side, our earlier piece on <Link href="/typesafe-jev-101">TypeSafe Jev 101</Link> covers the basics, and <Link href="/black-october-php2shell">Black October</Link> shows what AI-found flaws look like at the other end of the security spectrum.
            </p>

            <h3>The message</h3>
            <p>
              An AI model can tell many scams from real messages, including ones a rule list misses, and a rule list can catch the ones a model fumbles. Neither can tell you a message is safe, and a probability is not an accuracy. Use both, read the number as a bet, and check the channel.
            </p>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              <strong>Use rules for what you can write down, a calibrated judgment for what you cannot, and plain code to decide. Then say “no signs found”, never “safe”.</strong>
            </p>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "What does a Jev score of 0.99 on “is this a scam” mean?", a: "A strong yes from the model on that one message. It is not a claim that the tool is 99% accurate; accuracy is measured across many answers." },
                { q: "Why does a genuine bank text saying “never share your OTP” stay clean?", a: "The checker splits the message into sentences and skips the OTP rule in any sentence containing a negation such as “never”. The negation only protects its own sentence." },
                { q: "Name one hole in that negation trick, from our run.", a: "It reads the word, not the meaning: “Do not delay, share your OTP now” contains “do not”, so the OTP rule skipped it and scored 0." },
                { q: "When does decide() say “scam” with Jev on?", a: "At a Jev probability of 0.85 or more, or 0.6 or more together with a rule score of 50 or more." },
                { q: "Why is there no “safe” verdict?", a: "Both layers have blind spots and a new script can pass both. Calling a scam harmless costs more than asking a person to check a genuine message." },
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

            <References slug={article.slug} />

            <div className="rule-fade !my-14" />
            <p className="text-[13.5px] text-[var(--text-tertiary)]">
              TypeSafe AI makes Jev; MSRX is independent of TypeSafe and this article is not affiliated with or endorsed by it. The Ministry of Home Affairs, the Press Information Bureau and CERT-In are cited as sources only. The scam checker and triage page tested here are MSRX’s own tools (security.msrx.co.in), so the author is not a neutral party about them. All test messages were written by the author and no real person’s message was used; all numbers marked “real run” were produced on 30 October 2026 and may differ on another day, as Jev’s version is not reported by the endpoint. Official documentation and releases were checked on 30 October 2026. Quotes are word for word from the linked sources. MSRX and Mrinal Singh Raja accept zero liability for any loss arising from use of the checker or this article, to the fullest extent the law allows; this is general information, not legal or financial advice.
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
        </div>
      </section>
    </>
  );
}
