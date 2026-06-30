import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTopLocations } from "../actions/project-actions";

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
  const [dbProjects, setDbProjects] = useState<string[]>([]);

  useEffect(() => {
    // Fetch locations
    getTopLocations(20).then((data) => {
      const locNames = data.map((d: any) => d.name);
      const combined = Array.from(new Set(["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Đồng Nai", "Bình Dương", "Khánh Hòa", "Quảng Ninh", "Hải Phòng", ...locNames]));
      setDbLocations(combined);
    });

    // Fetch categories for "Loại nhà đất"
    fetch('/api/categories').then(res => res.json()).catch(() => []).then(data => {
      if(Array.isArray(data)) {
        setDbCategories(Array.from(new Set(data.map(c => c.name))));
      }
    });

    // Fetch projects
    fetch('/api/projects?limit=50').then(res => res.json()).catch(() => []).then(data => {
      if(data && Array.isArray(data.projects)) {
        setDbProjects(data.projects.map((p:any) => p.title));
      }
    });
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (activeTab === "buy") params.set("type", "MUA BÁN NHÀ ĐẤT");
    else if (activeTab === "rent") params.set("type", "CHO THUÊ NHÀ ĐẤT");

    if (keyword) params.set("keyword", keyword);
    if (location && location !== "Toàn quốc") params.set("location", location);
    if (price && price !== "Mức giá") params.set("price", price);
    if (area && area !== "Diện tích") params.set("area", area);
    if (project && project !== "Dự án") params.set("keyword", project);

    router.push(`/listing?${params.toString()}`);
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-end justify-center overflow-hidden bg-earth-brown pb-16">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600')",
        }}
      >
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Headline */}
      <div className="absolute top-1/3 -translate-y-1/2 left-0 right-0 text-center px-6 z-10">
        <h1
          className="font-body-lg text-white leading-tight"
          style={{
            fontSize: "clamp(32px, 6vw, 72px)",
            lineHeight: "1.1",
            fontWeight: 700,
            textShadow: "rgba(0,0,0,0.4) 0px 4px 20px",
          }}
        >
          Kinh Đô Của Những <br />
          <span className="italic font-normal">Di Sản Bền Vững</span>
        </h1>
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
              className="px-6 py-3 font-label-caps transition-all duration-300"
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
        <div className="bg-white/10 backdrop-blur-2xl border-2 border-white/20 p-1.5 shadow-xl">
          <div className="bg-white p-2">
            {/* Main row */}
            <div className="flex flex-col md:flex-row items-stretch border-b border-outline-variant/20">
              {/* Loại nhà đất */}
              <div className="flex items-center border-b md:border-b-0 md:border-r border-outline-variant/20 px-4 md:px-5 w-full md:w-auto justify-between md:justify-start">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full md:w-auto bg-transparent border-none focus:ring-0 font-body-md text-on-surface appearance-none outline-none py-3 md:py-4 cursor-pointer text-[14px] md:text-[15px]"
                  style={{ fontWeight: 500 }}
                >
                  <option>Loại nhà đất</option>
                  {dbCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <span className="material-symbols-outlined text-outline-variant pointer-events-none -ml-4 text-xs md:text-sm">expand_more</span>
              </div>

              {/* Địa điểm */}
              <div className="flex-1 flex items-center px-4 md:px-5 border-b md:border-b-0 border-outline-variant/20">
                <span className="material-symbols-outlined text-antique-gold mr-1.5 md:mr-3 shrink-0 text-sm md:text-xl">location_on</span>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Nhập địa điểm hoặc dự án..."
                  className="w-full bg-transparent border-none focus:ring-0 font-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none py-3 md:py-4 text-[14px] md:text-[15px]"
                />
              </div>

              {/* Nút tìm kiếm */}
              <button
                onClick={handleSearch}
                className="w-full md:w-auto px-6 md:px-10 py-3.5 md:py-4 font-label-caps text-white hover:bg-antique-gold transition-all duration-500 shrink-0 active:scale-95 text-[12px] md:text-[13px]"
                style={{ letterSpacing: "0.15em", fontWeight: 700, backgroundColor: "#A04000" }}
              >
                TÌM KIẾM
              </button>
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
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-on-surface-variant appearance-none outline-none cursor-pointer text-[12px] md:text-[13px]"
                  style={{ fontWeight: 500 }}
                >
                  {["Dự án", ...dbProjects].map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <span className="material-symbols-outlined text-outline-variant pointer-events-none shrink-0 -ml-4 text-xs md:text-[16px]">expand_more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
