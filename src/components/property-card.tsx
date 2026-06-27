interface PropertyCardProps {
  id: string;
  title: string;
  description: string;
  area: string;
  location: string;
  updated: string;
  price: string;
  image: string;
  badge?: string;
  badgeColor?: "gold" | "dark";
  onViewDetail?: (id: string) => void;
}

export function PropertyCard({
  id,
  title,
  description,
  area,
  location,
  updated,
  price,
  image,
  badge,
  badgeColor = "gold",
  onViewDetail,
}: PropertyCardProps) {
  return (
    <article
      className="bg-white border border-outline-variant/20 overflow-hidden group flex flex-col md:flex-row hover:shadow-lg transition-all duration-300 cursor-pointer"
      style={{ backdropFilter: "blur(8px)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
      onClick={() => onViewDetail?.(id)}
    >
      {/* Image */}
      <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {badge && (
          <div
            className="absolute top-4 left-4 text-white font-label-caps px-3 py-1 tracking-widest"
            style={{
              fontSize: "10px",
              fontWeight: 700,
              backgroundColor: badgeColor === "gold" ? "#8B6914" : "#1E321E",
            }}
          >
            {badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="md:w-3/5 p-6 flex flex-col justify-between">
        <div className="space-y-3">
          <h3
            className="font-headline-md text-primary group-hover:text-antique-gold transition-colors"
            style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 600 }}
          >
            {title}
          </h3>
          <p className="text-on-surface-variant font-body-md line-clamp-2" style={{ fontSize: "16px" }}>
            {description}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            {[
              { icon: "straighten", text: area },
              { icon: "location_on", text: location },
              { icon: "schedule", text: updated },
            ].map(({ icon, text }) => (
              <div key={icon} className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  {icon}
                </span>
                <span style={{ fontSize: "13px" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-outline-variant flex justify-between items-center">
          <p
            className="font-price-display"
            style={{ fontSize: "22px", lineHeight: "24px", fontWeight: 600, color: "#A04000" }}
          >
            {price}
          </p>
          <button
            className="font-label-caps text-antique-gold hover:text-primary transition-colors flex items-center gap-1"
            style={{ fontSize: "11px", letterSpacing: "0.15em", fontWeight: 600 }}
          >
            CHI TIẾT{" "}
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
