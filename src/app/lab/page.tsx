"use client";

import Footer from "@/components/Footer";
import { motion, Variants } from "motion/react";

const assetPathPrefix = "/assets";
const imgPost = `${assetPathPrefix}/9a320.png`;

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.08,
            ease: "easeOut",
        },
    }),
};

const container: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardReveal: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.98 },
    show: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const captionLine: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            delay: 0.2 + i * 0.08,
            ease: "easeOut",
        },
    }),
};

function PostCaption() {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="flex flex-col gap-[10px] sm:gap-[14px] text-[#202020] text-[13px] sm:text-[15px] lg:text-[17px] tracking-[-0.085px] uppercase w-full"
        >
            <motion.p
                custom={0}
                variants={captionLine}
                className="font-['DM_Sans:Medium'] font-medium leading-[1.2] whitespace-nowrap truncate"
                style={{ fontVariationSettings: '"opsz" 14' }}
            >
                {`The future of AI & hardware`}
            </motion.p>
            <motion.div
                custom={1}
                variants={captionLine}
                className="flex font-['DM_Mono:Regular'] items-center text-[#454545] whitespace-nowrap"
            >
                <span className="leading-[1.2] hidden sm:inline">
                    Openai X Hardware
                </span>
                <ul className="block leading-[0] hidden sm:block">
                    <li className="list-disc ms-[20px]">
                        <span className="leading-[1.2]">​</span>
                    </li>
                </ul>
                <span className="leading-[1.2]">Concept 2025</span>
            </motion.div>
        </motion.div>
    );
}

// Aspect ratios approximating original heights (col x item)
// Original heights: 606, 550, 401
const colDefs = [
    [{ ar: "3/4" }, { ar: "4/5" }, { ar: "1/1" }], // col 0
    [{ ar: "1/1" }, { ar: "3/4" }, { ar: "1/1" }], // col 1
    [{ ar: "4/5" }, { ar: "1/1" }, { ar: "3/4" }], // col 2
];

export default function LabPage() {
    return (
        <div className="bg-[#fcfdfe] min-h-screen flex flex-col">
            {/* Intro */}
            <section className="mt-[64px] lg:mt-[89px] px-5 sm:px-8 lg:px-[34px] py-14 sm:py-20 lg:py-[100px]">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={container}
                    className="flex flex-col gap-6 sm:gap-[32px] items-start max-w-[1003px]"
                >
                    <motion.h1
                        custom={0}
                        variants={fadeUp}
                        className="font-['DM_Sans:SemiBold'] font-semibold text-[30px] sm:text-[44px] lg:text-[64px] text-black tracking-[-0.96px] leading-[1.15] w-full"
                        style={{ fontVariationSettings: '"opsz" 14' }}
                    >
                        I think out loud here — half shipped ideas, half working
                        components.
                    </motion.h1>
                    <motion.p
                        custom={1}
                        variants={fadeUp}
                        className="font-['DM_Sans:Regular'] font-normal text-[#202020] text-[15px] sm:text-[16px] tracking-[-0.08px] leading-[1.6] max-w-[725px]"
                        style={{ fontVariationSettings: '"opsz" 14' }}
                    >
                        {`Not everything needs a case study. Some things just need to exist — a component I tested, a thought I couldn't shake, a decision I want on record. This is that feed.`}
                    </motion.p>
                </motion.div>
            </section>

            {/* Masonry grid */}
            <section className="px-5 sm:px-8 lg:px-[34px] pb-[64px] flex-1">
                {/* Mobile: single column */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={container}
                    className="grid grid-cols-1 gap-[12px] sm:hidden"
                >
                    {colDefs.flat().map((item, i) => (
                        <PostCard key={i} aspectRatio={item.ar} index={i} />
                    ))}
                </motion.div>

                {/* Tablet: 2 columns */}
                <div className="hidden sm:grid lg:hidden grid-cols-2 gap-[14px]">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={container}
                        className="flex flex-col gap-[14px]"
                    >
                        {[...colDefs[0], colDefs[2][0]].map((item, i) => (
                            <PostCard key={i} aspectRatio={item.ar} index={i} />
                        ))}
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={container}
                        className="flex flex-col gap-[14px]"
                    >
                        {[...colDefs[1], colDefs[2][1]].map((item, i) => (
                            <PostCard key={i} aspectRatio={item.ar} index={i} />
                        ))}
                    </motion.div>
                </div>

                {/* Desktop: 3 columns */}
                <div className="hidden lg:grid grid-cols-3 gap-[16px]">
                    {colDefs.map((col, ci) => (
                        <motion.div
                            key={ci}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={container}
                            className="flex flex-col gap-[16px]"
                        >
                            {col.map((item, i) => (
                                <PostCard
                                    key={i}
                                    aspectRatio={item.ar}
                                    index={i}
                                />
                            ))}
                        </motion.div>
                    ))}
                </div>
            </section>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <Footer />
            </motion.div>
        </div>
    );
}

function PostCard({
    aspectRatio,
    index = 0,
}: {
    aspectRatio: string;
    index?: number;
}) {
    return (
        <motion.div
            custom={index}
            variants={cardReveal}
            className="flex flex-col gap-[10px] sm:gap-[16px]"
        >
            <motion.div
                data-cursor-cta="View Website"
                className="border border-[#e3e3e3] w-full overflow-hidden relative group cursor-pointer"
                style={{ aspectRatio }}
                whileHover="hover"
                initial="rest"
            >
                <motion.img
                    alt=""
                    className="w-full h-full object-cover block pointer-events-none"
                    src={imgPost}
                    variants={{
                        rest: { scale: 1 },
                        hover: { scale: 1.06 },
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <motion.div
                    className="absolute inset-0 bg-black/15 pointer-events-none"
                    variants={{
                        rest: { opacity: 0 },
                        hover: { opacity: 1 },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                />
                <motion.div
                    className="absolute inset-0 border border-white/0 pointer-events-none"
                    variants={{
                        rest: { borderColor: "rgba(255,255,255,0)" },
                        hover: { borderColor: "rgba(255,255,255,0.4)" },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                />
            </motion.div>
            <PostCaption />
        </motion.div>
    );
}
