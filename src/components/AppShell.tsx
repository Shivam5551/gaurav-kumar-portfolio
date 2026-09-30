"use client";

import { useState, type ReactNode } from "react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import Navbar from "@/components/Navbar";
import GauravLLMPanel from "@/components/GauravLLMPanel";
import CursorEffects from "@/components/CursorEffects";
import { GaurvallmButton } from "@/components/GaurvallmButton";

interface PendingSelection {
    text: string;
    id: number; // ensures re-selecting the same text still triggers the effect
}

export default function AppShell({ children }: { children: ReactNode }) {
    const [llmOpen, setLlmOpen] = useState(false);
    const [pendingSelection, setPendingSelection] =
        useState<PendingSelection | null>(null);
    const isDesktop = useIsDesktop();

    const handleOpenLLM = (selectedText?: string) => {
        if (selectedText) {
            setPendingSelection({ text: selectedText, id: Date.now() });
        }
        setLlmOpen(true);
    };

    return (
        <div className="bg-[#fcfdfe] flex">
            {/* Main content */}
            <div className="flex flex-col flex-1 min-w-0">
                <Navbar
                    llmOpen={llmOpen}
                    onToggleLLM={() => setLlmOpen((v) => !v)}
                    isDesktop={isDesktop}
                />
                {children}
            </div>

            {/* Always mounted — visibility toggled internally, so chat state persists */}
            <GauravLLMPanel
                isOpen={llmOpen}
                onClose={() => setLlmOpen(false)}
                pendingSelection={pendingSelection}
            />

            <div className="fixed bottom-4 right-4"><GaurvallmButton isOpen={llmOpen} onClick={() => setLlmOpen(true)} />
</div>
            <CursorEffects onOpenLLM={handleOpenLLM} />
        </div>
    );
}
