interface Location {
  city: string;
  count: string;
  image: string;
  large?: boolean;
}

const locations: Location[] = [
  {
    city: "Hồ Chí Minh",
    count: "142 Bất Động Sản",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLsAx1PCZaOOd7QT3ez9S4MCXmQcaoOZYzmxeh7ozHy0RfKZzfE9fb4fC4sK-DFiUQ6X4l4EYYK93hHbWk7vZtwVy7a8DkOgqieoxwk-Z_t_5pY4HFU5dqjUm8jkkBwo8wzStevI7k7Y7kmrc6S-uADYzxK5u8q423BmsFIfPaAAI-j4XnHB4bDYT0zkfgZQ5e5wrH523vuwB5GVFl6hLffuRrZgB68RvmcyDy7yMfXI0XhXEXrrFWuHlxM",
    large: true,
  },
  {
    city: "Hà Nội",
    count: "89 Bất Động Sản",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLvY_9K4CppAwiVkNd2usdgo0yZD37ctgzdDvxUC1T6dxWs-t3qt-y2UoEO9fiqF46_CEMdBvG2_35ttaLBfM3eYD1jYhezySEzfw5ju4FZpR_-hd6jwIOSO21XGS4EfweZk3_cDucTmoBlupfC-CTlTR748WtnxLVJk5WyOapQvgVlq1bYWtquUFLoFB2XRMwldilf1yr0OKnO7mbkX7FREC4JDFxDFXHC0Fj74tZw_GNXUn0Q6xjoOHg",
  },
  {
    city: "Đà Nẵng",
    count: "56 Bất Động Sản",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDr1hUHnRPfdpZGKT2dPw85RlWq_F5Y1GwdKwpCTPkuy86D2tzd8x8FY3E731vDG9-craIBkTOGX5-3iF2t7tymMidVOD97ZWr2gEqD_utXiqzkQDhTaejd0HjP2Dk-aYath5AiWJAxHedp76Vto2GR50-yQgfDTtsLoOd-BGb8rNbvxMM5RIwdZf-7-No6W2YbEDSYuX-z0Pr5wP5Nv-GMZS0Emew_inj824OXpRZRc-5ZrO6bG0qnSurYXxA0vB8CMfWbBqRbCIY",
  },
];

export function LocationSection() {
  return (
    <section className="py-20 bg-earth-brown text-sand-beige relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-antique-gold/5 pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] relative z-10">
        {/* Header */}
        <div className="mb-10">
          <span
            className="font-label-caps text-antique-gold block mb-4 uppercase tracking-[0.4em] font-bold"
            style={{ fontSize: "11px" }}
          >
            HÀNH TRÌNH DI SẢN
          </span>
          <div className="relative p-6 border-y border-white/20 inline-block">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-white/40" />
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/40" />
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-antique-gold" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-antique-gold" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-antique-gold" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-antique-gold" />
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-earth-brown px-4">
              <span className="material-symbols-outlined text-antique-gold text-xl">explore</span>
            </div>
            <h2
              className="font-headline-lg text-white relative z-10"
              style={{ fontSize: "28px", lineHeight: "38px", fontWeight: 600, letterSpacing: "0.02em" }}
            >
              Vị Trí Đắc Địa
            </h2>
          </div>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large location card */}
          {locations
            .filter((l) => l.large)
            .map((loc) => (
              <div
                key={loc.city}
                className="relative overflow-hidden group cursor-pointer lg:col-span-2 h-[300px] lg:h-[400px] border border-white/10"
              >
                <img
                  src={loc.image}
                  alt={loc.city}
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3
                    className="font-headline-lg text-white mb-3"
                    style={{ fontSize: "28px", lineHeight: "36px", fontWeight: 600 }}
                  >
                    {loc.city}
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="h-[2px] w-12 bg-antique-gold" />
                    <p
                      className="font-label-caps text-sand-beige uppercase tracking-[0.3em] font-bold"
                      style={{ fontSize: "11px" }}
                    >
                      {loc.count}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          {/* Small location cards */}
                <div className="flex flex-col gap-6">
            {locations
              .filter((l) => !l.large)
              .map((loc) => (
                <div
                  key={loc.city}
                  className="relative overflow-hidden group cursor-pointer h-[200px] lg:h-[188px] border border-white/10"
                >
                  <img
                    src={loc.image}
                    alt={loc.city}
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h3
                      className="font-headline-md text-white mb-2"
                      style={{ fontSize: "22px", lineHeight: "28px", fontWeight: 600 }}
                    >
                      {loc.city}
                    </h3>
                    <p
                      className="font-label-caps text-antique-gold uppercase tracking-widest font-bold"
                      style={{ fontSize: "10px" }}
                    >
                      {loc.count}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
