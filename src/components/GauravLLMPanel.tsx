"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "motion/react";
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

const panelVariants: Variants = {
    hidden: {
        x: "100%",
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
        },
    },
    exit: {
        x: "100%",
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
        },
    },
};

const messageVariants: Variants = {
    hidden: (role: "user" | "assistant") => ({
        opacity: 0,
        x: role === "user" ? 16 : -16,
        y: 8,
        scale: 0.97,
    }),
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 28,
            mass: 0.6,
        },
    },
};

const contextChipVariants: Variants = {
    hidden: {
        opacity: 0,
        y: -8,
        scale: 0.96,
        height: 0,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        height: "auto",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 28,
            mass: 0.5,
        },
    },
    exit: {
        opacity: 0,
        y: -6,
        scale: 0.96,
        height: 0,
        transition: {
            duration: 0.18,
            ease: "easeIn",
        },
    },
};

const emptyStateVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
            staggerChildren: 0.08,
        },
    },
    exit: {
        opacity: 0,
        y: -8,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
};

const emptyStateChildVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.35,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

const headerButtonVariants = {
    rest: { scale: 1, opacity: 1 },
    hover: { scale: 1.12, opacity: 0.7 },
    tap: { scale: 0.88 },
};

const sendButtonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.06 },
    tap: { scale: 0.9 },
};

