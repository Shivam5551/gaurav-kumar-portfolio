"use client";

import { motion, useReducedMotion } from "motion/react";
import { ease } from "@/lib/transitions";

export function Thinking() {
    const reduce = useReducedMotion();

    return (
        <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: ease.quint }}
            aria-live="polite"
            aria-label="GauravLLM is thinking"
        >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <motion.div
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    animate={{
                        scale: [1, 1.6, 1],
                        opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <span className="text-sm text-muted-foreground animate-pulse">
                    GauravLLM is thinking
                </span>

                <span className="flex gap-0.5">
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={i}
                            className="text-accent"
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        >
                            .
                        </motion.span>
                    ))}
                </span>
            </div>
            <span className="relative block h-px w-14 overflow-hidden bg-rule">
                <motion.span
                    className="absolute inset-0 block bg-ink-mute"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={
                        reduce
                            ? { opacity: [0.2, 1, 0.2] }
                            : {
                                  scaleX: [0, 1, 1, 0],
                                  x: ["0%", "0%", "100%", "100%"],
                              }
                    }
                    transition={
                        reduce
                            ? {
                                  duration: 1.4,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                              }
                            : {
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: ease.inOut,
                                  times: [0, 0.45, 0.55, 1],
                              }
                    }
                />
            </span>
        </motion.div>
    );
}
