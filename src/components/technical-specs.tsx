interface SpecItem {
  icon: string;
  label: string;
  value: string;
}

interface TechnicalSpecsProps {
  specs: SpecItem[];
}

export function TechnicalSpecs({ specs }: TechnicalSpecsProps) {
  return (
    <div className="bg-white p-8 shadow-sm border border-outline-variant/30">
      <div className="flex items-center gap-3 mb-8">
        <span className="material-symbols-outlined text-antique-gold">fact_check</span>
        <h3
          className="font-headline-md text-primary"
          style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 600 }}
        >
          Thông số kỹ thuật chi tiết
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 border-t border-outline-variant/20 pt-6">
        {specs.map((spec, i) => (
          <div
            key={spec.label}
            className={`flex justify-between items-center py-2 ${
              i < specs.length - 1 && i < specs.length - 2
                ? "border-b border-outline-variant/10"
                : ""
            } ${i % 2 === 0 ? "pr-4" : "pl-4"}`}
          >
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                {spec.icon}
              </span>
              <span className="font-body-md" style={{ fontSize: "16px" }}>
                {spec.label}
              </span>
            </div>
            <span
              className="font-label-caps text-primary"
              style={{ fontSize: "12px", letterSpacing: "0.1em", fontWeight: 700 }}
            >
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
