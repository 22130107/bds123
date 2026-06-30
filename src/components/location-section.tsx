import Link from "next/link";

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

interface LocationSectionProps {
  projects?: any[];
}

export function LocationSection({ projects = [] }: LocationSectionProps) {
  const getProjectCount = (city: string) => {
    return projects.filter(p => p.location?.toLowerCase().includes(city.toLowerCase())).length;
  };

  const dynamicLocations = locations.map(loc => ({
    ...loc,
    count: `${getProjectCount(loc.city)} tin đăng`
  }));

  const largeLocation = dynamicLocations.find((l) => l.large);
  const smallLocations = dynamicLocations.filter((l) => !l.large);

  return (
    <section 
      className="py-20 text-sand-beige relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.35) 100%), linear-gradient(135deg, #C04416 0%, #C04416 25%, #C7561B 25%, #C7561B 50%, #CF7C1F 50%, #CF7C1F 75%, #D99E2D 75%, #D99E2D 100%)`
      }}
    >
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/10 pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] relative z-10">
        {/* Header */}
        <div className="mb-10">
          <span
            className="font-label-caps text-antique-gold block mb-4 uppercase tracking-[0.4em] font-bold"
            style={{ fontSize: "11px" }}
          >
            HÀNH TRÌNH DI SẢN
          </span>
          <div className="relative p-6 border-y border-white/20 inline-block" style={{ backgroundColor: "#2A1608" }}>
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
              style={{ fontSize: "28px", lineHeight: "38px", fontWeight: 600, letterSpacing: "0.02em", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
            >
              Vị Trí Đắc Địa
            </h2>
          </div>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large location card (col-span-2) */}
          {largeLocation && (
            <Link
              href={`/listing?location=${encodeURIComponent(largeLocation.city)}`}
              className="relative overflow-hidden group cursor-pointer lg:col-span-2 h-[300px] lg:h-[400px] border border-white/10 block"
            >
              <img
                src={largeLocation.image}
                alt={largeLocation.city}
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-4 -m-3 md:-m-4 rounded">
                <h3
                  className="font-headline-lg text-white mb-2"
                  style={{ fontSize: "clamp(20px, 4vw, 28px)", lineHeight: "1.2", fontWeight: 600, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                >
                  {largeLocation.city}
                </h3>
                <div className="flex items-center gap-4">
                  <div className="h-[2px] w-12 bg-antique-gold" />
                  <p
                    className="font-label-caps text-white/90 uppercase tracking-[0.15em] font-bold"
                    style={{ fontSize: "11px" }}
                  >
                    {largeLocation.count}
                  </p>
                </div>
              </div>
            </Link>
          )}

          {/* Small location cards in a 2x2 grid (col-span-1) */}
          <div className="lg:col-span-1 grid grid-cols-2 gap-6">
            {smallLocations.map((loc) => (
              <Link
                key={loc.city}
                href={`/listing?location=${encodeURIComponent(loc.city)}`}
                className="relative overflow-hidden group cursor-pointer h-[138px] lg:h-[188px] border border-white/10 block"
              >
                <img
                  src={loc.image}
                  alt={loc.city}
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-gradient-to-t from-black/80 to-transparent p-2 md:p-3 -m-2 md:-m-3 rounded">
                  <h3
                    className="font-headline-md text-white mb-1 md:mb-2"
                    style={{ fontSize: "clamp(14px, 4vw, 18px)", lineHeight: "1.2", fontWeight: 600, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                  >
                    {loc.city}
                  </h3>
                  <p
                    className="font-label-caps text-white/90 uppercase tracking-widest font-bold"
                    style={{ fontSize: "clamp(8px, 2vw, 9px)" }}
                  >
                    {loc.count}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
