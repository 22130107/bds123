import { useState } from "react";
import { SectionHeading } from "./section-heading";

interface ShowcaseItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  img: string;
  // Specific grid placement classes for medium screens and above
  gridClass: string;
}

interface Collection {
  id: string;
  name: string;
  tagline: string;
  items: ShowcaseItem[];
}

const collectionsData: Collection[] = [
  {
    id: "heritage",
    name: "HERITAGE COLLECTION",
    tagline: "Đẳng cấp kiến trúc cổ điển & Thượng lưu",
    items: [
      {
        id: "h-ext",
        category: "01 / NGOẠI THẤT",
        title: "Kiến trúc Ngoại thất",
        subtitle: "Đường nét hiện đại hòa quyện với ánh sáng hoàng hôn ấm áp.",
        img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        gridClass: "md:col-span-2 md:row-span-2",
      },
      {
        id: "h-kit",
        category: "02 / PHÒNG BẾP",
        title: "Không gian Bếp",
        subtitle: "Hệ tủ đen mờ lịch lãm cùng mặt đá bếp vân mây cao cấp.",
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        gridClass: "md:col-span-1 md:row-span-2",
      },
      {
        id: "h-liv",
        category: "03 / PHÒNG KHÁCH",
        title: "Phòng khách Thượng lưu",
        subtitle: "Tông màu vàng cát vương giả cùng nội thất da cao cấp.",
        img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
        gridClass: "md:col-span-1 md:row-span-1",
      },
      {
        id: "h-bath",
        category: "04 / PHÒNG TẮM",
        title: "Phòng tắm Thư giãn",
        subtitle: "Bồn tắm đặt sàn sang trọng trên nền sỏi cuội tự nhiên.",
        img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
        gridClass: "md:col-span-1 md:row-span-1",
      },
      {
        id: "h-pool",
        category: "05 / NGOÀI TRỜI",
        title: "Hồ bơi & Sân vườn",
        subtitle: "Làn nước xanh mát ôm trọn không gian thư thái tách biệt.",
        img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
        gridClass: "md:col-span-2 md:row-span-2",
      },
      {
        id: "h-bed",
        category: "06 / PHÒNG NGỦ",
        title: "Phòng ngủ Master",
        subtitle: "Vách ốp gỗ cao cấp cùng hệ thống ánh sáng dịu nhẹ ấm cúng.",
        img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
        gridClass: "md:col-span-2 md:row-span-2",
      },
    ],
  },
  {
    id: "minimalist",
    name: "MINIMALIST CONTEMPORARY",
    tagline: "Sự tinh giản mang hơi thở thời đại mới",
    items: [
      {
        id: "m-ext",
        category: "01 / NGOẠI THẤT",
        title: "Mặt tiền Đương đại",
        subtitle: "Các khối kính lớn tối giản kết nối trọn vẹn cảnh quan xanh.",
        img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        gridClass: "md:col-span-2 md:row-span-2",
      },
      {
        id: "m-kit",
        category: "02 / PHÒNG BẾP",
        title: "Nhà bếp Tối giản",
        subtitle: "Bếp phẳng không tay nắm, đề cao sự liền mạch của vật liệu.",
        img: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80",
        gridClass: "md:col-span-1 md:row-span-2",
      },
      {
        id: "m-liv",
        category: "03 / PHÒNG KHÁCH",
        title: "Không gian Nghệ thuật",
        subtitle: "Tường bê tông thô kết hợp tranh đương đại khổ lớn đầy cuốn hút.",
        img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        gridClass: "md:col-span-1 md:row-span-1",
      },
      {
        id: "m-bath",
        category: "04 / PHÒNG TẮM",
        title: "Phòng tắm Slate",
        subtitle: "Đá đen tự nhiên kết hợp với phụ kiện kim loại mờ tinh tế.",
        img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
        gridClass: "md:col-span-1 md:row-span-1",
      },
      {
        id: "m-pool",
        category: "05 / NGOÀI TRỜI",
        title: "Bể bơi Chân mây",
        subtitle: "Mặt nước phẳng lặng hòa vào đường chân trời biển cả mênh mông.",
        img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
        gridClass: "md:col-span-2 md:row-span-2",
      },
      {
        id: "m-bed",
        category: "06 / PHÒNG NGỦ",
        title: "Phòng ngủ Thiền (Zen)",
        subtitle: "Thiết kế giường trệt tối giản mang lại sự thanh tịnh tuyệt đối.",
        img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        gridClass: "md:col-span-2 md:row-span-2",
      },
    ],
  },
];

