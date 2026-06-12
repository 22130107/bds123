interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  keyword: string;
  location: string;
  type: string;
  price: string;
  area: string;
}

import { useState } from "react";

export function SearchBar({ onSearch }: SearchBarProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: "",
    location: "",
    type: "",
    price: "",
    area: "",
  });

  const handleChange = (field: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-[80px] -mt-10 relative z-10">
      <div
        className="p-8 shadow-xl border-b-2 border-antique-gold grid grid-cols-1 md:grid-cols-5 gap-6 items-end"
        style={{ backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", border: "1px solid #e4e2dd", borderBottomColor: "#D4AF37", borderBottomWidth: 2 }}
      >
        {[
          { label: "Tìm kiếm từ khóa", field: "keyword" as const, placeholder: "Nhập từ khóa...", type: "text", icon: "search" },
        ].map(({ label, field, placeholder, type, icon }) => (
          <div key={field} className="space-y-2">
            <label
              className="font-label-caps text-on-surface-variant uppercase"
              style={{ fontSize: "10px", fontWeight: 600 }}
            >
              {label}
            </label>
            <div className="relative">
              <input
                type={type}
                placeholder={placeholder}
                value={filters[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full bg-transparent border-b border-outline py-2 font-body-md focus:ring-0 focus:border-antique-gold outline-none"
                style={{ fontSize: "16px" }}
              />
              <span className="material-symbols-outlined absolute right-0 top-2 text-outline-variant">{icon}</span>
            </div>
          </div>
        ))}

        {[
          {
            label: "Khu vực",
            field: "location" as const,
            options: ["Tất cả địa điểm", "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng"],
          },
          {
            label: "Loại hình",
            field: "type" as const,
            options: ["Tất cả loại hình", "Dinh thự Heritage", "Penthouse Ánh Sáng", "Biệt thự Ven Biển"],
          },
          {
            label: "Mức giá",
            field: "price" as const,
            options: ["Tất cả mức giá", "Trên 20 Tỷ VNĐ", "50 - 100 Tỷ VNĐ", "Trên 100 Tỷ VNĐ"],
          },
          {
            label: "Diện tích",
            field: "area" as const,
            options: ["Tất cả diện tích", "Dưới 200 m²", "200 - 500 m²", "Trên 500 m²"],
          },
        ].map(({ label, field, options }) => (
          <div key={field} className="space-y-2">
            <label
              className="font-label-caps text-on-surface-variant uppercase"
              style={{ fontSize: "10px", fontWeight: 600 }}
            >
              {label}
            </label>
            <div className="relative">
              <select
                value={filters[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full bg-transparent border-b border-outline py-2 font-body-md focus:ring-0 focus:border-antique-gold appearance-none cursor-pointer outline-none"
                style={{ fontSize: "16px" }}
              >
                {options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-0 top-2 pointer-events-none text-on-surface-variant">
                expand_more
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
