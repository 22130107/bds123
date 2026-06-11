import { useState } from "react";

interface NavItem {
  label: string;
  page: string;
}

const navItems: NavItem[] = [
  { label: "TRANG CHỦ", page: "home" },
  { label: "MUA BÁN NHÀ ĐẤT", page: "listing" },
  { label: "CHO THUÊ NHÀ ĐẤT", page: "listing" },
  { label: "DỰ ÁN", page: "home" },
  { label: "TIN TỨC", page: "home" },
];

interface TopNavBarProps {
  activePage?: string;
  onNavigate?: (page: string) => void;
}

export function TopNavBar({ activePage, onNavigate }: TopNavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const logoUrl =
    "https://lh3.googleusercontent.com/aida/AP1WRLtKGfpk6FtrJPFP3B9t4nNMJJGgw8Wa1-N61oSxoGXqIQx3QFnWJSXWxfG7sdurlABfZiJZTaf4Ro9_VsKKlF2Bdu-ngh74_SpEUs5nWfYwOfGxNHm8RO_PSC1aoW8eBdRhHHyVJULvi2FnoAoFA1SOx5YtSVh6UKxENHSbJq_gzp91w14Ui3q401EBKWmnyLvdXlAsmUP_f2-mV6c1fj_G_m59swm7RzPvXZrHrzXyNFmcVy5lyOsiIuM";

  return (
    <header
      className="fixed top-0 w-full z-50 bg-earth-brown border-b border-white/20 shadow-sm"
      style={{ height: "80px" }}
    >
      <nav
        className="mx-auto px-5 md:px-[80px] flex justify-between items-center h-full relative"
        style={{ maxWidth: "1280px" }}
      >
        {/* Logo */}
        <a
          href="#"
          className="block h-10 shrink-0"
          onClick={(e) => { e.preventDefault(); onNavigate?.("home"); setIsOpen(false); }}
        >
          <img src={logoUrl} alt="TimNhaHot.vn" className="h-full w-auto object-contain brightness-0 invert-[0.85]" />
        </a>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map(({ label, page }) => {
            const isActive =
              (activePage === "home" && page === "home" && label === "TRANG CHỦ") ||
              ((activePage === "listing" || activePage === "detail") && label === "MUA BÁN NHÀ ĐẤT");
            return (
              <a
                key={label}
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate?.(page); }}
                className={`font-label-caps transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? "text-white border-b border-antique-gold pb-0.5"
                    : "text-white/70 hover:text-white"
                }`}
                style={{ fontSize: "14px", letterSpacing: "0.12em", fontWeight: 700 }}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate?.("listing")}
            className="hidden sm:block border border-white text-white px-5 py-2 font-label-caps hover:bg-white hover:text-earth-brown transition-all duration-300 active:scale-95"
            style={{ fontSize: "14px", letterSpacing: "0.12em", fontWeight: 700 }}
          >
            ĐĂNG TIN
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-antique-gold transition-colors lg:hidden"
            aria-label="Menu"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {isOpen && (
          <div className="absolute top-[80px] left-0 w-full bg-earth-brown border-b border-white/20 shadow-lg flex flex-col py-6 px-8 gap-5 lg:hidden z-40">
            {navItems.map(({ label, page }) => {
              const isActive =
                (activePage === "home" && page === "home" && label === "TRANG CHỦ") ||
                ((activePage === "listing" || activePage === "detail") && label === "MUA BÁN NHÀ ĐẤT");
              return (
                <a
                  key={label}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.(page);
                    setIsOpen(false);
                  }}
                  className={`font-label-caps py-2 transition-colors duration-200 border-b border-white/5 last:border-b-0 ${
                    isActive ? "text-antique-gold font-bold" : "text-white/80 hover:text-white"
                  }`}
                  style={{ fontSize: "15px", letterSpacing: "0.12em" }}
                >
                  {label}
                </a>
              );
            })}
            <button
              onClick={() => {
                onNavigate?.("listing");
                setIsOpen(false);
              }}
              className="sm:hidden w-full border border-white text-white py-3 text-center font-label-caps hover:bg-white hover:text-earth-brown transition-all duration-300 mt-2"
              style={{ fontSize: "14px", letterSpacing: "0.12em", fontWeight: 700 }}
            >
              ĐĂNG TIN
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
