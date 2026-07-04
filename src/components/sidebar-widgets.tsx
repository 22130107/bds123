"use client";

/* ─── Location Widget ─── */
import { useState, useEffect } from "react";
import { getTopLocations } from "../actions/project-actions";

interface LocationItem {
  name: string;
  count: number;
}

export function LocationWidget() {
  const [locationItems, setLocationItems] = useState<LocationItem[]>([]);

  useEffect(() => {
    getTopLocations().then(data => {
      const formatted = data.map(item => ({
        name: item.name.toLowerCase().includes("bất động sản") ? item.name : `Bất động sản ${item.name}`,
        count: item.count
      }));
      setLocationItems(formatted);
    });
  }, []);

  return (
    <div className="bg-white border border-outline-variant/20 p-6 border-t-4 border-t-antique-gold">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-antique-gold">location_on</span>
        <h4
          className="font-headline-md text-primary uppercase tracking-wide"
          style={{ fontSize: "18px", fontWeight: 600 }}
        >
          Địa Điểm Nổi Bật
        </h4>
      </div>
      <ul className="space-y-4">
        {locationItems.map((item) => (
          <li key={item.name} className="group flex justify-between items-center cursor-pointer">
            <span className="font-body-md text-on-surface-variant group-hover:text-antique-gold transition-colors"
                  style={{ fontSize: "16px" }}>
              {item.name}
            </span>
            <span
              className="bg-surface-container-high px-2 py-0.5 text-primary font-bold"
              style={{ fontSize: "11px" }}
            >
              {item.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Featured Projects Widget ─── */
import { getTopViewedProjects } from "../actions/project-actions";
import { useRouter } from "next/navigation";

export function FeaturedProjectsWidget() {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    getTopViewedProjects(3).then(data => {
      setFeaturedProjects(data);
    });
  }, []);

  return (
    <div className="bg-white border border-outline-variant/20 p-6 border-t-4 border-t-antique-gold">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-antique-gold">domain</span>
        <h4
          className="font-headline-md text-primary uppercase tracking-wide"
          style={{ fontSize: "18px", fontWeight: 600 }}
        >
          Dự Án Nổi Bật
        </h4>
      </div>
      <div className="space-y-6">
        {featuredProjects.map((project) => (
          <div key={project.id} className="flex gap-4 group cursor-pointer" onClick={() => router.push(`/detail/${project.slug || project.id}`)}>
            <div className="w-16 h-16 shrink-0 overflow-hidden">
              <img
                src={project.mainImg || "https://images.unsplash.com/photo-1613490908578-8120c16b5a32?w=400"}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <div>
              <h5
                className="font-label-caps text-primary group-hover:text-antique-gold transition-colors line-clamp-1"
                style={{ fontSize: "12px", letterSpacing: "0.05em", fontWeight: 700 }}
              >
                {project.title}
              </h5>
              <p className="text-on-surface-variant line-clamp-1 text-sm" style={{ fontSize: "13px" }}>
                {project.location}
              </p>
              <p className="font-semibold" style={{ fontSize: "12px", color: "#8B6914" }}>
                {project.price}
              </p>
              <p className="text-gray-400 mt-1" style={{ fontSize: "10px" }}>
                {project.views} lượt xem
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="w-full mt-8 py-2 border border-outline-variant font-label-caps hover:bg-primary hover:text-white transition-all uppercase tracking-widest"
        style={{ fontSize: "10px" }}
        onClick={() => router.push('/danh-muc')}
      >
        Xem tất cả dự án
      </button>
    </div>
  );
}
