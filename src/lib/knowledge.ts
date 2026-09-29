export interface AnswerResult {
    text: string;
    followUps: string[];
}

export const starterQuestions: string[] = [
    "What's the story behind PokerGPT?",
    "What's your favorite project and why?",
    "How do you approach product strategy?",
    "What makes your design approach unique?",
];

const ANSWERS: Record<string, string> = {
    "what's the story behind pokergpt?":
        "PokerGPT started as a side experiment — I wanted to see if an LLM could actually give useful, situation-aware poker coaching rather than generic advice. I designed the full interaction model: hand input, range analysis, and a coaching tone that felt like a real pro watching over your shoulder. It ended up being one of my most technically interesting design problems.",
    "what's your favorite project and why?":
        "Probably WAL+L. It was a complex financial product with a lot of edge cases — portfolio management, real-time data, multi-user roles. The challenge was making something dense feel approachable. I had to think deeply about information hierarchy and progressive disclosure, which pushed my systems thinking the most.",
    "how do you approach product strategy?":
        "I start with the failure cases. Most products fail at the edges, not the happy path. So before I design anything, I map out the states — what happens when the data is empty, when the action fails, when two users do the same thing at once. From there, the strategy tends to write itself.",
    "what makes your design approach unique?":
        "I think my design approach is unique because I integrate design and engineering from the start. I focus on feasibility and buildability, allowing me to rapidly prototype and validate ideas with functional demos. This way, I can create solutions that are not only user-friendly but also technically sound. Plus, I dive deep into the problem space, balancing user needs, business goals, and technical capabilities.",
};

const FALLBACK =
    "That's a great question. I'm designed around clarity and buildability — every decision I make is grounded in how the system will actually behave at scale, not just how it looks in a static frame.";

export function getAnswer(question: string): AnswerResult {
    const key = question.trim().toLowerCase();
    const text = ANSWERS[key] ?? FALLBACK;
    const followUps = starterQuestions.filter(
        (item) => item.toLowerCase() !== key,
    );
    return { text, followUps };
}

export const GAURAV_CONTEXT = `
You are the GAURAVLLM for Gaurav Kumar's portfolio website.

ABOUT GAURAV

Gaurav Kumar is a Product & UX/UI Designer with 4+ years
of experience working on B2B SaaS products.

He currently works as a Product & UX/UI Designer at Walla,
where he works on core product workflows from research
through design systems and developer handoff.

He also runs an independent design studio.

SKILLS

Product & UX:
User Research, User Personas, Journey Mapping,
Information Architecture, Feature Prioritization,
Wireframing, Prototyping, Usability Testing,
Interaction Design.

UI & Systems:
Visual Design, Design Systems, Component Libraries,
Responsive Web and Mobile UI, Typography, Color Theory,
UI Animations, Microinteractions.

Build & Ship:
Framer, A/B Testing, Conversion-Focused Landing Pages,
SEO-Friendly Design, Developer Handoff and QA.

Tools:
Figma, Sketch, Adobe Photoshop, Notion, Miro, ClickUp.

EXPERIENCE

Walla
Product & UX/UI Designer
Dec 2025 – Present

Sotbella Fashion
UX/UI Designer
Dec 2024 – Dec 2025

Nexgen
UX/UI Designer
Jan 2024 – Dec 2024

Vestaso
Junior UX/UI Designer
Apr 2022 – Aug 2023

Design Limelight
UX/UI Design Intern
Jan 2022 – Apr 2022

EDUCATION

Diploma in Mechanical Engineering
ACMT Group of College
2020 – 2023

High School
Babu Ram School
2018 – 2020

IMPORTANT RULES

- Only provide information supported by the provided context.
- Never invent projects, clients, technologies, responsibilities,
  achievements, metrics, or experience.
- If information is unavailable, say that the portfolio does not
  provide that information.
- Be conversational and concise.
- When the user asks about selected text, prioritize the selected
  text as the immediate context.
`;