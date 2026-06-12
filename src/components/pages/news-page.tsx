"use client";

import { TopNavBar } from "../top-nav-bar";
import { Footer } from "../footer";

interface NewsPageProps {
  onNavigate: (page: string) => void;
}

const newsArticles = [
  {
    id: 1,
    title: "Thị trường Bất động sản hạng sang đón nhận luồng gió mới trong năm 2024",
    date: "12 Tháng 6, 2024",
    category: "THỊ TRƯỜNG",
    excerpt: "Nhu cầu sở hữu không gian sống tinh hoa tiếp tục tăng trưởng mạnh mẽ, các dự án ven sông và sở hữu tầm nhìn panorama đang trở thành tâm điểm chú ý của giới siêu giàu.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
  },
  {
    id: 2,
    title: "Xu hướng kiến trúc Biophilic: Mang thiên nhiên vào không gian sống đẳng cấp",
    date: "10 Tháng 6, 2024",
    category: "KIẾN TRÚC",
    excerpt: "Thiết kế Biophilic không chỉ là một trào lưu, mà đã trở thành tiêu chuẩn mới cho các dinh thự cao cấp, giúp dung hòa giữa tiện nghi hiện đại và thiên nhiên nguyên bản.",
    image: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800",
  },
  {
    id: 3,
    title: "Giải mã sức hút của các đại đô thị tỷ đô tại khu vực phía Đông Thủ đô",
    date: "05 Tháng 6, 2024",
    category: "PHÂN TÍCH",
    excerpt: "Sự dịch chuyển cơ sở hạ tầng đã biến khu Đông thành 'thỏi nam châm' thu hút dòng vốn đầu tư, với hàng loạt siêu dự án được triển khai bởi các Chủ đầu tư uy tín.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
  },
  {
    id: 4,
    title: "Lãi suất vay mua nhà chạm đáy: Cơ hội vàng cho nhà đầu tư",
    date: "28 Tháng 5, 2024",
    category: "TÀI CHÍNH",
    excerpt: "Các ngân hàng đồng loạt tung ra các gói vay ưu đãi nhất trong thập kỷ qua. Đây có phải là thời điểm vàng để quyết định 'xuống tiền' cho các tài sản giá trị lớn?",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
  },
  {
    id: 5,
    title: "Bộ sưu tập Penthouse đắt giá nhất Việt Nam chính thức ra mắt",
    date: "20 Tháng 5, 2024",
    category: "DỰ ÁN MỚI",
    excerpt: "Số lượng cực kỳ giới hạn, tầm nhìn vô cực và những đặc quyền thượng lưu... Những căn Penthouse này không dành cho số đông mà là tuyên ngôn của đẳng cấp.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
  },
  {
    id: 6,
    title: "Cẩm nang pháp lý: Những điều cần lưu ý khi giao dịch BĐS giá trị cao",
    date: "15 Tháng 5, 2024",
    category: "CẨM NANG",
    excerpt: "Tổng hợp các bước thẩm định pháp lý quan trọng nhất, giúp đảm bảo an toàn tuyệt đối cho các giao dịch bất động sản có quy mô vốn lớn.",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800",
  },
];

export function NewsPage({ onNavigate }: NewsPageProps) {
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
          {newsArticles.map((article) => (
            <article 
              key={article.id} 
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
        
        {/* Pagination Dummy */}
        <div className="mt-16 flex justify-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center border border-outline-variant text-on-surface hover:bg-earth-brown hover:text-white transition-colors">1</button>
          <button className="w-10 h-10 flex items-center justify-center bg-earth-brown text-white">2</button>
          <button className="w-10 h-10 flex items-center justify-center border border-outline-variant text-on-surface hover:bg-earth-brown hover:text-white transition-colors">3</button>
          <span className="w-10 h-10 flex items-center justify-center">...</span>
        </div>
      </main>

      <Footer variant="dark" />
    </div>
  );
}
