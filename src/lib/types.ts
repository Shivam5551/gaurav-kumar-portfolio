export interface CaseStudyMeta {
  label: string;
  value: string;
}

export interface CaseStudyNavItem {
  id: string;
  label: string;
}

export type Block =
  | { type: "heading"; eyebrow: string; heading: string }
  | {
      type: "paragraph";
      text: string;
      spacing?: "normal" | "small" | "none";
      italic?: boolean;
      emphasize?: string[]; // substrings to bold, e.g. ["Moments"]
    }
  | {
      type: "cardGrid";
      columns: 2 | 3;
      divider?: boolean; // adds pt-8 border-t like Opportunity/Solution
      items: { number?: string; title: string; description: string }[];
    }
  | {
      type: "stackDiagram";
      items: { label: string; highlight?: boolean; note?: string }[];
    }
  | { type: "quote"; text: string }
  | { type: "image"; aspectRatio?: string; caption?: string; src?: string }
  | {
      type: "imageGrid";
      columns?: 2 | 3;
      images: { src?: string; aspectRatio?: string }[];
    }
  | {
      type: "numberedList";
      items: { number?: string; title: string; description: string }[];
    }
  | {
      type: "comparisonGrid";
      options: {
        label: string;
        fit: string;
        tags: string[];
        note: string;
        active?: boolean;
      }[];
    }
  | {
      type: "insightGrid";
      borderColor?: string; // e.g. "#e65f2e" or "#e8e8e8"
      numberColor?: string; // e.g. "#e65f2e" or "#999"
      items: { number: string; title: string; description: string }[];
    }
  | { type: "subheading"; label: string; title: string; body?: string }
  | { type: "callout"; label?: string; heading: string };

export interface CaseStudySection {
  id: string;
  navLabel?: string; // present = shows in sidebar
  blocks: Block[];
}

export interface CaseStudyData {
  eyebrow: string;
  title: string;
  meta?: CaseStudyMeta[];
  heroImageSrc?: string;
  backHref?: string;
  backLabel?: string;
  sections: CaseStudySection[];
}