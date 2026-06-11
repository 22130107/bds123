import { useState } from "react";

interface Property {
  title: string;
  location: string;
  price: string;
  specs: [number, number, number];
  img: string;
  badge: string;
}

const tailoredData: Property[] = [
  {
    title: "Riverfront Serenity Villa",
    location: "THẢO ĐIỀN, QUẬN 2",
    price: "68.5 Tỷ VNĐ",
    specs: [5, 6, 450],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDV8bqOklZVh3A4h71h-90n_L6TeQtOg_WfT9iIp5ITHGjS0cg31f5dBgLClfT1iHsigU97mLsFHH4SuBT8LJFlHVHjzW7dAEGc59jbqJs7NOdPHaCr1MstQgjtGi7nwgV29T6VQpUmLOjTNYLhfgLwzpPDMVhOsN3iOn-vrjtDhP2sJYYfOOLYcb1qSGUFMyaDVgZuhIomF6HrOJ5Vwl5am_w0vS_nZZwt33jetyu98pCscWyqls99lmHOLEQPsNGCQ234zKTuG20",
    badge: "ĐỘC QUYỀN",
  },
  {
    title: "The Grand Penthouse Sky",
    location: "TÂY HỒ, HÀ NỘI",
    price: "120 Tỷ VNĐ",
    specs: [4, 5, 380],
    img: "https://lh3.googleusercontent.com/aida/AP1WRLtqpm4t670frH1qKKddz_GBjIlmBs8SDTkpHaEU9sD7b6NWtxuiiB0_9jPr24FnAVjeKkjBzE37C7KIPE6tZ5V433ydOGEXjiv2oJiVoOb_7PPPmlsjbqhSP4PQTzl0bHuV1KOpXPb_zaA8iFQ7XeleUurbz3QG3coqt1NfODsrY_b2lWJNPZ30HY4J9lJrj9AraQgg4vH5h9XiTfrupAXDijr2okIeCY_unTwT9Ed_bA_SHwgv9W9XNQ",
    badge: "DỰ KIẾN GIAO",
  },
  {
    title: "Imperial Coastal Estate",
    location: "SƠN TRÀ, ĐÀ NẴNG",
    price: "95 Tỷ VNĐ",
    specs: [6, 7, 620],
    img: "https://lh3.googleusercontent.com/aida/AP1WRLtTb0a2ujl4C9BnqodXfnYn7zRbKbaG-Bq6gvCgFoW-lMU-w5rorl0CwDPv9TqANOu9XIu7sES7Q3t-6V0fVnYE1mJuzXJh3upDLRO7dKrwbISaJZdymCr4U-Bu--wVGhU6j3A_PYgMDVr_IXYEhpFj7tO_wpBD6KknkYsUpY36IrtZH9b1ibFD4nuAgZ970fPBdxrMrGozrr5v3VsuKB3InVNd_UdS2g8VTmhiPKhqJIs-NEcUJvE00pY",
    badge: "SẮP RA MẮT",
  },
];

interface TailoredSectionProps {
  onViewDetail?: () => void;
}

