import { HappyMLogo } from "./happy-m-logo";

interface FooterProps {
  variant?: "heritage" | "dark" | "default";
}

export function Footer({ variant = "default" }: FooterProps) {
  if (variant === "heritage") {
    return (
      <footer className="bg-primary-container py-20 border-t border-earth-brown w-full">
        <div
          className="mx-auto px-[80px] grid grid-cols-1 md:grid-cols-4 gap-6"
          style={{ maxWidth: "1280px" }}
        >
          <div className="col-span-1">
            <HappyMLogo className="h-28 w-auto mb-6" light={true} size="xl" />
            <p className="font-body-md text-on-primary-container/80 mb-6"
               style={{ fontSize: "16px", lineHeight: "24px", opacity: 0.8 }}>
              Tái định nghĩa chuẩn mực sống thượng lưu thông qua việc bảo tồn kiến trúc và sự xuất sắc trong thiết kế đương đại.
            </p>
          </div>
          <div>
            <h6 className="font-label-caps text-antique-gold mb-6 uppercase"
                style={{ fontSize: "12px", letterSpacing: "0.1em", fontWeight: 700 }}>
              Văn phòng khu vực
            </h6>
            <ul className="space-y-4">
              {["Văn phòng TP. Hồ Chí Minh", "Trụ sở chính Hà Nội", "Chi nhánh Đà Nẵng"].map((item) => (
                <li key={item}>
                  <a href="#"
                     className="font-body-md text-on-primary-container/80 hover:text-antique-gold underline underline-offset-4 transition-all"
                     style={{ fontSize: "16px", lineHeight: "24px" }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h6 className="font-label-caps text-antique-gold mb-6 uppercase"
                style={{ fontSize: "12px", letterSpacing: "0.1em", fontWeight: 700 }}>
              Di sản
            </h6>
            <ul className="space-y-4">
              {["Bảo tồn di sản", "Chính sách bảo mật", "Điều khoản dịch vụ"].map((item) => (
                <li key={item}>
                  <a href="#"
                     className="font-body-md text-on-primary-container/80 hover:text-antique-gold underline underline-offset-4 transition-all"
                     style={{ fontSize: "16px", lineHeight: "24px" }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h6 className="font-label-caps text-antique-gold mb-6 uppercase"
                style={{ fontSize: "12px", letterSpacing: "0.1em", fontWeight: 700 }}>
              Đăng ký nhận tin
            </h6>
            <div className="flex border-b border-on-primary-container/30 pb-2">
              <input
                type="email"
                placeholder="Địa chỉ Email"
                className="bg-transparent border-none focus:ring-0 text-white placeholder:text-on-primary-container/40 w-full font-body-md"
                style={{ fontSize: "16px" }}
              />
              <button className="material-symbols-outlined text-antique-gold">arrow_forward</button>
            </div>
          </div>
        </div>
        <div
          className="mx-auto px-[80px] mt-20 pt-8 border-t border-on-primary-container/10"
          style={{ maxWidth: "1280px" }}
        >
          <p className="font-body-md text-on-primary-container/60 text-center md:text-left"
             style={{ fontSize: "16px" }}>
            © 2024 Modern Estate Heritage. Bản quyền đã được bảo hộ.
          </p>
        </div>
      </footer>
    );
  }

  if (variant === "dark") {
    return (
      <footer className="w-full pt-20 pb-10 bg-primary">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 px-[80px] mx-auto"
          style={{ maxWidth: "1280px" }}
        >
          <div className="md:col-span-1">
            <div className="mb-6">
              <HappyMLogo className="h-24 w-auto" light={true} size="lg" />
            </div>
            <p className="font-body-md text-on-primary-container/80 max-w-xs" style={{ fontSize: "16px" }}>
              Kiến tạo những giá trị vĩnh cửu thông qua những không gian sống đẳng cấp nhất Việt Nam.
            </p>
          </div>
          {[
            {
              title: "Danh Mục",
              links: ["Bất Động Sản Nghỉ Dưỡng", "Dinh Thự Thành Phố", "Bộ Sưu Tập Heritage"],
            },
            {
              title: "Liên Hệ",
              items: ["Trụ sở: 15 Lê Duẩn, Quận 1, TP.HCM", "Hotline: +84 900 123 456", "Email: concierge@timnhahot.vn"],
            },
          ].map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="font-label-caps text-on-tertiary uppercase tracking-widest"
                  style={{ fontSize: "10px", fontWeight: 600 }}>
                {col.title}
              </h4>
              <ul className="space-y-2">
                {(col.links || col.items || []).map((item) => (
                  <li key={item}>
                    {col.links ? (
                      <a href="#" className="font-body-md text-on-primary-container/80 hover:text-on-primary transition-colors"
                         style={{ fontSize: "16px" }}>
                        {item}
                      </a>
                    ) : (
                      <span className="font-body-md text-on-primary-container/80" style={{ fontSize: "16px" }}>
                        {item}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-4">
            <h4 className="font-label-caps text-on-tertiary uppercase tracking-widest"
                style={{ fontSize: "10px", fontWeight: 600 }}>
              Bản Tin
            </h4>
            <p className="font-body-md text-on-primary-container/80" style={{ fontSize: "16px" }}>
              Đăng ký để nhận thông tin về các bất động sản sắp ra mắt.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email của bạn"
                className="bg-transparent border-b border-on-primary-container/30 py-2 flex-1 focus:outline-none focus:border-antique-gold text-on-primary"
              />
              <button className="material-symbols-outlined text-antique-gold ml-2">east</button>
            </div>
          </div>
        </div>
        <div
          className="mt-20 pt-8 border-t border-on-primary-container/10 px-[80px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ maxWidth: "1280px" }}
        >
          <span className="font-body-md text-on-primary-container/80" style={{ fontSize: "16px" }}>
            © 2024 TIMNHAHOT.vn. DI SẢN &amp; THỊNH VƯỢNG.
          </span>
          <div className="flex gap-8">
            {["Chính Sách Bảo Mật", "Điều Khoản Sử Dụng"].map((item) => (
              <a key={item} href="#" className="font-body-md text-on-primary-container/80 hover:text-antique-gold transition-colors"
                 style={{ fontSize: "16px" }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  // Default footer (homepage style from timnhahot-config)
  return (
    <footer className="bg-surface-container-highest py-24">
      <div
        className="mx-auto px-6 md:px-[100px]"
        style={{ maxWidth: "1440px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          <div className="lg:col-span-2 lg:border-r lg:border-outline-variant/30 lg:pr-12">
            <div className="h-28 flex items-center mb-8">
              <HappyMLogo className="h-28 w-auto" light={false} size="xl" />
            </div>
            <p className="font-body-md text-on-surface leading-relaxed max-w-sm mb-8" style={{ fontSize: "16px" }}>
              Đơn vị phân phối bất động sản cao cấp hàng đầu tại Việt Nam, cam kết mang lại giá trị thực và sự sang trọng bền vững cho cộng đồng tinh hoa.
            </p>
            <div className="flex gap-6">
              {["public", "alternate_email", "share"].map((icon) => (
                <a key={icon} href="#" className="text-earth-brown/60 hover:text-antique-gold transition-colors">
                  <span className="material-symbols-outlined">{icon}</span>
                </a>
              ))}
            </div>
          </div>
          {[
            {
              title: "VĂN PHÒNG",
              links: ["Hanoi Central Office", "HCM Signature Tower", "Da Nang Beachside"],
            },
            {
              title: "THÔNG TIN",
              links: ["Về Chúng Tôi", "Dự Án Độc Quyền", "Chính Sách Bảo Mật"],
            },
            {
              title: "LIÊN HỆ",
              special: true,
            },
          ].map((col) => (
            <div key={col.title}>
              <h3
                className="font-label-caps text-charcoal-ink mb-8 uppercase tracking-widest"
                style={{ fontSize: "10px", fontWeight: 700 }}
              >
                {col.title}
              </h3>
              {col.special ? (
                <ul className="space-y-4">
                  <li><a href="#" className="font-body-md text-earth-brown hover:text-antique-gold transition-colors font-bold" style={{ fontSize: "16px" }}>1900 8888</a></li>
                  <li><a href="#" className="font-body-md text-on-surface hover:text-antique-gold transition-colors" style={{ fontSize: "16px" }}>nhadephm79@gmail.com</a></li>
                  <li className="pt-4">
                    <span className="font-label-caps text-antique-gold block mb-2 uppercase font-bold" style={{ fontSize: "9px" }}>HOTLINE 24/7</span>
                    <span className="font-body-md text-earth-brown font-bold" style={{ fontSize: "16px" }}>090 123 4567</span>
                  </li>
                </ul>
              ) : (
                <ul className="space-y-4">
                  {(col.links || []).map((link) => (
                    <li key={link}>
                      <a href="#" className="font-body-md text-on-surface hover:text-antique-gold transition-colors"
                         style={{ fontSize: "16px" }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="pt-12 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-body-md text-on-surface-variant font-medium" style={{ fontSize: "13px" }}>
            © 2024 TimNhaHot.vn. All Rights Reserved. Designed for Heritage.
          </p>
          <a
            href="#"
            className="font-label-caps text-on-surface-variant font-bold hover:text-earth-brown tracking-widest"
            style={{ fontSize: "10px" }}
          >
            TERMS OF USE
          </a>
        </div>
      </div>
    </footer>
  );
}
