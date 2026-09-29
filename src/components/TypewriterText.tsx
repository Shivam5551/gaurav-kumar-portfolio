"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterTextProps {
    text: string;
    speed?: number; // ms per character
    onUpdate?: () => void;
    onComplete?: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export function TypewriterText({
    text,
    speed = 12,
    onUpdate,
    onComplete,
    className,
    style,
}: TypewriterTextProps) {
    const [displayed, setDisplayed] = useState("");
    const onUpdateRef = useRef(onUpdate);
    const onCompleteRef = useRef(onComplete);

    onUpdateRef.current = onUpdate;
    onCompleteRef.current = onComplete;

    useEffect(() => {
        setDisplayed("");
        let i = 0;

        const interval = setInterval(() => {
            i += 1;
            setDisplayed(text.slice(0, i));
            onUpdateRef.current?.();

            if (i >= text.length) {
                clearInterval(interval);
                onCompleteRef.current?.();
            }
        }, speed);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text]);

    const isDone = displayed.length === text.length;

    return (
        <p className={className} style={style}>
            {displayed}
            {!isDone && (
                <span className="inline-block w-[2px] h-[14px] ml-[2px] bg-[#e65f2e] align-middle animate-pulse" />
            )}
        </p>
    );
}
