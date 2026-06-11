interface Location {
  city: string;
  count: string;
  image: string;
  large?: boolean;
}

const locations: Location[] = [
  {
    city: "Hà Nội",
    count: "166 tin đăng",
    image: "https://xemnha.vn/uploads/images/bat-dong-san-hn.jpeg",
    large: true,
  },
  {
    city: "Hồ Chí Minh",
    count: "20 tin đăng",
    image: "https://xemnha.vn/uploads/images/du-an-hcm.jpeg",
  },
  {
    city: "Hải Phòng",
    count: "4 tin đăng",
    image: "https://xemnha.vn/uploads/images/da-nang.jpeg",
  },
  {
    city: "Đồng Nai",
    count: "1 tin đăng",
    image: "https://xemnha.vn/uploads/images/DNA-web-2.webp",
  },
  {
    city: "Bình Dương",
    count: "6 tin đăng",
    image: "https://xemnha.vn/uploads/images/binh-duong.webp",
  },
];

export function LocationSection() {
  const largeLocation = locations.find((l) => l.large);
  const smallLocations = locations.filter((l) => !l.large);

  return (
    <section 
      className="py-20 text-sand-beige relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.65) 100%), linear-gradient(to right, #721616 0%, #721616 16.6%, #8f2e11 16.6%, #8f2e11 33.3%, #b04914 33.3%, #b04914 50%, #c3611b 50%, #c3611b 66.6%, #db8026 66.6%, #db8026 83.3%, #e7992d 83.3%, #e7992d 100%)`
      }}
    >
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
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#C85A17] w-10 h-10 rounded-full border border-white/20 shadow-md flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-md">explore</span>
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
          {/* Large location card (col-span-2) */}
          {largeLocation && (
            <div
              className="relative overflow-hidden group cursor-pointer lg:col-span-2 h-[300px] lg:h-[400px] border border-white/10"
            >
              <img
                src={largeLocation.image}
                alt={largeLocation.city}
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3
                  className="font-headline-lg text-white mb-3"
                  style={{ fontSize: "28px", lineHeight: "36px", fontWeight: 600 }}
                >
                  {largeLocation.city}
                </h3>
                <div className="flex items-center gap-4">
                  <div className="h-[2px] w-12 bg-antique-gold" />
                  <p
                    className="font-label-caps text-sand-beige uppercase tracking-[0.3em] font-bold"
                    style={{ fontSize: "11px" }}
                  >
                    {largeLocation.count}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Small location cards in a 2x2 grid (col-span-1) */}
          <div className="lg:col-span-1 grid grid-cols-2 gap-6">
            {smallLocations.map((loc) => (
              <div
                key={loc.city}
                className="relative overflow-hidden group cursor-pointer h-[138px] lg:h-[188px] border border-white/10"
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
                    style={{ fontSize: "18px", lineHeight: "24px", fontWeight: 600 }}
                  >
                    {loc.city}
                  </h3>
                  <p
                    className="font-label-caps text-antique-gold uppercase tracking-widest font-bold"
                    style={{ fontSize: "9px" }}
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
