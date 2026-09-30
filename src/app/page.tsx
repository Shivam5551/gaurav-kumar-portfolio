"use client";

import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { motion, Variants } from "motion/react";

const assetPathPrefix = "/assets";
const imgWorkItem6 = `${assetPathPrefix}/0d321.png`;
const imgWorkItem5 = `${assetPathPrefix}/a4f26.png`;
const imgWorkItem4 = `${assetPathPrefix}/9a320.png`;
const imgWorkItem3 = `${assetPathPrefix}/31b0e.png`;
const imgWorkItem2 = `${assetPathPrefix}/92acc.png`;
const imgWorkItem1 = `${assetPathPrefix}/3944e.png`;

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

// New: variant for work-grid items with a subtle scale for extra polish
const workItemVariant: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.98 },
    show: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            delay: i * 0.09,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

function WorkItemCaption() {
    return (
        <div className="block md:flex items-center justify-between gap-8 text-[15px] tracking-[-0.085px] uppercase w-full overflow-hidden">
            <p
                className="font-['DM_Sans:Medium'] font-medium leading-[1.2] text-black whitespace-nowrap truncate min-w-0"
                style={{ fontVariationSettings: '"opsz" 14' }}
            >
                {`The future of AI & hardware`}
            </p>
            <div className="flex font-['DM_Mono:Regular'] pt-[8px] md:pt-0 justify-between items-center text-[#454545] shrink-0 whitespace-nowrap">
                <span className="leading-[1.2] inline">Openai X Hardware</span>
                <ul className="block leading-[0] block">
                    <li className="list-disc ms-[22px]">
                        <span className="leading-[1.2]">​</span>
                    </li>
                </ul>
                <span className="leading-[1.2]">Concept 2025</span>
            </div>
        </div>
    );
}

const experience = [
    { year: "2025", company: "WAL+L", role: "UX/UI Designer" },
    { year: "2024", company: "Sotbella", role: "UX/UI Designer" },
    { year: "2024", company: "Nexgen", role: "UX/UI Designer" },
    { year: "2022", company: "Vestaso", role: "Junior UX/UI Designer" },
    { year: "2022", company: "Design Limelight", role: "UX/UI Design Intern" },
];

export default function Home() {
    const router = useRouter();
    const onOpenCaseStudy = () => router.push("/case-study");

    return (
        <div className="bg-[#fcfdfe] min-h-screen flex flex-col">
            {/* Hero */}
            <section className="mt-[64px] lg:mt-[89px] pt-12 sm:pt-20 lg:pt-[144px] pb-8 lg:pb-[34px] px-5 lg:px-[34px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-start lg:items-end justify-between gap-10 lg:gap-8">
                    <motion.h1
                        initial="hidden"
                        animate="show"
                        custom={0}
                        variants={fadeUp}
                        className="font-['DM_Sans:SemiBold'] col-span-1 font-semibold text-[36px] sm:text-[48px] lg:text-[54px] text-black tracking-[-0.81px] leading-[1.15] w-full lg:max-w-[609px] lg:shrink-0"
                        style={{ fontVariationSettings: '"opsz" 14' }}
                    >
                        {`Hey, I'm Gaurav.`}
                        <br />I design digital products
                    </motion.h1>

                    {/* Experience table */}
                    <div className="grid col-span-1 gap-[6px] text-[14px] sm:text-[15px] lg:text-[16px] tracking-[-0.08px] leading-[1.6] w-full lg:max-w-[648px]">
                        {experience.map(({ year, company, role }, index) => (
                            <div
                                key={`${year}-${company}`}
                                className="flex items-center justify-between w-full"
                            >
                                <motion.div
                                    initial="hidden"
                                    animate="show"
                                    custom={index + 1}
                                    variants={fadeUp}
                                    className="w-full"
                                >
                                    <div className="grid grid-cols-2 gap-4 items-start sm:hidden">
                                        <span
                                            className="font-['DM_Sans:Regular'] col-span-1 font-normal text-[#454545]"
                                            style={{
                                                fontVariationSettings:
                                                    '"opsz" 14',
                                            }}
                                        >
                                            {year}
                                        </span>
                                        <div className="grid col-span-1 place-items-start gap-[2px]">
                                            <span
                                                className="font-['DM_Sans:Medium'] place-items-start font-medium text-black"
                                                style={{
                                                    fontVariationSettings:
                                                        '"opsz" 14',
                                                }}
                                            >
                                                {company}
                                            </span>
                                            <span
                                                className="font-['DM_Sans:Regular'] font-normal text-[#454545]"
                                                style={{
                                                    fontVariationSettings:
                                                        '"opsz" 14',
                                                }}
                                            >
                                                {role}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="hidden sm:flex text-[16px] items-center w-full">
                                        <div className="gap-12 lg:gap-[84px] items-center">
                                            <span
                                                className="font-['DM_Sans:Regular'] font-normal text-[#454545] shrink-0"
                                                style={{
                                                    fontVariationSettings:
                                                        '"opsz" 14',
                                                }}
                                            >
                                                {year}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-12 w-full pl-[84px]">
                                            <span
                                                className="font-['DM_Sans:Medium'] col-span-6 font-medium text-black"
                                                style={{
                                                    fontVariationSettings:
                                                        '"opsz" 14',
                                                }}
                                            >
                                                {company}
                                            </span>
                                            <span
                                                className="font-['DM_Sans:Regular'] col-span-6 font-normal text-[#454545] text-start"
                                                style={{
                                                    fontVariationSettings:
                                                        '"opsz" 14',
                                                }}
                                            >
                                                {role}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Work Grid */}
            <section className="px-[24px] lg:px-[34px] pb-[64px] flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] sm:gap-[16px]">
                    {/* Left column */}
                    <div className="flex flex-col gap-[28px] sm:gap-[16px]">
                        {[imgWorkItem6, imgWorkItem5, imgWorkItem4].map(
                            (src, i) => (
                                <motion.div
                                    key={i}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, amount: 0.2 }}
                                    custom={i * 2}
                                    variants={workItemVariant}
                                    className="flex flex-col gap-[10px] sm:gap-[16px]"
                                    onClick={onOpenCaseStudy}
                                >
                                    <div
                                        data-cursor-cta="View Case Study"
                                        className="border border-[#e3e3e3] w-full overflow-hidden relative group"
                                        style={{
                                            aspectRatio:
                                                i === 0 ? "46/51" : "46/51",
                                        }}
                                    >
                                        <img
                                            alt=""
                                            className="w-full h-full object-cover block transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                                            src={src}
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <WorkItemCaption />
                                </motion.div>
                            ),
                        )}
                    </div>
                    {/* Right column */}
                    <div className="flex flex-col gap-[12px] sm:gap-[16px]">
                        {[imgWorkItem3, imgWorkItem2, imgWorkItem1].map(
                            (src, i) => (
                                <motion.div
                                    key={i}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, amount: 0.2 }}
                                    custom={i * 2 + 1}
                                    variants={workItemVariant}
                                    className="flex flex-col gap-[10px] sm:gap-[16px]"
                                    onClick={onOpenCaseStudy}
                                >
                                    <div
                                        data-cursor-cta="View Case Study"
                                        className="border border-[#e3e3e3] w-full overflow-hidden relative group"
                                        style={{
                                            aspectRatio:
                                                i === 0 ? "46/60" : "46/51",
                                        }}
                                    >
                                        <img
                                            alt=""
                                            className="w-full h-full object-cover block transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                                            src={src}
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <WorkItemCaption />
                                </motion.div>
                            ),
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
