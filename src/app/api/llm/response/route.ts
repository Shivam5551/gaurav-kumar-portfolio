import { NextResponse } from "next/server";
import { gemini } from "@/lib/gemini";
import { GAURAV_CONTEXT } from "@/lib/knowledge";

interface ChatMessage {
    role: "user" | "assistant";
    text: string;
    context?: string;
}

export async function POST(req: Request) {
    try {
        const {
            message,
            history = [],
        }: {
            message: string;
            history: ChatMessage[];
        } = await req.json();

        // console.log("MESSAGE:", message);
        // console.log("HISTORY:", history);

        if (!message?.trim()) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 },
            );
        }

        const conversationHistory = Array.isArray(history)
            ? history
                .filter(
                    (msg) =>
                        msg?.text?.trim() &&
                        (msg.role === "user" ||
                            msg.role === "assistant"),
                )
                .map((msg) => ({
                    role: msg.role === "assistant" ? "model" : "user",
                    parts: [
                        {
                            text: msg.text,
                        },
                    ],
                }))
            : [];

        const contents = [
            ...conversationHistory,
            {
                role: "user",
                parts: [
                    {
                        text: message,
                    },
                ],
            },
        ];

        const response = await gemini.models.generateContent({
            model: "gemini-3.5-flash-lite",

            contents,

            config: {
                systemInstruction: `
${GAURAV_CONTEXT}

You are the AI assistant for Gaurav's portfolio.

Use the conversation history to understand follow-up questions.

For example:
User: Tell me about the projects.
Assistant: Gaurav has built several projects...
User: Which one uses Next.js?

Understand that "Which one" refers to the projects mentioned above.

Rules:
- Use conversation history.
- Maintain context between messages.
- Do not repeat unnecessary information.
- Never invent portfolio information.
- Only use information available in GAURAV_CONTEXT and the conversation.
- If information is unavailable, say so clearly.

Generate 2-4 useful follow-up questions.
They must be:
- Related to the current conversation.
- Answerable using the portfolio context.
- Short and conversational.
- Free of invented information.
`,

                responseMimeType: "application/json",

                responseSchema: {
                    type: "object",
                    properties: {
                        answer: {
                            type: "string",
                        },
                        followUps: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                        },
                    },
                    required: ["answer", "followUps"],
                },
            },
        });

        const data = JSON.parse(response.text ?? "{}");

        return NextResponse.json({
            answer: data.answer ?? "",
            followUps: Array.isArray(data.followUps)
                ? data.followUps
                : [],
        });
    } catch (error) {
        console.error("Gemini error:", error);

        return NextResponse.json(
            {
                error: "Failed to generate response",
            },
            { status: 500 },
        );
    }
}