"use client";

type Props = {
    items: string[];
    onPick: (q: string) => void;
};

export function Suggestions({ items, onPick }: Props) {
    return (
        <ul className="flex flex-col">
            {items.map((q) => (
                <li key={q}>
                    <button
                        type="button"
                        onClick={() => onPick(q)}
                        data-cursor="link"
                        className="group cursor-pointer flex w-full items-center gap-2 px-2! py-2! hover:rounded-lg text-left transition-colors hover:bg-accent/15!"
                    >
                        <span className="text-ink-mute transition-colors group-hover:text-accent">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4 h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </span>
                        <span
                            className="text-ink-body transition-colors group-hover:text-accent"
                            style={{ fontSize: "var(--fs-llm)" }}
                        >
                            {q}
                        </span>
                    </button>
                </li>
            ))}
        </ul>
    );
}
