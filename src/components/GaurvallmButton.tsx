"use client";

export function GaurvallmButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {

    return (
        <button
            onClick={onClick}
            className={`bg-[#E65F2E] aspect-[1/1] ${isOpen ? 'hidden' : 'block'} shadow-lg z-20 rounded-full md:hidden text-white h-[54px] w-[54px] absolute bottom-[20px] right-[20px] hover:bg-[#e65f2e]/90 transition-colors duration-200`}
        >
            <svg
                width="54"
                height="54"
                viewBox="0 0 54 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="54" height="54" rx="27" fill="#E65F2E" />
                <path
                    d="M27 13L30.5638 23.4362L41 27L30.5638 30.5638L27 41L23.4362 30.5638L13 27L23.4362 23.4362L27 13Z"
                    fill="white"
                />
            </svg>
        </button>
    );
}
