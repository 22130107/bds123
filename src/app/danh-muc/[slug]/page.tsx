import { DanhMucPage } from "../../../components/pages/danh-muc-page";
import { getProjects } from "../../../actions/project-actions";
import { getCategories } from "../../../actions/category-actions";
import { generateSlug } from "../../../lib/slugify";
import { notFound } from "next/navigation";

export default async function DanhMucSlugPage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const categories = await getCategories();
  const matchedCategory = categories.find(c => generateSlug(c.name) === slug);
  
  const groupNames = ["MUA BÁN NHÀ ĐẤT", "CHO THUÊ NHÀ ĐẤT", "DỰ ÁN"];
  const matchedGroup = groupNames.find(g => generateSlug(g) === slug);
  
  if (!matchedCategory && !matchedGroup) {
    notFound();
  }

  const categoryFilter = matchedCategory ? matchedCategory.name : (matchedGroup as string);
  
  const projects = await getProjects({ status: 'published' });
  let filteredProjects = projects;

  // Lọc theo Category
  if (categoryFilter === "CHO THUÊ NHÀ ĐẤT") {
    filteredProjects = filteredProjects.filter(p => p.category?.includes("CHO THUÊ"));
  } else if (categoryFilter === "DỰ ÁN") {
    filteredProjects = filteredProjects.filter(p => p.category?.includes("DỰ ÁN"));
  } else if (categoryFilter === "MUA BÁN NHÀ ĐẤT") {
    filteredProjects = filteredProjects.filter(p => !p.category?.includes("CHO THUÊ"));
  } else {
    filteredProjects = filteredProjects.filter(p => p.category === categoryFilter);
  }

  // Lọc theo SearchBar (giống bên listing)
  const resolvedSearchParams = await searchParams;
  const keyword = resolvedSearchParams.keyword as string | undefined;
  const location = resolvedSearchParams.location as string | undefined;
  const price = resolvedSearchParams.price as string | undefined;
  const area = resolvedSearchParams.area as string | undefined;
  const investor = resolvedSearchParams.investor as string | undefined;

  if (keyword) {
    const kw = keyword.toLowerCase();
    filteredProjects = filteredProjects.filter(p => 
      p.title?.toLowerCase().includes(kw) || 
      p.location?.toLowerCase().includes(kw) || 
      p.description?.toLowerCase().includes(kw)
    );
  }

  if (investor) {
    const inv = investor.toLowerCase();
    filteredProjects = filteredProjects.filter(p => 
      p.investor?.toLowerCase().includes(inv)
    );
  }

  if (location && !location.startsWith("Tất cả")) {
    filteredProjects = filteredProjects.filter(p => p.location?.includes(location));
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
