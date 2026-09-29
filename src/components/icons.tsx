interface IconProps {
    className?: string;
}

export function ResetIcon({ className }: IconProps) {
    return (
        <svg
            viewBox="0 0 18 18"
            fill="none"
            className={className ?? "size-[18px]"}
            aria-hidden="true"
        >
            <path
                d="M14.5 5.5A6 6 0 1 0 15.5 9"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
            />
            <path
                d="M15.5 2.5V5.5H12.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function CircledCrossIcon({ className }: IconProps) {
    return (
        <svg
            viewBox="0 0 18 18"
            fill="none"
            className={className ?? "size-[14px]"}
            aria-hidden="true"
        >
            <path
                d="M5 5L13 13M13 5L5 13"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function CloseIcon({ className }: IconProps) {
    return (
        <svg
            viewBox="0 0 18 18"
            fill="none"
            className={className ?? "size-[12px]"}
            aria-hidden="true"
        >
            <path
                d="M4 4L14 14M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function ChevronIcon({ className }: IconProps) {
    return (
        <svg
            viewBox="0 0 18 18"
            fill="none"
            className={className ?? "size-[18px]"}
            aria-hidden="true"
        >
            <path
                d="M6.5 4L12 9L6.5 14"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function SendIcon({ className }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className={className ?? "size-[24px]"}
            aria-hidden="true"
        >
            <path
                d="M4 12L20 4L14 20L11 13L4 12Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
            />
        </svg>
    );
}
