import { useState } from "react";

interface Project {
  id?: string | number;
  title: string;
  desc: string;
  mainImg: string;
  sideImg: string;
  badge: string;
}

const projectData: Project[] = [
  {
    id: 11,
    title: "Rivea Hanoi",
    desc: "Tọa lạc tại Phường Vĩnh Hưng, quận Hoàng Mai, Hà Nội. Dự án sở hữu quy mô 29.853 m2 với pháp lý hợp đồng mua bán hoàn thiện cùng mức giá vô cùng hấp dẫn từ 3-8 Tỷ.",
    mainImg: "https://xemnha.vn/uploads/upload-images/images/phoi-canh-rivea-hanoi.jpg",
    sideImg: "https://xemnha.vn/uploads/upload-images/images/phoi-canh-rivea-hanoi.jpg",
    badge: "SẮP MỞ BÁN",
  },
  {
    id: 12,
    title: "Vinhomes Nguyễn Trãi (Cao Xà Lá)",
    desc: "Tọa lạc tại địa chỉ đắc địa 233 – 233B – 235 Nguyễn Trãi, quận Thanh Xuân, Hà Nội. Dự án có quy mô 109.98 m2, pháp lý sổ đỏ lâu dài.",
    mainImg: "https://xemnha.vn/uploads/upload-images/images/Vinhomes-Cao-Xa-La.jpg",
    sideImg: "https://xemnha.vn/uploads/upload-images/images/phoi-canh-masteri-cao-xa-la-3.png",
    badge: "ĐANG XÂY DỰNG",
  },
  {
    id: 13,
    title: "Imperia Signature",
    desc: "Tọa lạc tại Đông Hội, Đông Anh, Hà Nội. Tổ hợp căn hộ cao cấp quy mô 4.65 ha, pháp lý hợp đồng mua bán vững chắc, giá từ 2-7 Tỷ.",
    mainImg: "https://xemnha.vn/uploads/images/view-imperia-signature.jpg",
    sideImg: "https://xemnha.vn/uploads/images/view-imperia-signature.jpg",
    badge: "SẮP MỞ BÁN",
  },
  {
    id: 14,
    title: "SAM Towers",
    desc: "Tọa lạc tại Lô A2-1 Như Nguyệt, Phường Thuận Phước, Quận Hải Châu, Đà Nẵng. Căn hộ cao cấp ven sông Hàn quy mô 4.9 m2, giá từ 80-100 Triệu/m2.",
    mainImg: "https://xemnha.vn/images/logo-vinhomes.jpg",
    sideImg: "https://xemnha.vn/uploads/images/toan-canh-du-an-sam-towers-da-nang.jpg",
    badge: "ĐANG MỞ BÁN",
  },
];

interface FeaturedProjectsProps {
  projects?: any[];
  onViewDetail?: (id: string | number) => void;
}

