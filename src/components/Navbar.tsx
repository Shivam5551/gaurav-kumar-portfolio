"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const assetPathPrefix = "/assets";
const imgStar = `${assetPathPrefix}/505b8.svg`;
const imgStarOrange = `${assetPathPrefix}/ca168.svg`;

interface NavbarProps {
    llmOpen: boolean;
    onToggleLLM: () => void;
    isDesktop: boolean;
}

const links: { label: string; href: string }[] = [
    { label: "Work", href: "/" },
    { label: "About", href: "/about" },
    { label: "Lab", href: "/lab" },
    { label: "Resume", href: "/resume" },
];

export default function Navbar({
    llmOpen,
    onToggleLLM,
    isDesktop,
}: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    const closeMobile = () => setMobileOpen(false);

    return (
        <>
            <header
                className="fixed top-0 left-0 z-50 bg-[#fcfdfe] overflow-hidden transition-[right] duration-300"
                style={{ right: llmOpen && isDesktop ? 384 : 0 }}
            >
                {/* ── Desktop nav (lg+) ── */}
                <div className="hidden lg:flex justify-between items-center h-[89px] px-[34px] py-[22px]">
                    <Link
                        href="/"
                        className="font-['DM_Mono:Medium'] text-[24px] text-black tracking-[-0.12px] uppercase leading-[1.2] shrink-0 w-[172px] text-left"
                    >
                        Gaurav Kumar
                    </Link>
                    <div className="flex shrink-0 items-center gap-[144px] bg-[#f0f0f0] px-[22px] self-stretch">
                        <div className="flex items-center gap-[28px] self-stretch">
                            {links.map(({ label, href }) => {
                                const active = pathname === href;
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={`flex items-center justify-center self-stretch py-[14px] text-[14px] text-center tracking-[-0.07px] uppercase whitespace-nowrap transition-colors ${
                                            active
                                                ? "border-b-[1.5px] border-black border-solid font-['DM_Mono:Medium'] text-black"
                                                : "font-['DM_Mono:Regular'] text-[#454545]"
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                        </div>
                        <button
                            onClick={onToggleLLM}
                            className="flex items-center gap-[8px] self-stretch py-[14px]"
                        >
                            <img
                                src={llmOpen ? imgStarOrange : imgStar}
                                alt=""
                                className="size-[17px] block"
                            />
                            <span
                                className={`font-['DM_Mono:Regular'] text-[14px] tracking-[-0.07px] uppercase whitespace-nowrap transition-colors ${llmOpen ? "text-[#e65f2e]" : "text-[#454545]"}`}
                            >
                                GauravLLM
                            </span>
                        </button>
                    </div>
                </div>

                {/* ── Mobile / Tablet nav (<lg) ── */}
                <div className="flex lg:hidden justify-between items-center h-[64px] px-[24px] py-[16px] sm:px-8">
                    <Link
                        href="/"
                        onClick={closeMobile}
                        className="font-['DM_Mono:Medium'] text-[18px] sm:text-[20px] text-black tracking-[-0.12px] uppercase leading-[1.2]"
                    >
                        Gaurav Kumar
                    </Link>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileOpen((v) => !v)}
                            className="flex flex-col justify-center gap-[5px] w-[24px] h-[24px] text-black"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? (
                                <img 
                                    src={`${assetPathPrefix}/Frame.svg`}
                                    alt="Close menu"
                                    width={24}
                                    height={24}
                                />
                            ) : (
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 8.5H20"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M4 15.5H20"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            )}
                        </button> 
                    </div>
                </div>

                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#fcfdfe] border-t border-[#e3e3e3] ${mobileOpen ? "max-h-[320px]" : "max-h-0"}`}
                >
                    <div className="flex flex-col px-5 sm:px-8 py-4 gap-1">
                        {links.map(({ label, href }) => {
                            const active = pathname === href;
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={closeMobile}
                                    className={`flex items-center py-3 text-[14px] tracking-[-0.07px] uppercase text-left border-b border-[#f0f0f0] last:border-0 transition-colors ${
                                        active
                                            ? "font-['DM_Mono:Medium'] text-black"
                                            : "font-['DM_Mono:Regular'] text-[#454545]"
                                    }`}
                                >
                                    {label}
                                    {active && (
                                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-black" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </header>

            {/* Backdrop for mobile menu */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 lg:hidden"
                    onClick={closeMobile}
                />
            )}
        </>
    );
}
