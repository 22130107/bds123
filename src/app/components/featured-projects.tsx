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
    title: "The Heritage Riverside",
    desc: "Một kiệt tác kiến trúc soi bóng bên dòng sông Sài Gòn, nơi giá trị sống được nâng tầm thành nghệ thuật thưởng thức không gian.",
    mainImg:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJKVk9b_mGn3IS4ZdOtyvcQ7ohqIFrSRSpC7tRHok9gXdePdic63V-9Qb2Lh6esfCIlJCkll0rKPQwgFOc_JIPrhI12wRazxrfrRdo1d1fymff6Nx9Z8nBiYuUfI7staayZZUoOWdCwF8tBz8LBdAsVoS3Kg9g-gRZU8c4flh2T0PSEHhCaqiu1g9YTsZj-jtOUwPlhlX-UhkvOexeRKIXrmqKWwpcQ3t_h5y3BimcYBDtF46xTyt3sNDUISIxcmRoeD0o4l6Is68",
    sideImg:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPBhCvaeTPMz0V1CYHkm6VbzD2GFzUvKzWF3cnOdbrpzPNma9ru24kjnfLYoHQkyosdfOOlaAfdz1Lt87-52QLIzVGZtg-yptcvbDbZj9an65sRLNAPbIXXofDtCKk0WNWkd5pKIj7dbJNiRCdzt9cufB9xZEYPm1Ja1DMCGHdP701n7M4W-eT2vtLmK3LMD-96cj_x1zQOu1bimmUAdY5uQuKtKbUAey88cVLEC6Kts1SYuFiRceJpBjQFwvRS2JuFDOX2r-gZt8",
    badge: "FLAGSHIP COLLECTION 2024",
  },
  {
    title: "Celestial Heights",
    desc: "Đỉnh cao kiến trúc đương đại tại trung tâm Hà Nội, nơi mọi tầm nhìn đều là một bức tranh đô thị hoàn hảo.",
    mainImg:
      "https://lh3.googleusercontent.com/aida/AP1WRLtqpm4t670frH1qKKddz_GBjIlmBs8SDTkpHaEU9sD7b6NWtxuiiB0_9jPr24FnAVjeKkjBzE37C7KIPE6tZ5V433ydOGEXjiv2oJiVoOb_7PPPmlsjbqhSP4PQTzl0bHuV1KOpXPb_zaA8iFQ7XeleUurbz3QG3coqt1NfODsrY_b2lWJNPZ30HY4J9lJrj9AraQgg4vH5h9XiTfrupAXDijr2okIeCY_unTwT9Ed_bA_SHwgv9W9XNQ",
    sideImg:
      "https://lh3.googleusercontent.com/aida/AP1WRLtTb0a2ujl4C9BnqodXfnYn7zRbKbaG-Bq6gvCgFoW-lMU-w5rorl0CwDPv9TqANOu9XIu7sES7Q3t-6V0fVnYE1mJuzXJh3upDLRO7dKrwbISaJZdymCr4U-Bu--wVGhU6j3A_PYgMDVr_IXYEhpFj7tO_wpBD6KknkYsUpY36IrtZH9b1ibFD4nuAgZ970fPBdxrMrGozrr5v3VsuKB3InVNd_UdS2g8VTmhiPKhqJIs-NEcUJvE00pY",
    badge: "PREMIER EDITION 2024",
  },
];

export function FeaturedProjects() {
  const [current, setCurrent] = useState(0);
  const project = projectData[current];

  return (
    <section className="py-40 overflow-hidden relative bg-surface-container-low border-b border-outline-variant/30">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-antique-gold/30 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-[100px]">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span
              className="font-label-caps block mb-6 uppercase text-earth-brown font-bold"
              style={{ fontSize: "10px", letterSpacing: "0.5em" }}
            >
              BIỂU TƯỢNG MỚI
            </span>
            <div className="relative p-12 border-2 border-antique-gold/20">
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
                style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700 }}
              >
                Kinh Đô Của Những <br />
                <span className="italic font-normal">Công Trình Di Sản</span>
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-end gap-6">
            <p
              className="font-body-lg text-on-surface font-medium max-w-sm border-r-2 border-antique-gold pr-8 pb-2 text-right"
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
          <div className="col-span-12 lg:col-span-7 group relative pb-36">
            <div className="overflow-hidden aspect-[16/9] md:aspect-[2/1] border border-outline-variant/20 p-2 bg-surface-container-lowest shadow-2xl">
              <img
                src={project.mainImg}
                alt={project.title}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-[3000ms] group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 right-0 md:-right-12 bg-white p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] max-w-lg border-t-4 border-earth-brown">
              <span
                className="font-label-caps text-antique-gold mb-4 block uppercase tracking-widest font-bold"
                style={{ fontSize: "9px" }}
              >
                {project.badge}
              </span>
              <h3
                className="font-display-lg text-earth-brown mb-4"
                style={{ fontSize: "clamp(22px, 2vw, 30px)", fontWeight: 700 }}
              >
                {project.title}
              </h3>
              <p className="font-body-md text-on-surface mb-4 leading-relaxed" style={{ fontSize: "14px" }}>
                {project.desc}
              </p>
              <button className="font-label-caps text-earth-brown font-bold tracking-[0.2em] hover:text-antique-gold transition-colors flex items-center gap-3"
                      style={{ fontSize: "10px" }}>
                KHÁM PHÁ CHI TIẾT <span className="w-8 h-[2px] bg-antique-gold" />
              </button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col justify-center">
            <div className="relative pl-8 py-3 mb-6">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-antique-gold" />
              <h4
                className="font-display-lg text-earth-brown mb-2 leading-snug italic"
                style={{ fontSize: "clamp(16px, 1.5vw, 22px)", fontWeight: 700 }}
              >
                "Kiến tạo không gian cho những giá trị truyền đời qua nhiều thế hệ."
              </h4>
              <p
                className="font-body-md text-on-surface mb-3 leading-relaxed"
                style={{ fontSize: "14px", lineHeight: "22px" }}
              >
                Mỗi dự án tại Modern Estate đều trải qua quá trình thẩm định nghiêm ngặt về vị trí phong thủy, ngôn ngữ kiến trúc và tiềm năng tăng trưởng bền vững.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[{ n: "15+", l: "Năm Kinh Nghiệm" }, { n: "200+", l: "Biệt Thự Độc Bản" }].map(({ n, l }) => (
                  <div key={l}>
                    <span
                      className="font-display-lg text-earth-brown font-bold block mb-1"
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
            <div className="relative overflow-hidden aspect-square border border-outline-variant/20 p-2 bg-surface-container-lowest shadow-lg">
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
