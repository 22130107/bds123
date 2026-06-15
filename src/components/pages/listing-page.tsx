"use client";
import { useState } from "react";
import { TopNavBar } from "../top-nav-bar";
import { SearchBar } from "../search-bar";
import { PropertyCard } from "../property-card";
import { Pagination } from "../pagination";
import { LocationWidget, FeaturedProjectsWidget } from "../sidebar-widgets";
import { Footer } from "../footer";

import { useRouter } from "next/navigation";

export function ListingPage({ projects = [], currentCategory }: { projects?: any[], currentCategory?: string }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const handleNavigate = (page: string) => {
    if (page === "home") router.push("/");
    else router.push(`/${page}`);
  };

  const title = currentCategory || "Mua bán bất động sản hạng sang";

  // Map dữ liệu thật từ DB ra định dạng của PropertyCard
  const mappedProjects = projects.map(p => ({
    id: p.id.toString(),
    title: p.title,
    description: p.description,
    area: p.area ? `${p.area} m²` : "Đang cập nhật",
    location: p.location,
    updated: `Cập nhật: ${new Date(p.createdAt || new Date()).toLocaleDateString('vi-VN')}`,
    price: p.price,
    image: p.mainImg || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    badge: p.badge || (p.isFeatured ? "NỔI BẬT" : undefined),
    badgeColor: (p.isFeatured ? "gold" : "dark") as const
  }));

  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.max(1, Math.ceil(mappedProjects.length / ITEMS_PER_PAGE));
  const paginatedProjects = mappedProjects.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <>
      <div className="bg-surface text-on-surface font-body-md" style={{ overflowX: "hidden" }}>
      <TopNavBar activePage="listing" onNavigate={handleNavigate} />

      {/* Hero Banner */}
      <section className="relative w-full h-[400px] overflow-hidden pt-20">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600"
          alt="Hero Banner"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.5)" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1
            className="font-display-lg text-white mb-4 uppercase"
            style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700 }}
          >
            {title}
          </h1>
          <p className="font-body-lg text-white/90 max-w-2xl" style={{ fontSize: "18px", lineHeight: "30px" }}>
            Khám phá bộ sưu tập những không gian sống đẳng cấp nhất Việt Nam, nơi giá trị di sản trường tồn cùng thời gian.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <SearchBar />

      {/* Main Content */}
      <main
        className="max-w-[1280px] mx-auto px-5 md:px-[80px] py-16"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Listings */}
          <div className="lg:w-2/3 space-y-12">
            <div className="flex justify-between items-center border-b border-outline-variant pb-4 mb-8">
              <div className="heritage-frame">
                <span
                  className="font-label-caps text-antique-gold uppercase tracking-[0.2em]"
                  style={{ fontSize: "12px" }}
                >
                  Danh Sách Tin Rao
                </span>
              </div>
              <span className="font-body-md text-on-surface-variant italic" style={{ fontSize: "16px" }}>
                Tìm thấy{" "}
                <span className="text-primary font-semibold">{mappedProjects.length}</span> bất động sản
              </span>
            </div>
            <div className="space-y-8">
              {paginatedProjects.length === 0 && (
                <div className="text-center py-10 text-on-surface-variant">Không có bất động sản nào phù hợp.</div>
              )}
              {paginatedProjects.map((property) => (
                <PropertyCard
                  key={property.id}
                  {...property}
                  onViewDetail={() => handleNavigate(`detail/${property.id}`)}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>

          {/* Right: Sidebar */}
          <aside className="lg:w-1/3 space-y-8">
            <LocationWidget />
            <FeaturedProjectsWidget />
          </aside>
        </div>
      </main>

      <Footer variant="dark" />
    </div>
    </>
  );
}
