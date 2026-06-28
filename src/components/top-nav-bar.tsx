import { useState, useEffect } from "react";
import logoIcon from "../assets/logo_icon.png";
import { getCategories } from "../actions/category-actions";

interface NavItem {
  label: string;
  page: string;
  subItems?: { label: string; page: string; query?: string }[];
}

const navItems: NavItem[] = [
  { label: "TRANG CHỦ", page: "home" },
  { 
    label: "MUA BÁN NHÀ ĐẤT", 
    page: "listing",
    subItems: [
      { label: "BÁN CĂN HỘ CHUNG CƯ", page: "listing", query: "category=BÁN CĂN HỘ CHUNG CƯ" },
      { label: "BÁN NHÀ RIÊNG", page: "listing", query: "category=BÁN NHÀ RIÊNG" },
      { label: "BÁN BIỆT THỰ, LIỀN KỀ", page: "listing", query: "category=BÁN BIỆT THỰ, LIỀN KỀ" },
      { label: "BÁN NHÀ MẶT PHỐ", page: "listing", query: "category=BÁN NHÀ MẶT PHỐ" },
      { label: "BÁN ĐẤT NỀN DỰ ÁN", page: "listing", query: "category=BÁN ĐẤT NỀN DỰ ÁN" },
      { label: "BÁN ĐẤT", page: "listing", query: "category=BÁN ĐẤT" },
      { label: "BÁN TRANG TRẠI, KHU NGHỈ DƯỠNG", page: "listing", query: "category=BÁN TRANG TRẠI, KHU NGHỈ DƯỠNG" },
      { label: "BÁN KHO, NHÀ XƯỞNG", page: "listing", query: "category=BÁN KHO, NHÀ XƯỞNG" },
      { label: "BÁN LOẠI BẤT ĐỘNG SẢN KHÁC", page: "listing", query: "category=BÁN LOẠI BẤT ĐỘNG SẢN KHÁC" },
    ]
  },
  { 
    label: "CHO THUÊ NHÀ ĐẤT", 
    page: "listing?category=CHO THUÊ NHÀ ĐẤT",
    subItems: [
      { label: "CHO THUÊ CĂN HỘ CHUNG CƯ", page: "listing", query: "category=CHO THUÊ CĂN HỘ CHUNG CƯ" },
      { label: "CHO THUÊ NHÀ RIÊNG", page: "listing", query: "category=CHO THUÊ NHÀ RIÊNG" },
      { label: "CHO THUÊ BIỆT THỰ, NHÀ LIỀN KỀ", page: "listing", query: "category=CHO THUÊ BIỆT THỰ, NHÀ LIỀN KỀ" },
      { label: "CHO THUÊ CỬA HÀNG, KIOT", page: "listing", query: "category=CHO THUÊ CỬA HÀNG, KIOT" },
      { label: "CHO THUÊ VĂN PHÒNG", page: "listing", query: "category=CHO THUÊ VĂN PHÒNG" },
      { label: "CHO THUÊ NHÀ TRỌ, PHÒNG TRỌ", page: "listing", query: "category=CHO THUÊ NHÀ TRỌ, PHÒNG TRỌ" },
      { label: "CHO THUÊ KHO, NHÀ XƯỞNG, ĐẤT", page: "listing", query: "category=CHO THUÊ KHO, NHÀ XƯỞNG, ĐẤT" },
      { label: "CHO THUÊ SHOPHOUSE, NHÀ PHỐ THƯƠNG MẠI", page: "listing", query: "category=CHO THUÊ SHOPHOUSE, NHÀ PHỐ THƯƠNG MẠI" },
      { label: "CHO THUÊ LOẠI BẤT ĐỘNG SẢN KHÁC", page: "listing", query: "category=CHO THUÊ LOẠI BẤT ĐỘNG SẢN KHÁC" },
    ]
  },
  { 
    label: "DỰ ÁN", 
    page: "listing?category=DỰ ÁN",
    subItems: [
      { label: "DỰ ÁN CĂN HỘ CHUNG CƯ", page: "listing", query: "category=DỰ ÁN CĂN HỘ CHUNG CƯ" },
      { label: "DỰ ÁN BIỆT THỰ, LIỀN KỀ", page: "listing", query: "category=DỰ ÁN BIỆT THỰ, LIỀN KỀ" },
      { label: "DỰ ÁN ĐẤT NỀN", page: "listing", query: "category=DỰ ÁN ĐẤT NỀN" },
      { label: "DỰ ÁN KHU ĐÔ THỊ MỚI", page: "listing", query: "category=DỰ ÁN KHU ĐÔ THỊ MỚI" },
      { label: "DỰ ÁN KHU NGHỈ DƯỠNG", page: "listing", query: "category=DỰ ÁN KHU NGHỈ DƯỠNG" },
      { label: "DỰ ÁN NHÀ Ở XÃ HỘI", page: "listing", query: "category=DỰ ÁN NHÀ Ở XÃ HỘI" },
      { label: "DỰ ÁN SHOPHOUSE", page: "listing", query: "category=DỰ ÁN SHOPHOUSE" },
      { label: "DỰ ÁN CONDOTEL", page: "listing", query: "category=DỰ ÁN CONDOTEL" },
    ]
  },
  { label: "TIN TỨC", page: "news" },
  { label: "LIÊN HỆ", page: "contact" },
];

interface TopNavBarProps {
  activePage?: string;
  onNavigate?: (page: string) => void;
  categories?: any[];
}

