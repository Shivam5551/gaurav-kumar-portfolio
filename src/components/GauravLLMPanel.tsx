"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Thinking } from "./Thinking";
import { Suggestions } from "./Suggestions";
import { TypewriterText } from "./TypewriterText";

const assetPathPrefix = "/assets";
const imgRefresh = `${assetPathPrefix}/8db4d.svg`;
const imgClose = `${assetPathPrefix}/Frame.svg`;
const imgSend = `${assetPathPrefix}/e829d.svg`;

interface Message {
    role: "user" | "assistant";
    text: string;
    context?: string;
}

const SUGGESTIONS = [
    "What's the story behind PokerGPT?",
    "What's your favorite project and why?",
    "How do you approach product strategy?",
    "What makes your design approach unique?",
];

interface PendingSelection {
    text: string;
    id: number;
}

interface GauravLLMPanelProps {
    isOpen: boolean;
    onClose: () => void;
    pendingSelection: PendingSelection | null;
}

export default function GauravLLMPanel({
    isOpen,
    onClose,
    pendingSelection,
}: GauravLLMPanelProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [shownSuggestions, setShownSuggestions] = useState(SUGGESTIONS);
    const [isThinking, setIsThinking] = useState(false);
    const [contextText, setContextText] = useState<string | null>(null);
    const [typingIndex, setTypingIndex] = useState<number | null>(null);

    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const lastSelectionId = useRef<number | null>(null);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
        });
    }, [messages, isThinking]);

    const scrollToBottom = () => {
        const container = messagesContainerRef.current;
        if (!container) return;
        container.scrollTop = container.scrollHeight;
    };

    // New selection came in from the page — attach it as a removable chip,
    // don't send anything automatically.
    useEffect(() => {
        if (!pendingSelection) return;
        if (pendingSelection.id === lastSelectionId.current) return;

        lastSelectionId.current = pendingSelection.id;
        setContextText(pendingSelection.text);
    }, [pendingSelection]);

    const sendMessage = async (rawText: string) => {
        const trimmed = rawText.trim();
        const attachedContext = contextText;

        if (!trimmed && !attachedContext) return;
        if (isThinking) return;

        const displayText = trimmed || attachedContext!;
        const payloadQuestion = attachedContext
            ? `Regarding this text from the page: "${attachedContext}"\n\n${
                  trimmed || "What can you tell me about this?"
              }`
            : trimmed;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                text: displayText,
                context: attachedContext ?? undefined,
            },
        ]);
        setShownSuggestions((prev) => prev.filter((s) => s !== trimmed));
        setInput("");
        setContextText(null);
        setIsThinking(true);

        try {
            const res = await fetch("/api/llm/response", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: payloadQuestion,
                    history: messages,
                }),
            });

            if (!res.ok) throw new Error(`Request failed with ${res.status}`);

            const data = await res.json();
            const answer: string =
                data.answer ||
                "Sorry, I couldn't come up with a good answer for that.";

            setMessages((prev) => {
                const next = [
                    ...prev,
                    { role: "assistant" as const, text: answer },
                ];
                setTypingIndex(next.length - 1);
                return next;
            });

            if (Array.isArray(data.followUps) && data.followUps.length > 0) {
                setShownSuggestions(data.followUps);
            } else {
                setShownSuggestions([]);
            }
        } catch (err) {
            console.error("GauravLLM request failed", err);
            setMessages((prev) => {
                const next = [
                    ...prev,
                    {
                        role: "assistant" as const,
                        text: "Something went wrong reaching Gaurav's brain. Please try again in a moment.",
                    },
                ];
                setTypingIndex(next.length - 1);
                return next;
            });
        } finally {
            setIsThinking(false);
        }
    };

    const handleReset = () => {
        setMessages([]);
        setShownSuggestions(SUGGESTIONS);
        setInput("");
        setIsThinking(false);
        setContextText(null);
        setTypingIndex(null);
    };

    const isEmpty = messages.length === 0;
    const isAnswerTyping = typingIndex !== null;

    return (
        <div
            className={`${isOpen ? "flex" : "hidden"} flex-col fixed inset-0 z-[100] lg:relative lg:inset-auto lg:w-[384px] lg:shrink-0 lg:sticky lg:top-0 lg:h-screen bg-[#f9f9f9] border-l border-[#e3e3e3]`}
        >
            {/* Panel header */}
            <div className="flex items-end justify-between border-b border-[#E3E3E3] pt-[35px] pb-[14px] px-[16px]">
                <span className="font-['DM_Mono:Medium'] text-[#454545] text-[14px] tracking-[-0.07px] uppercase leading-[1.2]">
                    Gaurav Kumar
                </span>
                <div className="flex items-center gap-[24px]">
                    <button
                        onClick={handleReset}
                        className="size-[18px] flex items-center justify-center hover:opacity-60 transition-opacity cursor-pointer"
                    >
                        <img
                            src={imgRefresh}
                            alt="Reset"
                            className="size-[18px] block"
                        />
                    </button>
                    <button
                        onClick={onClose}
                        className="size-[18px] flex items-center justify-center hover:opacity-60 transition-opacity cursor-pointer"
                    >
                        <img
                            src={imgClose}
                            alt="Close"
                            className="size-[18px] block"
                        />
                    </button>
                </div>
            </div>

            {/* Chat body */}
            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-[15px] py-[28px] flex flex-col gap-[24px]"
            >
                {isEmpty ? (
                    <div className="flex-1 flex flex-col justify-end gap-[28px]">
                        <p
                            className="font-['DM_Sans:Medium'] font-medium text-[#202020] text-[22px] tracking-[-0.11px] leading-[1.2]"
                            style={{ fontVariationSettings: '"opsz" 14' }}
                        >
                            What would you like to know?
                        </p>
                        <Suggestions
                            items={shownSuggestions}
                            onPick={sendMessage}
                        />
                        <AnimatePresence>
                            {isThinking && <Thinking />}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="flex flex-col gap-[20px]">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex flex-col gap-[6px] ${msg.role === "user" ? "justify-end! items-end" : "border-b border-[#E3E3E3] pb-1.25"}`}>
                                {msg.role === "user" ? (
                                    <div className="bg-[#fff] rounded-[4px] px-[8px] py-[14px] w-[309px] border border-[#E3E3E3] justify-end flex flex-col gap-[6px]">
                                        {/* {msg.context && (
                                            <p className="border-l-2 border-[#e65f2e]/40 pl-[8px] font-['DM_Sans:Regular'] font-normal text-[#7c7c7c] text-[13px] leading-[1.4] truncate">
                                                {msg.context}
                                            </p>
                                        )} */}
                                        <p
                                            className="font-['DM_Sans:Medium'] bg-[#ffffff] font-medium text-[#202020] text-[15px] leading-[1.5]"
                                            style={{
                                                fontVariationSettings:
                                                    '"opsz" 14',
                                            }}
                                        >
                                            {msg.text}
                                        </p>
                                    </div>
                                ) : i === typingIndex ? (
                                    <TypewriterText
                                        text={msg.text}
                                        speed={12}
                                        onUpdate={scrollToBottom}
                                        onComplete={() => setTypingIndex(null)}
                                        className="font-['DM_Sans:Regular'] font-normal text-[#454545] text-[15px] leading-[1.6]"
                                        style={{
                                            fontVariationSettings: '"opsz" 14',
                                        }}
                                    />
                                ) : (
                                    <p
                                        className="font-['DM_Sans:Regular'] font-normal text-[#454545] text-[15px] leading-[1.6]"
                                        style={{
                                            fontVariationSettings: '"opsz" 14',
                                        }}
                                    >
                                        {msg.text}
                                    </p>
                                )}
                            </div>
                        ))}

                        <AnimatePresence>
                            {isThinking && <Thinking />}
                        </AnimatePresence>

                        {!isThinking &&
                            !isAnswerTyping &&
                            shownSuggestions.length > 0 && (
                                <Suggestions
                                    items={shownSuggestions}
                                    onPick={sendMessage}
                                />
                            )}
                    </div>
                )}
            </div>

            <div className="px-[15px] pb-[16px]">
                <div className="flex flex-col bg-white border border-[#e3e3e3]">
                    {contextText && (
                        <div className="flex items-center justify-between gap-[8px] px-[15px] py-[12px] bg-[#F9F9F9] m-2">
                            <p
                                className="flex-1 truncate font-['DM_Sans:Regular']  font-normal text-[14px] text-[#454545] leading-[1.4]"
                                style={{ fontVariationSettings: '"opsz" 14' }}
                                title={contextText}
                            >
                                {contextText}
                            </p>
                            <button
                                onClick={() => setContextText(null)}
                                className="shrink-0 size-[18px] flex items-center justify-center hover:opacity-60 transition-opacity cursor-pointer"
                            >
                                <img
                                    src={imgClose}
                                    alt="Remove"
                                    className="size-[14px] block"
                                />
                            </button>
                        </div>
                    )}

                    <div className="flex items-center h-[56px] px-[15px] gap-[8px]">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && sendMessage(input)
                            }
                            placeholder="Ask about Gaurav..."
                            disabled={isThinking}
                            className="flex-1 font-['DM_Sans:Regular'] font-normal text-[15px] text-[#202020] placeholder:text-[#7c7c7c] bg-transparent outline-none leading-[1.6] disabled:opacity-50"
                            style={{ fontVariationSettings: '"opsz" 14' }}
                        />
                        <button
                            onClick={() => sendMessage(input)}
                            disabled={isThinking}
                            className="size-[40px] bg-[#F5DAD0] rounded-[4.9375rem] flex items-center justify-center shrink-0 cursor-pointer hover:opacity-70 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <img
                                src={imgSend}
                                alt="Send"
                                className="size-[24px] block"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
