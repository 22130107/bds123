"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import logoIcon from "../assets/logo_icon.png";
import { usePathname } from "next/navigation";
import { getCategories } from "../actions/category-actions";
import { generateSlug } from "../lib/slugify";

interface NavItem {
  label: string;
  page: string;
  subItems?: { label: string; page: string; query?: string }[];
}

const navItems: NavItem[] = [
  { label: "TRANG CHỦ", page: "home" },
  { 
    label: "MUA BÁN NHÀ ĐẤT", 
    page: "danh-muc/mua-ban-nha-dat",
    subItems: [
      { label: "BÁN CĂN HỘ CHUNG CƯ", page: `danh-muc/${generateSlug("BÁN CĂN HỘ CHUNG CƯ")}` },
      { label: "BÁN NHÀ RIÊNG", page: `danh-muc/${generateSlug("BÁN NHÀ RIÊNG")}` },
      { label: "BÁN BIỆT THỰ, LIỀN KỀ", page: `danh-muc/${generateSlug("BÁN BIỆT THỰ, LIỀN KỀ")}` },
      { label: "BÁN NHÀ MẶT PHỐ", page: `danh-muc/${generateSlug("BÁN NHÀ MẶT PHỐ")}` },
      { label: "BÁN ĐẤT NỀN DỰ ÁN", page: `danh-muc/${generateSlug("BÁN ĐẤT NỀN DỰ ÁN")}` },
      { label: "BÁN ĐẤT", page: `danh-muc/${generateSlug("BÁN ĐẤT")}` },
      { label: "BÁN TRANG TRẠI, KHU NGHỈ DƯỠNG", page: `danh-muc/${generateSlug("BÁN TRANG TRẠI, KHU NGHỈ DƯỠNG")}` },
      { label: "BÁN KHO, NHÀ XƯỞNG", page: `danh-muc/${generateSlug("BÁN KHO, NHÀ XƯỞNG")}` },
      { label: "BÁN LOẠI BẤT ĐỘNG SẢN KHÁC", page: `danh-muc/${generateSlug("BÁN LOẠI BẤT ĐỘNG SẢN KHÁC")}` },
    ]
  },
  { 
    label: "CHO THUÊ NHÀ ĐẤT", 
    page: "danh-muc/cho-thue-nha-dat",
    subItems: [
      { label: "CHO THUÊ CĂN HỘ CHUNG CƯ", page: `danh-muc/${generateSlug("CHO THUÊ CĂN HỘ CHUNG CƯ")}` },
      { label: "CHO THUÊ NHÀ RIÊNG", page: `danh-muc/${generateSlug("CHO THUÊ NHÀ RIÊNG")}` },
      { label: "CHO THUÊ BIỆT THỰ, NHÀ LIỀN KỀ", page: `danh-muc/${generateSlug("CHO THUÊ BIỆT THỰ, NHÀ LIỀN KỀ")}` },
      { label: "CHO THUÊ CỬA HÀNG, KIOT", page: `danh-muc/${generateSlug("CHO THUÊ CỬA HÀNG, KIOT")}` },
      { label: "CHO THUÊ VĂN PHÒNG", page: `danh-muc/${generateSlug("CHO THUÊ VĂN PHÒNG")}` },
      { label: "CHO THUÊ NHÀ TRỌ, PHÒNG TRỌ", page: `danh-muc/${generateSlug("CHO THUÊ NHÀ TRỌ, PHÒNG TRỌ")}` },
      { label: "CHO THUÊ KHO, NHÀ XƯỞNG, ĐẤT", page: `danh-muc/${generateSlug("CHO THUÊ KHO, NHÀ XƯỞNG, ĐẤT")}` },
      { label: "CHO THUÊ SHOPHOUSE, NHÀ PHỐ THƯƠNG MẠI", page: `danh-muc/${generateSlug("CHO THUÊ SHOPHOUSE, NHÀ PHỐ THƯƠNG MẠI")}` },
      { label: "CHO THUÊ LOẠI BẤT ĐỘNG SẢN KHÁC", page: `danh-muc/${generateSlug("CHO THUÊ LOẠI BẤT ĐỘNG SẢN KHÁC")}` },
    ]
  },
  { 
    label: "DỰ ÁN", 
    page: "danh-muc/du-an",
    subItems: [
      { label: "DỰ ÁN CĂN HỘ CHUNG CƯ", page: `danh-muc/${generateSlug("DỰ ÁN CĂN HỘ CHUNG CƯ")}` },
      { label: "DỰ ÁN BIỆT THỰ, LIỀN KỀ", page: `danh-muc/${generateSlug("DỰ ÁN BIỆT THỰ, LIỀN KỀ")}` },
      { label: "DỰ ÁN ĐẤT NỀN", page: `danh-muc/${generateSlug("DỰ ÁN ĐẤT NỀN")}` },
      { label: "DỰ ÁN KHU ĐÔ THỊ MỚI", page: `danh-muc/${generateSlug("DỰ ÁN KHU ĐÔ THỊ MỚI")}` },
      { label: "DỰ ÁN KHU NGHỈ DƯỠNG", page: `danh-muc/${generateSlug("DỰ ÁN KHU NGHỈ DƯỠNG")}` },
      { label: "DỰ ÁN NHÀ Ở XÃ HỘI", page: `danh-muc/${generateSlug("DỰ ÁN NHÀ Ở XÃ HỘI")}` },
      { label: "DỰ ÁN SHOPHOUSE", page: `danh-muc/${generateSlug("DỰ ÁN SHOPHOUSE")}` },
      { label: "DỰ ÁN CONDOTEL", page: `danh-muc/${generateSlug("DỰ ÁN CONDOTEL")}` },
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
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Keep header fixed always - do not hide on scroll down
    setHidden(false);
  });

  useEffect(() => {
    if (categories.length === 0) {
      getCategories().then(data => setCategories(data));
    }
  }, []);

  const dynamicNavItems: NavItem[] = [
    { label: "TRANG CHỦ", page: "home" },
    { 
      label: "MUA BÁN NHÀ ĐẤT", 
      page: "danh-muc/mua-ban-nha-dat",
      subItems: categories.filter(c => c.group_name === "MUA BÁN NHÀ ĐẤT").map(c => ({
        label: c.name, page: `danh-muc/${generateSlug(c.name)}`
      }))
    },
    { 
      label: "CHO THUÊ NHÀ ĐẤT", 
      page: "danh-muc/cho-thue-nha-dat",
      subItems: categories.filter(c => c.group_name === "CHO THUÊ NHÀ ĐẤT").map(c => ({
        label: c.name, page: `danh-muc/${generateSlug(c.name)}`
      }))
    },
    { 
      label: "DỰ ÁN", 
      page: "danh-muc/du-an",
      subItems: categories.filter(c => c.group_name === "DỰ ÁN").map(c => ({
        label: c.name, page: `danh-muc/${generateSlug(c.name)}`
      }))
    },
    { label: "TIN TỨC", page: "news" },
    { label: "LIÊN HỆ", page: "contact" },
  ];

  return (
    <motion.header
      className="fixed top-0 w-full z-50 bg-earth-brown border-b border-white/20 shadow-sm"
      style={{ height: "80px" }}
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <nav
        className="mx-auto flex justify-between items-center h-full relative"
        style={{ 
          maxWidth: "1280px",
          paddingLeft: "var(--nav-padding)",
          paddingRight: "var(--nav-padding)"
        }}
      >
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-4 shrink-0 z-50 lg:-translate-x-[120px]"
          onClick={(e) => { e.preventDefault(); onNavigate?.("home"); setIsOpen(false); }}
        >
          <img 
            src={logoIcon.src} 
            alt="Happy M" 
            className="h-12 lg:h-[72px] w-auto object-contain" 
          />
          <div className="flex flex-col justify-center">
            <span 
              className="text-white font-black tracking-[0.15em] uppercase" 
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(14px, 3vw, 20px)", lineHeight: "1.2" }}
            >
              HAPPY M
            </span>
            <span 
              className="text-white/90 tracking-[0.1em] uppercase font-bold" 
              style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "clamp(7px, 1.5vw, 9px)", lineHeight: "1.2" }}
            >
              MÃI HẠNH PHÚC, MÃI GIÀU SANG
            </span>
          </div>
        </a>

        {/* Nav links */}
        <div 
          className="hidden lg:flex items-center ml-auto h-full"
          style={{ gap: "var(--nav-gap)" }}
        >
          {dynamicNavItems.map(({ label, page, subItems }) => {
            const isActive =
              (activePage === "home" && page === "home" && label === "TRANG CHỦ") ||
              (activePage === "projects" && label === "DỰ ÁN") ||
              (activePage === "news" && label === "TIN TỨC") ||
              (activePage === "contact" && label === "LIÊN HỆ") ||
              ((activePage === "danh-muc" || activePage === "detail") && (
                (label === "CHO THUÊ NHÀ ĐẤT" && pathname?.includes("cho-thue")) ||
                (label === "DỰ ÁN" && pathname?.includes("du-an")) ||
                (label === "MUA BÁN NHÀ ĐẤT" && !pathname?.includes("cho-thue") && !pathname?.includes("du-an"))
              ));
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
                        href={`/${sub.page}${sub.query ? '?' + sub.query : ''}`}
                        onClick={(e) => { e.preventDefault(); onNavigate?.(sub.query ? `${sub.page}?${sub.query}` : sub.page); }}
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
          <div className="absolute top-[80px] left-0 w-full bg-white/95 backdrop-blur-md border-b-2 border-earth-brown shadow-lg flex flex-col py-6 px-8 gap-5 lg:hidden z-40 max-h-[80vh] overflow-y-auto">
            {dynamicNavItems.map(({ label, page, subItems }) => {
              const isActive =
                (activePage === "home" && page === "home" && label === "TRANG CHỦ") ||
                (activePage === "projects" && label === "DỰ ÁN") ||
                (activePage === "news" && label === "TIN TỨC") ||
                (activePage === "contact" && label === "LIÊN HỆ") ||
                ((activePage === "danh-muc" || activePage === "detail") && (
                  (label === "CHO THUÊ NHÀ ĐẤT" && pathname?.includes("cho-thue")) ||
                  (label === "DỰ ÁN" && pathname?.includes("du-an")) ||
                  (label === "MUA BÁN NHÀ ĐẤT" && !pathname?.includes("cho-thue") && !pathname?.includes("du-an"))
                ));
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
                          href={`/${sub.page}${sub.query ? '?' + sub.query : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate?.(sub.query ? `${sub.page}?${sub.query}` : sub.page);
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
    </motion.header>
  );
}
