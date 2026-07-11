import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getTopLocations, getProjects } from "../actions/project-actions";
import { getCategories } from "../actions/category-actions";

interface HeroSectionProps {
  onNavigate?: (page: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"buy" | "rent">("buy");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Toàn quốc");
  const [price, setPrice] = useState("Mức giá");
  const [area, setArea] = useState("Diện tích");
  const [project, setProject] = useState("Dự án");
  const [category, setCategory] = useState("Loại nhà đất");

  const [dbLocations, setDbLocations] = useState<string[]>(["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng"]);
  const [dbCategories, setDbCategories] = useState<string[]>([]);

  useEffect(() => {
    // Fetch locations
    getTopLocations(20).then((data) => {
      const locNames = data.map((d: any) => d.name);
      const combined = Array.from(new Set(["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Đồng Nai", "Bình Dương", "Khánh Hòa", "Quảng Ninh", "Hải Phòng", ...locNames]));
      setDbLocations(combined);
    });

    getCategories().then(data => {
      if(Array.isArray(data)) {
        setDbCategories(Array.from(new Set(data.map((c: any) => c.name))));
      }
    }).catch(() => []);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword) params.set("keyword", keyword);
    if (location && location !== "Toàn quốc") params.set("location", location);
    if (price && price !== "Mức giá") params.set("price", price);
    if (area && area !== "Diện tích") params.set("area", area);
    if (project && project !== "Dự án") params.set("keyword", project);
    if (category && category !== "Loại nhà đất") params.set("category", category);

    let basePath = "/danh-muc";
    if (activeTab === "buy") {
      basePath = "/danh-muc/mua-ban-nha-dat";
    } else if (activeTab === "rent") {
      basePath = "/danh-muc/cho-thue-nha-dat";
    }

    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  };

  return (
    <section className="relative h-[92vh] min-h-[600px] md:min-h-[700px] flex items-end justify-center overflow-hidden bg-earth-brown pb-16">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600"
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Headline */}
      <div className="absolute top-1/3 -translate-y-1/4 left-0 right-0 px-6 md:px-[100px] z-10 max-w-[1440px] mx-auto w-full">
        <div className="text-left w-full">
          <h1
            className="font-body-lg text-white leading-tight"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: "1.2",
              fontWeight: 700,
              textShadow: "rgba(0,0,0,0.4) 0px 4px 20px",
            }}
          >
            <span className="whitespace-nowrap">Tìm Kiếm Nơi An Cư</span> <br />
            <span className="italic font-normal whitespace-nowrap text-white/90">Và Đầu Tư Lý Tưởng</span>
          </h1>
          <p className="text-white mt-6 text-[16px] md:text-[20px] font-medium tracking-wide drop-shadow-md" style={{ textShadow: "rgba(0,0,0,0.6) 0px 2px 10px" }}>
            Nền tảng giao dịch bất động sản uy tín, minh bạch và nhanh chóng.
          </p>
          <div className="h-[2px] w-24 bg-antique-gold mt-4 shadow-sm" />
        </div>
      </div>

      {/* Search widget */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        {/* Tabs */}
        <div className="flex">
          {[
            { key: "buy", label: "MUA BÁN NHÀ ĐẤT" },
            { key: "rent", label: "CHO THUÊ NHÀ ĐẤT" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as "buy" | "rent")}
              className={`px-6 py-3 font-label-caps transition-all duration-300 ${key === 'buy' ? 'rounded-tl-xl' : ''} ${key === 'rent' ? 'rounded-tr-xl' : ''}`}
              style={{
                fontSize: "11px",
                letterSpacing: "0.12em",
                fontWeight: 700,
                backgroundColor: activeTab === key ? "#A04000" : "rgba(0, 0, 0, 0.35)",
                color: "#ffffff",
                backdropFilter: "blur(8px)",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Search box */}
        <div className="bg-white/10 backdrop-blur-2xl border-2 border-white/20 p-2 shadow-xl rounded-tr-xl rounded-b-xl rounded-tl-none">
          <div className="bg-white p-2 rounded-lg">
            {/* Main row */}
            <div className="flex flex-col md:flex-row items-stretch border-b border-outline-variant/20">
              {/* Loại nhà đất */}
              <div className="flex items-center border-b md:border-b-0 md:border-r border-outline-variant/20 px-4 md:px-5 w-full md:w-auto justify-between md:justify-start shrink-0">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full md:w-[130px] lg:w-[140px] truncate pr-8 bg-transparent border-none focus:ring-0 font-body-md text-on-surface appearance-none outline-none py-3 md:py-4 cursor-pointer text-[13px] md:text-[14px]"
                  style={{ fontWeight: 500 }}
                >
                  <option>Loại nhà đất</option>
                  {dbCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <span className="material-symbols-outlined text-outline-variant pointer-events-none -ml-8 text-xs md:text-sm">expand_more</span>
              </div>

              {/* Địa điểm */}
              <div className="flex-1 flex items-center px-4 md:px-5 py-2 md:py-0 border-b md:border-b-0 border-outline-variant/20">
                <span className="material-symbols-outlined text-antique-gold mr-2 md:mr-3 shrink-0 text-[20px] md:text-[24px]">location_on</span>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Nhập địa điểm hoặc dự án..."
                  className="w-full bg-transparent border-none focus:ring-0 font-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none py-3 md:py-4 text-[13px] md:text-[14px]"
                />
              </div>

              {/* Nút tìm kiếm */}
              <div className="p-2 md:p-0 md:ml-2 shrink-0">
                <button
                  onClick={handleSearch}
                  className="w-full md:w-auto px-6 md:px-10 py-3.5 md:py-4 font-label-caps text-white hover:bg-antique-gold transition-all duration-500 active:scale-95 text-[13px] rounded-lg"
                  style={{ letterSpacing: "0.15em", fontWeight: 700, backgroundColor: "#A04000" }}
                >
                  TÌM KIẾM
                </button>
              </div>
            </div>

            {/* Filter row */}
            <div className="grid grid-cols-2 md:flex md:divide-x divide-outline-variant/20 border-t border-outline-variant/10">
              {/* Toàn quốc */}
              <div className="flex items-center px-3 py-2 md:py-2.5 border-r border-b border-outline-variant/10 md:border-r-0 md:border-b-0 md:flex-1 min-w-0">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-on-surface-variant appearance-none outline-none cursor-pointer text-[12px] md:text-[13px]"
                  style={{ fontWeight: 500 }}
                >
                  <option value="Toàn quốc">Toàn quốc</option>
                  {dbLocations.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <span className="material-symbols-outlined text-outline-variant pointer-events-none shrink-0 -ml-4 text-xs md:text-[16px]">expand_more</span>
              </div>
              {/* Mức giá */}
              <div className="flex items-center px-3 py-2 md:py-2.5 border-b border-outline-variant/10 md:border-b-0 md:flex-1 min-w-0">
                <select
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-on-surface-variant appearance-none outline-none cursor-pointer text-[12px] md:text-[13px]"
                  style={{ fontWeight: 500 }}
                >
                  {["Mức giá", "Trên 20 Tỷ VNĐ", "50 - 100 Tỷ VNĐ", "Trên 100 Tỷ VNĐ"].map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <span className="material-symbols-outlined text-outline-variant pointer-events-none shrink-0 -ml-4 text-xs md:text-[16px]">expand_more</span>
              </div>
              {/* Diện tích */}
              <div className="flex items-center px-3 py-2 md:py-2.5 border-r border-outline-variant/10 md:border-r-0 md:flex-1 min-w-0">
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-on-surface-variant appearance-none outline-none cursor-pointer text-[12px] md:text-[13px]"
                  style={{ fontWeight: 500 }}
                >
                  {["Diện tích", "Dưới 200 m²", "200 - 500 m²", "Trên 500 m²"].map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <span className="material-symbols-outlined text-outline-variant pointer-events-none shrink-0 -ml-4 text-xs md:text-[16px]">expand_more</span>
              </div>
              {/* Dự án */}
              <div className="flex items-center px-3 py-2 md:py-2.5 md:flex-1 min-w-0">
                <input
                  type="text"
                  value={project === "Dự án" ? "" : project}
                  onChange={(e) => setProject(e.target.value)}
                  placeholder="Dự án..."
                  className="w-full bg-transparent border-none focus:ring-0 text-on-surface-variant outline-none placeholder:text-on-surface-variant text-[12px] md:text-[13px]"
                  style={{ fontWeight: 500 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
