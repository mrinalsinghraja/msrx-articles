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
  AiChanges,
  Anatomy,
  ArupCase,
  CallbackFlow,
  CloneChain,
  CodeWord,
  DetectBars,
  EvidenceLadder,
  FiveChecks,
  ForwardFlow,
  Gaps,
  OfficialSays,
  RbiWindows,
  ReportNow,
  ToolsMap,
} from "@/components/figures/scam-guide";
import { ScamStopSign } from "@/components/figures/ScamStopSign";

const article = getArticle("ai-made-scams-india") as Article;
const previous = getArticle("ai-security-scan-70-repositories") as Article;
const path = `/${article.slug}`;
const S = article.slug;

/** Fragments of the reference URLs; each matches exactly one reference. */
const U = {
  mha: "PRID=2020570",
  mha25: "PRID=2110809",
  dot: "PRID=2016613",
  trai: "PR_No.22of2025",
  rbi: "Id=11040",
  ftc: "scammers-use-ai-enhance",
  fcc: "DOC-400393A1",
  plos: "pone.0285333",
  arup: "arup-deepfake-scam",
  fwd: "ussd-call-forwarding",
};

const SEC = "https://security.msrx.co.in";

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
  { name: "AI-made scams in India", path },
];

const TOC = [
  { id: "why", label: "Why this article" },
  { id: "anatomy", label: "What digital arrest is" },
  { id: "ai", label: "What AI changes" },
  { id: "voice", label: "Cloned voices" },
  { id: "video", label: "Deepfake video" },
  { id: "checks", label: "Five checks that work" },
  { id: "telecom", label: "What DoT and TRAI say" },
  { id: "forward", label: "The call-forwarding trick" },
  { id: "money", label: "Money and the bank" },
  { id: "tools", label: "Free tools" },
  { id: "gaps", label: "What I could not verify" },
  { id: "references", label: "References" },
];

