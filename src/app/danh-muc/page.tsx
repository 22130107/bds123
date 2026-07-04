import { DanhMucPage } from "../../components/pages/danh-muc-page";
import { getProjects } from "../../actions/project-actions";

const removeAccents = (str: string) => {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
};

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedParams = await searchParams;
  const categoryFilter = resolvedParams.category as string | undefined;

  const projects = await getProjects({ status: 'published' });
  
  let filteredProjects = projects;

  // Lọc theo Category
  if (categoryFilter) {
    if (categoryFilter === "CHO THUÊ NHÀ ĐẤT") {
      filteredProjects = filteredProjects.filter(p => p.category?.includes("CHO THUÊ"));
    } else if (categoryFilter === "DỰ ÁN") {
      filteredProjects = filteredProjects.filter(p => p.category?.includes("DỰ ÁN"));
    } else {
      filteredProjects = filteredProjects.filter(p => p.category === categoryFilter);
    }
  }

  // Lọc theo SearchBar
  const keyword = resolvedParams.keyword as string | undefined;
  const location = resolvedParams.location as string | undefined;
  const type = resolvedParams.type as string | undefined;
  const price = resolvedParams.price as string | undefined;
  const area = resolvedParams.area as string | undefined;

  if (keyword) {
    const normalizedSearch = removeAccents(keyword.trim());
    const searchTerms = normalizedSearch.split(/\s+/);
    
    filteredProjects = filteredProjects.filter(p => {
      const normalizedTitle = removeAccents(p.title || "");
      const normalizedLocation = removeAccents(p.location || "");
      const normalizedDescription = removeAccents(p.description || "");
      const combinedText = `${normalizedTitle} ${normalizedLocation} ${normalizedDescription}`;
      
      return searchTerms.every(term => combinedText.includes(term));
    });
  }

  if (location && !location.startsWith("Tất cả")) {
    filteredProjects = filteredProjects.filter(p => p.location?.includes(location));
  }

  if (type && !type.startsWith("Tất cả")) {
    if (type === "CHO THUÊ NHÀ ĐẤT") {
      filteredProjects = filteredProjects.filter(p => p.category?.includes("CHO THUÊ"));
    } else if (type === "DỰ ÁN") {
      filteredProjects = filteredProjects.filter(p => p.category?.includes("DỰ ÁN"));
    } else if (type === "MUA BÁN NHÀ ĐẤT") {
      filteredProjects = filteredProjects.filter(p => !p.category?.includes("CHO THUÊ") && !p.category?.includes("DỰ ÁN"));
    } else {
      filteredProjects = filteredProjects.filter(p => p.title?.includes(type) || p.category?.includes(type));
    }
  }

  if (price && !price.startsWith("Tất cả")) {
    filteredProjects = filteredProjects.filter(p => {
      if (!p.price) return false;
      const priceText = p.price.toString().replace(/\D/g, "");
      const priceValue = parseInt(priceText);
      if (isNaN(priceValue)) return true;
      
      if (price === "Trên 20 Tỷ VNĐ") return priceValue >= 20000000000 || priceValue >= 20;
      if (price === "50 - 100 Tỷ VNĐ") return (priceValue >= 50000000000 && priceValue <= 100000000000) || (priceValue >= 50 && priceValue <= 100);
      if (price === "Trên 100 Tỷ VNĐ") return priceValue >= 100000000000 || priceValue >= 100;
      return true;
    });
  }

  if (area && !area.startsWith("Tất cả")) {
    filteredProjects = filteredProjects.filter(p => {
      if (!p.area) return false;
      const areaValue = parseInt(p.area);
      if (isNaN(areaValue)) return true;
      
      if (area === "Dưới 200 m²") return areaValue < 200;
      if (area === "200 - 500 m²") return areaValue >= 200 && areaValue <= 500;
      if (area === "Trên 500 m²") return areaValue > 500;
      return true;
    });
  }

  return <DanhMucPage projects={filteredProjects} currentCategory={categoryFilter} />;
}
