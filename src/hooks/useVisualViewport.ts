"use client";

import { useEffect } from "react";

export function useVisualViewportHeight() {
    useEffect(() => {
        const root = document.documentElement;

        const set = () => {
            const h = window.visualViewport?.height ?? window.innerHeight;
            root.style.setProperty("--app-h", `${h}px`);
        };

        set();
        window.visualViewport?.addEventListener("resize", set);
        window.addEventListener("resize", set);

        return () => {
            window.visualViewport?.removeEventListener("resize", set);
            window.removeEventListener("resize", set);
        };
    }, []);
}