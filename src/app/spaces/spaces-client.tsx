"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TopNavBar } from "../../components/top-nav-bar";
import { Footer } from "../../components/footer";
import { CTASection } from "../../components/cta-section";
import Link from "next/link";

interface ShowcaseItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  images: string[];
}

interface Collection {
  id: string;
  name: string;
  tagline: string;
  items: ShowcaseItem[];
}

const collectionsDataFallback: Collection[] = [
  {
    id: "saigon",
    name: "SÀI GÒN",
    tagline: "Đẳng cấp kiến trúc cổ điển & Thượng lưu",
    items: [
      {
        id: "h-ext",
        category: "01 / NGOẠI THẤT",
        title: "Kiến trúc Ngoại thất",
        subtitle: "Đường nét hiện đại hòa quyện với ánh sáng hoàng hôn ấm áp.",
        images: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1613490908578-8120c16b5a32?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        ],
      },
      {
        id: "h-kit",
        category: "02 / PHÒNG BẾP",
        title: "Không gian Bếp",
        subtitle: "Hệ tủ đen mờ lịch lãm cùng mặt đá bếp vân mây cao cấp.",
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80",
        ],
      },
      {
        id: "h-liv",
        category: "03 / PHÒNG KHÁCH",
        title: "Phòng khách Thượng lưu",
        subtitle: "Tông màu vàng cát vương giả cùng nội thất da cao cấp.",
        images: [
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1583847268964-b28ce8f30f6c?auto=format&fit=crop&w=800&q=80",
        ],
      },
      {
        id: "h-bath",
        category: "04 / PHÒNG TẮM",
        title: "Phòng tắm Thư giãn",
        subtitle: "Bồn tắm đặt sàn sang trọng trên nền sỏi cuội tự nhiên.",
        images: [
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1507652313519-d4e9174296fb?auto=format&fit=crop&w=800&q=80",
        ],
      },
      {
        id: "h-pool",
        category: "05 / NGOÀI TRỜI",
        title: "Hồ bơi & Sân vườn",
        subtitle: "Làn nước xanh mát ôm trọn không gian thư thái tách biệt.",
        images: [
          "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
        ],
      },
      {
        id: "h-bed",
        category: "06 / PHÒNG NGỦ",
        title: "Phòng ngủ Master",
        subtitle: "Vách ốp gỗ cao cấp cùng hệ thống ánh sáng dịu nhẹ ấm cúng.",
        images: [
          "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        ],
      },
    ],
  },
  {
    id: "hanoi",
    name: "HÀ NỘI",
    tagline: "Sự tinh giản mang hơi thở thời đại mới",
    items: [
      {
        id: "m-ext",
        category: "01 / NGOẠI THẤT",
        title: "Mặt tiền Đương đại",
        subtitle: "Các khối kính lớn tối giản kết nối trọn vẹn cảnh quan xanh.",
        images: [
          "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        ],
      },
      {
        id: "m-kit",
        category: "02 / PHÒNG BẾP",
        title: "Nhà bếp Tối giản",
        subtitle: "Bếp phẳng không tay nắm, đề cao sự liền mạch của vật liệu.",
        images: [
          "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
        ],
      },
      {
        id: "m-liv",
        category: "03 / PHÒNG KHÁCH",
        title: "Không gian Nghệ thuật",
        subtitle: "Tường bê tông thô kết hợp tranh đương đại khổ lớn đầy cuốn hút.",
        images: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
        ],
      },
      {
        id: "m-bath",
        category: "04 / PHÒNG TẮM",
        title: "Phòng tắm Slate",
        subtitle: "Đá đen tự nhiên kết hợp với phụ kiện kim loại mờ tinh tế.",
        images: [
          "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80",
        ],
      },
      {
        id: "m-pool",
        category: "05 / NGOÀI TRỜI",
        title: "Bể bơi Chân mây",
        subtitle: "Mặt nước phẳng lặng hòa vào đường chân trời biển cả mênh mông.",
        images: [
          "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
        ],
      },
      {
        id: "m-bed",
        category: "06 / PHÒNG NGỦ",
        title: "Phòng ngủ Tối giản",
        subtitle: "Thiết kế giường trệt tối giản mang lại sự thanh tịnh tuyệt đối.",
        images: [
          "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
        ],
      },
    ],
  },
];

const CATEGORIES = [
  "TẤT CẢ",
  "NGOẠI THẤT",
  "PHÒNG BẾP",
  "PHÒNG KHÁCH",
  "PHÒNG TẮM",
  "NGOÀI TRỜI",
  "PHÒNG NGỦ",
];

