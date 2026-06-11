import { useState } from "react";

interface Project {
  title: string;
  image: string;
}

interface Developer {
  id: string;
  name: string;
  year: string;
  projectCount: number;
  description: string;
  logoSvg: React.ReactNode;
  projects: Project[];
}

const developersData: Developer[] = [
  {
    id: "vinhomes",
    name: "VINHOMES",
    year: "2002",
    projectCount: 18,
    description:
      "Vinhomes là một trong số những nhà phát triển bất động sản thương mại hàng đầu tại Việt Nam. Thành viên thuộc tập đoàn Vingroup sở hữu những đại dự án có quy mô lớn với hạ tầng đồng bộ và tiện ích vượt trội.",
    logoSvg: (
      <svg viewBox="0 0 160 50" className="h-10 w-auto fill-current">
        {/* Vinhomes custom logo symbol (golden bird V + text) */}
        <path d="M15 15 L22 32 L29 15 L24 15 L22 24 L20 15 Z" fill="#C85A17" />
        <path d="M12 18 L15 15 L22 36 L29 15 L32 18 L22 42 Z" fill="#E6A15C" />
        <text x="40" y="32" fontFamily="'Outfit', sans-serif" fontSize="16" fontWeight="bold" letterSpacing="0.08em" fill="#1C0F0A">VINHOMES</text>
      </svg>
    ),
    projects: [
      {
        title: "VINHOMES GLOBAL GATE",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "VINHOMES GOLDEN AVENUE",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "VINHOMES RIVERSIDE",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "VINHOMES THĂNG LONG",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    id: "sunshine",
    name: "SUNSHINE GROUP",
    year: "2016",
    projectCount: 10,
    description:
      "Sunshine Group tiên phong áp dụng công nghệ 4.0 vào quản lý và vận hành bất động sản, kiến tạo nên phong cách sống thông minh, thời thượng với các dự án căn hộ hạng sang và tổ hợp tài chính.",
    logoSvg: (
      <svg viewBox="0 0 160 50" className="h-10 w-auto fill-current">
        <circle cx="20" cy="25" r="10" stroke="#E6A15C" strokeWidth="2" fill="none" />
        <polygon points="20,17 22,22 27,22 23,25 25,30 20,27 15,30 17,25 13,22 18,22" fill="#C85A17" />
        <text x="40" y="32" fontFamily="'Outfit', sans-serif" fontSize="13" fontWeight="bold" letterSpacing="0.03em" fill="#1C0F0A">SUNSHINE GROUP</text>
      </svg>
    ),
    projects: [
      {
        title: "SUNSHINE EMPIRE",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "SUNSHINE CRYSTAL RIVER",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "SUNSHINE GOLDEN RIVER",
        image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "SUNSHINE MARINA NHA TRANG",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    id: "mikgroup",
    name: "MIKGROUP",
    year: "2014",
    projectCount: 8,
    description:
      "MIKGroup định hướng phát triển các tổ hợp căn hộ cao cấp, biệt thự sinh thái và bất động sản nghỉ dưỡng tiêu chuẩn quốc tế, mang lại không gian sống xanh thanh bình giữa lòng đô thị.",
    logoSvg: (
      <svg viewBox="0 0 160 50" className="h-10 w-auto fill-current">
        <rect x="10" y="15" width="20" height="20" stroke="#C85A17" strokeWidth="2" fill="none" />
        <line x1="20" y1="15" x2="20" y2="35" stroke="#E6A15C" strokeWidth="2" />
        <line x1="10" y1="25" x2="30" y2="25" stroke="#E6A15C" strokeWidth="2" />
        <text x="40" y="32" fontFamily="'Outfit', sans-serif" fontSize="16" fontWeight="bold" letterSpacing="0.05em" fill="#1C0F0A">MIKGROUP</text>
      </svg>
    ),
    projects: [
      {
        title: "THE MATRIX ONE",
        image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "IMPERIA SMART CITY",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "MÖVENPICK RESORT PHÚ QUỐC",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "ELEGANT PARK VILLA",
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    id: "vingroup",
    name: "VINGROUP",
    year: "1993",
    projectCount: 35,
    description:
      "Tập đoàn Vingroup là tập đoàn đa ngành hàng đầu Việt Nam. Trong lĩnh vực bất động sản di sản, Vingroup luôn tạo nên những giá trị bền vững và thay đổi diện mạo kiến trúc của các thành phố lớn.",
    logoSvg: (
      <svg viewBox="0 0 160 50" className="h-10 w-auto fill-current">
        <circle cx="20" cy="25" r="11" fill="#DE321D" />
        <path d="M12 22 L20 31 L28 22 L24 22 L20 27 L16 22 Z" fill="#FFF7E0" />
        <text x="40" y="32" fontFamily="'Outfit', sans-serif" fontSize="16" fontWeight="bold" letterSpacing="0.08em" fill="#1C0F0A">VINGROUP</text>
      </svg>
    ),
    projects: [
      {
        title: "VINPEARL NHA TRANG RESORT",
        image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "GRAND WORLD PHÚ QUỐC",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "VINHOMES CENTRAL PARK",
        image: "https://images.unsplash.com/photo-1473116763269-255415b9ffcf?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "LANDMARK 81 TOWER",
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    id: "masterise",
    name: "MASTERISE HOMES",
    year: "2007",
    projectCount: 12,
    description:
      "Masterise Homes là đơn vị tiên phong mang các tiêu chuẩn quốc tế vào phát triển, vận hành và quản lý sản phẩm bất động sản hàng hiệu tại Việt Nam, kiến tạo các giá trị di sản độc bản trường tồn.",
    logoSvg: (
      <svg viewBox="0 0 160 50" className="h-10 w-auto fill-current">
        <path d="M12 32 L20 18 L28 32 L24 32 L20 25 L16 32 Z" fill="#C85A17" />
        <path d="M15 35 L20 27 L25 35 Z" fill="#E6A15C" />
        <text x="40" y="32" fontFamily="'Outfit', sans-serif" fontSize="12" fontWeight="bold" letterSpacing="0.04em" fill="#1C0F0A">MASTERISE HOMES</text>
      </svg>
    ),
    projects: [
      {
        title: "GRAND MARINA SAIGON",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "THE GLOBAL CITY",
        image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "MASTERI CENTRE POINT",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "MASTERI WEST HEIGHTS",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
];

export function DeveloperShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeDev = developersData[activeIdx];

  return (
    <section className="bg-surface py-20 border-b border-outline-variant/20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[100px]">
        {/* Header Title & Intro Text */}
        <div className="text-center mb-12 flex flex-col items-center">
          <h2
            className="font-display-lg text-earth-brown font-bold tracking-wide mb-4"
            style={{ fontSize: "28px" }}
          >
            CHỦ ĐẦU TƯ NỔI BẬT
          </h2>
          <div className="w-16 h-[2px] bg-antique-gold mb-6" />
          <p className="text-on-surface-variant font-body-md max-w-3xl leading-relaxed text-center">
            Danh sách chủ đầu tư uy tín, nổi bật tại Việt Nam. Giới thiệu thông tin chi tiết chủ đầu tư, số lượng, thông tin các dự án đang được triển khai.
          </p>
        </div>

        {/* Developer Logo Grid Row (displays all logos static) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto w-full mb-12 py-2">
          {developersData.map((dev, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={dev.id}
                onClick={() => setActiveIdx(idx)}
                className={`relative flex items-center justify-center bg-white border px-4 py-5 rounded shadow-sm cursor-pointer transition-all duration-300 select-none ${
                  dev.id === "masterise" ? "col-span-2 sm:col-span-1" : "col-span-1"
                } ${
                  isActive
                    ? "border-antique-gold ring-1 ring-antique-gold scale-105"
                    : "border-outline-variant/20 hover:border-antique-gold/40 hover:scale-102"
                }`}
              >
                {dev.logoSvg}

                {/* Downward triangle arrow pointer for active logo card */}
                {isActive && (
                  <div className="absolute -bottom-[12px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-antique-gold z-20">
                    <div className="absolute -top-[13px] -left-[9px] w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[11px] border-t-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active Developer Info Segment */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
          <h3
            className="font-display-lg text-antique-gold font-bold tracking-widest uppercase mb-2"
            style={{ fontSize: "20px" }}
          >
            {activeDev.name}
          </h3>
          <div className="w-10 h-[1.5px] bg-[#C85A17] mx-auto mb-6" />

          {/* Dev Metadata */}
          <div className="flex justify-center items-center gap-6 text-[14px] text-on-surface-variant font-medium mb-6">
            <div>
              Năm thành lập: <span className="text-earth-brown font-bold text-[16px]">{activeDev.year}</span>
            </div>
            <div className="w-[1px] h-4 bg-outline-variant/30" />
            <div>
              Dự án: <span className="text-earth-brown font-bold text-[16px]">{activeDev.projectCount}</span>
            </div>
          </div>

          {/* Dev Description */}
          <p className="text-on-surface-variant font-body-md leading-relaxed text-center px-4 max-w-2xl mx-auto">
            {activeDev.description}
          </p>
        </div>

        {/* Active Developer's Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {activeDev.projects.map((proj, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden bg-white border border-outline-variant/25 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
            >
              {/* Image wrapper */}
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
              </div>

              {/* Title Card at Bottom */}
              <div className="p-4 border-t border-outline-variant/20 text-center bg-white">
                <h4
                  className="font-label-caps text-earth-brown font-bold tracking-wider text-[11px] group-hover:text-antique-gold transition-colors"
                  title={proj.title}
                >
                  {proj.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* More Details Button */}
        <div className="flex justify-center">
          <button className="flex items-center justify-center gap-3 px-8 py-3.5 border border-dashed border-antique-gold text-antique-gold hover:bg-earth-brown hover:text-white hover:border-solid hover:border-earth-brown transition-all duration-500 font-label-caps text-[11px] tracking-widest font-bold cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">add</span>
            THÔNG TIN CHI TIẾT
          </button>
        </div>
      </div>
    </section>
  );
}
