interface NewsArticle {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt?: string;
  image: string;
  featured?: boolean;
}

const newsData: NewsArticle[] = [
  {
    id: "1",
    category: "KIẾN TRÚC",
    date: "24.05.2024",
    title: "Xu hướng 'Biophilic' trong biệt thự hạng sang 2024",
    excerpt:
      "Khám phá cách các kiến trúc sư hàng đầu đưa thiên nhiên vào không gian sống của giới thượng lưu Việt thông qua ngôn ngữ thiết kế bền vững.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCO_J31Uq9M78LknNa-KGi6yxao5vylFtpYowB9UeA5GYYpZaYIPP6Kbu24ZRBJOyb29HPgSaPjKWFtEjS14tgnjG8KQCjONrmz2XUA3Vx-gNQzLLM7cwf4Ixl5fWUUN0NHb9H5D6V1TDIseUSHYa_qwN2TJ_UW9S-49UYcNWFpuIOfOZMBiCcd70S1wrtIlnYKCZ1Rg4MC6Z1LgZROm0n5PCX5qwx0ASx8JXLWX1OVVtn-mHWjeXJhVSB3nkoI3NuVOt_3kZayCWk",
    featured: true,
  },
  {
    id: "2",
    category: "THỊ TRƯỜNG",
    date: "20.05.2024",
    title: "Phân khúc Penthouse: Kênh đầu tư an toàn cho di sản",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLtF5LVSL3KVpQDMU2uZlZvsYHNF_V18IG60sAFgqowcFx_i98UsE-43BqiAu8TLSrAIgTm3urbw7CDrxMUDaflV3dxF0kRwU5TCzhzmPZvlYjTzsC5RegL2bEH6NnM0m8qDVuz0-gu5dJhxNZcC7ODVu-zVxnbGBUiayj9ygYsfSCQ4k67tmH-Gygck8taxNAVpD4RVfUBwwjSsIlADO7dmJVyCmTIITHWp9SYJmyI1lBLFzSfMhlFhwA",
  },
  {
    id: "3",
    category: "PHONG CÁCH SỐNG",
    date: "18.05.2024",
    title: "Đà Nẵng đón nhận làn sóng khu nghỉ dưỡng 'Eco-Luxury'",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBEzkuOW50PoqVkDyOIDAkrWKcoWRthos7zO2gp2adAKPaTHOTeUKeDcFITNBgPc2YS6Wdj8kG8KJbbWkgrI98mDGfMTUSbos0JTy0I1K-feilLJnnkfUnuD_rk4dfFE9FgWsxBLyoZUz2imKSwFb6USn6Ad1SkqVoAu8aWndBsL8JHhVd0N9BRufSSlcl0ljHKktYIIBEX5ppPdPEVXboqbq3aVIGByI_CNvGmG4pzYOClGd6UqBlARkeq2b-e-mCU6q5dQXj2d0Q",
  },
  {
    id: "4",
    category: "XU HƯỚNG",
    date: "15.05.2024",
    title: "Nội thất Penthouse: Đỉnh cao của sự tinh tế",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLvDbQ7cjP1oifp19YJ99OLUJswL6UFR9sr89ptKabZjL5FcC3TnKFChvRFJxuk8raP7ADyaXRPP5Jt3Yy3GVMP0f9w9rLUxvupkJwjlIqa6d5jmS7nC49jBxz1J8_Irk9GESpdUjK6jqLYv28TsX-NayA46yJwJxXoyC9Iab6dGQO6o-8wlhF00KK527neIsuBMNeclqY7tLl-7r-GukIEhZ9vcEWiQ3MWSYh_YteM8N0gjUprdOsH5ieY",
  },
];

export function FeaturedNews() {
  const featured = newsData.find((a) => a.featured);
  const secondary = newsData.filter((a) => !a.featured);

  return (
    <section className="py-32 relative bg-surface-dim/40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[100px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <span
              className="font-label-caps inline-block mb-6 uppercase font-bold px-4 py-1.5"
              style={{
                fontSize: "10px",
                letterSpacing: "0.5em",
                backgroundColor: "#C85A17",
                color: "#D4AF37",
              }}
            >
              Editorial Insights
            </span>
            <div className="relative p-10 border-y-2 border-antique-gold/30 flex flex-col items-center justify-center">
              <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-antique-gold/40 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-antique-gold/40 to-transparent" />
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-antique-gold" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-antique-gold" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-antique-gold" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-antique-gold" />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4">
                <span className="material-symbols-outlined text-antique-gold text-2xl">filter_vintage</span>
              </div>
              <h2
                className="font-display-lg text-earth-brown leading-tight relative z-10 text-center"
                style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700 }}
              >
                Tin Tức
              </h2>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4">
                <span className="material-symbols-outlined text-antique-gold text-2xl rotate-180">filter_vintage</span>
              </div>
            </div>
          </div>
          <a
            href="#"
            className="font-label-caps font-bold hover:bg-antique-gold hover:text-white transition-all duration-300 flex items-center gap-3 group px-5 py-2.5 border border-earth-brown text-earth-brown"
            style={{ fontSize: "11px", letterSpacing: "0.15em" }}
          >
            XEM TẤT CẢ{" "}
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_right_alt
            </span>
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-20 lg:gap-x-16">
          {/* Featured Article */}
          {featured && (
            <article className="md:col-span-7 group cursor-pointer bg-white p-6 border border-earth-brown/30 shadow-sm transition-all hover:shadow-xl">
              <div className="relative overflow-hidden aspect-[16/10] bg-surface-container-low mb-10">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]"
                />
              </div>
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="font-label-caps uppercase tracking-widest font-bold px-3 py-1"
                  style={{ fontSize: "10px", backgroundColor: "#D4AF37", color: "#ffffff" }}
                >
                  {featured.category}
                </span>
                <span
                  className="font-label-caps font-bold uppercase px-3 py-1"
                  style={{ fontSize: "9px", backgroundColor: "#f5f3ee", color: "#4e453d" }}
                >
                  {featured.date}
                </span>
              </div>
              <h3
                className="font-body-lg text-earth-brown group-hover:text-antique-gold transition-colors mb-8 leading-tight"
                style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 700 }}
              >
                {featured.title}
              </h3>
              <p
                className="font-body-lg text-on-surface mb-10 leading-relaxed max-w-2xl"
                style={{ fontSize: "18px", lineHeight: "30px" }}
              >
                {featured.excerpt}
              </p>
              <div className="hairline-divider" />
            </article>
          )}

          {/* Secondary Articles */}
          <div className="md:col-span-5 grid grid-cols-1 gap-y-12">
            {secondary.map((article) => (
              <article
                key={article.id}
                className="group cursor-pointer flex gap-6 items-start bg-white p-5 border border-earth-brown/30 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="w-1/3 aspect-square overflow-hidden bg-surface-container-low">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
                <div className="flex-1">
                  <span
                    className="font-label-caps uppercase tracking-[0.2em] mb-3 inline-block font-bold px-2.5 py-1"
                    style={{ fontSize: "9px", backgroundColor: "#D4AF37", color: "#ffffff" }}
                  >
                    {article.category}
                  </span>
                  <h4
                    className="font-body-lg text-earth-brown group-hover:text-antique-gold transition-colors leading-snug"
                    style={{ fontSize: "20px", fontWeight: 700 }}
                  >
                    {article.title}
                  </h4>
                  <div className="hairline-divider mt-6" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
