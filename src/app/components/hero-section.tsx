import { useState } from "react";

interface HeroSectionProps {
  onNavigate?: (page: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<"buy" | "rent">("buy");

  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-end justify-center overflow-hidden bg-earth-brown pb-16">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfx8AHiMmjG4NAn4OQI4EMWSVlZai3mjVHfSHG-7UmjuWz9fMRH1w8Nr9Z0vxhB3m5g2WVsiFYiMo6sO7gwBDknJ4dlcfGl9Wf8B67WTOJCXTle0hFIVpP0ADH0MqZsqGyfxOf42HGp7kjUmSwxN_hVcfzw9i0MSGS7vt7gROgFt4CYVa3EDljL-sgx_qT56qQLGIPz6jOffuVy1YerEg4J-eMMY2Uo7cqSigLGuTUDmXixuKOJF5miI_tL5B9sj7nx47o4QF_hTI')",
        }}
      >
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Headline */}
      <div className="absolute top-1/3 -translate-y-1/2 left-0 right-0 text-center px-6 z-10">
        <h1
          className="font-body-lg text-white leading-tight"
          style={{
            fontSize: "clamp(48px, 7vw, 80px)",
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
                backgroundColor: activeTab === key ? "#D4AF37" : "rgba(200,90,23,0.55)",
                color: "#ffffff",
                backdropFilter: "blur(8px)",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Search box */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-1.5 shadow-2xl">
          <div className="bg-white">
            {/* Main row */}
            <div className="flex flex-col md:flex-row items-stretch border-b border-outline-variant/20">
              {/* Loại nhà đất */}
              <div className="flex items-center w-full md:w-auto border-b md:border-b-0 md:border-r border-outline-variant/20 px-5 shrink-0">
                <select
                  className="w-full md:w-auto bg-transparent border-none focus:ring-0 font-body-md text-on-surface appearance-none outline-none pr-5 py-4 cursor-pointer"
                  style={{ fontSize: "15px" }}
                >
                  <option>Loại nhà đất</option>
                  <option>Nhà ở</option>
                  <option>Căn hộ chung cư</option>
                  <option>Biệt thự, liền kề</option>
                  <option>Đất nền</option>
                  <option>Văn phòng, mặt bằng</option>
                </select>
                <span className="material-symbols-outlined text-outline-variant pointer-events-none -ml-4" style={{ fontSize: "18px" }}>expand_more</span>
              </div>

              {/* Địa điểm */}
              <div className="flex-1 flex items-center px-5 py-3 md:py-0 border-b md:border-b-0 border-outline-variant/20">
                <span className="material-symbols-outlined text-antique-gold mr-3 shrink-0" style={{ fontSize: "20px" }}>location_on</span>
                <input
                  type="text"
                  placeholder="Nhập địa điểm hoặc dự án..."
                  className="w-full bg-transparent border-none focus:ring-0 font-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none py-4"
                  style={{ fontSize: "15px" }}
                />
              </div>

              {/* Nút tìm kiếm */}
              <button
                onClick={() => onNavigate?.("listing")}
                className="w-full md:w-auto px-10 py-4 font-label-caps text-white bg-earth-brown hover:bg-antique-gold transition-all duration-500 shrink-0 active:scale-95"
                style={{ fontSize: "12px", letterSpacing: "0.15em", fontWeight: 700 }}
              >
                TÌM KIẾM
              </button>
            </div>

            {/* Filter row */}
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-outline-variant/20">
              {[
                { label: "Toàn quốc", options: ["Toàn quốc", "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Nha Trang"] },
                { label: "Mức giá", options: ["Mức giá", "Dưới 1 tỷ", "1 – 3 tỷ", "3 – 5 tỷ", "5 – 10 tỷ", "Trên 10 tỷ"] },
                { label: "Diện tích", options: ["Diện tích", "Dưới 50 m²", "50 – 100 m²", "100 – 200 m²", "Trên 200 m²"] },
                { label: "Dự án", options: ["Dự án", "The Heritage Riverside", "Masteri West Heights", "Vinhomes Ocean Park"] },
              ].map(({ label, options }) => (
                <div key={label} className="flex-1 flex items-center px-4 py-2.5">
                  <select
                    className="w-full bg-transparent border-none focus:ring-0 text-on-surface-variant appearance-none outline-none cursor-pointer"
                    style={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    {options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                  <span className="material-symbols-outlined text-outline-variant pointer-events-none shrink-0 -ml-5" style={{ fontSize: "16px" }}>expand_more</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