export function TopNavBar({ activePage, onNavigate, categories: initialCategories = [] }: TopNavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>(initialCategories);

  useEffect(() => {
    if (categories.length === 0) {
      getCategories().then(data => setCategories(data));
    }
  }, []);

  const dynamicNavItems: NavItem[] = [
    { label: "TRANG CHỦ", page: "home" },
    { 
      label: "MUA BÁN NHÀ ĐẤT", 
      page: "listing",
      subItems: categories.filter(c => c.group_name === "MUA BÁN NHÀ ĐẤT").map(c => ({
        label: c.name, page: "listing", query: `category=${c.name}`
      }))
    },
    { 
      label: "CHO THUÊ NHÀ ĐẤT", 
      page: "listing?category=CHO THUÊ NHÀ ĐẤT",
      subItems: categories.filter(c => c.group_name === "CHO THUÊ NHÀ ĐẤT").map(c => ({
        label: c.name, page: "listing", query: `category=${c.name}`
      }))
    },
    { 
      label: "DỰ ÁN", 
      page: "listing?category=DỰ ÁN",
      subItems: categories.filter(c => c.group_name === "DỰ ÁN").map(c => ({
        label: c.name, page: "listing", query: `category=${c.name}`
      }))
    },
    { label: "TIN TỨC", page: "news" },
    { label: "LIÊN HỆ", page: "contact" },
  ];

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
          href="/"
          className="flex items-end gap-0 shrink-0 z-50 lg:-translate-x-[120px] -translate-y-1 pb-2"
          onClick={(e) => { e.preventDefault(); onNavigate?.("home"); setIsOpen(false); }}
        >
          <img src={logoIcon.src} alt="Happy M" className="h-12 lg:h-20 w-auto object-contain" />
            <div className="flex flex-col -translate-y-[1px]">
            <span className="text-white font-bold tracking-[0.15em] uppercase" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(12px, 3vw, 18px)", lineHeight: "1.1" }}>HAPPY M</span>
            <span className="text-white/70 tracking-[0.08em] uppercase font-bold" style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "clamp(7px, 1.5vw, 9px)", lineHeight: "1.2" }}>MÃI HẠNH PHÚC, MÃI GIÀU SANG</span>
          </div>
        </a>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-8 ml-auto h-full">
          {dynamicNavItems.map(({ label, page, subItems }) => {
            const isActive =
              (activePage === "home" && page === "home" && label === "TRANG CHỦ") ||
              ((activePage === "listing" || activePage === "detail") && label === "MUA BÁN NHÀ ĐẤT") ||
              (activePage === "projects" && label === "DỰ ÁN") ||
              (activePage === "news" && label === "TIN TỨC") ||
              (activePage === "contact" && label === "LIÊN HỆ");
            return (
              <div key={label} className="relative group h-full flex items-center">
                <a
                  href={page === "home" ? "/" : `/${page}`}
                  onClick={(e) => { e.preventDefault(); onNavigate?.(page); }}
                  className={`font-label-caps transition-colors duration-200 whitespace-nowrap block flex items-center h-full border-b-2 ${
                    isActive
                      ? "text-white border-antique-gold"
                      : "text-white/70 hover:text-white border-transparent"
                  }`}
                  style={{ fontSize: "14px", letterSpacing: "0.12em", fontWeight: 700 }}
                >
                  {label}
                </a>

                {/* Dropdown Menu */}
                {subItems && (
                  <div className="absolute top-[80px] left-0 bg-[#F5F1E6] border border-gray-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[320px] z-50">
                    {subItems.map((sub, idx) => (
                      <a
                        key={idx}
                        href={`/${sub.page}?${sub.query}`}
                        onClick={(e) => { e.preventDefault(); onNavigate?.(`${sub.page}?${sub.query}`); }}
                        className="block px-6 py-4 border-b border-[#E8E2D2] last:border-b-0 hover:bg-[#EAE4D3] text-earth-brown font-semibold transition-colors whitespace-nowrap"
                        style={{ fontSize: "13px", letterSpacing: "0.05em" }}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
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
          <div className="absolute top-[80px] left-0 w-full bg-white border-b-2 border-earth-brown shadow-lg flex flex-col py-6 px-8 gap-5 lg:hidden z-40 max-h-[80vh] overflow-y-auto">
            {dynamicNavItems.map(({ label, page, subItems }) => {
              const isActive =
                (activePage === "home" && page === "home" && label === "TRANG CHỦ") ||
                ((activePage === "listing" || activePage === "detail") && label === "MUA BÁN NHÀ ĐẤT") ||
                (activePage === "projects" && label === "DỰ ÁN") ||
                (activePage === "news" && label === "TIN TỨC") ||
                (activePage === "contact" && label === "LIÊN HỆ");
              return (
                <div key={label} className="flex flex-col">
                  <a
                    href={page === "home" ? "/" : `/${page}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!subItems) {
                        onNavigate?.(page);
                        setIsOpen(false);
                      }
                    }}
                    className={`font-label-caps py-2 transition-colors duration-200 border-b border-outline-variant/20 last:border-b-0 ${
                      isActive ? "text-antique-gold font-bold" : "text-on-surface hover:text-primary"
                    }`}
                    style={{ fontSize: "15px", letterSpacing: "0.12em" }}
                  >
                    {label}
                  </a>
                  {subItems && (
                    <div className="flex flex-col pl-4 pt-2 gap-3 border-b border-outline-variant/20 pb-4">
                      {subItems.map((sub, idx) => (
                        <a
                          key={idx}
                          href={`/${sub.page}?${sub.query}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate?.(`${sub.page}?${sub.query}`);
                            setIsOpen(false);
                          }}
                          className="text-earth-brown font-medium text-sm"
                        >
                          - {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
}
