import { useState } from "react";
import { HomePage } from "./components/pages/home-page";
import { ListingPage } from "./components/pages/listing-page";
import { DetailPage } from "./components/pages/detail-page";

type Page = "home" | "listing" | "detail";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const navigate = (page: string) => {
    if (page === "home" || page === "listing" || page === "detail") {
      setCurrentPage(page as Page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Page switcher (demo only) */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex gap-2 bg-white/95 backdrop-blur-md px-4 py-2 shadow-xl border border-outline-variant/30"
        style={{ borderRadius: "999px" }}
      >
        {(["home", "listing", "detail"] as Page[]).map((p) => (
          <button
            key={p}
            onClick={() => navigate(p)}
            className={`px-4 py-1.5 transition-all font-label-caps ${
              currentPage === p
                ? "bg-earth-brown text-white"
                : "text-on-surface-variant hover:text-antique-gold"
            }`}
            style={{ fontSize: "10px", letterSpacing: "0.1em", fontWeight: 700, borderRadius: "999px" }}
          >
            {p === "home" ? "Trang chủ" : p === "listing" ? "Danh sách" : "Chi tiết"}
          </button>
        ))}
      </div>

      {currentPage === "home" && <HomePage onNavigate={navigate} />}
      {currentPage === "listing" && <ListingPage onNavigate={navigate} />}
      {currentPage === "detail" && <DetailPage onNavigate={navigate} />}
    </>
  );
}
