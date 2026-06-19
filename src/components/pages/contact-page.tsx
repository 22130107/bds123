"use client";

import { TopNavBar } from "../top-nav-bar";
import { ConsultationForm } from "../consultation-form";
import { Footer } from "../footer";
import { useRouter } from "next/navigation";

interface ContactPageProps {
  agentInfo: {
    name: string;
    title: string;
    phone: string;
    zalo: string;
    avatar: string;
    isOnline: boolean;
  };
}

export function ContactPage({ agentInfo }: ContactPageProps) {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    if (page === "home") router.push("/");
    else if (page === "listing") router.push("/listing");
    else router.push(`/${page}`);
  };

  const offices = [
    {
      city: "Hà Nội",
      name: "Hanoi Central Office",
      address: "Landmark 72, Đường Phạm Hùng, Quận Nam Từ Liêm, Hà Nội",
      phone: "1900 8888",
      email: "hanoi@timnhahot.vn",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.4020140788647!2d105.78187857602324!3d21.016584288195847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab57849e7b25%3A0x6b4efd559a43a0c5!2sKeangnam%20Hanoi%20Landmark%20Tower!5e0!3m2!1svi!2s!4v1718800000000!5m2!1svi!2s"
    },
    {
      city: "TP. Hồ Chí Minh",
      name: "HCM Signature Tower",
      address: "Bitexco Financial Tower, Quận 1, TP. Hồ Chí Minh",
      phone: "090 123 4567",
      email: "hcm@timnhahot.vn",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.520130953181!2d106.70213197607736!3d10.771415659286466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f417d457635%3A0xa6c95c87de647895!2sBitexco%20Financial%20Tower!5e0!3m2!1svi!2s!4v1718800000001!5m2!1svi!2s"
    }
  ];

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col" style={{ overflowX: "hidden" }}>
      <TopNavBar activePage="contact" onNavigate={handleNavigate} />

      {/* Spacing for fixed header */}
      <div className="pt-[80px]"></div>


      {/* Main Grid */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-5 md:px-[80px] py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column - Contact Details */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Agent Section */}
          <div className="bg-white p-8 border border-outline-variant/30 shadow-sm rounded-lg flex flex-col sm:flex-row items-center gap-6">
            <div className="relative shrink-0">
              <img
                src={agentInfo.avatar}
                alt={agentInfo.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-antique-gold shadow-sm"
              />
              {agentInfo.isOnline && (
                <span className="absolute bottom-1 right-1 w-4.5 h-4.5 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            <div className="text-center sm:text-left flex-1 space-y-2">
              <span className="font-label-caps text-xs text-antique-gold uppercase font-bold tracking-wider">
                {agentInfo.title}
              </span>
              <h3 className="font-headline-md text-primary text-xl md:text-2xl font-semibold">
                {agentInfo.name}
              </h3>
              <p className="text-on-surface-variant text-sm">
                Liên hệ tư vấn viên chuyên nghiệp để nhận bảng giá & mặt bằng dự án mới nhất.
              </p>
              <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-4">
                <a
                  href={`tel:${agentInfo.phone.replace(/\s+/g, "")}`}
                  className="px-5 py-2 bg-earth-brown text-white hover:bg-earth-brown/90 transition-colors flex items-center gap-2 font-bold text-sm shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  {agentInfo.phone}
                </a>
                {agentInfo.zalo && (
                  <a
                    href={agentInfo.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 border border-earth-brown text-earth-brown hover:bg-earth-brown/5 transition-colors flex items-center gap-2 font-bold text-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    Zalo Ngay
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Offices List */}
          <div className="space-y-6">
            <h2 className="font-headline-md text-primary text-2xl font-bold border-b border-outline-variant/30 pb-3">
              Hệ thống Văn phòng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offices.map((office, idx) => (
                <div key={idx} className="bg-white p-6 border border-outline-variant/30 shadow-sm rounded-lg flex flex-col justify-between h-full space-y-4">
                  <div>
                    <span className="text-[11px] font-bold tracking-widest text-antique-gold font-label-caps uppercase">
                      {office.city}
                    </span>
                    <h4 className="font-headline-md text-primary text-lg font-bold mt-1 mb-3">
                      {office.name}
                    </h4>
                    <ul className="space-y-2 text-sm text-on-surface-variant">
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] text-earth-brown mt-0.5">location_on</span>
                        <span>{office.address}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-earth-brown">call</span>
                        <span>{office.phone}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-earth-brown">mail</span>
                        <span>{office.email}</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Google Map iframe */}
                  <div className="w-full h-32 rounded overflow-hidden border border-outline-variant/20 shadow-inner">
                    <iframe
                      src={office.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={office.name}
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column - Contact Form */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <ConsultationForm defaultMessage="Tôi muốn liên hệ và nhận thông tin tư vấn tổng quát từ Happy M. Xin cảm ơn!" />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
