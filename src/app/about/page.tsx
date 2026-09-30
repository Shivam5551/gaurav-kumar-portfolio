"use client";

import Footer from "@/components/Footer";
import { socials } from "@/lib/site";
import { motion, Variants, useReducedMotion } from "motion/react";

const assetPathPrefix = "/assets";
const imgPlusIcon = `${assetPathPrefix}/e9910.svg`;

const interests = [
    "deep into RPGs and horror games — Elden Ring, Dark Souls, Ghost of Tsushima, Lies of P, and pretty much every Resident Evil",
    `still tweaking my PC build like it's ever really "done"`,
    "cooking with headphones on, full main-character energy, dancing through the entire process",
    "probably overthinking a UI detail nobody else would notice",
];

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
            staggerChildren: 0.08,
        },
    },
};

const plusInterest: Variants = {
    hidden: { opacity: 0, x: -12 },
    show: (i: number = 0) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            delay: 0.5 + i * 0.1,
            ease: "easeOut",
        },
    }),
};

const photoReveal: Variants = {
    hidden: { opacity: 0, scale: 1.08, clipPath: "inset(0% 0% 100% 0%)" },
    show: (i: number = 0) => ({
        opacity: 1,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        transition: {
            duration: 0.9,
            delay: i * 0.12,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const groupLabel: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

function AnimatedLink({ children }: { children: React.ReactNode }) {
    return (
        <span className="relative inline-block cursor-pointer group font-['DM_Mono:Medium'] text-black tracking-[-0.4px]">
            {children}
            <motion.span
                className="absolute left-0 -bottom-[1px] h-[1px] bg-black origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                whileInView={undefined}
                style={{ width: "100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
        </span>
    );
}

export default function AboutPage() {
    const reduce = useReducedMotion();

    return (
        <div className="bg-[#fcfdfe] min-h-screen flex flex-col">
            {/* Intro */}
            <section className="mt-[64px] lg:mt-[89px] px-5 sm:px-8 lg:px-[34px] py-14 sm:py-20 lg:py-[100px]">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={container}
                    className="flex flex-col gap-8 lg:gap-[32px] items-start max-w-[1003px]"
                >
                    <motion.h1
                        custom={0}
                        variants={fadeUp}
                        className="font-['DM_Sans:SemiBold'] font-semibold text-[30px] sm:text-[44px] lg:text-[64px] text-black tracking-[-0.96px] leading-[1.15] w-full"
                        style={{ fontVariationSettings: '"opsz" 14' }}
                    >
                        {`I'm a designer, systems thinker & PC gamer—optimizing for clarity.`}
                    </motion.h1>

                    <div className="flex flex-col gap-[16px] max-w-[725px]">
                        <motion.p
                            custom={1}
                            variants={fadeUp}
                            className="font-['DM_Sans:Regular'] font-normal text-[#202020] text-[15px] sm:text-[16px] tracking-[-0.08px] leading-[1.6]"
                            style={{ fontVariationSettings: '"opsz" 14' }}
                        >
                            {`I think in flows, states, and edge cases more than I think in pixels. Right now I'm most excited about where AI actually changes how people use software — not as a gimmick, but as a genuine shortcut to what they came here for. This site's chat feature is me testing that idea on myself.`}
                        </motion.p>

                        <motion.p
                            custom={2}
                            variants={fadeUp}
                            className="font-['DM_Sans:Regular'] font-normal text-[#202020] text-[15px] sm:text-[16px] tracking-[-0.08px] leading-[1.6]"
                            style={{ fontVariationSettings: '"opsz" 14' }}
                        >
                            <span>Open to Fulltime / Freelance / Collab</span>
                            <span
                                className="font-['DM_Sans:Medium'] font-medium text-black"
                                style={{ fontVariationSettings: '"opsz" 14' }}
                            >{` `}</span>
                            <span>{`work starting September 2026. If you're building something that needs more thinking than decorating, `}</span>
                            <a
                                href={`mailto:${socials.find((s: any) => s.label === "Email")?.href.replace("mailto:", "")}`}
                                data-cursor="link"
                                aria-label="Email Gaurav"
                            >
                                <motion.span
                                    className="inline-flex items-center gap-[4px] font-['DM_Mono:Medium'] font-medium text-black tracking-[-0.4px] cursor-pointer group"
                                    style={{
                                        fontVariationSettings:
                                            '"CTGR" 0, "wdth" 100',
                                    }}
                                    whileHover="hover"
                                    initial="rest"
                                >
                                    {`let's talk`}
                                    <motion.span
                                        variants={{
                                            rest: { x: 0 },
                                            hover: { x: 4 },
                                        }}
                                        transition={{
                                            duration: 0.25,
                                            ease: "easeOut",
                                        }}
                                    >
                                        →
                                    </motion.span>
                                </motion.span>
                            </a>
                        </motion.p>

                        <motion.div
                            custom={3}
                            variants={fadeUp}
                            className="flex flex-col gap-[6px]"
                        >
                            <p
                                className="font-['DM_Sans:Regular'] font-normal text-[#202020] text-[15px] sm:text-[16px] tracking-[-0.08px] leading-[1.6]"
                                style={{ fontVariationSettings: '"opsz" 14' }}
                            >
                                {`Outside of design, I'm:`}
                            </p>
                            <div className="flex flex-col gap-[4px]">
                                {interests.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        custom={i}
                                        variants={plusInterest}
                                        className="flex gap-[10px] sm:gap-[12px] items-start"
                                        whileHover={
                                            reduce ? undefined : { x: 4 }
                                        }
                                        transition={{
                                            duration: 0.2,
                                            ease: "easeOut",
                                        }}
                                    >
                                        <motion.div
                                            className="h-[26px] sm:h-[28px] w-[14px] sm:w-[16px] shrink-0 flex items-center justify-center mt-0.5"
                                            whileHover={
                                                reduce
                                                    ? undefined
                                                    : { rotate: 90 }
                                            }
                                            transition={{
                                                duration: 0.35,
                                                ease: "easeOut",
                                            }}
                                        >
                                            <img
                                                src={imgPlusIcon}
                                                alt=""
                                                className="flex items-start w-full"
                                            />
                                        </motion.div>
                                        <p
                                            className="font-['DM_Sans:Regular'] font-normal text-[#202020] text-[15px] sm:text-[16px] tracking-[-0.08px] leading-[1.6]"
                                            style={{
                                                fontVariationSettings:
                                                    '"opsz" 14',
                                            }}
                                        >
                                            {item}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.p
                            custom={6}
                            variants={fadeUp}
                            className="font-['DM_Sans:Regular'] font-normal text-[#202020] text-[15px] sm:text-[16px] tracking-[-0.08px] leading-[1.6]"
                            style={{ fontVariationSettings: '"opsz" 14' }}
                        >
                            <span>{`Reach me on `}</span>
                            <HoverLink label="LinkedIn" />
                            <span>, </span>
                            <HoverLink label="Dribbble" />
                            <span>{` or by `}</span>
                            <HoverLink label="email" />
                            <span>{` — I reply faster than my calendar suggests.`}</span>
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            {/* Photo galleries */}
            <section className="px-[24px] lg:px-[34px] pb-[64px]">
                <div className="flex flex-col gap-8 sm:gap-[44px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-[44px]">
                        <PhotoGroup
                            index={0}
                            label="01 Designer"
                            photos={[
                                {
                                    src: "https://images.unsplash.com/photo-1768471125958-78556538fadc?w=400&q=80",
                                    heightRatio: 147 / 284,
                                },
                                {
                                    src: "https://images.unsplash.com/photo-1768471126011-2e2002832826?w=400&q=80",
                                    heightRatio: 1,
                                },
                                {
                                    src: "https://images.unsplash.com/photo-1654372066425-d0a1eccb2549?w=400&q=80",
                                    heightRatio: 213 / 284,
                                },
                            ]}
                        />
                        <PhotoGroup
                            index={1}
                            label="02 Gaming"
                            photos={[
                                {
                                    src: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=400&q=80",
                                    heightRatio: 1,
                                },
                                {
                                    src: "https://images.unsplash.com/photo-1626218174358-7769486c4b79?w=400&q=80",
                                    heightRatio: 147 / 284,
                                },
                                {
                                    src: "https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf?w=400&q=80",
                                    heightRatio: 213 / 284,
                                },
                            ]}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-[44px]">
                        <PhotoGroup
                            index={2}
                            label="03 Desk Setup"
                            photos={[
                                {
                                    src: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=400&q=80",
                                    heightRatio: 213 / 284,
                                },
                                {
                                    src: "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?w=400&q=80",
                                    heightRatio: 147 / 284,
                                },
                                {
                                    src: "https://images.unsplash.com/photo-1590212151175-e58edd96185b?w=400&q=80",
                                    heightRatio: 1,
                                },
                            ]}
                        />
                        <PhotoGroup
                            index={3}
                            label="04 Learning"
                            photos={[
                                {
                                    src: "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?w=400&q=80",
                                    heightRatio: 213 / 284,
                                },
                                {
                                    src: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&q=80",
                                    heightRatio: 1,
                                },
                                {
                                    src: "https://images.unsplash.com/photo-1593425546383-260c8b86730b?w=400&q=80",
                                    heightRatio: 147 / 284,
                                },
                            ]}
                        />
                    </div>
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

function HoverLink({ label }: { label: string }) {
    return (
        <span className="relative inline-block font-['DM_Mono:Medium'] text-black tracking-[-0.4px] cursor-pointer group">
            {label}
            <span className="absolute left-0 -bottom-[1px] h-[1px] w-full bg-black scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </span>
    );
}

function PhotoGroup({
    label,
    photos,
    index = 0,
}: {
    label: string;
    photos: { src: string; heightRatio: number }[];
    index?: number;
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="flex flex-col gap-[14px] sm:gap-[18px]"
        >
            <motion.p
                variants={groupLabel}
                className="font-['DM_Mono:Regular'] text-[#454545] text-[13px] sm:text-[16px] tracking-[-0.4px] leading-[1.5] uppercase"
            >
                {label}
            </motion.p>
            <div
                className="flex gap-[10px] sm:gap-[16px] h-full items-end"
                style={{ height: "clamp(160px, 22vw, 284px)" }}
            >
                {photos.map((photo, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={photoReveal}
                        className="flex-1 min-w-0 h-full overflow-hidden"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <motion.img
                            src={photo.src}
                            alt=""
                            className="w-full h-full object-cover flex"
                            loading="lazy"
                            style={{ height: `${photo.heightRatio * 100}%` }}
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
