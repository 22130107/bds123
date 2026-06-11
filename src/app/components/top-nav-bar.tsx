import { useState } from "react";
import logoIcon from "../../assets/logo_icon.png";

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
          className="flex items-end gap-0 shrink-0 z-50 lg:-translate-x-[120px] -translate-y-1 pb-2"
          onClick={(e) => { e.preventDefault(); onNavigate?.("home"); setIsOpen(false); }}
        >
          <img src={logoIcon} alt="Happy M" className="h-12 lg:h-20 w-auto object-contain" />
            <div className="flex flex-col -translate-y-[1px]">
            <span className="text-white font-bold tracking-[0.15em] uppercase" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(12px, 3vw, 18px)", lineHeight: "1.1" }}>HAPPY M</span>
            <span className="text-white/70 tracking-[0.08em] uppercase font-bold" style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "clamp(7px, 1.5vw, 9px)", lineHeight: "1.2" }}>MÃI HẠNH PHÚC, MÃI GIÀU SANG</span>
          </div>
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
          </div>
        )}
      </nav>
    </header>
  );
}
