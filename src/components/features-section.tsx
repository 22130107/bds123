import React from "react";

export function FeaturesSection() {
  const newFeatures = [
    {
      title: "Sản phẩm đa dạng",
      desc: "Hàng ngàn bất động sản chất lượng, pháp lý rõ ràng",
      icon: "home",
    },
    {
      title: "Pháp lý minh bạch",
      desc: "Kiểm duyệt kỹ càng, đảm bảo an toàn cho khách hàng",
      icon: "security",
    },
    {
      title: "Tư vấn tận tâm",
      desc: "Đội ngũ chuyên nghiệp, hỗ trợ 24/7",
      icon: "support_agent",
    },
    {
      title: "Giá trị bền vững",
      desc: "Đầu tư thông minh, gia tăng giá trị tài sản",
      icon: "handshake",
    },
  ];

  return (
    <section 
      className="pt-8 md:pt-12 pb-4 md:pb-6 relative z-20"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-[100px]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-0">
          {newFeatures.map((feature, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-4 flex-1">
                {/* Icon Circle */}
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#F3E6D6] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#B24A00]" style={{ fontSize: "32px", fontVariationSettings: "'FILL' 1" }}>
                    {feature.icon}
                  </span>
                </div>
                {/* Text Content */}
                <div className="pr-4 lg:pr-2 xl:pr-6">
                  <h3 className="font-bold text-on-surface text-[15px] xl:text-[16px] mb-1 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-on-surface-variant text-[12px] xl:text-[13px] leading-snug">
                    {feature.desc}
                  </p>
                </div>
              </div>
              
              {/* Vertical divider */}
              {idx < newFeatures.length - 1 && (
                <div className="hidden lg:block w-px h-14 bg-outline-variant/20 mx-2 xl:mx-6 shrink-0"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