export function FeaturedProjects({ projects = [], onViewDetail }: FeaturedProjectsProps) {
  const data = projects.length > 0 ? projects.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    location: p.location,
    desc: p.description || "Đang cập nhật mô tả dự án...",
    mainImg: p.mainImg || "",
    sideImg: p.sideImg || "",
    year: "2026",
    size: p.area ? `${p.area} m²` : "N/A"
  })) : projectData;

  const [current, setCurrent] = useState(0);
  const project = data[current] || projectData[0];



  return (
    <section className="py-20 md:py-24 overflow-hidden relative bg-surface-container-low border-b border-outline-variant/30">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-antique-gold/30 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-[100px]">
        {/* Header */}
        <div className="mb-10 md:mb-12 flex flex-col md:flex-row items-center md:items-end justify-between gap-8 text-center md:text-left">
          <div className="max-w-2xl flex flex-col items-center md:items-start w-full mx-auto md:mx-0">
            <span
              className="font-label-caps block mb-6 uppercase text-earth-brown font-bold"
              style={{ fontSize: "10px", letterSpacing: "0.5em" }}
            >
              BIỂU TƯỢNG MỚI
            </span>
            <div className="relative py-6 px-12 border-2 border-antique-gold/20 w-fit">
              <div className="absolute inset-2 border border-antique-gold/10 pointer-events-none" />
              <div className="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-antique-gold" />
              <div className="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-antique-gold" />
              <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-antique-gold" />
              <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-antique-gold" />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-surface-container-low px-6">
                <span className="material-symbols-outlined text-antique-gold text-4xl">architecture</span>
              </div>
              <h2
                className="font-display-lg text-earth-brown leading-[1.1] relative z-10"
                style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700 }}
              >
                DỰ ÁN NỔI BẬT
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-6 w-full">
            <p
              className="font-body-lg text-on-surface font-medium max-w-sm border-r-0 md:border-r-2 border-antique-gold pr-0 md:pr-8 pb-2 text-center md:text-right"
              style={{ fontSize: "18px", lineHeight: "30px" }}
            >
              Kết nối người mua và người bán bằng giải pháp bất động sản toàn diện.
            </p>
          </div>
        </div>

        {/* Project Content */}
        <div className="grid grid-cols-12 gap-y-12 md:gap-y-20 relative">
          <button
            onClick={() => setCurrent((c) => (c - 1 + data.length) % data.length)}
            className="hidden md:flex absolute -left-[40px] xl:-left-[120px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-outline-variant/30 items-center justify-center text-earth-brown hover:bg-earth-brown hover:text-white transition-all z-20 bg-surface shadow-md"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % data.length)}
            className="hidden md:flex absolute -right-[40px] xl:-right-[120px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-outline-variant/30 items-center justify-center text-earth-brown hover:bg-earth-brown hover:text-white transition-all z-20 bg-surface shadow-md"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
          </button>
          <div className="col-span-12 lg:col-span-7 group relative md:pb-28">
            <div className="relative w-full">
              {/* Mobile Only Navigation Buttons */}
              <button
                onClick={() => setCurrent((c) => (c - 1 + data.length) % data.length)}
                className="flex md:hidden absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-outline-variant/30 items-center justify-center text-earth-brown hover:bg-earth-brown hover:text-white transition-all z-20 bg-surface shadow-md"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
              <button
                onClick={() => setCurrent((c) => (c + 1) % data.length)}
                className="flex md:hidden absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-outline-variant/30 items-center justify-center text-earth-brown hover:bg-earth-brown hover:text-white transition-all z-20 bg-surface shadow-md"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
              <div className="aspect-[4/3] md:aspect-[2/1] border-2 border-outline-variant/20 p-2 bg-surface-container-lowest shadow-xl">
              <div className="relative w-full h-full overflow-hidden">
                {data.map((p, idx) => (
                  <img
                    key={idx}
                    src={p.mainImg}
                    alt={p.title}
                    className={`absolute top-0 left-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms] ${
                      idx === current
                        ? "translate-x-0 opacity-100 z-10"
                        : idx < current
                        ? "-translate-x-full opacity-0 z-0"
                        : "translate-x-full opacity-0 z-0"
                    }`}
                    style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                  />
                ))}
              </div>
            </div>
            </div>
            <div className="relative md:absolute bottom-0 right-0 md:-right-12 bg-white p-4 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] max-w-lg border-t-4 border-earth-brown mx-0 sm:mx-4 md:mx-0 -mt-8 md:mt-0 z-20">
              <span
                className="font-label-caps text-antique-gold mb-2 block uppercase tracking-widest font-bold"
                style={{ fontSize: "9px" }}
              >
                {project.badge}
              </span>
              <h3
                className="font-display-lg text-earth-brown mb-2 line-clamp-2"
                style={{ fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 700 }}
              >
                {project.title}
              </h3>
              <div 
                className="font-body-md text-on-surface mb-3 leading-relaxed line-clamp-3 [&_iframe]:hidden [&_img]:hidden [&_video]:hidden [&_figure]:hidden [&_table]:hidden [&_audio]:hidden" 
                style={{ fontSize: "14px" }}
                dangerouslySetInnerHTML={{ __html: project.desc ? project.desc.replace(/<[^>]*>?/gm, '') : '' }}
              />
              <button
                onClick={() => onViewDetail?.((project as any).slug || project.id || 11)}
                className="font-label-caps text-earth-brown font-bold tracking-[0.2em] hover:text-antique-gold transition-colors flex items-center gap-3 cursor-pointer"
                style={{ fontSize: "10px" }}
              >
                KHÁM PHÁ CHI TIẾT <span className="w-8 h-[2px] bg-antique-gold" />
              </button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col justify-center">
            <div className="relative pl-8 py-2 mb-4">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-antique-gold" />
              <h4
                className="font-display-lg text-earth-brown mb-1 leading-snug italic"
                style={{ fontSize: "clamp(16px, 1.5vw, 22px)", fontWeight: 700 }}
              >
                "Đồng hành cùng bạn trên mọi hành trình giao dịch bất động sản."
              </h4>
              <p
                className="font-body-md text-on-surface mb-2 leading-relaxed"
                style={{ fontSize: "14px", lineHeight: "22px" }}
              >
                HAPPY M cam kết mang đến những sản phẩm bất động sản có pháp lý rõ ràng, vị trí tiềm năng và giá trị tăng trưởng ổn định. Chúng tôi giúp quá trình mua bán của bạn trở nên đơn giản và an toàn hơn.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[{ n: "15+", l: "Năm Kinh Nghiệm" }, { n: "200+", l: "Giao Dịch Bất Động Sản" }].map(({ n, l }) => (
                  <div key={l}>
                    <span
                      className="font-display-lg text-earth-brown font-bold block mb-0"
                      style={{ fontSize: "28px", fontWeight: 700 }}
                    >
                      {n}
                    </span>
                    <span
                      className="font-label-caps text-on-surface-variant uppercase tracking-widest font-bold"
                      style={{ fontSize: "9px" }}
                    >
                      {l}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block relative aspect-square border border-outline-variant/20 p-2 bg-surface-container-lowest shadow-lg">
              <div className="relative w-full h-full overflow-hidden">
                {data.map((p, idx) => (
                  <img
                    key={idx}
                    src={p.sideImg}
                    alt=""
                    className={`absolute top-0 left-0 w-full h-full object-cover hover:sepia-0 transition-all duration-[1200ms] ${
                      idx === current
                        ? "translate-x-0 opacity-100 z-10"
                        : idx < current
                        ? "-translate-x-full opacity-0 z-0"
                        : "translate-x-full opacity-0 z-0"
                    }`}
                    style={{ 
                      filter: "sepia(0.2)", 
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                      transitionDelay: "0.1s"
                    }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none z-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
