import logoIconUrl from "../assets/logo_icon.png";

interface HappyMLogoProps {
  className?: string;
  light?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
}

export function HappyMLogo({ className = "h-14 w-auto", light = false, size = "md" }: HappyMLogoProps) {
  const textColor = light ? "#ffffff" : "#C5A059";
  const taglineColor = light ? "rgba(255, 255, 255, 0.7)" : "#736a62";

  // Dynamic font sizes based on size prop
  const fontSizes = {
    sm: { title: "18px", tagline: "7px", gap: "2px" },
    md: { title: "22px", tagline: "8.5px", gap: "3px" },
    lg: { title: "26px", tagline: "10px", gap: "4px" },
    xl: { title: "34px", tagline: "13px", gap: "5px" },
    xxl: { title: "44px", tagline: "17px", gap: "6px" }
  }[size];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Icon Image */}
      <img
        src={logoIconUrl.src}
        alt="Happy M Icon"
        className="h-full w-auto object-contain shrink-0"
      />

      {/* Text Brand and Tagline */}
      <div className="flex flex-col justify-center">
        <span
          className="font-bold tracking-[0.15em] uppercase"
          style={{
            color: textColor,
            fontFamily: "'Playfair Display', serif",
            fontSize: fontSizes.title,
            lineHeight: "1.1",
            fontWeight: 700,
          }}
        >
          HAPPY M
        </span>
        <span
          className="tracking-[0.08em] uppercase font-bold"
          style={{
            color: taglineColor,
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: fontSizes.tagline,
            lineHeight: "1.2",
            marginTop: fontSizes.gap,
          }}
        >
          MÃI HẠNH PHÚC, MÃI GIÀU SANG
        </span>
      </div>
    </div>
  );
}