export function SpaceShowcase() {
  const [activeTab, setActiveTab] = useState("heritage");

  const currentCollection =
    collectionsData.find((c) => c.id === activeTab) || collectionsData[0];

  return (
    <section className="bg-surface py-24 md:py-36 border-b border-outline-variant/20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[100px]">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span
              className="font-label-caps text-antique-gold block mb-2 uppercase tracking-widest font-bold"
              style={{ fontSize: "11px", letterSpacing: "0.4em" }}
            >
              TRƯNG BÀY KHÔNG GIAN
            </span>
            <h2
              className="font-display-lg text-earth-brown font-bold leading-tight"
              style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
            >
              Nghệ Thuật Sắp Đặt <br />
              <span className="italic font-normal">Không Gian Sống</span>
            </h2>
            <p className="text-on-surface-variant font-body-md mt-4 max-w-xl">
              Khám phá sự phối hợp hài hòa giữa chất liệu, ánh sáng và bố cục 
              để định hình nên phong cách sống độc bản.
            </p>
          </div>

          {/* Luxury Tab Switcher */}
          <div className="flex bg-white p-1.5 border border-outline-variant/30 rounded-full shadow-sm">
            {collectionsData.map((col) => (
              <button
                key={col.id}
                onClick={() => setActiveTab(col.id)}
                className={`px-6 py-2.5 rounded-full font-label-caps text-[10px] tracking-widest font-bold transition-all ${
                  activeTab === col.id
                    ? "bg-earth-brown text-white shadow-md"
                    : "text-on-surface-variant hover:text-antique-gold"
                }`}
              >
                {col.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Showcase Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[220px] md:auto-rows-[250px] lg:auto-rows-[280px]">
          {currentCollection.items.map((item, idx) => (
            <div
              key={item.id}
              className={`relative overflow-hidden group cursor-pointer border border-outline-variant/20 shadow-sm ${item.gridClass}`}
            >
              {/* Image with smooth scale and brightness hover effect */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-110 group-hover:brightness-[0.95]"
              />

              {/* Classic Border Deco overlay */}
              <div className="absolute inset-0 border border-transparent group-hover:border-white/20 transition-colors duration-500 pointer-events-none z-10 m-3" />

              {/* Base Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Hover highlight overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-earth-brown/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Category tag on top right */}
              <div className="absolute top-4 right-4 z-20 overflow-hidden">
                <span
                  className="bg-earth-brown/85 backdrop-blur-md text-white px-3 py-1.5 font-label-caps tracking-widest font-bold inline-block transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300 border border-antique-gold/25"
                  style={{ fontSize: "8px" }}
                >
                  {item.category}
                </span>
              </div>

              {/* Text Information Content Card */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end text-white">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3
                    className="font-display-lg text-white font-bold leading-snug mb-1 group-hover:text-antique-gold transition-colors duration-300"
                    style={{ fontSize: "clamp(18px, 1.8vw, 24px)" }}
                  >
                    {item.title}
                  </h3>
                  
                  {/* Divider line that expands on hover */}
                  <div className="w-8 h-[2px] bg-antique-gold mb-3 group-hover:w-20 transition-all duration-500" />

                  {/* Subtitle description (fades in on hover) */}
                  <p className="text-white/70 text-xs font-body-md line-clamp-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                    {item.subtitle}
                  </p>
                </div>

                {/* Micro interactive button indicator (bottom right) */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 transform translate-x-2 group-hover:translate-x-0">
                  <span className="material-symbols-outlined text-antique-gold text-2xl">
                    arrow_outward
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
