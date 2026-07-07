interface CTASectionProps {
  onSchedule?: () => void;
  onViewCatalog?: () => void;
}

export function CTASection({ onSchedule, onViewCatalog }: CTASectionProps) {
  return (
    <section className="py-48 relative overflow-hidden flex items-center justify-center bg-surface-container-low border-b border-outline-variant/30">
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #C85A17 1px, transparent 0)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative z-10 text-center max-w-3xl px-6 mx-auto">
        <span className="material-symbols-outlined text-antique-gold mb-10" style={{ fontSize: "60px" }}>
          diamond
        </span>
        <h3
          className="font-display-lg text-earth-brown mb-8 italic"
          style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700 }}
        >
          "Bạn cần tìm mua hoặc ký gửi bất động sản?"
        </h3>
        <p
          className="font-body-lg text-on-surface font-medium mb-14 px-4"
          style={{ fontSize: "18px", lineHeight: "30px" }}
        >
          Liên hệ ngay với đội ngũ chuyên viên để được tư vấn miễn phí, cập nhật giỏ hàng mới nhất và hỗ trợ thủ tục pháp lý nhanh chóng.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={onSchedule}
            className="text-white px-14 py-5 font-label-caps font-bold hover:bg-antique-gold transition-all duration-500 shadow-2xl min-w-[240px]"
            style={{ fontSize: "11px", letterSpacing: "0.15em", backgroundColor: "#A04000" }}
          >
            ĐẶT LỊCH TƯ VẤN
          </button>
          <button
            onClick={onViewCatalog}
            className="border-2 border-earth-brown text-earth-brown px-14 py-5 font-label-caps font-bold hover:bg-earth-brown hover:text-white transition-all duration-500 min-w-[240px]"
            style={{ fontSize: "11px", letterSpacing: "0.15em" }}
          >
            XEM DANH MỤC
          </button>
        </div>
      </div>
    </section>
  );
}
