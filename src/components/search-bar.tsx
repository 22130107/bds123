"use client";

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

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getTopLocations } from "../actions/project-actions";

export function SearchBar({ onSearch }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showLocSuggestions, setShowLocSuggestions] = useState(false);

  const [filters, setFilters] = useState<SearchFilters>({
    keyword: searchParams.get("keyword") || "",
    location: searchParams.get("location") || "Tất cả địa điểm",
    type: searchParams.get("type") || "Tất cả loại hình",
    price: searchParams.get("price") || "Tất cả mức giá",
    area: searchParams.get("area") || "Tất cả diện tích",
  });

  const categories = ["MUA BÁN NHÀ ĐẤT", "CHO THUÊ NHÀ ĐẤT", "DỰ ÁN"];
  const [dbLocations, setDbLocations] = useState<string[]>(["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng"]);

  useEffect(() => {
    getTopLocations(20).then((data) => {
      const locNames = data.map((d: any) => d.name);
      const combined = Array.from(new Set(["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Đồng Nai", "Bình Dương", "Khánh Hòa", "Quảng Ninh", "Hải Phòng", ...locNames]));
      setDbLocations(combined);
    });
  }, []);

  const applyFilters = (newFilters: SearchFilters) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && !value.startsWith("Tất cả") && value !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`/listing?${params.toString()}`);
  };

  const handleChange = (field: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    if (field === "location") {
      setShowLocSuggestions(true);
    }
    if (field !== "keyword" && field !== "location") {
      applyFilters(newFilters);
    }
  };

  const handleSelectLocation = (loc: string) => {
    const newFilters = { ...filters, location: loc };
    setFilters(newFilters);
    setShowLocSuggestions(false);
    applyFilters(newFilters);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyFilters(filters);
      setShowLocSuggestions(false);
    }
  };

  const filteredLocations = dbLocations.filter(loc => 
    loc.toLowerCase().includes(filters.location === "Tất cả địa điểm" ? "" : filters.location.toLowerCase())
  );

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
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-b border-outline py-2 font-body-md focus:ring-0 focus:border-antique-gold outline-none"
                style={{ fontSize: "16px" }}
              />
              <span 
                className="material-symbols-outlined absolute right-0 top-2 text-outline-variant cursor-pointer hover:text-antique-gold transition-colors"
                onClick={() => applyFilters(filters)}
              >
                {icon}
              </span>
            </div>
          </div>
        ))}

        <div className="space-y-2 relative">
          <label
            className="font-label-caps text-on-surface-variant uppercase"
            style={{ fontSize: "10px", fontWeight: 600 }}
          >
            Khu vực
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Tất cả địa điểm"
              value={filters.location === "Tất cả địa điểm" ? "" : filters.location}
              onChange={(e) => handleChange("location", e.target.value)}
              onFocus={() => setShowLocSuggestions(true)}
              onBlur={() => setShowLocSuggestions(false)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-b border-outline py-2 font-body-md focus:ring-0 focus:border-antique-gold outline-none"
              style={{ fontSize: "16px" }}
            />
            <span 
              className="material-symbols-outlined absolute right-0 top-2 text-on-surface-variant cursor-pointer"
              onMouseDown={(e) => { e.preventDefault(); setShowLocSuggestions(!showLocSuggestions); }}
            >
              expand_more
            </span>

            {showLocSuggestions && (
              <ul className="absolute left-0 right-0 top-full mt-1 bg-white border border-outline rounded shadow-lg max-h-60 overflow-y-auto z-50">
                <li 
                  className="px-4 py-2 hover:bg-surface-variant cursor-pointer text-sm"
                  onMouseDown={() => handleSelectLocation("Tất cả địa điểm")}
                >
                  Tất cả địa điểm
                </li>
                {filteredLocations.map((loc) => (
                  <li 
                    key={loc}
                    className="px-4 py-2 hover:bg-surface-variant cursor-pointer text-sm"
                    onMouseDown={() => handleSelectLocation(loc)}
                  >
                    {loc}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {[
          {
            label: "Loại hình",
            field: "type" as const,
            options: ["Tất cả loại hình", ...categories],
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
