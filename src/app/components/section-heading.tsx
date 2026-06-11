interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  titleItalic?: string;
  icon?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  titleItalic,
  icon = "filter_vintage",
  className = "",
  size = "md",
  dark = false,
}: SectionHeadingProps) {
  const titleClass = dark ? "text-white" : "text-earth-brown";
  const eyebrowClass = dark ? "text-antique-gold" : "text-earth-brown";

  const fontSize =
    size === "lg"
      ? "clamp(40px, 5vw, 64px)"
      : size === "sm"
      ? "clamp(28px, 3vw, 36px)"
      : "clamp(32px, 4vw, 48px)";

  return (
    <div className={`relative p-10 border-y-2 border-antique-gold/30 flex flex-col items-center justify-center ${className}`}>
      {/* Corner decorations */}
      <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-antique-gold/40 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-antique-gold/40 to-transparent" />
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-antique-gold" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-antique-gold" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-antique-gold" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-antique-gold" />

      {/* Top icon */}
      <div
        className="absolute -top-4 left-1/2 -translate-x-1/2 px-4"
        style={{ backgroundColor: dark ? "transparent" : "inherit" }}
      >
        <span className="material-symbols-outlined text-antique-gold text-2xl">{icon}</span>
      </div>

      {eyebrow && (
        <span
          className={`font-label-caps block mb-4 uppercase ${eyebrowClass}`}
          style={{ fontSize: "10px", letterSpacing: "0.5em", fontWeight: 700 }}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={`font-display-lg ${titleClass} leading-tight relative z-10 text-center`}
        style={{ fontSize, fontWeight: 700 }}
      >
        {title}
        {titleItalic && (
          <>
            <br />
            <span className="italic font-normal">{titleItalic}</span>
          </>
        )}
      </h2>

      {/* Bottom icon */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4">
        <span className="material-symbols-outlined text-antique-gold text-2xl rotate-180">{icon}</span>
      </div>
    </div>
  );
}
