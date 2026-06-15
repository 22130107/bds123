interface AgentCardProps {
  name: string;
  title: string;
  phone: string;
  avatar: string;
  isOnline?: boolean;
  zalo?: string;
}

export function AgentCard({ name, title, phone, avatar, isOnline = true, zalo = "https://zalo.me" }: AgentCardProps) {
  return (
    <div className="bg-white p-8 shadow-sm border border-outline-variant/30 text-center">
      {/* Avatar */}
      <div className="relative w-24 h-24 mx-auto mb-4">
        <img
          src={avatar}
          alt={name}
          className="w-full h-full object-cover rounded-full border-2 border-antique-gold/20 p-1"
        />
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-moss-green border-2 border-white rounded-full" />
        )}
      </div>

      {/* Info */}
      <h4
        className="font-headline-md text-primary mb-1"
        style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 600 }}
      >
        {name}
      </h4>
      <p
        className="font-label-caps text-outline uppercase tracking-widest mb-6"
        style={{ fontSize: "10px", letterSpacing: "0.2em" }}
      >
        {title}
      </p>

      {/* Actions */}
      <div className="space-y-3">
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className="flex items-center justify-center gap-2 w-full bg-secondary-container text-on-secondary-container py-3 font-label-caps hover:bg-secondary-fixed transition-colors"
          style={{ fontSize: "12px", letterSpacing: "0.1em", fontWeight: 700 }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>call</span>
          Gọi ngay: {phone}
        </a>
        <a
          href={zalo.startsWith("http") ? zalo : `https://zalo.me/${zalo.replace(/\s/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full border border-moss-green text-moss-green py-3 font-label-caps hover:bg-moss-green/5 transition-colors"
          style={{ fontSize: "12px", letterSpacing: "0.1em", fontWeight: 700 }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chat</span>
          Nhắn tin qua Zalo
        </a>
      </div>
    </div>
  );
}
