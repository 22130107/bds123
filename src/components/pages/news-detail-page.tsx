"use client";

import { TopNavBar } from "../top-nav-bar";
import { Footer } from "../footer";

interface NewsDetailPageProps {
  onNavigate: (page: string) => void;
  article: any;
  latestNews: any[];
}

const convertYoutubeLinksToEmbeds = (html: string): string => {
  if (!html) return "";
  
  // Clean non-breaking spaces to allow normal word wrapping
  const cleanedHtml = html.replace(/&nbsp;/gi, " ").replace(/\u00a0/g, " ");
  
  // Regex to match <a> tags containing a youtube link
  const regex = /<a\s+[^>]*href=["'](https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  
  return cleanedHtml.replace(regex, (match, url, text) => {
    let videoId = "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const matchId = url.match(regExp);
    if (matchId && matchId[2].length === 11) {
      videoId = matchId[2];
    }
    
    if (videoId) {
      return `<iframe class="ql-video" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    }
    return match;
  });
};

export function NewsDetailPage({ onNavigate, article, latestNews = [] }: NewsDetailPageProps) {
  return (
    <div className="bg-[#f5f5f5] text-[#333] font-body-md min-h-screen flex flex-col" style={{ overflowX: "hidden" }}>
      <TopNavBar activePage="news" onNavigate={onNavigate} />

      {/* Breadcrumb */}
      <div className="max-w-[1200px] w-full mx-auto px-4 xl:px-0 pt-[104px] pb-4">
        <div className="text-[13px] text-earth-brown font-semibold flex items-center gap-2 uppercase tracking-wide">
          <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => onNavigate("home")}>Trang chủ</span>
          <span className="text-gray-400 font-normal">/</span>
          <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => onNavigate("news")}>Tin tức</span>
          <span className="text-gray-400 font-normal">/</span>
          <span>{article.category || "Tin tức chung"}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 xl:px-0 pb-6 flex flex-col lg:flex-row gap-6">
        
        {/* Left Column (Article Content) */}
        <div className="flex-1 min-w-0 bg-white p-5 md:p-8 border border-gray-200 overflow-hidden">

          {/* Title */}
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#222] leading-[1.3] mb-4">
            {article.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center text-[13px] text-gray-500 mb-6 pb-4 border-b border-gray-100">
            <span className="flex items-center gap-1.5 mr-3">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              {article.date}
            </span>
            <span className="mx-1 text-gray-300">|</span>
            <span className="flex items-center gap-1.5 ml-3 cursor-pointer hover:text-[#222] transition-colors">
              <span className="material-symbols-outlined text-[16px]">share</span>
              Chia sẻ cho bạn bè
            </span>
          </div>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="font-bold text-[#222] text-[16px] leading-[1.6] mb-6">
              {article.excerpt}
            </p>
          )}

          {/* Featured Image - only show if it's not already in the content, but based on the image, the user has the image inside the article body or right after the excerpt. Assuming we just place it here if it exists. */}
          {article.img && (
            <div className="w-full mb-6 overflow-hidden">
              <img src={article.img} alt={article.title} className="w-full h-auto object-cover" />
            </div>
          )}

          {/* Body Content */}
          <div className="prose max-w-none break-words [&_*]:max-w-full
                        prose-p:text-[#333] prose-p:text-[16px] prose-p:leading-[1.7] 
                        prose-img:max-w-full prose-img:h-auto prose-img:my-6
                        prose-a:text-[#0056b3] hover:prose-a:underline
                        prose-strong:text-[#222]
                        [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:my-6 [&_iframe]:rounded-lg [&_iframe]:shadow-sm"
               style={{ wordBreak: "normal", overflowWrap: "break-word" }}>
            <div dangerouslySetInnerHTML={{ __html: convertYoutubeLinksToEmbeds(article.content || "") }} />
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <aside className="w-full lg:w-[320px] shrink-0">
          <div className="bg-white border border-gray-200 overflow-hidden">
            <div className="border-b-[1px] border-gray-200">
              <h3 className="text-earth-brown font-bold text-[15px] uppercase p-3 ml-2 border-b-[2px] border-earth-brown inline-block mb-[-1px]">
                Tin mới cập nhật
              </h3>
            </div>
            <div className="flex flex-col p-4">
              {latestNews.map((item: any, idx: number) => (
                <div 
                  key={item.id} 
                  onClick={() => onNavigate(`news/${item.id}`)}
                  className={`flex gap-3 py-3 cursor-pointer group ${idx !== latestNews.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <div className="w-[100px] h-[70px] shrink-0 overflow-hidden bg-gray-100">
                    {item.img && <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[13px] font-semibold text-[#333] leading-[1.4] line-clamp-3 group-hover:text-earth-brown transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1 mt-auto pt-1.5">
                      <span className="material-symbols-outlined text-[13px]">schedule</span>
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </main>

      <Footer />
    </div>
  );
}