// ─────────────────────────────────────────────────────────────────────────────

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
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }, [messages, isThinking]);

    const scrollToBottom = () => {
        const container = messagesContainerRef.current;
        if (!container) return;
        container.scrollTop = container.scrollHeight;
    };

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
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    key="llm-panel"
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col fixed inset-0 z-[100] lg:relative lg:inset-auto lg:w-[384px] lg:shrink-0 lg:sticky lg:top-0 lg:h-screen bg-[#f9f9f9] border-l border-[#e3e3e3]"
                >
                    {/* ── Panel header ── */}
                    <div className="flex items-end justify-between border-b border-[#E3E3E3] pt-[35px] pb-[14px] px-[16px]">
                        <motion.span
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.3 }}
                            className="font-['DM_Mono:Medium'] text-[#454545] text-[14px] tracking-[-0.07px] uppercase leading-[1.2]"
                        >
                            Gaurav Kumar
                        </motion.span>

                        <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                            className="flex items-center gap-[24px]"
                        >
                            <motion.button
                                variants={headerButtonVariants}
                                initial="rest"
                                whileHover="hover"
                                whileTap="tap"
                                onClick={handleReset}
                                className="size-[18px] flex items-center justify-center cursor-pointer"
                            >
                                <img
                                    src={imgRefresh}
                                    alt="Reset"
                                    className="size-[18px] block"
                                />
                            </motion.button>

                            <motion.button
                                variants={headerButtonVariants}
                                initial="rest"
                                whileHover="hover"
                                whileTap="tap"
                                onClick={onClose}
                                className="size-[18px] flex items-center justify-center cursor-pointer"
                            >
                                <img
                                    src={imgClose}
                                    alt="Close"
                                    className="size-[18px] block"
                                />
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* ── Chat body ── */}
                    <div
                        ref={messagesContainerRef}
                        className="flex-1 overflow-y-auto px-[15px] py-[28px] flex flex-col gap-[24px]"
                    >
                        <AnimatePresence mode="wait">
                            {isEmpty ? (
                                /* ── Empty / welcome state ── */
                                <motion.div
                                    key="empty-state"
                                    variants={emptyStateVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="flex-1 flex flex-col justify-end gap-[28px]"
                                >
                                    <motion.p
                                        variants={emptyStateChildVariants}
                                        className="font-['DM_Sans:Medium'] font-medium text-[#202020] text-[22px] tracking-[-0.11px] leading-[1.2]"
                                        style={{
                                            fontVariationSettings: '"opsz" 14',
                                        }}
                                    >
                                        What would you like to know?
                                    </motion.p>

                                    <motion.div
                                        variants={emptyStateChildVariants}
                                    >
                                        <Suggestions
                                            items={shownSuggestions}
                                            onPick={sendMessage}
                                        />
                                    </motion.div>

                                    <AnimatePresence>
                                        {isThinking && <Thinking />}
                                    </AnimatePresence>
                                </motion.div>
                            ) : (
                                /* ── Message thread ── */
                                <motion.div
                                    key="message-thread"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col gap-[20px]"
                                >
                                    <AnimatePresence initial={false}>
                                        {messages.map((msg, i) => (
                                            <motion.div
                                                key={i}
                                                custom={msg.role}
                                                variants={messageVariants}
                                                initial="hidden"
                                                animate="visible"
                                                className={`flex flex-col gap-[6px] ${
                                                    msg.role === "user"
                                                        ? "justify-end! items-end"
                                                        : "border-b border-[#E3E3E3] pb-1.25"
                                                }`}
                                            >
                                                {msg.role === "user" ? (
                                                    <div className="bg-[#fff] rounded-[4px] px-[8px] py-[14px] w-[309px] border border-[#E3E3E3] justify-end flex flex-col gap-[6px]">
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
                                                        onComplete={() =>
                                                            setTypingIndex(null)
                                                        }
                                                        className="font-['DM_Sans:Regular'] font-normal text-[#454545] text-[15px] leading-[1.6]"
                                                        style={{
                                                            fontVariationSettings:
                                                                '"opsz" 14',
                                                        }}
                                                    />
                                                ) : (
                                                    <p
                                                        className="font-['DM_Sans:Regular'] font-normal text-[#454545] text-[15px] leading-[1.6]"
                                                        style={{
                                                            fontVariationSettings:
                                                                '"opsz" 14',
                                                        }}
                                                    >
                                                        {msg.text}
                                                    </p>
                                                )}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    <AnimatePresence>
                                        {isThinking && <Thinking />}
                                    </AnimatePresence>

                                    <AnimatePresence>
                                        {!isThinking &&
                                            !isAnswerTyping &&
                                            shownSuggestions.length > 0 && (
                                                <motion.div
                                                    key="follow-ups"
                                                    initial={{
                                                        opacity: 0,
                                                        y: 12,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        y: -8,
                                                    }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 300,
                                                        damping: 26,
                                                        delay: 0.1,
                                                    }}
                                                >
                                                    <Suggestions
                                                        items={shownSuggestions}
                                                        onPick={sendMessage}
                                                    />
                                                </motion.div>
                                            )}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* ── Input bar ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.35 }}
                        className="px-[15px] pb-[16px]"
                    >
                        <div className="flex flex-col bg-white border border-[#e3e3e3]">
                            {/* Context chip */}
                            <AnimatePresence>
                                {contextText && (
                                    <motion.div
                                        key="context-chip"
                                        variants={contextChipVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="flex items-center justify-between gap-[8px] px-[15px] py-[12px] bg-[#F9F9F9] m-2 overflow-hidden"
                                    >
                                        <p
                                            className="flex-1 truncate font-['DM_Sans:Regular'] font-normal text-[14px] text-[#454545] leading-[1.4]"
                                            style={{
                                                fontVariationSettings:
                                                    '"opsz" 14',
                                            }}
                                            title={contextText}
                                        >
                                            {contextText}
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.15, opacity: 0.6 }}
                                            whileTap={{ scale: 0.85 }}
                                            onClick={() => setContextText(null)}
                                            className="shrink-0 size-[18px] flex items-center justify-center cursor-pointer"
                                        >
                                            <img
                                                src={imgClose}
                                                alt="Remove"
                                                className="size-[14px] block"
                                            />
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

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
                                    style={{
                                        fontVariationSettings: '"opsz" 14',
                                    }}
                                />
                                <motion.button
                                    variants={sendButtonVariants}
                                    initial="rest"
                                    whileHover={
                                        isThinking ? undefined : "hover"
                                    }
                                    whileTap={isThinking ? undefined : "tap"}
                                    onClick={() => sendMessage(input)}
                                    disabled={isThinking}
                                    className="size-[40px] bg-[#F5DAD0] rounded-[4.9375rem] flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <img
                                        src={imgSend}
                                        alt="Send"
                                        className="size-[24px] block"
                                    />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}