function SpacesGalleryContent({ dbSpaces }: { dbSpaces: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mapped collection data
  const dynamicCollections = collectionsDataFallback.map((col) => {
    const dbColSpaces = dbSpaces.filter((s) => s.collection === col.id.toUpperCase());

    return {
      ...col,
      items: col.items.map((defaultItem, idx) => {
        const dbItem = dbColSpaces[idx];
        if (dbItem) {
          return {
            id: dbItem.id.toString(),
            category: dbItem.category || defaultItem.category,
            title: dbItem.title || defaultItem.title,
            subtitle: dbItem.subtitle || defaultItem.subtitle,
            images:
              Array.isArray(dbItem.images) && dbItem.images.length > 0
                ? dbItem.images
                : dbItem.images
                ? [dbItem.images]
                : defaultItem.images,
          };
        }
        return defaultItem;
      }),
    };
  });

  // State Management
  const [activeCollection, setActiveCollection] = useState("saigon");
  const [activeCategory, setActiveCategory] = useState("TẤT CẢ");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -688, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 688, behavior: "smooth" });
    }
  };

  // Sync state from query parameters on load
  useEffect(() => {
    const colParam = searchParams.get("collection");
    const catParam = searchParams.get("category");

    if (colParam && ["saigon", "hanoi"].includes(colParam)) {
      setActiveCollection(colParam);
    }
    if (catParam) {
      const matchedCat = CATEGORIES.find(
        (c) => c.toLowerCase() === catParam.toLowerCase()
      );
      if (matchedCat) {
        setActiveCategory(matchedCat);
      }
    }
  }, [searchParams]);

  const handleNavigate = (page: string) => {
    if (page === "home") router.push("/");
    else router.push(`/${page}`);
  };

  const currentCollection =
    dynamicCollections.find((c) => c.id === activeCollection) || dynamicCollections[0];

  // Flatten and filter images to display in gallery grid
  const galleryImages: {
    src: string;
    title: string;
    categoryName: string;
    subtitle: string;
  }[] = [];

  currentCollection.items.forEach((item) => {
    const catClean = item.category.split("/")[1]?.trim() || item.category;
    const isMatched =
      activeCategory === "TẤT CẢ" ||
      catClean.toLowerCase() === activeCategory.toLowerCase();

    if (isMatched) {
      item.images.forEach((imgSrc) => {
        galleryImages.push({
          src: imgSrc,
          title: item.title,
          categoryName: catClean,
          subtitle: item.subtitle,
        });
      });
    }
  });

  // Lightbox navigation helpers
  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null && galleryImages.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null && galleryImages.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  };

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setLightboxIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, galleryImages]);

  return (
    <div
      className="bg-surface text-on-surface font-body-md selection:bg-antique-gold selection:text-white"
      style={{ overflowX: "hidden" }}
    >
      <TopNavBar activePage="" onNavigate={handleNavigate} />

      <main className="pt-28 md:pt-36">
        {/* Gallery Hero/Header */}
        <section
          className="py-16 md:py-24 border-b border-outline-variant/20 relative"
          style={{
            background: `linear-gradient(135deg, #F7F4EB 0%, #F7F4EB 25%, #F2EBDC 25%, #F2EBDC 50%, #EADFCA 50%, #EADFCA 75%, #F5EDD9 75%, #F5EDD9 100%)`,
          }}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] text-center">
            <span
              className="font-label-caps text-white bg-earth-brown inline-block px-4 py-2 mb-6 uppercase tracking-widest font-bold border border-antique-gold/20"
              style={{ fontSize: "11px", letterSpacing: "0.4em" }}
            >
              BỘ SƯU TẬP KHÔNG GIAN
            </span>
            <h1
              className="font-display-lg text-earth-brown font-bold leading-tight uppercase"
              style={{ fontSize: "clamp(30px, 4.5vw, 54px)" }}
            >
              Nghệ Thuật Sắp Đặt <br />
              <span className="italic font-normal lowercase">và</span>{" "}
              <span className="italic font-normal">Không Gian Sống</span>
            </h1>
            <p className="text-on-surface-variant font-body-lg mt-6 max-w-2xl mx-auto">
              Nơi hội tụ những góc nhìn chân thực, tinh tế về chất liệu, ánh sáng
              và thiết kế độc bản trong các dự án di sản của chúng tôi.
            </p>
          </div>
        </section>

        {/* Filters and Tabs */}
        <section className="py-8 bg-surface-container-lowest border-b border-outline-variant/20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Collection Tab Buttons */}
            <div className="flex bg-surface p-1.5 border border-outline-variant/30 rounded-full shadow-sm">
              {[
                { id: "saigon", name: "SÀI GÒN" },
                { id: "hanoi", name: "HÀ NỘI" },
              ].map((col) => (
                <button
                  key={col.id}
                  onClick={() => {
                    setActiveCollection(col.id);
                    setActiveCategory("TẤT CẢ");
                  }}
                  className={`px-8 py-2.5 rounded-full font-label-caps text-[10px] tracking-widest font-bold transition-all ${
                    activeCollection === col.id
                      ? "text-white shadow-md"
                      : "text-on-surface-variant hover:text-antique-gold"
                  }`}
                  style={
                    activeCollection === col.id
                      ? { backgroundColor: "#A04000" }
                      : {}
                  }
                >
                  {col.name}
                </button>
              ))}
            </div>

            {/* Category Select Buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 font-label-caps text-[9px] tracking-widest font-bold border transition-all ${
                    activeCategory === cat
                      ? "bg-earth-brown text-white border-earth-brown shadow-sm"
                      : "bg-white text-on-surface-variant border-outline-variant/30 hover:border-earth-brown"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Image Slider */}
        <section className="py-16 md:py-24 bg-[#FAF7F0] relative overflow-hidden flex flex-col justify-center min-h-[70vh]">
          <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[100px] relative">
            {galleryImages.length === 0 ? (
              <div className="text-center py-20 text-on-surface-variant">
                Không tìm thấy hình ảnh nào phù hợp trong danh mục này.
              </div>
            ) : (
              <div className="relative group/slider">
                {/* Navigation Buttons */}
                <button
                  onClick={scrollLeft}
                  className="hidden md:flex absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white shadow-2xl border border-outline-variant/35 items-center justify-center text-earth-brown hover:bg-[#A04000] hover:text-white transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-2xl">chevron_left</span>
                </button>
                <button
                  onClick={scrollRight}
                  className="hidden md:flex absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white shadow-2xl border border-outline-variant/35 items-center justify-center text-earth-brown hover:bg-[#A04000] hover:text-white transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-2xl">chevron_right</span>
                </button>

                {/* Horizontal Scroll Area */}
                <div
                  ref={scrollContainerRef}
                  className="flex flex-row gap-8 md:gap-12 overflow-x-auto py-8 scroll-smooth snap-x snap-mandatory no-scrollbar px-4"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxIndex(idx)}
                      className="flex-shrink-0 snap-center w-[85vw] sm:w-[500px] md:w-[580px] lg:w-[640px] flex flex-col group cursor-pointer"
                    >
                      {/* Clean Image Card (No Overlays, No Gradients) */}
                      <div className="relative overflow-hidden border border-outline-variant/35 shadow-[0_20px_50px_rgba(0,0,0,0.12)] aspect-[3/2] w-full bg-surface-container-lowest transition-all duration-[800ms] hover:shadow-[0_35px_70px_rgba(0,0,0,0.2)] hover:-translate-y-1">
                        <img
                          src={img.src}
                          alt={img.title}
                          className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Zoom Indicator on Hover */}
                        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 p-2 rounded-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-lg">
                            zoom_in
                          </span>
                        </div>
                      </div>

                      {/* Clean Details below the card (Subtitle/Description removed) */}
                      <div className="mt-5 text-center flex flex-col items-center">
                        <span className="font-label-caps text-[9px] tracking-[0.25em] font-bold text-antique-gold uppercase">
                          {img.categoryName}
                        </span>
                        <h3 className="font-display-lg text-earth-brown font-bold uppercase text-base sm:text-lg tracking-wide mt-1.5 group-hover:text-antique-gold transition-colors duration-300">
                          {img.title}
                        </h3>
                        <div className="w-6 h-[1.5px] bg-antique-gold/40 mt-3 group-hover:w-14 transition-all duration-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && galleryImages[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Close Button */}
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors cursor-pointer p-2 z-50 bg-black/40 rounded-full"
            onClick={() => setLightboxIndex(null)}
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>

          {/* Lightbox Prev Button */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors cursor-pointer p-3 z-50 bg-black/40 rounded-full hover:scale-105"
            onClick={handlePrev}
          >
            <span className="material-symbols-outlined text-4xl">chevron_left</span>
          </button>

          {/* Lightbox Next Button */}
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors cursor-pointer p-3 z-50 bg-black/40 rounded-full hover:scale-105"
            onClick={handleNext}
          >
            <span className="material-symbols-outlined text-4xl">chevron_right</span>
          </button>

          {/* Image & Caption Wrapper */}
          <div
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].title}
              className="max-w-full max-h-[75vh] object-contain border border-white/10 shadow-2xl transition-all duration-300"
            />

            {/* Lightbox Caption */}
            <div className="w-full text-center mt-6 text-white max-w-2xl px-4">
              <span
                className="font-label-caps text-antique-gold tracking-widest font-bold text-xs uppercase"
                style={{ letterSpacing: "0.2em" }}
              >
                {galleryImages[lightboxIndex].categoryName}
              </span>
              <h3 className="font-display-md text-white font-bold text-xl md:text-2xl mt-1 leading-snug">
                {galleryImages[lightboxIndex].title}
              </h3>
              {/* Pagination index indicator */}
              <div className="text-white/50 text-[10px] tracking-widest uppercase font-bold mt-3 font-label-caps">
                {lightboxIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        </div>
      )}

      <CTASection onSchedule={() => handleNavigate("contact")} onViewCatalog={() => handleNavigate("listing")} />
      <Footer />
    </div>
  );
}

export default function SpacesClient({ dbSpaces }: { dbSpaces: any[] }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-earth-brown font-label-caps">Đang tải bộ sưu tập không gian...</div>}>
      <SpacesGalleryContent dbSpaces={dbSpaces} />
    </Suspense>
  );
}
