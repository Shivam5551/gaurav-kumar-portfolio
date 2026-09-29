"use client";

import { CaseStudySection } from "@/lib/types";
import { BlockRenderer } from "./Blocks";

export function SectionRenderer({ section }: { section: CaseStudySection }) {
    return (
        <section id={section.id}>
            {section.blocks.map((block: any, i: any) => (
                <BlockRenderer key={i} block={block} />
            ))}
        </section>
    );
}
