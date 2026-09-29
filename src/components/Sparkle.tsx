export function Sparkle({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
            className={className}
        >
            <path d="M12 0c.6 6.1 5.3 10.8 11.4 11.4-6.1.6-10.8 5.3-11.4 11.4C11.4 16.7 6.7 12 0 12 6.1 11.4 11.4 6.7 12 0Z" />
        </svg>
    );
}
