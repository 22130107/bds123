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
  const totalPages = Math.max(1, Math.ceil(articles.length / ITEMS_PER_PAGE));
  const paginatedArticles = articles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col" style={{ overflowX: "hidden" }}>
      <TopNavBar activePage="news" onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="relative w-full h-[350px] overflow-hidden pt-20">
        <div className="absolute inset-0 bg-earth-brown">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600"
            alt="News Banner"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1
            className="font-display-lg text-white mb-4 uppercase tracking-wider"
            style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700 }}
          >
            Tin Tức & Sự Kiện
          </h1>
          <p className="font-body-lg text-white/80 max-w-2xl" style={{ fontSize: "16px", lineHeight: "28px" }}>
            Cập nhật những thông tin thị trường mới nhất, phân tích chuyên sâu và các xu hướng bất động sản hạng sang dẫn đầu.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-5 md:px-[80px] py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-on-surface-variant font-medium text-lg border-2 border-dashed border-outline-variant/30 rounded-xl">
              Chưa có bài viết nào được đăng tải.
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
