"use client";

import { useState } from "react";
import { TopNavBar } from "../top-nav-bar";
import { Footer } from "../footer";
import { Pagination } from "../pagination";
import logoFallback from "../../assets/logo_icon.png";

interface NewsPageProps {
  onNavigate: (page: string) => void;
  dbNews?: any[];
}

export function NewsPage({ onNavigate, dbNews = [] }: NewsPageProps) {
  const articles = dbNews.map(n => ({
    id: n.id,
    slug: n.slug,
    title: n.title,
    date: n.date || "",
    category: n.category || "TIN TỨC",
    excerpt: n.excerpt,
    image: n.img || logoFallback.src,
  }));

  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const removeAccents = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  };

  const filteredArticles = articles.filter(article => {
    if (!searchQuery.trim()) return true;
    const normalizedSearch = removeAccents(searchQuery.trim());
    const searchTerms = normalizedSearch.split(/\s+/);
    
    const normalizedTitle = removeAccents(article.title);
    const normalizedExcerpt = article.excerpt ? removeAccents(article.excerpt) : "";
    const combinedText = `${normalizedTitle} ${normalizedExcerpt}`;

    return searchTerms.every(term => combinedText.includes(term));
  });

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE));
  const paginatedArticles = filteredArticles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col" style={{ overflowX: "hidden" }}>
      <TopNavBar activePage="news" onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="relative w-full h-[600px] overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src="/uploads/3.jpg"
            alt="News Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1
            className="font-display-lg text-white mb-4 uppercase tracking-wider"
            style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, textShadow: "rgba(0,0,0,0.95) 2px 2px 0px, rgba(0,0,0,0.8) 0px 6px 30px" }}
          >
            Tin Tức & Sự Kiện
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-5 md:px-[80px] py-16">
        
        {/* Search Module */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="font-headline-md text-primary" style={{ fontSize: "24px", fontWeight: 600 }}>
            Tất cả bài viết
          </h2>
          <div className="relative w-full md:w-[400px]">
            <input 
              type="text" 
              placeholder="Tìm kiếm tin tức..." 
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3.5 border border-outline-variant/40 rounded-full focus:outline-none focus:border-antique-gold focus:ring-1 focus:ring-antique-gold transition-all text-[15px] bg-white shadow-sm"
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/70" style={{ fontSize: "22px" }}>
              search
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-on-surface-variant font-medium text-lg border-2 border-dashed border-outline-variant/30 rounded-xl">
              {searchQuery ? "Không tìm thấy bài viết nào phù hợp với từ khóa." : "Chưa có bài viết nào được đăng tải."}
            </div>
          )}
          {paginatedArticles.map((article) => (
            <article 
              key={article.id} 
              onClick={() => onNavigate(`news/${article.slug || article.id}`)}
              className="bg-white border border-outline-variant/20 overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div 
                  className="absolute top-4 left-4 text-white font-label-caps px-3 py-1 tracking-widest"
                  style={{ fontSize: "10px", fontWeight: 700, backgroundColor: "#D4AF37" }}
                >
                  {article.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-on-surface-variant mb-3">
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>calendar_today</span>
                  <span style={{ fontSize: "13px", fontWeight: 500 }}>{article.date}</span>
                </div>
                
                <h3 
                  className="font-headline-md text-primary group-hover:text-antique-gold transition-colors mb-3 line-clamp-2"
                  style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 600 }}
                >
                  {article.title}
                </h3>
                
                <p className="text-on-surface-variant text-[15px] line-clamp-3 mb-6 flex-1">
                  {article.excerpt}
                </p>

                <div className="pt-4 border-t border-outline-variant/30 mt-auto">
                  <span 
                    className="font-label-caps text-antique-gold group-hover:text-primary transition-colors flex items-center gap-1"
                    style={{ fontSize: "11px", letterSpacing: "0.15em", fontWeight: 700 }}
                  >
                    ĐỌC TIẾP 
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
