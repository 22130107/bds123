import Link from "next/link";
import logoFallback from "../assets/logo_icon.png";

interface NewsArticle {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt?: string;
  image: string;
  featured?: boolean;
}

// Removed hardcoded news data

export function FeaturedNews({ news = [] }: { news?: any[] }) {
  if (!news || news.length === 0) return null;

  const data = news.map((n, idx) => ({
    id: n.id.toString(),
    category: n.category || "TIN TỨC",
    date: n.date || "",
    title: n.title,
    excerpt: n.excerpt,
    image: n.img || logoFallback.src,
    featured: idx === 0
  }));

  const featured = data.find((a) => a.featured) || data[0];
  const secondary = data.filter((a) => a.id !== featured?.id).slice(0, 3);

  return (
    <section className="py-16 md:py-20 relative bg-surface-dim/40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[100px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl flex flex-col items-center md:items-start w-full mx-auto md:mx-0">
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
            <div className="relative py-6 px-12 border-y-2 border-antique-gold/30 flex flex-col items-center justify-center w-fit">
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
          <Link
            href="/news"
            className="hidden md:flex font-label-caps font-bold hover:bg-antique-gold hover:text-white transition-all duration-300 items-center gap-3 group px-5 py-2.5 border border-earth-brown text-earth-brown"
            style={{ fontSize: "11px", letterSpacing: "0.15em" }}
          >
            XEM TẤT CẢ{" "}
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_right_alt
            </span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-20 lg:gap-x-16">
          {/* Featured Article */}
          {featured && (
            <Link href={`/news/${featured.id}`} className="md:col-span-7 group cursor-pointer bg-white p-5 border border-earth-brown/30 shadow-sm transition-all hover:shadow-xl block">
              <article>
                <div className="relative overflow-hidden aspect-[16/9] bg-surface-container-low mb-6">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]"
                  />
                </div>
                <div className="flex items-center gap-3 mb-4">
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
                  className="font-body-lg text-earth-brown group-hover:text-antique-gold transition-colors mb-4 leading-tight"
                  style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 700 }}
                >
                  {featured.title}
                </h3>
                <p
                  className="font-body-lg text-on-surface mb-6 leading-relaxed max-w-2xl"
                  style={{ fontSize: "18px", lineHeight: "30px" }}
                >
                  {featured.excerpt}
                </p>
                <div className="hairline-divider" />
              </article>
            </Link>
          )}

          {/* Secondary Articles */}
          <div className="md:col-span-5 grid grid-cols-1 gap-y-6">
            {secondary.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="group cursor-pointer flex flex-col sm:flex-row gap-4 sm:gap-6 items-start bg-white p-4 border border-earth-brown/30 shadow-sm transition-all hover:shadow-lg block"
              >
                <article className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full items-start">
                  <div className="w-full sm:w-1/3 aspect-[16/9] sm:aspect-square overflow-hidden bg-surface-container-low flex-shrink-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className="font-label-caps uppercase tracking-[0.2em] font-bold px-2.5 py-1"
                        style={{ fontSize: "9px", backgroundColor: "#D4AF37", color: "#ffffff" }}
                      >
                        {article.category}
                      </span>
                      {article.date && (
                        <span
                          className="font-label-caps font-bold uppercase px-2.5 py-1"
                          style={{ fontSize: "8px", backgroundColor: "#f5f3ee", color: "#4e453d" }}
                        >
                          {article.date}
                        </span>
                      )}
                    </div>
                    <h4
                      className="font-body-lg text-earth-brown group-hover:text-antique-gold transition-colors leading-snug mb-2"
                      style={{ fontSize: "20px", fontWeight: 700 }}
                    >
                      {article.title}
                    </h4>
                    {article.excerpt && (
                      <p className="text-on-surface-variant line-clamp-2 md:line-clamp-3 text-sm leading-relaxed">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="hairline-divider mt-4" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Mobile-only "XEM TẤT CẢ" Button */}
        <div className="flex md:hidden justify-center mt-16">
          <Link
            href="/news"
            className="font-label-caps font-bold hover:bg-antique-gold hover:text-white transition-all duration-300 flex items-center gap-3 group px-8 py-3 border border-earth-brown text-earth-brown"
            style={{ fontSize: "11px", letterSpacing: "0.15em" }}
          >
            XEM TẤT CẢ{" "}
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_right_alt
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
