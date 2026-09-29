const BLOCKED = [
    "input",
    "textarea",
    "select",
    "button",
    "nav",
    "option",
    '[contenteditable="true"]',
    '[contenteditable=""]',
    "[data-no-select]",
].join(",");

export type SelectionPayload = {
    text: string;
    rect: DOMRect;
};


export function readSelection(minLength = 3): SelectionPayload | null {
    const sel = typeof window !== "undefined" ? window.getSelection() : null;
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) return null;

    const text = sel.toString().replace(/\s+/g, " ").trim();
    if (text.length < minLength) return null;

    const range = sel.getRangeAt(0);
    const node = range.commonAncestorContainer;
    const element = node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : node.parentElement;
    if (!element) return null;
    if (element.closest(BLOCKED)) return null;

    if (element.closest('[data-llm-panel="true"]')) return null;

    const rect = range.getBoundingClientRect();
    if (!rect || (rect.width === 0 && rect.height === 0)) return null;

    return { text, rect };
}

export function clearSelection() {
    window.getSelection()?.removeAllRanges();
}


export function placeNear(
    rect: DOMRect,
    size: { width: number; height: number },
    opts: { preferBelow?: boolean; gap?: number; margin?: number } = {},
) {
    const gap = opts.gap ?? 12;
    const margin = opts.margin ?? 12;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const anchorX = rect.left + Math.min(rect.width / 2, 120);
    let left = anchorX - size.width / 2;
    left = Math.max(margin, Math.min(left, vw - size.width - margin));

    let top = rect.top - size.height - gap;
    let placement: "above" | "below" = "above";

    if (opts.preferBelow || top < margin) {
        top = rect.bottom + gap;
        placement = "below";
    }
    if (top + size.height > vh - margin) {
        top = Math.max(margin, rect.top - size.height - gap);
        placement = "above";
    }

    return { left, top, placement };
}
