import { useState } from "react";

interface Property {
  id?: string | number;
  title: string;
  location: string;
  price: string;
  specs: [number, number, number];
  img: string;
  badge: string;
}

const tailoredData: Property[] = [
  {
    id: 3,
    title: "CHÍNH CHỦ BÁN CĂN NHÀ VƯỜN 120m2 KĐT GELEXIMCO LÊ TRỌNG TẤN GIÁ SIÊU RẺ",
    location: "Dương Nội, Hà Đông, Hà Nội",
    price: "20.5 Tỷ VNĐ",
    specs: [4, 4, 120],
    img: "https://xemnha.vn/uploads/84973/z3257661140093_88cacecf99f416335cd04f3f7642d5a1.jpg",
    badge: "CHÍNH CHỦ",
  },
  {
    id: 4,
    title: "Bán Nhà Vườn 160m2 Mặt Tiền 8m Khu D Geleximco Giá Rẻ Chỉ 21 Tỷ",
    location: "Dương Nội, Hà Đông, Hà Nội",
    price: "21 Tỷ VNĐ",
    specs: [5, 5, 169],
    img: "https://xemnha.vn/uploads/80534/IMG_7143.jpg",
    badge: "GIÁ RẺ",
  },
  {
    id: 5,
    title: "Cơ Hội Cuối Cùng - Sở Hữu Nhà Khu A Giáp VIN, Mặt Tiền 6m, Chỉ 18,5 Tỷ",
    location: "Dương Nội, Hà Đông, Hà Nội",
    price: "18.5 Tỷ VNĐ",
    specs: [4, 4, 104],
    img: "https://xemnha.vn/uploads/80507/z5773852568206_1c9b21a047a7996bfdd3911bbdfe1c78.jpg",
    badge: "GIÁ TỐT",
  },
  {
    id: 6,
    title: "Cần Bán Nhanh Căn 60m2 Khu B Geleximco – Nhỏ Gọn Đầy Đủ Tiện Ích",
    location: "Dương Nội, Hà Đông, Hà Nội",
    price: "12.5 Tỷ VNĐ",
    specs: [3, 3, 60],
    img: "https://xemnha.vn/uploads/80506/z5773873315887_6d05c81b0e0c1ce305f8ed9bdb78dc54.jpg",
    badge: "BÁN GẤP",
  },
  {
    id: 7,
    title: "Bán Nhà Đặng Tiến Đông Q Đống Đa 90m X Mt 6m Gần Phố Giá Nhỉnh 14 Tỷ",
    location: "Ô Chợ Dừa, Đống Đa, Hà Nội",
    price: "14.9 Tỷ VNĐ",
    specs: [4, 4, 90],
    img: "https://xemnha.vn/uploads/80502/441544656_7577382482339661_5736771931293366545_n.jpg",
    badge: "GẦN PHỐ",
  },
  {
    id: 8,
    title: "Cần Bán Nhanh Lô Biệt Thự View Hồ B2.1 BT4 Giá Đầu Tư Tại KDT Thanh Hà Cienco 5",
    location: "Kiến Hưng, Hà Đông, Hà Nội",
    price: "Thỏa thuận",
    specs: [5, 5, 300],
    img: "https://xemnha.vn/uploads/80488/Ban-do-tong-the-Thanh-Ha-1-822x1024.jpg",
    badge: "VIEW HỒ",
  },
  {
    id: 9,
    title: "BÁN LIỀK KỀ 75M2 KHU B GELEXIMCO - MẶT TRƯỜNG HỌC, GIÁP VINHOMES, GIÁ HẤP DẪN ĐẦU TƯ",
    location: "Dương Nội, Hà Đông, Hà Nội",
    price: "9.69 Tỷ VNĐ",
    specs: [4, 4, 75],
    img: "https://xemnha.vn/uploads/80195/ban-lien-ke-mat-truong-hoc-khu-b-geleximco.jpg",
    badge: "ĐẦU TƯ",
  },
  {
    id: 10,
    title: "BÁN CĂN LIỀN KỀ HƠN 480M2 SÀN KHU A GELEXIMCO GIÁP VINHOMES SMART CITY GIÁ NHỈNH 15 TỶ",
    location: "Dương Nội, Hà Đông, Hà Nội",
    price: "15 Tỷ VNĐ",
    specs: [5, 5, 120],
    img: "https://xemnha.vn/uploads/80188/DJI_0901.JPG",
    badge: "GIÁ TỐT",
  },
];

interface TailoredSectionProps {
  onViewDetail?: (id: string | number) => void;
  projects?: any[];
}

export function TailoredSection({ onViewDetail, projects = [] }: TailoredSectionProps) {
  const data = projects.length > 0 ? projects.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    location: p.location,
    price: p.price,
    specs: [p.bedrooms || 0, p.bathrooms || 0, p.area || 0] as [number, number, number],
    img: p.mainImg || "",
    badge: p.badge || ""
  })) : tailoredData;

  const [current, setCurrent] = useState(0);
  const property = data[current] || tailoredData[0];

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      setCurrent((c) => (c + 1) % data.length);
    } else if (isRightSwipe) {
      setCurrent((c) => (c - 1 + data.length) % data.length);
    }
  };



  return (
    <section className="bg-surface py-20 md:py-36 overflow-hidden border-y border-outline-variant/20">
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
          <div className="relative px-16 py-12 border-x-2 border-antique-gold/30 inline-block mx-auto">
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
        <div 
          className="relative group/nav"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button
            onClick={() => setCurrent((c) => (c - 1 + data.length) % data.length)}
            className="hidden md:flex absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-outline-variant/30 items-center justify-center text-earth-brown hover:bg-[#A04000] hover:text-white transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % data.length)}
            className="hidden md:flex absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-outline-variant/30 items-center justify-center text-earth-brown hover:bg-[#A04000] hover:text-white transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-24 group p-4 sm:p-8 lg:p-12" style={{ backgroundColor: "#F5EDD9" }}>
            {/* Image */}
            <div className="w-full lg:w-3/5 relative overflow-hidden aspect-[16/10]">
              <div className="relative w-full h-full overflow-hidden">
                {data.map((p, idx) => (
                  <img
                    key={idx}
                    src={p.img}
                    alt={p.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-in-out group-hover:scale-110 ${
                      idx === current
                        ? "translate-x-0 opacity-100 z-10"
                        : idx < current
                        ? "-translate-x-full opacity-0 z-0"
                        : "translate-x-full opacity-0 z-0"
                    }`}
                  />
                ))}
              </div>
              <div className="absolute top-10 left-10 z-20">
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
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-2" style={{ backgroundColor: "#A04000" }}>
                <span className="material-symbols-outlined text-antique-gold" style={{ fontSize: "18px" }}>location_on</span>
                <span
                  className="font-label-caps tracking-wide font-bold text-white"
                  style={{ fontSize: "11px" }}
                >
                  {property.location}
                </span>
              </div>
              <h3
                className="font-display-lg text-earth-brown mb-6 md:mb-10 leading-tight line-clamp-2"
                style={{ fontSize: "clamp(20px, 2.5vw, 36px)", fontWeight: 700 }}
                title={property.title}
              >
                {property.title}
              </h3>
              <div className="flex flex-col gap-4 md:gap-6 border-l-2 pl-4 md:pl-10 border-antique-gold mb-8 md:mb-12 p-4 md:p-6">
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
                <div className="border-t border-outline-variant/30" />
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
                onClick={() => onViewDetail?.((property as any).slug || property.id || 3)}
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
          {data.map((_, i) => (
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
