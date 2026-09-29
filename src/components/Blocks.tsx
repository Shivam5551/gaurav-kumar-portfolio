"use client";

import { motion } from "motion/react";
import { Block } from "@/lib/types";
import { fadeUp, scaleIn, container } from "@/lib/transitions";

const fv = { fontVariationSettings: '"opsz" 14' };

function withEmphasis(text: string, emphasize?: string[]) {
    if (!emphasize || emphasize.length === 0) return text;
    const pattern = new RegExp(
        `(${emphasize.map((e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
        "g",
    );
    const parts = text.split(pattern);
    return parts.map((part, i) =>
        emphasize.includes(part) ? (
            <strong
                key={i}
                className="font-['DM_Sans:Medium'] font-medium text-black"
                style={fv}
            >
                {part}
            </strong>
        ) : (
            part
        ),
    );
}

export function BlockRenderer({ block }: { block: Block }) {
    switch (block.type) {
        case "heading":
            return (
                <>
                    <motion.p
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.8 }}
                        variants={fadeUp}
                        className="font-['DM_Mono:Regular'] text-[11px] text-[#999] tracking-[0.08em] uppercase mb-5"
                    >
                        {block.eyebrow}
                    </motion.p>
                    <motion.h2
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.6 }}
                        custom={1}
                        variants={fadeUp}
                        className="font-['DM_Sans:SemiBold'] font-semibold text-[26px] sm:text-[34px] text-black tracking-[-0.64px] leading-[1.2]"
                        style={fv}
                    >
                        {block.heading}
                    </motion.h2>
                </>
            );

        case "paragraph": {
            const mt =
                block.spacing === "small"
                    ? "mt-4"
                    : block.spacing === "none"
                      ? ""
                      : "mt-5";
            return (
                <motion.p
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.6 }}
                    custom={2}
                    variants={fadeUp}
                    className={`font-['DM_Sans:Regular'] font-normal text-[#444] text-[15px] sm:text-[16px] tracking-[-0.06px] leading-[1.7] ${mt} ${block.italic ? "italic" : ""}`}
                    style={fv}
                >
                    {withEmphasis(block.text, block.emphasize)}
                </motion.p>
            );
        }

        case "cardGrid":
            return (
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={container}
                    className={`mt-10 grid grid-cols-1 gap-x-[32px] gap-y-[32px] ${
                        block.columns === 2
                            ? "sm:grid-cols-2 gap-y-[28px]"
                            : "sm:grid-cols-3"
                    } ${block.divider ? "pt-8 border-t border-[#e8e8e8]" : ""}`}
                >
                    {block.items.map((item, i) => (
                        <motion.div
                            key={item.title}
                            custom={i}
                            variants={fadeUp}
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="flex flex-col gap-[10px]"
                        >
                            {item.number && (
                                <span className="font-['DM_Mono:Medium'] text-[#e65f2e] text-[11px] tracking-[0.08em] uppercase">
                                    {item.number}
                                </span>
                            )}
                            <h3
                                className="font-['DM_Sans:SemiBold'] font-semibold text-[15px] text-black tracking-[-0.04px] leading-[1.35]"
                                style={fv}
                            >
                                {item.title}
                            </h3>
                            <p
                                className="font-['DM_Sans:Regular'] font-normal text-[#666] text-[14px] leading-[1.65]"
                                style={fv}
                            >
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            );

        case "stackDiagram":
            return (
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={container}
                    className="mt-8 flex flex-col gap-[4px]"
                >
                    {block.items.map((item, i) => (
                        <motion.div
                            key={item.label}
                            custom={i}
                            variants={fadeUp}
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className={`flex items-center justify-between px-5 h-[48px] font-['DM_Mono:Regular'] text-[12px] uppercase tracking-[0.04em] ${
                                item.highlight
                                    ? "bg-[#e65f2e] text-white"
                                    : "bg-[#f5f5f5] text-[#666]"
                            }`}
                        >
                            <span>{item.label}</span>
                            {item.highlight && item.note && (
                                <span className="text-[10px] opacity-70">
                                    {item.note}
                                </span>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            );

        case "quote":
            return (
                <div className="mt-8 border-l-[2px] border-[#e65f2e] pl-5">
                    <motion.p
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.6 }}
                        variants={fadeUp}
                        className="font-['DM_Sans:Regular'] font-normal text-[#454545] text-[15px] leading-[1.7] italic"
                        style={fv}
                    >
                        {block.text}
                    </motion.p>
                </div>
            );

        case "image":
            return (
                <div className="mt-8">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={scaleIn}
                        className="w-full bg-[#f5f5f5] overflow-hidden"
                        style={{ aspectRatio: block.aspectRatio ?? "16/9" }}
                    >
                        {block.src && (
                            <img
                                src={block.src}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        )}
                    </motion.div>
                    {block.caption && (
                        <p className="font-['DM_Mono:Regular'] text-[11px] text-[#999] tracking-[0.06em] uppercase mt-3">
                            {block.caption}
                        </p>
                    )}
                </div>
            );

        case "imageGrid":
            return (
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={container}
                    className={`mt-6 grid gap-[12px] ${block.columns === 3 ? "grid-cols-3" : "grid-cols-2"}`}
                >
                    {block.images.map((img, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={scaleIn}
                            className="w-full bg-[#f5f5f5] overflow-hidden"
                            style={{ aspectRatio: img.aspectRatio ?? "4/3" }}
                        >
                            {img.src && (
                                <img
                                    src={img.src}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            );

        case "numberedList":
            return (
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={container}
                    className="mt-8 flex flex-col divide-y divide-[#e8e8e8]"
                >
                    {block.items.map((item, i) => (
                        <motion.div
                            key={item.title}
                            custom={i}
                            variants={fadeUp}
                            whileHover={{ x: 6 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className={`flex ${item.number ? "gap-[24px] sm:gap-[40px]" : "flex-col sm:flex-row sm:gap-[28px]"} items-baseline py-5`}
                        >
                            {item.number && (
                                <span className="font-['DM_Mono:Regular'] text-[#e65f2e] text-[11px] uppercase tracking-[0.06em] shrink-0 w-[24px]">
                                    {item.number}
                                </span>
                            )}
                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-[6px] sm:gap-[28px] flex-1 min-w-0">
                                <h3
                                    className="font-['DM_Sans:Medium'] font-medium text-[15px] text-black tracking-[-0.04px] shrink-0 sm:w-[220px]"
                                    style={fv}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className="font-['DM_Sans:Regular'] font-normal text-[#666] text-[14px] leading-[1.6]"
                                    style={fv}
                                >
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            );

        case "comparisonGrid":
            return (
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={container}
                    className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-[1px] bg-[#e8e8e8]"
                >
                    {block.options.map((opt, i) => (
                        <motion.div
                            key={opt.label}
                            custom={i}
                            variants={fadeUp}
                            whileHover={
                                opt.active ? { scale: 1.02 } : { y: -4 }
                            }
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className={`flex flex-col gap-[12px] p-6 lg:p-8 ${opt.active ? "bg-[#202020]" : "bg-white"}`}
                        >
                            <span
                                className={`font-['DM_Mono:Regular'] text-[11px] uppercase tracking-[0.06em] ${
                                    opt.active
                                        ? "text-[#e65f2e]"
                                        : "text-[#aaa]"
                                }`}
                            >
                                {opt.fit}
                            </span>
                            <h3
                                className={`font-['DM_Sans:SemiBold'] font-semibold text-[17px] tracking-[-0.07px] leading-[1.2] ${
                                    opt.active ? "text-white" : "text-black"
                                }`}
                                style={fv}
                            >
                                {opt.label}
                            </h3>
                            <div className="flex flex-wrap gap-[6px]">
                                {opt.tags.map((t) => (
                                    <span
                                        key={t}
                                        className={`font-['DM_Mono:Regular'] text-[11px] border px-[8px] py-[2px] uppercase tracking-[0.02em] ${
                                            opt.active
                                                ? "border-[#444] text-[#888]"
                                                : "border-[#e3e3e3] text-[#888]"
                                        }`}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <p
                                className="font-['DM_Sans:Regular'] font-normal text-[13px] leading-[1.65] text-[#888]"
                                style={fv}
                            >
                                {opt.note}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            );

        case "insightGrid":
            return (
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={container}
                    className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-[32px]"
                >
                    {block.items.map((item, i) => (
                        <motion.div
                            key={item.number}
                            custom={i}
                            variants={fadeUp}
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="flex flex-col gap-[8px] pt-6"
                            style={{
                                borderTop: `2px solid ${block.borderColor ?? "#e8e8e8"}`,
                            }}
                        >
                            <span
                                className="font-['DM_Mono:Regular'] text-[11px] uppercase tracking-[0.06em]"
                                style={{ color: block.numberColor ?? "#999" }}
                            >
                                {item.number}
                            </span>
                            <h3
                                className="font-['DM_Sans:SemiBold'] font-semibold text-[19px] text-black tracking-[-0.09px] leading-[1.25]"
                                style={fv}
                            >
                                {item.title}
                            </h3>
                            <p
                                className="font-['DM_Sans:Regular'] font-normal text-[#666] text-[14px] leading-[1.65]"
                                style={fv}
                            >
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            );

        case "subheading":
            return (
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.6 }}
                    variants={container}
                    className="mt-10 flex flex-col gap-[8px]"
                >
                    <motion.span
                        custom={0}
                        variants={fadeUp}
                        className="font-['DM_Mono:Regular'] text-[#e65f2e] text-[11px] uppercase tracking-[0.06em]"
                    >
                        {block.label}
                    </motion.span>
                    <motion.h3
                        custom={1}
                        variants={fadeUp}
                        className="font-['DM_Sans:SemiBold'] font-semibold text-[22px] text-black tracking-[-0.11px] leading-[1.25]"
                        style={fv}
                    >
                        {block.title}
                    </motion.h3>
                    {block.body && (
                        <motion.p
                            custom={2}
                            variants={fadeUp}
                            className="font-['DM_Sans:Regular'] font-normal text-[#444] text-[15px] sm:text-[16px] tracking-[-0.06px] leading-[1.7] mt-2"
                            style={fv}
                        >
                            {block.body}
                        </motion.p>
                    )}
                </motion.div>
            );

        case "callout":
            return (
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mt-10 bg-[#202020] px-7 sm:px-10 py-9 sm:py-12"
                >
                    {block.label && (
                        <p className="font-['DM_Mono:Regular'] text-[#e65f2e] text-[11px] uppercase tracking-[0.06em] mb-5">
                            {block.label}
                        </p>
                    )}
                    <p
                        className="font-['DM_Sans:SemiBold'] font-semibold text-white text-[20px] sm:text-[26px] tracking-[-0.13px] leading-[1.35]"
                        style={fv}
                    >
                        {block.heading}
                    </p>
                </motion.div>
            );

        default:
            return null;
    }
}
