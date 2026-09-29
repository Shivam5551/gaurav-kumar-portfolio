"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const imgStarWhite = "/assets/c5b09.svg";

interface SelectionAnchor {
    x: number;
    y: number;
    text: string;
}

interface CursorEffectsProps {
    onOpenLLM: (selectedText?: string) => void;
}

// SVG icon strings for direct DOM injection
const EYE_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" stroke="white" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="white" stroke-width="1.8"/></svg>`;
const ARROW_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 17L17 7M17 7H7M17 7v10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// Detect touch / coarse-pointer / mobile devices where a custom cursor makes no sense
function detectNoCursorDevice(): boolean {
    if (typeof window === "undefined") return true;
    const coarse = window.matchMedia?.("(pointer: coarse)").matches;
    const noHover = window.matchMedia?.("(hover: none)").matches;
    const touchCapable =
        "ontouchstart" in window || (navigator.maxTouchPoints ?? 0) > 0;
    return !!(coarse || noHover || touchCapable);
}

export default function CursorEffects({ onOpenLLM }: CursorEffectsProps) {
    const mouseRef = useRef({ x: -200, y: -200 });
    const circleRef = useRef({ x: -200, y: -200 });
    const outerElRef = useRef<HTMLDivElement>(null);
    const dotElRef = useRef<HTMLDivElement>(null);
    const pillElRef = useRef<HTMLDivElement>(null);
    const pillIconRef = useRef<HTMLSpanElement>(null);
    const pillTextRef = useRef<HTMLSpanElement>(null);
    const rafRef = useRef<number>(0);
    const visibleRef = useRef(false);
    const inCTARef = useRef(false);

    const [selection, setSelection] = useState<SelectionAnchor | null>(null);
    // Start with the SSR-safe default (no cursor UI) so the server and the
    // client's first render match; the effect below corrects it on mount.
    const [isTouchDevice, setIsTouchDevice] = useState<boolean>(true);

    // Re-check on resize (e.g. devtools device toolbar, orientation change)
    useEffect(() => {
        const check = () => setIsTouchDevice(detectNoCursorDevice());
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // rAF trailing loop — single lerp drives both dot and pill
    useEffect(() => {
        if (isTouchDevice) return;

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        const SPEED = 0.12;

        const tick = () => {
            circleRef.current.x = lerp(
                circleRef.current.x,
                mouseRef.current.x,
                SPEED,
            );
            circleRef.current.y = lerp(
                circleRef.current.y,
                mouseRef.current.y,
                SPEED,
            );

            if (outerElRef.current) {
                outerElRef.current.style.transform = `translate(${circleRef.current.x}px, ${circleRef.current.y}px)`;
            }
            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [isTouchDevice]);

    // Mouse tracking + CTA mode switching
    useEffect(() => {
        if (isTouchDevice) return;

        const onMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };

            if (!visibleRef.current && outerElRef.current) {
                outerElRef.current.style.opacity = "1";
                visibleRef.current = true;
            }

            const ctaEl = (e.target as Element).closest("[data-cursor-cta]");
            const ctaLabel = ctaEl?.getAttribute("data-cursor-cta") ?? null;
            const nowInCTA = !!ctaLabel;

            if (nowInCTA !== inCTARef.current) {
                inCTARef.current = nowInCTA;

                if (dotElRef.current) {
                    dotElRef.current.style.opacity = nowInCTA ? "0" : "1";
                    dotElRef.current.style.transform = nowInCTA
                        ? "scale(0.4)"
                        : "scale(1)";
                }
                if (pillElRef.current) {
                    pillElRef.current.style.opacity = nowInCTA ? "1" : "0";
                    pillElRef.current.style.transform = nowInCTA
                        ? "translate(-50%, -50%) scale(1)"
                        : "translate(-50%, -50%) scale(0.7)";
                }

                if (nowInCTA && ctaLabel) {
                    const isWebsite = ctaLabel
                        .toLowerCase()
                        .includes("website");
                    if (pillIconRef.current) {
                        pillIconRef.current.innerHTML = isWebsite
                            ? ARROW_SVG
                            : EYE_SVG;
                    }
                    if (pillTextRef.current) {
                        pillTextRef.current.textContent = ctaLabel;
                    }
                }
            }
        };

        const onLeave = () => {
            if (outerElRef.current) {
                outerElRef.current.style.opacity = "0";
                visibleRef.current = false;
            }
        };

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseleave", onLeave);
        return () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseleave", onLeave);
        };
    }, [isTouchDevice]);

    // Text selection CTA
    useEffect(() => {
        if (isTouchDevice) return;

        const onSelectionChange = () => {
            const sel = window.getSelection();
            if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
                setSelection(null);
                return;
            }
            const text = sel.toString().trim();
            if (!text) {
                setSelection(null);
                return;
            }

            const range = sel.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            setSelection({ x: rect.left + rect.width / 2, y: rect.top, text });
        };

        document.addEventListener("selectionchange", onSelectionChange);
        return () =>
            document.removeEventListener("selectionchange", onSelectionChange);
    }, [isTouchDevice]);

    const handleCTAClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            onOpenLLM(selection?.text);
            window.getSelection()?.removeAllRanges();
            setSelection(null);
        },
        [onOpenLLM, selection],
    );

    // Don't render any cursor UI on touch/mobile devices
    if (isTouchDevice) return null;

    return (
        <>
            {/* Outer wrapper — moved by rAF, centered at cursor point */}
            <div
                ref={outerElRef}
                className="fixed top-0 left-0 pointer-events-none z-[9990] will-change-transform"
                style={{ opacity: 0, transition: "opacity 0.25s" }}
            >
                {/* Small trailing dot */}
                <div
                    ref={dotElRef}
                    className="absolute rounded-full bg-[#e65f2e]"
                    style={{
                        width: 10,
                        height: 10,
                        marginLeft: -5,
                        marginTop: -5,
                        transition:
                            "opacity 0.2s ease-out, transform 0.2s ease-out",
                    }}
                />

                {/* CTA pill — centered at cursor, morphs in when over project images */}
                <div
                    ref={pillElRef}
                    className="absolute flex items-center gap-[8px] h-[42px] px-[18px] rounded-full bg-[#e65f2e] whitespace-nowrap"
                    style={{
                        transform: "translate(-50%, -50%) scale(0.7)",
                        opacity: 0,
                        transition:
                            "opacity 0.18s ease-out, transform 0.22s cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                >
                    <span
                        ref={pillIconRef}
                        className="shrink-0 flex items-center"
                        dangerouslySetInnerHTML={{ __html: EYE_SVG }}
                    />
                    <span
                        ref={pillTextRef}
                        className="font-['DM_Mono:Regular'] text-white text-[12px] tracking-[0.04em] uppercase leading-[1]"
                    >
                        View Case Study
                    </span>
                </div>
            </div>

            {/* Text-selection GauravLLM pill */}
            {selection && (
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleCTAClick}
                    className="fixed z-[9999] flex items-center gap-[8px] h-[34px] pl-[12px] pr-[14px] rounded-[90px] bg-[#e65f2e] hover:brightness-110 transition-[filter]"
                    style={{
                        left: selection.x,
                        top: selection.y,
                        transform: "translate(-50%, calc(-100% - 8px))",
                        animation: "fadeUp 0.18s ease-out",
                    }}
                >
                    <img
                        src={imgStarWhite}
                        alt=""
                        className="size-[17px] block shrink-0"
                    />
                    <span className="font-['DM_Mono:Regular'] text-white text-[14px] tracking-[-0.07px] uppercase whitespace-nowrap leading-[1.2]">
                        GauravLLM
                    </span>
                </button>
            )}
        </>
    );
}
