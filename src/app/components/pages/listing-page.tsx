import { useState } from "react";
import { TopNavBar } from "../top-nav-bar";
import { SearchBar } from "../search-bar";
import { PropertyCard } from "../property-card";
import { Pagination } from "../pagination";
import { LocationWidget, FeaturedProjectsWidget } from "../sidebar-widgets";
import { Footer } from "../footer";

interface ListingPageProps {
  onNavigate: (page: string) => void;
}

const properties = [
  {
    id: "1",
    title: "Dinh Thự Ven Hồ Thiên Nga",
    description:
      "Kiến trúc tân cổ điển sang trọng tọa lạc tại vị trí đắc địa nhất khu vực Tây Hồ, tầm nhìn trực diện mặt nước mênh mông.",
    area: "1,200 m²",
    location: "Tây Hồ, Hà Nội",
    updated: "Cập nhật: 12/06/2024",
    price: "85.000.000.000 ₫",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLszCYP06KJQ2cWAiBZGit9KmYSU_JRMoQ2TPB686Hpw1ADOk5LCIkefRv5nxTyc62ii5h2sDD2Zt_v5I0sfVV17N7Y6SoJ3bbF6cqxSDgHoWDtMVZZf17psmxPzhUG9-3rRB5GbZ7_ITK55qzfpVYqNobEmEqsSSH6JRLWMwjisQOH89LNm801lELWQcARm3rTqgxb52KE7j-HDGIfZCp4PXb7tBoxGa3Iwoj_NUiha93CSGQCOF8pUvGA",
    badge: "EXCLUSIVE",
    badgeColor: "gold" as const,
  },
  {
    id: "2",
    title: "Penthouse Sky Diamond",
    description:
      "Sống đỉnh cao tại trung tâm Thủ Thiêm với hồ bơi riêng và tầm nhìn Panorama toàn cảnh thành phố rực rỡ.",
    area: "450 m²",
    location: "Thủ Thiêm, TP.HCM",
    updated: "Cập nhật: 10/06/2024",
    price: "120.000.000.000 ₫",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLs_kCjmCjvUEvEUlXO2XVitCo872PLfrDe_CzRHC17iV3fzOZpIzjtnh8Q5PfOqAKw01SAxRYBiQgGt_2FA5cq8Z3WlP_0aGM2Q8aec40fYSNp5U09z2ciQDg1Pim5BYNCYGxeIdhXTJqF3WfFc4iCyBB1Vv-xEIK-1X2i_F8axMGO5V2WVpGQwrQ4gzOS8uEa-okBerHPPi5DXaqtQY8hZ2JFNSIU9yb4tjKNKRVL3HDPgfZpt-zAT7Q",
    badge: "NEW LISTING",
    badgeColor: "dark" as const,
  },
  {
    id: "3",
    title: "Biệt Thự Vách Đá Vịnh Ngọc",
    description:
      "Kiến tác phẩm nghệ thuật bên bờ biển Sơn Trà, nơi thiên nhiên và kiến trúc hòa quyện trong từng đường nét.",
    area: "800 m²",
    location: "Sơn Trà, Đà Nẵng",
    updated: "Cập nhật: 08/06/2024",
    price: "45.000.000.000 ₫",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLuzTMpy2M03kBVjvCJzlz-lDAeIHpv8pmLH87WKn_A26OJuDxNmafWkJ4kNWsM5qw6HxDIiWJdnaQ6Ksdr-9k13ft2ihPILJxUeUyGEhQr5ZMi_u_9ovgeSCvsG9DlbaMd2OeDaYKAq_TPiyBg7oGMsLY3cs9qpIlrrr1-w8sV4bcjVAb-WhVVjzpUxajzeOifNFrBkVYlaQNAnIj6ZGAgqBf34oyX8G57u0nUFJcwHIC3xzmMWvQsX14Y",
  },
];

export function ListingPage({ onNavigate }: ListingPageProps) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-surface text-on-surface font-body-md" style={{ overflowX: "hidden" }}>
      <TopNavBar activePage="listing" onNavigate={onNavigate} />

      {/* Hero Banner */}
      <section className="relative w-full h-[400px] overflow-hidden pt-20">
        <img
          src="https://lh3.googleusercontent.com/aida/AP1WRLszCYP06KJQ2cWAiBZGit9KmYSU_JRMoQ2TPB686Hpw1ADOk5LCIkefRv5nxTyc62ii5h2sDD2Zt_v5I0sfVV17N7Y6SoJ3bbF6cqxSDgHoWDtMVZZf17psmxPzhUG9-3rRB5GbZ7_ITK55qzfpVYqNobEmEqsSSH6JRLWMwjisQOH89LNm801lELWQcARm3rTqgxb52KE7j-HDGIfZCp4PXb7tBoxGa3Iwoj_NUiha93CSGQCOF8pUvGA"
          alt="Hero Banner"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.5)" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1
            className="font-display-lg text-white mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700 }}
          >
            Mua bán bất động sản hạng sang
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
                <span className="text-primary font-semibold">{properties.length}</span> bất động sản
              </span>
            </div>
            <div className="space-y-8">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  {...property}
                  onViewDetail={() => onNavigate("detail")}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={5}
              onPageChange={setCurrentPage}
            />
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
  );
}
