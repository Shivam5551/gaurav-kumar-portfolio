"use client";

import { motion } from "motion/react";
import { fadeUp, scaleIn, container } from "@/lib/transitions";

export function SL({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.8 }}
      variants={fadeUp}
      className="font-['DM_Mono:Regular'] text-[11px] text-[#999] tracking-[0.08em] uppercase mb-5"
    >
      {children}
    </motion.p>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      custom={1}
      variants={fadeUp}
      className="font-['DM_Sans:SemiBold'] font-semibold text-[26px] sm:text-[34px] text-black tracking-[-0.64px] leading-[1.2]"
      style={{ fontVariationSettings: '"opsz" 14' }}
    >
      {children}
    </motion.h2>
  );
}

export function P({
  children,
  mt = true,
  className = "",
}: {
  children: React.ReactNode;
  mt?: boolean;
  className?: string;
}) {
  return (
    <motion.p
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      custom={2}
      variants={fadeUp}
      className={`font-['DM_Sans:Regular'] font-normal text-[#444] text-[15px] sm:text-[16px] tracking-[-0.06px] leading-[1.7] ${mt ? "mt-5" : ""} ${className}`}
      style={{ fontVariationSettings: '"opsz" 14' }}
    >
      {children}
    </motion.p>
  );
}

/** Matches the original `<div className="w-full bg-[#f5f5f5]" style={{ aspectRatio }} />` placeholder blocks, with a scroll-in reveal. */
export function ImagePlaceholder({
  aspectRatio = "16/9",
  index = 0,
  className = "",
}: {
  aspectRatio?: string;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
      variants={scaleIn}
      className={`w-full bg-[#f5f5f5] overflow-hidden ${className}`}
      style={{ aspectRatio }}
    />
  );
}

export function StaggerGrid({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  index = 0,
  className = "",
  children,
  whileHover,
}: {
  index?: number;
  className?: string;
  children: React.ReactNode;
  whileHover?: Record<string, unknown>;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      className={className}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}