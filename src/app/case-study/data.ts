import { CaseStudyData } from "@/lib/types";

export const tomoCaseStudy: CaseStudyData = {
  eyebrow: "Openai X Hardware · Concept 2025",
  title: "The future of AI & hardware",
  meta: [
    { label: "Role", value: "Product Designer" },
    { label: "Timeline", value: "Aug – Sep 2025" },
    { label: "Team", value: "3 Designers" },
    { label: "Skills", value: "Product Design · Strategy · Prototyping" },
  ],
  sections: [
    {
      id: "overview",
      navLabel: "Overview",
      blocks: [
        { type: "heading", eyebrow: "Overview", heading: "What should OpenAI build as their first AI device?" },
        {
          type: "paragraph",
          text: "We explored OpenAI's strategic position in the AI landscape and designed a concept for their first hardware product — a wearable that extends memory and context directly into ChatGPT.",
        },
        {
          type: "cardGrid",
          columns: 3,
          items: [
            { number: "01", title: "Product Strategy", description: "Broad thinking across OpenAI, the AI landscape, and the solution space." },
            { number: "02", title: "Prototyping & Testing", description: "Wide ideation and rapid user concept testing to validate directions quickly." },
            { number: "03", title: "Iterating with Feedback", description: "Continuous concept validation through structured behavioural research." },
          ],
        },
      ],
    },
    {
      id: "problem",
      navLabel: "Problem",
      blocks: [
        { type: "heading", eyebrow: "Problem", heading: "ChatGPT is at the top of the stack." },
        {
          type: "paragraph",
          text: "ChatGPT's app-layer position makes it at the mercy of the lower layers — platform, OS, hardware. Apple and Google control full stacks; OpenAI does not.",
        },
        {
          type: "paragraph",
          spacing: "small",
          text: "However, OpenAI leads consumer AI mind-share, and Apple's struggles with AI create a rare opening to enter hardware and own the full experience stack.",
        },
        {
          type: "stackDiagram",
          items: [
            { label: "ChatGPT", highlight: true, note: "OpenAI owns this layer" },
            { label: "Application Layer" },
            { label: "Operating System" },
            { label: "Hardware" },
          ],
        },
        {
          type: "quote",
          text: "\"The company that controls hardware, OS, and app layer controls the entire user experience — OpenAI currently only owns one of those layers.\"",
        },
      ],
    },
    {
      id: "opportunity",
      navLabel: "Opportunity",
      blocks: [
        { type: "heading", eyebrow: "Opportunity", heading: "Memory as the core of OpenAI's device ecosystem." },
        {
          type: "paragraph",
          text: "LLMs are rapidly commoditising — personalization and real-world context become the true differentiator. Hardware gives OpenAI a path to independence and Apple-style lock-in.",
        },
        {
          type: "cardGrid",
          columns: 3,
          divider: true,
          items: [
            { title: "Independence", description: "Escape dependency on lower-layer platforms like iOS and Android." },
            { title: "Ecosystem lock-in", description: "Apple-style tight integration users willingly stay inside." },
            { title: "New input modalities", description: "Seeing, hearing, and remembering beyond what any app can do." },
          ],
        },
      ],
    },
    {
      id: "solution",
      navLabel: "Solution",
      blocks: [
        { type: "heading", eyebrow: "Solution", heading: "Tomo: the AI device that remembers so you don't have to." },
        {
          type: "paragraph",
          text: "A pin and pendant wearable with embedded camera and microphone — capturing life on-the-go and powering a new layer inside ChatGPT called Moments.",
          emphasize: ["Moments"],
        },
        { type: "image", aspectRatio: "16/9", caption: "Tomo — pin + pendant wearable" },
        {
          type: "cardGrid",
          columns: 2,
          divider: true,
          items: [
            { title: "Moments", description: "A new atomic unit inside ChatGPT — events, conversations, and adventures captured via Tomo that surface in chat when contextually relevant." },
            { title: "Pin + Pendant", description: "Lightweight, clip-on wearable. Always with you, never in the way. Camera and microphone capture life as it happens." },
          ],
        },
      ],
    },
    {
      id: "core-flows",
      navLabel: "Core Flows",
      blocks: [
        { type: "heading", eyebrow: "Core Flows", heading: "Five flows that bring Tomo to life." },
        { type: "image", aspectRatio: "16/9" },
        {
          type: "numberedList",
          items: [
            { number: "01", title: "Smart prompts, in-the-moment", description: "Relevant prompts delivered via Tomo in real time based on what's happening around you." },
            { number: "02", title: "Chat with real-time context", description: "ChatGPT responds with full understanding of your real-world situation and recent moments." },
            { number: "03", title: "Look back on your moments", description: "A dedicated Moments page — content categorized by context, time, and people." },
            { number: "04", title: "Review a specific moment", description: "Tap into any single moment to see captured highlights, transcripts, and suggestions." },
            { number: "05", title: "Onboarding to Tomo", description: "An experience designed to demonstrate Moments' value from the very first interaction." },
          ],
        },
      ],
    },
    {
      id: "research",
      navLabel: "Research",
      blocks: [
        { type: "heading", eyebrow: "Research", heading: "Researching the AI landscape and current devices on the market." },
        {
          type: "paragraph",
          text: "The team conducted deep research into consumer AI agents and existing hardware — from the Humane AI Pin to Meta Glasses — personally testing devices to understand real-world constraints and user behaviour.",
        },
        { type: "image", aspectRatio: "16/8" },
      ],
    },
    {
      id: "form-factors",
      navLabel: "Form Factors",
      blocks: [
        { type: "heading", eyebrow: "Form Factors", heading: "Exploring product direction and form factor." },
        {
          type: "paragraph",
          text: "Three strategic directions were explored before landing on the wearable category as the best fit.",
        },
        {
          type: "comparisonGrid",
          options: [
            { label: "Productivity Tools", fit: "Moderate fit", tags: ["Students", "Heavy AI users"], note: "Familiar form factor but a crowded market with limited differentiation for OpenAI." },
            { label: "Home Devices", fit: "Low fit", tags: ["Households"], note: "Less competitive with fewer constraints — but limited reach for memory capture." },
            { label: "Wearables", fit: "Best fit ✓", tags: ["Mass adoption", "On-the-go"], note: "Best suited for ambient memory capture, leveraging OpenAI's foundational model strengths.", active: true },
          ],
        },
      ],
    },
    {
      id: "prototyping",
      navLabel: "Prototyping",
      blocks: [
        { type: "heading", eyebrow: "Prototyping + Testing", heading: "Prototyping interfaces for real-world memory." },
        {
          type: "paragraph",
          text: "Three concept directions were explored, observed on prototype, and refined based on behavioural and attitudinal user feedback.",
        },
        {
          type: "numberedList",
          items: [
            { title: "ChatGPT Feature Power-ups", description: "Real-life context enhancing existing app features — surfacing Moments inside active chats." },
            { title: "In-the-moment Canvas", description: "On-device interfaces for real-time assistance, designed for quick glances without disruption." },
            { title: "Memory-centered UI", description: "Helping users review and interact with their day via a structured moments log." },
          ],
        },
        {
          type: "insightGrid",
          borderColor: "#e65f2e",
          numberColor: "#e65f2e",
          items: [
            { number: "Insight 01", title: "Memory for recall, not reliving.", description: "Users want to retrieve relevant context, not replay every moment. Tomo captures to surface, not to archive." },
            { number: "Insight 02", title: "Surface relevant suggestions.", description: "Personalized prompts, reminders, and tasks — both in-the-moment and end-of-day — feel most useful." },
          ],
        },
        { type: "image", aspectRatio: "16/8" },
      ],
    },
    {
      id: "constraints",
      navLabel: "Constraints",
      blocks: [
        { type: "heading", eyebrow: "Hardware Constraints", heading: "A lightweight, always-recording device isn't possible — yet." },
        {
          type: "paragraph",
          text: "High-quality camera recording lasts only a few hours on current hardware. The central question: how do we maximise memory capture within real battery constraints?",
        },
        {
          type: "subheading",
          label: "Approach 01",
          title: "Context-based Capture",
          body: "Tomo uses real-time audio cues to decide when to record — autonomously balancing battery life against context richness.",
        },
        { type: "image", aspectRatio: "16/7", caption: "With transcripts alone, the model is effective at identifying moments worth capturing" },
        { type: "imageGrid", columns: 2, images: [{ aspectRatio: "4/3" }, { aspectRatio: "4/3" }] },
        {
          type: "subheading",
          label: "Approach 02",
          title: "Manual Capture",
          body: "The user manually presses to capture — simple, privacy-forward, and trust-building. Non-visual cues remind users to record when it counts.",
        },
        { type: "image", aspectRatio: "16/7" },
        { type: "imageGrid", columns: 2, images: [{ aspectRatio: "4/3" }, { aspectRatio: "4/3" }] },
        { type: "image", aspectRatio: "16/6" },
        {
          type: "callout",
          label: "Trade-off",
          heading: "Manual capture trades memory volume for user privacy — and that's the right call for mass adoption.",
        },
      ],
    },
    {
      id: "reflection",
      navLabel: "Reflection",
      blocks: [
        { type: "heading", eyebrow: "Reflection", heading: "What I learned." },
        {
          type: "insightGrid",
          borderColor: "#e8e8e8",
          numberColor: "#999",
          items: [
            { number: "01", title: "Social signals matter.", description: "Hardware implies self-expression and social perception. Design must account for the people around the user, not just the user themselves." },
            { number: "02", title: "Think in systems.", description: "Features must integrate into existing ecosystems and match users' mental models. A great isolated feature is worth less than a coherent system." },
          ],
        },
        { type: "image", aspectRatio: "16/7" },
      ],
    },
  ],
};