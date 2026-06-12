/* ─── Location Widget ─── */
interface LocationItem {
  name: string;
  count: number;
}

const locationItems: LocationItem[] = [
  { name: "Bất động sản Hà Nội", count: 921 },
  { name: "Bất động sản TP. Hồ Chí Minh", count: 845 },
  { name: "Bất động sản Đà Nẵng", count: 112 },
  { name: "Bất động sản Nha Trang", count: 84 },
];

export function LocationWidget() {
  return (
    <div className="bg-white border border-outline-variant/20 p-6 border-t-4 border-t-antique-gold">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-antique-gold">location_on</span>
        <h4
          className="font-headline-md text-primary uppercase tracking-wide"
          style={{ fontSize: "18px", fontWeight: 600 }}
        >
          Địa Điểm Nổi Bật
        </h4>
      </div>
      <ul className="space-y-4">
        {locationItems.map((item) => (
          <li key={item.name} className="group flex justify-between items-center cursor-pointer">
            <span className="font-body-md text-on-surface-variant group-hover:text-antique-gold transition-colors"
                  style={{ fontSize: "16px" }}>
              {item.name}
            </span>
            <span
              className="bg-surface-container-high px-2 py-0.5 text-primary font-bold"
              style={{ fontSize: "11px" }}
            >
              {item.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Featured Projects Widget ─── */
interface FeaturedProject {
  name: string;
  location: string;
  startingPrice: string;
  image: string;
}

const featuredProjects: FeaturedProject[] = [
  {
    name: "Masteri West Heights",
    location: "Nam Từ Liêm, Hà Nội",
    startingPrice: "TỪ 4 TỶ ₫",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLs_kCjmCjvUEvEUlXO2XVitCo872PLfrDe_CzRHC17iV3fzOZpIzjtnh8Q5PfOqAKw01SAxRYBiQgGt_2FA5cq8Z3WlP_0aGM2Q8aec40fYSNp5U09z2ciQDg1Pim5BYNCYGxeIdhXTJqF3WfFc4iCyBB1Vv-xEIK-1X2i_F8axMGO5V2WVpGQwrQ4gzOS8uEa-okBerHPPi5DXaqtQY8hZ2JFNSIU9yb4tjKNKRVL3HDPgfZpt-zAT7Q",
  },
  {
    name: "The Metropole Thủ Thiêm",
    location: "Quận 2, TP.HCM",
    startingPrice: "TỪ 12 TỶ ₫",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLszCYP06KJQ2cWAiBZGit9KmYSU_JRMoQ2TPB686Hpw1ADOk5LCIkefRv5nxTyc62ii5h2sDD2Zt_v5I0sfVV17N7Y6SoJ3bbF6cqxSDgHoWDtMVZZf17psmxPzhUG9-3rRB5GbZ7_ITK55qzfpVYqNobEmEqsSSH6JRLWMwjisQOH89LNm801lELWQcARm3rTqgxb52KE7j-HDGIfZCp4PXb7tBoxGa3Iwoj_NUiha93CSGQCOF8pUvGA",
  },
  {
    name: "Vinhomes Ocean Park 2",
    location: "Văn Giang, Hưng Yên",
    startingPrice: "TỪ 6 TỶ ₫",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLtSaBuWAfgVDfssSj16l_nZctI50HYJNKKAEATiOBHeWq8vmQF61Ar3N0tQ8rylqoViYlxvmWZFZaZok1-K_QlqCWNfF-ErzjiZ9SEF6USInYQVCJ1Q9rrpFFo0wnCocsJS3Vr4n7OZZs8fkKcp8fn-XV0PLM7qMw8I59oVAJ30qUCPZuqg4fYWqjTyy_kyuY4bnpSgbpX_0z3Kiu63M8n8FY5VprjwUEZCNawfGOpRKST-CQJp1G_2fhQ",
  },
];

export function FeaturedProjectsWidget() {
  return (
    <div className="bg-white border border-outline-variant/20 p-6 border-t-4 border-t-antique-gold">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-antique-gold">domain</span>
        <h4
          className="font-headline-md text-primary uppercase tracking-wide"
          style={{ fontSize: "18px", fontWeight: 600 }}
        >
          Dự Án Nổi Bật
        </h4>
      </div>
      <div className="space-y-6">
        {featuredProjects.map((project) => (
          <div key={project.name} className="flex gap-4 group cursor-pointer">
            <div className="w-16 h-16 shrink-0 overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <div>
              <h5
                className="font-label-caps text-primary group-hover:text-antique-gold transition-colors"
                style={{ fontSize: "12px", letterSpacing: "0.1em", fontWeight: 700 }}
              >
                {project.name}
              </h5>
              <p className="text-on-surface-variant uppercase" style={{ fontSize: "11px" }}>
                {project.location}
              </p>
              <p className="font-semibold text-antique-gold" style={{ fontSize: "12px" }}>
                {project.startingPrice}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="w-full mt-8 py-2 border border-outline-variant font-label-caps hover:bg-primary hover:text-white transition-all uppercase tracking-widest"
        style={{ fontSize: "10px" }}
      >
        Xem tất cả dự án
      </button>
    </div>
  );
}
