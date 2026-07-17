import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getTopLocations, getProjects, getAllInvestors } from "../actions/project-actions";
import { getCategories, getCategoryGroups } from "../actions/category-actions";
import { generateSlug } from "../lib/slugify";
import herobanner from "../assets/herobanner.png";

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
  const [investor, setInvestor] = useState("");
  const [category, setCategory] = useState("Loại nhà dự án");

  const [dbLocations, setDbLocations] = useState<string[]>(["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng"]);
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [dbInvestors, setDbInvestors] = useState<string[]>([]);
  const [buyGroup, setBuyGroup] = useState("MUA BÁN NHÀ ĐẤT");
  const [rentGroup, setRentGroup] = useState("CHO THUÊ NHÀ ĐẤT");

  useEffect(() => {
    getTopLocations(20).then((data) => {
      const locNames = data.map((d: any) => d.name);
      const combined = Array.from(new Set(["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Đồng Nai", "Bình Dương", "Khánh Hòa", "Quảng Ninh", "Hải Phòng", ...locNames]));
      setDbLocations(combined);
    });

    getCategories(true).then(data => {
      if(Array.isArray(data)) {
        setDbCategories(data);
      }
    }).catch(() => []);

    getAllInvestors().then(data => {
      if(Array.isArray(data)) {
        setDbInvestors(data.map((d: any) => d.name));
      }
    }).catch(() => []);

    getCategoryGroups(true).then(groups => {
      if (Array.isArray(groups) && groups.length > 0) {
        const buy = groups.find(g => g.includes("MUA") || g.includes("BÁN"));
        const rent = groups.find(g => g.includes("CHO THUÊ"));
        if (buy) setBuyGroup(buy);
        if (rent) setRentGroup(rent);
      }
    }).catch(() => {});
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword) params.set("keyword", keyword);
    if (location && location !== "Toàn quốc") params.set("location", location);
    if (price && price !== "Mức giá") params.set("price", price);
    if (area && area !== "Diện tích") params.set("area", area);
    if (investor) params.set("investor", investor);
    if (category && category !== "Loại nhà dự án") params.set("category", category);

    let basePath = "/danh-muc";
    if (activeTab === "buy") {
      basePath = `/danh-muc/${generateSlug(buyGroup)}`;
    } else if (activeTab === "rent") {
      basePath = `/danh-muc/${generateSlug(rentGroup)}`;
    }

    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  };

  return (
    <section className="relative bg-earth-brown">
      {/* MOBILE */}
      <div className="md:hidden relative pt-[80px]">
        <Image src={herobanner} alt="Hero" className="w-full h-auto object-cover" priority />
        {/* Search widget overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 w-full max-w-4xl mx-auto px-4 pb-4">
          {/* Tabs */}
          <div className="flex">
            {[
              { key: "buy", label: buyGroup },
              { key: "rent", label: rentGroup },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key as "buy" | "rent");
                  setCategory("Loại nhà dự án");
                }}
                className={`px-6 py-3 font-label-caps transition-all duration-300 ${key === 'buy' ? 'rounded-tl-xl' : ''} ${key === 'rent' ? 'rounded-tr-xl' : ''}`}
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  fontWeight: 700,
                  backgroundColor: activeTab === key ? "var(--color-earth-brown)" : "rgba(0, 0, 0, 0.35)",
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
              <div className="flex flex-col border-b border-outline-variant/20">
                <div className="flex items-center border-b border-outline-variant/20 px-4 w-full justify-between shrink-0">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full truncate pr-8 bg-transparent border-none focus:ring-0 font-body-md text-on-surface appearance-none outline-none py-3 cursor-pointer text-[13px]"
                    style={{ fontWeight: 500 }}
                  >
                    <option>Loại nhà dự án</option>
                    {dbCategories
                      .filter((c) => 
                        activeTab === "buy" ? c.group_name === buyGroup : c.group_name === rentGroup
                      )
                      .map(c => <option key={c.id || c.name} value={c.name}>{c.name}</option>)}
                  </select>
                  <span className="material-symbols-outlined text-outline-variant pointer-events-none -ml-8 text-xs">expand_more</span>
                </div>
                <div className="flex items-center px-4 py-2">
                  <span className="material-symbols-outlined text-antique-gold mr-2 shrink-0 text-[20px]">location_on</span>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Nhập địa điểm hoặc dự án..."
                    className="w-full bg-transparent border-none focus:ring-0 font-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none py-3 text-[13px]"
                  />
                </div>
                <div className="p-2">
                  <button
                    onClick={handleSearch}
                    className="w-full px-6 py-3.5 font-label-caps text-white transition-all duration-500 active:scale-95 text-[13px] rounded-lg"
                    style={{ letterSpacing: "0.15em", fontWeight: 700, backgroundColor: "var(--color-earth-brown)" }}
                  >
                    TÌM KIẾM
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 divide-x divide-outline-variant/20 border-t border-outline-variant/10">
                <div className="flex items-center px-3 py-2 border-b border-outline-variant/10 min-w-0">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-on-surface-variant appearance-none outline-none cursor-pointer text-[12px]"
                    style={{ fontWeight: 500 }}
                  >
                    <option value="Toàn quốc">Toàn quốc</option>
                    {dbLocations.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <span className="material-symbols-outlined text-outline-variant pointer-events-none shrink-0 -ml-4 text-xs">expand_more</span>
                </div>
                <div className="flex items-center px-3 py-2 border-b border-outline-variant/10 min-w-0">
                  <select
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-on-surface-variant appearance-none outline-none cursor-pointer text-[12px]"
                    style={{ fontWeight: 500 }}
                  >
                    {["Mức giá", "Trên 20 Tỷ VNĐ", "50 - 100 Tỷ VNĐ", "Trên 100 Tỷ VNĐ"].map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <span className="material-symbols-outlined text-outline-variant pointer-events-none shrink-0 -ml-4 text-xs">expand_more</span>
                </div>
                <div className="flex items-center px-3 py-2 border-r border-outline-variant/10 min-w-0">
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-on-surface-variant appearance-none outline-none cursor-pointer text-[12px]"
                    style={{ fontWeight: 500 }}
                  >
                    {["Diện tích", "Dưới 200 m²", "200 - 500 m²", "Trên 500 m²"].map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <span className="material-symbols-outlined text-outline-variant pointer-events-none shrink-0 -ml-4 text-xs">expand_more</span>
                </div>
                <div className="flex items-center px-3 py-2 min-w-0">
                  <select
                    value={investor}
                    onChange={(e) => setInvestor(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-on-surface-variant appearance-none outline-none cursor-pointer text-[12px]"
                    style={{ fontWeight: 500 }}
                  >
                    <option value="">Chủ đầu tư</option>
                    {dbInvestors.map((inv) => <option key={inv} value={inv}>{inv}</option>)}
                  </select>
                  <span className="material-symbols-outlined text-outline-variant pointer-events-none shrink-0 -ml-4 text-xs">expand_more</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block relative h-screen min-h-[600px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/uploads/ariahero.avif"
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Headline */}
      <div className="absolute top-1/3 left-0 right-0 px-[100px] z-10 max-w-[1440px] mx-auto w-full" style={{ transform: "translateY(calc(-25% + 140px))" }}>
        <div className="text-left w-full">
          <div className="inline-block">
            <h1
              className="leading-tight"
              style={{
                fontSize: "clamp(28px, 3.5vw, 48px)",
                lineHeight: "1.2",
                fontWeight: 700,
                fontFamily: "'Playfair Display', Georgia, serif",
                textShadow: "0 4px 30px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              <span className="whitespace-nowrap text-white" style={{ fontSize: "clamp(46px, 6vw, 80px)" }}>Tìm Kiếm Nơi An Cư</span> <br />
              <span className="italic font-normal whitespace-nowrap text-white">Và Đầu Tư Lý Tưởng</span>
            </h1>
          </div>
          <p className="mt-6 text-[20px] font-semibold tracking-wide" style={{ color: "#FFFFFF", textShadow: "0 2px 20px rgba(0,0,0,0.5), 0 1px 6px rgba(0,0,0,0.3)" }}>
            Nền tảng giao dịch bất động sản uy tín, minh bạch và nhanh chóng.
          </p>
          <div className="h-[2px] w-24 bg-antique-gold mt-4 shadow-sm" />
        </div>
      </div>

      {/* Search widget */}
      <div className="absolute bottom-0 left-0 right-0 z-10 max-w-4xl mx-auto px-4 pb-16">
        {/* Tabs */}
        <div className="flex">
          {[
            { key: "buy", label: buyGroup },
            { key: "rent", label: rentGroup },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key as "buy" | "rent");
                setCategory("Loại nhà dự án");
              }}
              className={`px-6 py-3 font-label-caps transition-all duration-300 ${key === 'buy' ? 'rounded-tl-xl' : ''} ${key === 'rent' ? 'rounded-tr-xl' : ''}`}
              style={{
                fontSize: "11px",
                letterSpacing: "0.12em",
                fontWeight: 700,
                backgroundColor: activeTab === key ? "var(--color-earth-brown)" : "rgba(0, 0, 0, 0.35)",
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
            <div className="flex flex-row items-stretch border-b border-outline-variant/20">
              {/* Loại nhà đất */}
              <div className="flex items-center border-r border-outline-variant/20 px-5 w-auto justify-start shrink-0">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-[130px] lg:w-[140px] truncate pr-8 bg-transparent border-none focus:ring-0 font-body-md text-on-surface appearance-none outline-none py-4 cursor-pointer text-[14px]"
                  style={{ fontWeight: 500 }}
                >
                  <option>Loại nhà dự án</option>
                  {dbCategories
                    .filter((c) => 
                      activeTab === "buy" ? c.group_name === buyGroup : c.group_name === rentGroup
                    )
                    .map(c => <option key={c.id || c.name} value={c.name}>{c.name}</option>)}
                </select>
                <span className="material-symbols-outlined text-outline-variant pointer-events-none -ml-8 text-sm">expand_more</span>
              </div>

              {/* Địa điểm */}
              <div className="flex-1 flex items-center px-5">
                <span className="material-symbols-outlined text-antique-gold mr-3 shrink-0 text-[24px]">location_on</span>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Nhập địa điểm hoặc dự án..."
                  className="w-full bg-transparent border-none focus:ring-0 font-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none py-4 text-[14px]"
                />
              </div>

              {/* Nút tìm kiếm */}
              <div className="ml-2 shrink-0">
                <button
                  onClick={handleSearch}
                  className="px-10 py-4 font-label-caps text-white hover:bg-antique-gold transition-all duration-500 active:scale-95 text-[13px] rounded-lg"
                  style={{ letterSpacing: "0.15em", fontWeight: 700, backgroundColor: "var(--color-earth-brown)" }}
                >
                  TÌM KIẾM
                </button>
              </div>
            </div>

            {/* Filter row */}
            <div className="flex divide-x divide-outline-variant/20 border-t border-outline-variant/10">
              {/* Toàn quốc */}
              <div className="flex items-center px-3 py-2.5 flex-1 min-w-0">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-on-surface-variant appearance-none outline-none cursor-pointer text-[13px]"
                  style={{ fontWeight: 500 }}
                >
                  <option value="Toàn quốc">Toàn quốc</option>
                  {dbLocations.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <span className="material-symbols-outlined text-outline-variant pointer-events-none shrink-0 -ml-4 text-[16px]">expand_more</span>
              </div>
              {/* Mức giá */}
              <div className="flex items-center px-3 py-2.5 flex-1 min-w-0">
                <select
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-on-surface-variant appearance-none outline-none cursor-pointer text-[13px]"
                  style={{ fontWeight: 500 }}
                >
                  {["Mức giá", "Trên 20 Tỷ VNĐ", "50 - 100 Tỷ VNĐ", "Trên 100 Tỷ VNĐ"].map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <span className="material-symbols-outlined text-outline-variant pointer-events-none shrink-0 -ml-4 text-[16px]">expand_more</span>
              </div>
              {/* Diện tích */}
              <div className="flex items-center px-3 py-2.5 flex-1 min-w-0">
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-on-surface-variant appearance-none outline-none cursor-pointer text-[13px]"
                  style={{ fontWeight: 500 }}
                >
                  {["Diện tích", "Dưới 200 m²", "200 - 500 m²", "Trên 500 m²"].map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <span className="material-symbols-outlined text-outline-variant pointer-events-none shrink-0 -ml-4 text-[16px]">expand_more</span>
              </div>
              {/* Chủ đầu tư */}
              <div className="flex items-center px-3 py-2.5 flex-1 min-w-0">
                <select
                  value={investor}
                  onChange={(e) => setInvestor(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-on-surface-variant appearance-none outline-none cursor-pointer text-[13px]"
                  style={{ fontWeight: 500 }}
                >
                  <option value="">Chủ đầu tư</option>
                  {dbInvestors.map((inv) => <option key={inv} value={inv}>{inv}</option>)}
                </select>
                <span className="material-symbols-outlined text-outline-variant pointer-events-none shrink-0 -ml-4 text-[16px]">expand_more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
