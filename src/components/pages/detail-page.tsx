"use client";

import { TopNavBar } from "../top-nav-bar";
import { PropertyGallery } from "../property-gallery";
import { TechnicalSpecs } from "../technical-specs";
import { AgentCard } from "../agent-card";
import { ConsultationForm } from "../consultation-form";
import { Footer } from "../footer";

import { useRouter } from "next/navigation";

const convertYoutubeLinksToEmbeds = (html: string): string => {
  if (!html) return "";
  
  const regex = /<a\s+[^>]*href=["'](https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  
  return html.replace(regex, (match, url, text) => {
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

interface DetailPageProps {
  project: any;
  agentInfo: any;
}

const villaImages = [
  {
    src: "https://images.unsplash.com/photo-1613490908578-8120c16b5a32?w=800",
    alt: "Biệt thự Riverfront Serenity - Mặt tiền",
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    alt: "Nội thất phòng khách",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    alt: "Hồ bơi vô cực",
  },
  {
    src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
    alt: "Khu vực ngoài trời",
  },
];

const villaSpecs = [
  { icon: "explore", label: "Hướng nhà", value: "Đông Nam" },
  { icon: "layers", label: "Số tầng", value: "4 tầng" },
  { icon: "bed", label: "Số phòng ngủ", value: "6 PN" },
  { icon: "bathtub", label: "Số phòng tắm/WC", value: "7 WC" },
  { icon: "description", label: "Giấy tờ pháp lý", value: "Sổ đỏ" },
];

export function DetailPage({ project, agentInfo }: DetailPageProps) {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    if (page === "home") router.push("/");
    else if (page === "listing") router.push("/listing");
    else router.push(`/${page}`);
  };

  const dynamicImages = [
    { src: project.mainImg || "https://images.unsplash.com/photo-1613490908578-8120c16b5a32?w=800", alt: "Ảnh chính" },
    ...(project.images || []).map((img: string) => ({ src: img, alt: "Ảnh phụ" }))
  ];

  const dynamicSpecs = [
    { icon: "layers", label: "Diện tích", value: project.area ? `${project.area} m²` : "Đang cập nhật" },
    { icon: "bed", label: "Số phòng ngủ", value: project.bedrooms ? `${project.bedrooms} PN` : "N/A" },
    { icon: "bathtub", label: "Số phòng tắm/WC", value: project.bathrooms ? `${project.bathrooms} WC` : "N/A" },
  ];

  return (
    <div className="bg-surface text-on-surface font-body-md" style={{ overflowX: "hidden" }}>
      <TopNavBar activePage="detail" onNavigate={handleNavigate} />

      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="max-w-[1280px] mx-auto px-5 md:px-[80px] py-4 flex items-center gap-2 text-on-surface-variant"
             style={{ fontSize: "14px" }}>
          <button onClick={() => handleNavigate("home")} className="hover:text-antique-gold transition-colors">Trang chủ</button>
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chevron_right</span>
          <button onClick={() => handleNavigate("listing")} className="hover:text-antique-gold transition-colors">Bất động sản</button>
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chevron_right</span>
          <span className="text-primary font-semibold">{project.title}</span>
        </div>

        {/* Property Header */}
        <div className="max-w-[1280px] mx-auto px-5 md:px-[80px] pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {project.badge && (
                  <span className="bg-antique-gold text-white font-label-caps px-3 py-1"
                        style={{ fontSize: "10px", letterSpacing: "0.1em", fontWeight: 700 }}>
                    {project.badge}
                  </span>
                )}
                <span className="flex items-center gap-1 text-on-surface-variant" style={{ fontSize: "14px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>location_on</span>
                  {project.location}
                </span>
                <span className="flex items-center gap-1 text-on-surface-variant ml-4" style={{ fontSize: "14px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>visibility</span>
                  {project.views} lượt xem
                </span>
              </div>
              <h1
                className="font-headline-lg text-primary"
                style={{ fontSize: "32px", lineHeight: "40px", fontWeight: 600 }}
              >
                {project.title}
              </h1>
            </div>
            <div className="text-right">
              <span className="font-label-caps text-on-surface-variant uppercase" style={{ fontSize: "10px" }}>
                Giá niêm yết
              </span>
              <p
                className="font-price-display text-earth-brown"
                style={{ fontSize: "28px", lineHeight: "32px", fontWeight: 600 }}
              >
                {project.price}
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="max-w-[1280px] mx-auto px-5 md:px-[80px] py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            <PropertyGallery images={dynamicImages} title={project.title} />
            <TechnicalSpecs specs={dynamicSpecs} />

            {/* Description */}
            <div className="bg-white p-8 shadow-sm border border-outline-variant/30">
              <h3
                className="font-headline-md text-primary mb-6"
                style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 600 }}
              >
                Kiệt tác kiến trúc bên sông
              </h3>
              <div className="text-on-surface-variant font-body-lg space-y-4 text-justify prose max-w-none break-words [&_*]:max-w-full [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:my-6 [&_iframe]:rounded-lg [&_iframe]:shadow-sm"
                   style={{ fontSize: "18px", lineHeight: "28px" }}>
                <div dangerouslySetInnerHTML={{ __html: convertYoutubeLinksToEmbeds(project.description || "Chưa có thông tin mô tả cho dự án này.") }} />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <AgentCard {...agentInfo} />
            <ConsultationForm
              defaultMessage='Xin chào, tôi quan tâm đến tin đăng "Biệt thự Riverfront Serenity". Vui lòng liên hệ tư vấn lại cho tôi. Xin cảm ơn!'
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