export default function AiMadeScams() {
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
            { "@type": "Thing", name: "Voice cloning and deepfake fraud" },
            { "@type": "Thing", name: "Digital arrest scam" },
          ],
          isPartOf: { "@type": "CreativeWorkSeries", name: article.series, url: abs("/") },
          author: { "@type": "Person", ...AUTHOR },
          publisher: { "@id": ORG_ID },
          citation: citationJsonLd(article.slug),
        }}
      />

      <header className="border-b border-[var(--border)]" style={{ background: "var(--stage)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-8 pb-14 sm:pb-16">
          <Breadcrumbs trail={trail} tone="stage" />
          <p className="eyebrow mb-4" style={{ color: "var(--stage-text-tertiary)" }}>
            {article.series} · Article 21
          </p>
          <h1 className="display text-[clamp(30px,5.2vw,52px)] max-w-4xl mb-5" style={{ color: "var(--stage-text-primary)" }}>
            AI-made scams in India: <span className="msrx-gradient-text">cloned voices, deepfake video</span> and “digital arrest”, and the checks that still work
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
              This is general information, not legal or financial advice. I read the government, regulator and research sources named in the references on 30 October 2026, and I say plainly when a claim rests only on press reports.
              MSRX is independent and is not affiliated with any government body, regulator or bank. Green sections need no background. Amber ones explain the processes and rules. Red ones look closer at the evidence.
              I have not invented any statistics or victim stories.
            </p>
            <div className="flex flex-wrap gap-2">
              <LevelTag level="Beginner" />
              <LevelTag level="Intermediate" />
              <LevelTag level="Advanced" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 sm:py-16">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem] gap-12 xl:gap-20">
          <article className="article-prose min-w-0 max-w-[44rem]">
            <SectionHeading id="why" level="Beginner" number={1}>Why this article, and the short version</SectionHeading>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              Generative AI can make a scammer sound like your son and look like your boss. It cannot change what the scammer needs from you, which is secrecy, speed and money, and it cannot change how you can check, which is to hang up and call back on a number you already hold.
            </p>
            <p>
              That is the whole argument. The rest of this article shows where it comes from. It covers what Indian government sources say about “digital arrest” and fake telecom threats, what the AI evidence shows about cloned voices and deepfake video, which of those claims are firm and which are press reports, and the checks that work whether or not the voice on the line is real.
            </p>
            <Callout kind="eli5">
              <p>Think of a very good forged signature. You cannot always tell by looking. But you can always ring the bank on the number printed on your own card and ask if they sent the letter. The check does not depend on spotting the forgery.</p>
            </Callout>
            <p>
              For incident reporting rules in India (CERT-In, the DPDP Act, 1930) see the guide I keep at <a href={`${SEC}/india`} target="_blank" rel="noopener noreferrer">security.msrx.co.in/india</a>. For the AI-and-security backdrop, our earlier articles on <Link href="/black-october-php2shell">the PHP flaws AI found</Link> and <Link href="/ai-security-scan-70-repositories">scanning 70 repositories with AI</Link> cover the defender’s side of the same shift.
            </p>
            <Figure number={1} caption="Five checks that work against any caller, real voice or fake. Each is expanded in section 6.">
              <FiveChecks />
            </Figure>

            <SectionHeading id="anatomy" level="Beginner" number={2}>What “digital arrest” is</SectionHeading>
            <p>
              The Ministry of Home Affairs described the pattern in an alert posted on PIB on 14 May 2024. A large number of complaints on the National Cyber Crime Reporting Portal concerned intimidation, blackmail, extortion and “Digital Arrests” by people posing as police, the CBI, the narcotics department, RBI, the Enforcement Directorate and other agencies.<Cite slug={S} src={U.mha} />
            </p>
            <p>
              Callers typically say the victim has sent, or is to receive, a parcel with illegal goods, drugs, fake passports or other contraband. Sometimes they say a near one is in custody after a crime or an accident. Then money is demanded to “compromise” the case. In some cases victims are made to stay visible over Skype or another video platform until the demands are met, and the fraudsters use studios modelled on police stations and government offices and wear uniforms. The release calls it an organised online economic crime that is learnt to be operated by cross-border crime syndicates.<Cite slug={S} src={U.mha} />
            </p>
            <Figure number={2} caption="The shape of a digital-arrest call, as the Ministry of Home Affairs describes it.">
              <Anatomy />
            </Figure>
            <p>
              Look at what is not in that description: no software hack, no malware, no technical trick. The attack is a story told with authority and urgency. That matters, because it is why a low-tech check can beat it.
            </p>
            <p>
              The scale is not clear from official sources. A March 2025 answer in Parliament, published on PIB, says the National Crime Records Bureau does not keep separate data on digital arrest scams.<Cite slug={S} src={U.mha25} /> The same release says I4C had blocked more than 3,962 Skype IDs and 83,668 WhatsApp accounts used for digital arrest.<Cite slug={S} src={U.mha25} /> Those are blocking counts, not victim counts, so I give no number of victims or rupees lost.
            </p>

            <SectionHeading id="ai" level="Intermediate" number={3}>What generative AI changes, and what it does not</SectionHeading>
            <p>
              Two things stand out when you set the official description beside the AI evidence. The impersonation was already there before cheap AI: uniforms, a staged office, a confident script. And the demand never changes: stay on the line, tell nobody, pay now.
            </p>
            <p>
              What generative AI adds is credibility at the edges. It can make the voice familiar, put a face on a video call, and write fluent messages in any language. Each of those removes one old clue (the stranger’s voice, the awkward grammar) that careful people relied on.
            </p>
            <Figure number={3} caption="What changes and what does not. Only the voice and one video case have sources here; the claim about fluent text is general knowledge, not a cited finding.">
              <AiChanges />
            </Figure>
            <Callout kind="deep">
              <p>A defence that depends on noticing the fake is on a losing curve: every improvement in the model removes a clue. A defence that depends on a channel the scammer does not control, such as your own contact list, does not get worse as models improve. That asymmetry is the design principle behind everything in section 6.</p>
            </Callout>

            <SectionHeading id="voice" level="Intermediate" number={4}>Cloned voices: what the evidence shows</SectionHeading>
            <p>
              The clearest authoritative description I found is from the US Federal Trade Commission, in a consumer alert of March 2023. It says a scammer could use AI to clone the voice of a loved one, and that all he needs is a short audio clip of your family member’s voice, which he could get from content posted online, and a voice-cloning program.<Cite slug={S} src={U.ftc} /> The alert’s advice is plain: “Don’t trust the voice.” Call the person who supposedly contacted you and verify the story, using a phone number you know is theirs, and if you cannot reach them, try another family member or their friends.<Cite slug={S} src={U.ftc} />
            </p>
            <Figure number={4} caption="How a cloned-voice call is put together, in outline. An illustration of the process the FTC describes; not a real call or a tutorial.">
              <CloneChain />
            </Figure>
            <p>
              The FTC also lists payment red flags: if the caller says to wire money, send cryptocurrency, or buy gift cards and read out the numbers, those could be signs of a scam.<Cite slug={S} src={U.ftc} /> In India the equivalent would be a UPI transfer, a QR code or a bank transfer pushed under pressure, though that is my adaptation, not the FTC’s words.
            </p>
            <p>
              Can people tell? A peer-reviewed study in PLOS ONE (published 2 August 2023) played genuine and deepfake audio to 529 people, in English and Mandarin. Listeners correctly spotted the deepfakes only 73% of the time, there was no difference between the two languages, and giving listeners examples improved results only slightly. The authors expect detection to get harder as speech synthesis improves.<Cite slug={S} src={U.plos} />
            </p>
            <Figure number={5} caption="The 73% result. A lab study, so a real call under stress and a bad line may go either way.">
              <DetectBars />
            </Figure>
            <p>
              One more official data point is legal rather than technical. In February 2024 the US Federal Communications Commission ruled that calls made with AI-generated voices are “artificial” under US telephone law, and its announcement names the voices of close family members among the imitation risks.<Cite slug={S} src={U.fcc} /> That is US law, not Indian, and it is a ruling about robocalls. I cite it only to show that a regulator has treated voice cloning in scam calls as a real enough problem to act on.
            </p>
            <Callout kind="warn">
              <p>What I could not find: an official Indian advisory specifically about cloned-voice relative-emergency scams. The Home Affairs alert above does mention callers claiming that a near one is in custody, but it does not say the voice is cloned. Press and vendor sites say such cases happen in India; I did not treat those as evidence. I checked on 30 October 2026, and an advisory may exist that I did not reach.</p>
            </Callout>

            <SectionHeading id="video" level="Advanced" number={5}>Deepfake video: one well-documented case, and its limits</SectionHeading>
            <p>
              For video I found one clear, widely reported case, and it is not Indian. The Guardian reported on 17 May 2024 that the British engineering company Arup confirmed it was the victim of a deepfake fraud after an employee in Hong Kong was duped into sending HK$200m (£20m) to criminals during an AI-generated video call. Hong Kong police had said in February that a worker at a then-unnamed company was tricked on a hoax call with people “posing as senior officers of the company”. Arup confirmed that fake voices and images were used, and said its financial stability and business operations were not affected and none of its internal systems were compromised.<Cite slug={S} src={U.arup} />
            </p>
            <Figure number={6} caption="The Arup case in three dated steps, as reported.">
              <ArupCase />
            </Figure>
            <p>
              What this case does and does not prove should be said carefully. It shows that a multi-person video call with faked colleagues has fooled a trained employee at a large company. It does not show how common this is, and it does not show that Indian digital-arrest calls use deepfaked officers: the Home Affairs alert describes staged studios and uniforms, not AI faces.<Cite slug={S} src={U.mha} /> The sensible reading is that the cheap, proven version of the scam works already, and the AI version raises the ceiling on how convincing it can get.
            </p>
            <Callout kind="deep">
              <p>The “secret and stay on the call” demand is the part to focus on. In the digital-arrest pattern, the victim is kept visible and on the line until demands are met.<Cite slug={S} src={U.mha} /> A scam that needs you isolated cannot survive you ending the call and checking. Isolation is a property of the attack, not of the technology used to make it look real.</p>
            </Callout>

            <SectionHeading id="checks" level="Beginner" number={6}>Five checks that work whether or not the voice is real</SectionHeading>
            <p>
              None of these needs a detector, an app or any knowledge of AI. They are listed in the order I would teach them to a parent.
            </p>
            <p>
              <strong>1. Call back on a number you already hold.</strong> This is the FTC’s core advice: use a phone number you know is theirs.<Cite slug={S} src={U.ftc} /> For an official, find the number yourself from the bank card, the bank’s app or the department’s own site. Never use the number the caller gives you, and never a link in a message.
            </p>
            <Figure number={7} caption="The call-back flow: no decision is made on the call itself.">
              <CallbackFlow />
            </Figure>
            <p>
              <strong>2. Agree a family code word.</strong> Choose, in person, a word that only your family knows, and use it when someone asks for money on a call. I want to be precise: the FTC alert I read does not recommend this; the idea appears in readers’ comments under it. I include it because it works without technology and fits the call-back habit, not because a regulator endorses it.<Cite slug={S} src={U.ftc} />
            </p>
            <Figure number={8} caption="Setting up a family code word. An illustration of a habit, not an official procedure.">
              <CodeWord />
            </Figure>
            <p>
              <strong>3. Refuse secrecy and refuse to stay on the line.</strong> The Home Affairs description has victims kept on a video call until demands are met.<Cite slug={S} src={U.mha} /> Any caller who demands that you tell nobody or stay on camera is showing you the shape of the scam. End the call.
            </p>
            <p>
              <strong>4. Slow the money down.</strong> Nothing legitimate is lost by waiting an hour to check. A scam is. Ask a family member in person, or ring the bank on its own number.
            </p>
            <p>
              <strong>5. Report within hours.</strong> The Home Affairs alert tells people to report on helpline 1930 or at cybercrime.gov.in,<Cite slug={S} src={U.mha} /> and the DoT release gives the same helpline and portal for people who are already victims.<Cite slug={S} src={U.dot} />
            </p>
            <Figure number={9} caption="Interactive: tick what you were told on the call and see where it lands. An illustration of the author’s rule of thumb, not an official test.">
              <ScamStopSign />
            </Figure>

            <SectionHeading id="telecom" level="Intermediate" number={7}>What DoT and TRAI say about “your number will be disconnected”</SectionHeading>
            <p>
              A second common script is the telecom threat. A DoT release posted on PIB on 29 March 2024 says callers in DoT’s name were threatening that mobile numbers would be disconnected or were being misused in illegal activity. It says DoT does not authorise anyone to make such a call and asks people to report such communications at the Chakshu facility on the Sanchar Saathi portal.<Cite slug={S} src={U.dot} /> It also points people to the “Know Your Mobile Connections” facility, to check the connections registered in their name, and to 1930 and cybercrime.gov.in for those already defrauded.<Cite slug={S} src={U.dot} />
            </p>
            <p>
              TRAI’s Press Release 22/2025 says TRAI does not initiate communication with customers about mobile-number disconnection by message or otherwise, and has not authorised any third party to do so. It adds that disconnection for billing, KYC or misuse is done by the telecom service provider, and advises cross-checking through the provider’s authorised call centres or customer service centres.<Cite slug={S} src={U.trai} />
            </p>
            <Figure number={10} caption="What the official sources say, by body and date. Dates are those on the documents I opened.">
              <OfficialSays />
            </Figure>
            <Callout kind="tip" title="A date correction">
              <p>The DoT release is often quoted as 14 May 2024. The release I opened is dated 29 March 2024, and 14 May 2024 is the date of the Home Affairs digital-arrest alert. Later news stories and documents repeat both messages, so a different date on a page you see may be a repeat, not an error.</p>
            </Callout>

            <SectionHeading id="forward" level="Advanced" number={8}>The call-forwarding trick</SectionHeading>
            <p>
              A different attack uses the phone’s own settings. Storyboard18 reported on 30 December 2025 on an advisory it attributes to I4C: criminals pose as courier or delivery agents, claim a parcel needs confirming or rescheduling, and tell the victim to dial a code beginning with 21 followed by a number the fraudster controls. Once entered, call forwarding is active, so bank verification calls, OTP confirmations and authentication requests from platforms such as WhatsApp or Telegram go to the scammer.<Cite slug={S} src={U.fwd} />
            </p>
            <p>
              The reported advice is never to dial codes beginning 21, 61, 67 or similar when an unknown caller tells you to, and, if you suspect forwarding is on, to dial ##002# to cancel all call forwarding, then report to 1930.<Cite slug={S} src={U.fwd} /> This is press reporting of an advisory that I could not open myself. The AI angle is indirect: a fluent, localised script from a model makes the courier call more believable, but the harm comes from the forwarding, not from the AI.
            </p>
            <Figure number={11} caption="The call-forwarding trick and the fix, as reported. Press source; confirm the detail on cybercrime.gov.in.">
              <ForwardFlow />
            </Figure>

            <SectionHeading id="money" level="Intermediate" number={9}>Money, the bank and the RBI circular</SectionHeading>
            <p>
              If money has gone, speed matters. RBI’s circular of 6 July 2017 on limiting customer liability sets reporting windows for <em>unauthorised</em> electronic banking transactions. Where the fault lies neither with the bank nor with the customer, the customer has zero liability if they notify the bank within three working days; liability is limited if they report in four to seven working days; beyond seven working days it follows the bank’s Board-approved policy. The bank must credit the amount within 10 working days of notification, and the burden of proving customer liability lies on the bank.<Cite slug={S} src={U.rbi} />
            </p>
            <Figure number={12} caption="The reporting windows in the RBI circular. Read it as a reason to report fast, not as a guarantee of a refund.">
              <RbiWindows />
            </Figure>
            <p>
              Here is the catch for these scams. In a digital-arrest case the victim usually makes the transfer themselves, under pressure. The circular is about unauthorised transactions, and for a transaction you approved the same circular says that where the loss is due to the customer’s negligence, such as sharing payment credentials, the customer bears the loss until they report.<Cite slug={S} src={U.rbi} /> Whether a tricked-into-approving transfer counts as unauthorised is not something the circular settles, and I cannot settle it either. What I can say is that reporting immediately cannot hurt, and waiting can. I read the 2017 text; later amendments were not checked.
            </p>
            <Callout kind="warn">
              <p>This is general information, not legal advice. For your own case, ask the bank in writing and, if needed, a lawyer. I make no promise about recovery.</p>
            </Callout>
            <Figure number={13} caption="Where to report, in the order I would do it.">
              <ReportNow />
            </Figure>

            <SectionHeading id="tools" level="Beginner" number={10}>Free tools for the moment of doubt</SectionHeading>
            <p>
              I built a set of free, browser-based checkers at MSRX Security for the moment you are unsure. They do not replace the five checks; they give you a second signal while you slow down.
              The <a href={`${SEC}/tools/scam-checker`} target="_blank" rel="noopener noreferrer">scam checker</a> reads a message against known patterns, including Indian ones: fake parcel and customs messages, call-forward codes, telecom threats, e-challan, electricity bill and family-emergency scams.
              The <a href={`${SEC}/tools/qr-checker`} target="_blank" rel="noopener noreferrer">QR checker</a> reads what a QR code contains, the <a href={`${SEC}/tools/url-inspector`} target="_blank" rel="noopener noreferrer">URL inspector</a> splits a link into its parts, and the <a href={`${SEC}/tools/phishing-email-checker`} target="_blank" rel="noopener noreferrer">phishing email checker</a> looks at an email.
              If you do not know where to start, the <a href={`${SEC}/help`} target="_blank" rel="noopener noreferrer">help page</a> asks a few questions and points you on, and if money has already moved, the <a href={`${SEC}/playbooks/upi-fraud`} target="_blank" rel="noopener noreferrer">UPI fraud playbook</a> lists the steps.
            </p>
            <Figure number={14} caption="Which tool for which situation.">
              <ToolsMap />
            </Figure>
            <p>
              A checker is a signal, not a verdict. A message can pass every pattern and still be a scam, and a scary-looking one can be genuine. This ties back to the earlier point: the habit of verifying on a number you hold is what protects you, and a tool only supports it. These tools are MSRX’s own and, like this article, are independent of any government body.
            </p>

            <SectionHeading id="gaps" level="Advanced" number={11}>What I could not verify, and how firm each claim is</SectionHeading>
            <p>
              A scam article invites dramatic numbers. I have avoided them. The table below sorts every major claim by the kind of source behind it.
            </p>
            <Figure number={15} caption="How firm each claim is.">
              <EvidenceLadder />
            </Figure>
            <Figure number={16} caption="What was not found, not opened or not claimed.">
              <Gaps />
            </Figure>
            <p>
              Facts in this article were checked on 30 October 2026. Contact details, helplines and rules change, so confirm them at the official sites before relying on them.
            </p>

            <h3>The message</h3>
            <p className="text-[19px] leading-relaxed text-[var(--text-primary)]">
              <strong>AI makes the voice and the face less trustworthy, so stop trusting them. Hang up, call back on a number you already hold, refuse secrecy and pressure, and call 1930 within hours if money has moved.</strong>
            </p>

            <h3>Quick quiz</h3>
            <p>Tap a question to check your answer.</p>
            <div className="space-y-2 !mt-4">
              {[
                { q: "A caller who sounds like your son asks for urgent money. What is the first thing to do?", a: "Do not trust the voice. Hang up and call him on a number you already hold, or reach another family member, as the FTC advises." },
                { q: "A caller says you are under “digital arrest” and must stay on a video call. What does that tell you?", a: "It matches the pattern the Ministry of Home Affairs described: victims kept visible on a video call until demands are met. End the call and report to 1930 or cybercrime.gov.in." },
                { q: "Does TRAI call people to disconnect their number?", a: "No. TRAI’s Press Release 22/2025 says it does not initiate such communication; the telecom provider disconnects for billing, KYC or misuse. Cross-check with your provider." },
                { q: "What does the PLOS ONE study say about hearing a deepfake?", a: "In a study of 529 people, listeners spotted deepfake speech 73% of the time, so detection by ear is unreliable." },
                { q: "Which code should you never dial for an unknown ‘courier’?", a: "Codes beginning 21, 61 or 67, per the reported I4C advisory. If you dialled one, the reported fix is ##002#, then call 1930." },
                { q: "Is the family code word an official recommendation?", a: "No. The FTC alert does not recommend it; it appears only in readers’ comments. It is a sound family habit, not a rule." },
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
              The Ministry of Home Affairs, I4C, the Department of Telecommunications, TRAI, the Reserve Bank of India, the FTC, the FCC, PLOS, The Guardian, Storyboard18 and the other organisations named are independent of MSRX, and this article is not affiliated with or endorsed by any of them. MSRX is not a government body and does not speak for one. This is general information, not legal, financial or investment advice, and MSRX and its author accept zero liability for any loss arising from use of it, to the fullest extent the law allows, except where the law does not allow that. Facts were checked on 30 October 2026 and may change. Do not enter passwords, card numbers or OTPs into any checker, including ours.
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
