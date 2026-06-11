import { useState } from "react";

interface Project {
  title: string;
  desc: string;
  mainImg: string;
  sideImg: string;
  badge: string;
}

const projectData: Project[] = [
  {
    title: "Rivea Hanoi",
    desc: "Tọa lạc tại Phường Vĩnh Hưng, quận Hoàng Mai, Hà Nội. Dự án sở hữu quy mô 29.853 m2 với pháp lý hợp đồng mua bán hoàn thiện cùng mức giá vô cùng hấp dẫn từ 3-8 Tỷ.",
    mainImg: "https://xemnha.vn/uploads/upload-images/images/phoi-canh-rivea-hanoi.jpg",
    sideImg: "https://xemnha.vn/uploads/upload-images/images/phoi-canh-rivea-hanoi.jpg",
    badge: "SẮP MỞ BÁN",
  },
  {
    title: "Vinhomes Nguyễn Trãi (Cao Xà Lá)",
    desc: "Tọa lạc tại địa chỉ đắc địa 233 – 233B – 235 Nguyễn Trãi, quận Thanh Xuân, Hà Nội. Dự án có quy mô 109.98 m2, pháp lý sổ đỏ lâu dài.",
    mainImg: "https://xemnha.vn/uploads/upload-images/images/Vinhomes-Cao-Xa-La.jpg",
    sideImg: "https://xemnha.vn/uploads/upload-images/images/phoi-canh-masteri-cao-xa-la-3.png",
    badge: "ĐANG XÂY DỰNG",
  },
  {
    title: "Imperia Signature",
    desc: "Tọa lạc tại Đông Hội, Đông Anh, Hà Nội. Tổ hợp căn hộ cao cấp quy mô 4.65 ha, pháp lý hợp đồng mua bán vững chắc, giá từ 2-7 Tỷ.",
    mainImg: "https://xemnha.vn/uploads/images/view-imperia-signature.jpg",
    sideImg: "https://xemnha.vn/uploads/images/view-imperia-signature.jpg",
    badge: "SẮP MỞ BÁN",
  },
  {
    title: "SAM Towers",
    desc: "Tọa lạc tại Lô A2-1 Như Nguyệt, Phường Thuận Phước, Quận Hải Châu, Đà Nẵng. Căn hộ cao cấp ven sông Hàn quy mô 4.9 m2, giá từ 80-100 Triệu/m2.",
    mainImg: "https://xemnha.vn/images/logo-vinhomes.jpg",
    sideImg: "https://xemnha.vn/uploads/images/toan-canh-du-an-sam-towers-da-nang.jpg",
    badge: "ĐANG MỞ BÁN",
  },
];

export function FeaturedProjects() {
  const [current, setCurrent] = useState(0);
  const project = projectData[current];



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
              Tuyển tập những dự án bất động sản được định nghĩa là di sản kiến trúc ngay từ khi khởi công.
            </p>
          </div>
        </div>

        {/* Project Content */}
        <div className="grid grid-cols-12 gap-y-12 md:gap-y-20 relative">
          <button
            onClick={() => setCurrent((c) => (c - 1 + projectData.length) % projectData.length)}
            className="absolute -left-[120px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 border border-earth-brown flex items-center justify-center text-earth-brown hover:bg-earth-brown hover:text-white transition-all z-10"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % projectData.length)}
            className="absolute -right-[120px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 border border-earth-brown flex items-center justify-center text-earth-brown hover:bg-earth-brown hover:text-white transition-all z-10"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <div className="col-span-12 lg:col-span-7 group relative pb-28">
            <div className="overflow-hidden aspect-[16/9] md:aspect-[2/1] border border-outline-variant/20 p-2 bg-surface-container-lowest shadow-2xl">
              <img
                src={project.mainImg}
                alt={project.title}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-[3000ms] group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 right-0 md:-right-12 bg-white p-6 md:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] max-w-lg border-t-4 border-earth-brown">
              <span
                className="font-label-caps text-antique-gold mb-2 block uppercase tracking-widest font-bold"
                style={{ fontSize: "9px" }}
              >
                {project.badge}
              </span>
              <h3
                className="font-display-lg text-earth-brown mb-2"
                style={{ fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 700 }}
              >
                {project.title}
              </h3>
              <p className="font-body-md text-on-surface mb-3 leading-relaxed" style={{ fontSize: "14px" }}>
                {project.desc}
              </p>
              <button className="font-label-caps text-earth-brown font-bold tracking-[0.2em] hover:text-antique-gold transition-colors flex items-center gap-3"
                      style={{ fontSize: "10px" }}>
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
                "Kiến tạo không gian cho những giá trị truyền đời qua nhiều thế hệ."
              </h4>
              <p
                className="font-body-md text-on-surface mb-2 leading-relaxed"
                style={{ fontSize: "14px", lineHeight: "22px" }}
              >
                Mỗi dự án tại Modern Estate đều trải qua quá trình thẩm định nghiêm ngặt về vị trí phong thủy, ngôn ngữ kiến trúc và tiềm năng tăng trưởng bền vững.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[{ n: "15+", l: "Năm Kinh Nghiệm" }, { n: "200+", l: "Biệt Thự Độc Bản" }].map(({ n, l }) => (
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
            <div className="relative overflow-hidden aspect-[4/3] border border-outline-variant/20 p-2 bg-surface-container-lowest shadow-lg">
              <img
                src={project.sideImg}
                alt=""
                className="w-full h-full object-cover hover:sepia-0 transition-all duration-1000"
                style={{ filter: "sepia(0.2)" }}
              />
              <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
