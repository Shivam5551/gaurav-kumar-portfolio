export default function Footer() {
  return (
    <footer className="bg-[#fafcfd] border-t border-[#e3e3e3] font-['DM_Mono:Medium'] text-[#6f6f6f] text-[12px] sm:text-[14px] tracking-[-0.07px] uppercase">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 px-[24px] lg:px-[34px] py-[24px] sm:py-0 sm:h-[65px]">
        <span>UX/UI + Product designer</span>
        <div className="flex items-start sm:items-center flex-col sm:flex-row gap-[18px] sm:gap-[54px]">
          <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-black transition-colors">Email</a>
          <a href="#" className="hover:text-black transition-colors">X</a>
          <a href="#" className="hover:text-black transition-colors">Dribbble</a>
        </div>
      </div>
    </footer>
  );
}
