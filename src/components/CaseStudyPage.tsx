"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useSpring, LayoutGroup } from "motion/react";
import Footer from "@/components/Footer";
import { fadeUp, container } from "@/lib/transitions";
import { CaseStudyData } from "@/lib/types";
import { SectionRenderer } from "./SectionRenderer";

export default function CaseStudyPage({ data }: { data: CaseStudyData }) {
  const {
    eyebrow,
    title,
    meta = [],
    heroImageSrc,
    backHref = "/",
    backLabel = "Work",
    sections,
  } = data;

  const router = useRouter();
  const onBack = () => router.push(backHref);

  const navItems = sections
    .filter((s) => s.navLabel)
    .map((s) => ({ id: s.id, label: s.navLabel as string }));

  const showSidebar = navItems.length > 1;
  const [active, setActive] = useState(navItems[0]?.id ?? "");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.2 });

  useEffect(() => {
    if (!showSidebar) return;
    const elements = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -60% 0px" }
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [navItems, showSidebar]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - (89 + 28),
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#e65f2e] origin-left z-[60]"
        style={{ scaleX: progress }}
      />

      <section className="mt-[64px] lg:mt-[89px] px-5 sm:px-8 lg:px-[60px] xl:px-[80px]">
        <motion.div initial="hidden" animate="show" variants={container} className="pt-12 lg:pt-[72px]">
          <motion.button
            custom={0}
            variants={fadeUp}
            onClick={onBack}
            className="inline-flex items-center gap-[6px] font-['DM_Mono:Regular'] text-[11px] text-[#999] tracking-[0.06em] uppercase hover:text-black transition-colors group mb-10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:-translate-x-0.5">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {backLabel}
          </motion.button>

          <motion.p custom={1} variants={fadeUp} className="font-['DM_Mono:Regular'] text-[#e65f2e] text-[12px] tracking-[0.06em] uppercase mb-5">
            {eyebrow}
          </motion.p>

          <motion.h1
            custom={2}
            variants={fadeUp}
            className="font-['DM_Sans:SemiBold'] font-semibold text-[42px] sm:text-[62px] lg:text-[80px] text-black tracking-[-1.6px] leading-[1.06] max-w-[900px]"
            style={{ fontVariationSettings: '"opsz" 14' }}
          >
            {title}
          </motion.h1>

          {meta.length > 0 && (
            <motion.div custom={3} variants={fadeUp} className="flex flex-wrap gap-x-10 gap-y-4 mt-10 pb-12 border-b border-[#e8e8e8]">
              {meta.map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-[4px]">
                  <span className="font-['DM_Mono:Regular'] text-[11px] text-[#999] tracking-[0.06em] uppercase">{label}</span>
                  <span className="font-['DM_Mono:Medium'] text-[12px] text-black tracking-[0.02em] uppercase">{value}</span>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="w-full bg-[#f5f5f5] overflow-hidden"
        style={{ aspectRatio: "16/7" }}
      >
        {heroImageSrc && <img src={heroImageSrc} alt="" className="w-full h-full object-cover" />}
      </motion.div>

      <div className="flex flex-1 gap-0">
        {showSidebar && (
          <aside className="hidden lg:block shrink-0 w-[220px] xl:w-[260px] border-r border-[#e8e8e8]">
            <div className="sticky top-[113px] px-[32px] xl:px-[44px] py-[40px] flex flex-col">
              <p className="font-['DM_Mono:Regular'] text-[10px] text-[#bbb] tracking-[0.1em] uppercase mb-4">On this page</p>
              <LayoutGroup id="case-study-nav">
                {navItems.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`relative py-[5px] text-left font-['DM_Mono:Regular'] text-[12px] tracking-[0.02em] uppercase transition-colors ${
                      active === id ? "text-black" : "text-[#bbb] hover:text-[#666]"
                    }`}
                  >
                    {active === id && (
                      <motion.span
                        layoutId="active-nav-pill"
                        className="absolute -left-[16px] top-[2px] bottom-[2px] w-[2px] bg-[#e65f2e]"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    )}
                    {label}
                  </button>
                ))}
              </LayoutGroup>
            </div>
          </aside>
        )}

        <main className="flex-1 min-w-0 px-5 sm:px-8 lg:px-[60px] xl:px-[80px]">
          <div className="max-w-[800px] flex flex-col gap-[96px] lg:gap-[120px] pt-[72px] pb-[80px]">
            {sections.map((section) => (
              <SectionRenderer key={section.id} section={section} />
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}