export function TailoredSection({ onViewDetail }: TailoredSectionProps) {
  const [current, setCurrent] = useState(0);
  const property = tailoredData[current];



  return (
    <section className="bg-surface py-32 md:py-48 overflow-hidden border-y border-outline-variant/20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[100px]">
        {/* Header */}
        <div className="mb-24 flex flex-col items-center text-center">
          <div className="w-12 h-[1px] bg-antique-gold mb-8" />
          <span
            className="font-label-caps block mb-4 uppercase text-earth-brown font-bold"
            style={{ fontSize: "10px", letterSpacing: "0.6em" }}
          >
            DÀNH RIÊNG CHO BẠN
          </span>
          <div className="relative px-16 py-12 border-x-2 border-antique-gold/30 inline-block mx-auto bg-surface">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-antique-gold/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-antique-gold/40 to-transparent" />
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-antique-gold" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-antique-gold" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-antique-gold" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-antique-gold" />
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-surface px-4">
              <span className="material-symbols-outlined text-antique-gold text-3xl">flare</span>
            </div>
            <h2
              className="font-display-lg text-earth-brown italic relative z-10"
              style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700 }}
            >
              Đề Xuất Cá Nhân Hóa
            </h2>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-surface px-4">
              <span className="material-symbols-outlined text-antique-gold text-3xl">flare</span>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="relative group/nav">
          <button
            onClick={() => setCurrent((c) => (c - 1 + tailoredData.length) % tailoredData.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-outline-variant/30 flex items-center justify-center text-earth-brown hover:bg-earth-brown hover:text-white transition-all opacity-0 group-hover/nav:opacity-100 -translate-x-6 group-hover/nav:-translate-x-1/2"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % tailoredData.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-outline-variant/30 flex items-center justify-center text-earth-brown hover:bg-earth-brown hover:text-white transition-all opacity-0 group-hover/nav:opacity-100 translate-x-6 group-hover/nav:translate-x-1/2"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>

          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 group p-8 lg:p-12 border border-outline-variant/10 shadow-sm" style={{ backgroundColor: "#F5EDD9" }}>
            {/* Image */}
            <div className="w-full lg:w-3/5 relative overflow-hidden aspect-[16/10] shadow-xl">
              <img
                src={property.img}
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-[5000ms] group-hover:scale-110"
              />
              <div className="absolute top-10 left-10">
                <span
                  className="bg-earth-brown text-white px-8 py-3 font-label-caps uppercase tracking-[0.3em] font-bold"
                  style={{ fontSize: "10px" }}
                >
                  {property.badge}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="w-full lg:w-2/5 pr-0 lg:pr-12">
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-2" style={{ backgroundColor: "#C85A17" }}>
                <span className="material-symbols-outlined text-antique-gold" style={{ fontSize: "18px" }}>location_on</span>
                <span
                  className="font-label-caps uppercase tracking-[0.3em] font-bold text-white"
                  style={{ fontSize: "11px" }}
                >
                  {property.location}
                </span>
              </div>
              <h3
                className="font-display-lg text-earth-brown mb-10 leading-tight"
                style={{ fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 700 }}
              >
                {property.title}
              </h3>
              <div className="flex flex-col gap-10 border-l-2 pl-10 border-antique-gold mb-12 bg-white p-6">
                <div className="space-y-2">
                  <span
                    className="font-label-caps text-earth-brown font-bold uppercase tracking-widest block w-fit border-b-2 border-earth-brown pb-1"
                    style={{ fontSize: "9px" }}
                  >
                    GIÁ NIÊM YẾT
                  </span>
                  <span
                    className="font-display-lg text-earth-brown"
                    style={{ fontSize: "28px", fontWeight: 700 }}
                  >
                    {property.price}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  {[
                    { value: property.specs[0], label: "PHÒNG NGỦ" },
                    { value: property.specs[1], label: "PHÒNG TẮM" },
                    { value: property.specs[2], label: "M² DIỆN TÍCH" },
                  ].map(({ value, label }) => (
                    <div key={label} className="text-left">
                      <span
                        className="font-display-lg text-antique-gold block"
                        style={{ fontSize: "20px", fontWeight: 700 }}
                      >
                        {value}
                      </span>
                      <span
                        className="font-label-caps uppercase tracking-widest text-on-surface-variant font-bold"
                        style={{ fontSize: "9px" }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={onViewDetail}
                className="flex items-center gap-4 group/btn cursor-pointer"
              >
                <span
                  className="font-label-caps text-earth-brown font-bold tracking-widest border-b-2 border-earth-brown/20 pb-1 group-hover/btn:border-antique-gold transition-colors"
                  style={{ fontSize: "12px" }}
                >
                  KHÁM PHÁ CHI TIẾT
                </span>
                <span className="material-symbols-outlined text-antique-gold group-hover/btn:translate-x-2 transition-transform">
                  arrow_right_alt
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {tailoredData.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? "bg-antique-gold w-6" : "bg-outline-variant"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
