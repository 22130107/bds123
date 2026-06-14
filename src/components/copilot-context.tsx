"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import { getProjects, getProject, getTopLocations, getTopViewedProjects } from "../actions/project-actions";
import { getNews } from "../actions/news-actions";
import { getSpaces } from "../actions/space-actions";
import { getCategories } from "../actions/category-actions";

const pageNames: Record<string, string> = {
  "/": "Trang chủ",
  "/listing": "Danh sách bất động sản",
  "/news": "Tin tức",
  "/projects": "Dự án",
  "/admin": "Quản trị",
};

export function CopilotContext() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [allNews, setAllNews] = useState<any[]>([]);
  const [allSpaces, setAllSpaces] = useState<any[]>([]);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [topLocations, setTopLocations] = useState<any[]>([]);

  useEffect(() => {
    getProjects().then(setAllProjects);
    getNews().then(setAllNews);
    getSpaces().then(setAllSpaces);
    getCategories().then(setAllCategories);
    getTopLocations(20).then(setTopLocations);
  }, []);

  const pageName = Object.entries(pageNames).find(([path]) => pathname.startsWith(path))?.[1] || pathname;

  useCopilotReadable({
    description: "Trang hiện tại người dùng đang xem",
    value: pageName,
  });

  useCopilotReadable({
    description: "Thông tin website Modern Estate",
    value: {
      name: "Modern Estate",
      tagline: "Bất động sản cao cấp",
      pages: [
        { name: "Trang chủ", path: "/" },
        { name: "Danh sách bất động sản", path: "/listing" },
        { name: "Tin tức", path: "/news" },
        { name: "Dự án", path: "/projects" },
        { name: "Admin", path: "/admin" },
      ],
    },
  });

  useCopilotReadable({
    description: "TOÀN BỘ danh sách bất động sản trên sàn — dùng để tư vấn, so sánh, đề xuất",
    value: allProjects.map(p => ({
      id: p.id,
      title: p.title,
      price: p.price,
      location: p.location,
      area: p.area,
      description: p.description?.substring(0, 300),
      type: p.type,
      category: p.category,
      isFeatured: p.isFeatured,
      createdAt: p.createdAt,
    })),
  });

  useCopilotReadable({
    description: "TOÀN BỘ tin tức thị trường bất động sản",
    value: allNews.map(n => ({
      id: n.id,
      title: n.title,
      excerpt: n.excerpt?.substring(0, 200),
      content: n.content?.substring(0, 500),
      category: n.category,
      date: n.date,
    })),
  });

  useCopilotReadable({
    description: "TOÀN BỘ bộ sưu tập không gian nội thất",
    value: allSpaces.map(s => ({
      id: s.id,
      title: s.title,
      subtitle: s.subtitle,
      collection: s.collection,
      category: s.category,
      description: s.description?.substring(0, 300),
    })),
  });

  useCopilotReadable({
    description: "Danh sách địa điểm/khu vực có BĐS (kèm số lượng) — dùng khi hỏi 'có những khu vực nào'",
    value: topLocations,
  });

  // === SALES CONSULTANT TOOLS ===

  useCopilotAction({
    name: "searchProjects",
    description: "TÌM KIẾM & TRẢ VỀ danh sách bất động sản theo địa điểm, giá, diện tích, từ khóa — LUÔN dùng tool này khi người dùng hỏi 'có nhà ở [nơi nào]', 'tìm nhà [khu vực]', 'có gì ở [tỉnh/thành phố]' v.v. KHÔNG tự suy luận từ context.",
    parameters: [
      { name: "keyword", type: "string", description: "Từ khóa tìm kiếm (tên dự án, mô tả)" },
      { name: "location", type: "string", description: "Tỉnh/Thành phố/Quận/Huyện (VD: Bắc Ninh, Hà Nội, Quận 1, Thủ Đức, Đà Nẵng, Bình Dương)" },
      { name: "priceRange", type: "string", description: "Khoảng giá (VD: dưới 5 tỷ, 5-10 tỷ, 10-20 tỷ, trên 20 tỷ)" },
      { name: "areaRange", type: "string", description: "Diện tích (VD: dưới 100m2, 100-200m2, trên 200m2)" },
      { name: "propertyType", type: "string", description: "Loại BĐS: MUA_BAN, CHO_THUE, DU_AN" },
    ],
    handler: async ({ keyword, location, priceRange, areaRange, propertyType }) => {
      const allProjects: any[] = await getProjects();
      let filtered = allProjects;

      if (keyword) {
        const kw = keyword.toLowerCase();
        filtered = filtered.filter(p =>
          p.title?.toLowerCase().includes(kw) ||
          p.location?.toLowerCase().includes(kw) ||
          p.description?.toLowerCase().includes(kw)
        );
      }
      if (location) {
        const loc = location.toLowerCase();
        filtered = filtered.filter(p => p.location?.toLowerCase().includes(loc));
      }
      if (propertyType) {
        if (propertyType === "CHO_THUE") filtered = filtered.filter(p => p.category?.includes("CHO THUÊ"));
        else if (propertyType === "DU_AN") filtered = filtered.filter(p => p.category?.includes("DỰ ÁN"));
        else if (propertyType === "MUA_BAN") filtered = filtered.filter(p => !p.category?.includes("CHO THUÊ") && !p.category?.includes("DỰ ÁN"));
      }
      if (priceRange) {
        filtered = filtered.filter(p => {
          if (!p.price) return false;
          const priceText = p.price.toString().replace(/\D/g, "");
          const priceValue = parseInt(priceText);
          if (isNaN(priceValue)) return true;
          if (priceRange.includes("dưới 5") || priceRange.includes("Dưới 5")) return priceValue < 5000000000;
          if (priceRange.includes("5-10") || priceRange.includes("5 - 10")) return priceValue >= 5000000000 && priceValue < 10000000000;
          if (priceRange.includes("10-20") || priceRange.includes("10 - 20")) return priceValue >= 10000000000 && priceValue < 20000000000;
          if (priceRange.includes("trên 20") || priceRange.includes("Trên 20")) return priceValue >= 20000000000;
          if (priceRange.includes("50 - 100")) return priceValue >= 50000000000 && priceValue <= 100000000000;
          if (priceRange.includes("Trên 100")) return priceValue >= 100000000000;
          return true;
        });
      }
      if (areaRange) {
        filtered = filtered.filter(p => {
          if (!p.area) return false;
          const areaValue = parseInt(p.area);
          if (isNaN(areaValue)) return true;
          if (areaRange.includes("dưới 100") || areaRange.includes("Dưới 100")) return areaValue < 100;
          if (areaRange.includes("100-200") || areaRange.includes("100 - 200")) return areaValue >= 100 && areaValue <= 200;
          if (areaRange.includes("trên 200") || areaRange.includes("Trên 200")) return areaValue > 200;
          if (areaRange.includes("Dưới 200")) return areaValue < 200;
          if (areaRange.includes("200 - 500")) return areaValue >= 200 && areaValue <= 500;
          if (areaRange.includes("Trên 500")) return areaValue > 500;
          return true;
        });
      }

      if (filtered.length === 1) {
        return `Tìm thấy 1 BĐS: "${filtered[0].title}" — ${filtered[0].location} — ${filtered[0].price}\nLink: /detail/${filtered[0].id}`;
      }

      const result = filtered.slice(0, 10).map((p, i) =>
        `${i + 1}. ${p.title} — ${p.location} — ${p.price}\n   Link: /detail/${p.id}`
      ).join("\n");

      const params = new URLSearchParams();
      if (keyword) params.set("keyword", keyword);
      if (location) params.set("location", location);
      if (priceRange) params.set("price", priceRange);
      if (areaRange) params.set("area", areaRange);
      if (propertyType) {
        const typeMap: Record<string, string> = {
          MUA_BAN: "MUA BÁN NHÀ ĐẤT",
          CHO_THUE: "CHO THUÊ NHÀ ĐẤT",
          DU_AN: "DỰ ÁN",
        };
        params.set("type", typeMap[propertyType] || propertyType);
      }

      const total = filtered.length;
      const link = `/listing${params.toString() ? `?${params.toString()}` : ""}`;
      return `Tìm thấy ${total} BĐS phù hợp:\n${result}\n\nXem tất cả tại: ${link}`;
    },
  });

  useCopilotAction({
    name: "getProjectDetail",
    description: "Xem chi tiết một bất động sản — chỉ dùng khi biết chắc ID tồn tại (lấy từ context hoặc searchProjects)",
    parameters: [
      { name: "projectId", type: "string", description: "ID của bất động sản (số)" },
      { name: "title", type: "string", description: "Tên bất động sản để tìm kiếm" },
    ],
    handler: async ({ projectId, title }) => {
      const allProjects: any[] = await getProjects();
      if (title) {
        const found = allProjects.find((p) => p.title?.toLowerCase().includes(title.toLowerCase()));
        if (found) {
          window.location.href = `/detail/${found.id}`;
          return `Đã tìm thấy "${found.title}". Đang chuyển đến trang chi tiết.`;
        }
        return `Không tìm thấy BĐS nào có tên "${title}". Hãy dùng searchProjects để tìm.`;
      }
      const id = parseInt(projectId);
      const found = allProjects.find((p) => p.id === id);
      if (found) {
        window.location.href = `/detail/${id}`;
        return `Đã tìm thấy "${found.title}". Đang chuyển đến trang chi tiết.`;
      }
      return `Không tìm thấy BĐS nào có ID "${projectId}". Hãy xem danh sách tại /listing.`;
    },
  });

  useCopilotAction({
    name: "getFeaturedProjects",
    description: "Xem danh sách bất động sản nổi bật, được đề xuất",
    parameters: [],
    handler: async () => {
      const projects: any[] = await getProjects();
      const featured = projects.filter((p) => p.isFeatured).slice(0, 5);
      return featured
        .map((p, i) => `${i + 1}. ${p.title} — ${p.location} — ${p.price}`)
        .join("\n") || "Hiện chưa có dự án nổi bật.";
    },
  });

  useCopilotAction({
    name: "getTopLocations",
    description: "Xem các địa điểm có nhiều bất động sản nhất",
    parameters: [],
    handler: async () => {
      const locations: any[] = await getTopLocations(5);
      return locations
        .map((l, i) => `${i + 1}. ${l.name} (${l.count} BĐS)`)
        .join("\n") || "Chưa có dữ liệu.";
    },
  });

  useCopilotAction({
    name: "getMarketOverview",
    description: "Xem tổng quan thị trường: tổng số BĐS, loại BĐS, giá trung bình",
    parameters: [],
    handler: async () => {
      const projects: any[] = await getProjects();
      const total = projects.length;
      const featured = projects.filter((p) => p.isFeatured).length;
      const types = [...new Set(projects.map((p) => p.type).filter(Boolean))];
      const locations = [...new Set(projects.map((p) => p.location?.split(",").pop()?.trim()).filter(Boolean))];
      return [
        `Tổng số bất động sản: ${total}`,
        `Đang nổi bật: ${featured}`,
        `Phân loại: ${types.join(", ") || "Đa dạng"}`,
        `Khu vực: ${locations.slice(0, 5).join(", ")}`,
        `Ghé /listing để xem chi tiết.`,
      ].join("\n");
    },
  });

  useCopilotAction({
    name: "scheduleViewing",
    description: "Đặt lịch xem bất động sản trực tiếp",
    parameters: [
      { name: "projectName", type: "string", description: "Tên bất động sản muốn xem" },
    ],
    handler: async ({ projectName }) => {
      window.location.href = `/listing`;
      return `Bạn có thể xem danh sách BĐS và liên hệ qua số hotline để đặt lịch xem trực tiếp.`;
    },
  });

  useCopilotAction({
    name: "browseByCategory",
    description: "Duyệt bất động sản theo danh mục (Mua bán, Cho thuê, Dự án)",
    parameters: [
      { name: "category", type: "string", description: "Danh mục: MUA_BAN, CHO_THUE, DU_AN" },
    ],
    handler: async ({ category }) => {
      const catMap: Record<string, string> = {
        mua_ban: "MUA BÁN NHÀ ĐẤT",
        cho_thue: "CHO THUÊ NHÀ ĐẤT",
        du_an: "DỰ ÁN",
      };
      const cat = catMap[category?.toUpperCase()] || category;
      window.location.href = `/listing?category=${encodeURIComponent(cat)}`;
    },
  });

  // === ADMIN TOOLS ===

  const adminFetchStats = useCallback(async () => {
    const [projects, news, spaces, categories] = await Promise.all([
      getProjects(),
      getNews(),
      getSpaces(),
      getCategories(),
    ]);
    return {
      totalProjects: projects.length,
      totalNews: news.length,
      totalSpaces: spaces.length,
      totalCategories: categories.length,
      recentProjects: projects.slice(0, 5).map((p: any) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        location: p.location,
      })),
    };
  }, []);

  useCopilotAction({
    name: "getAdminDashboard",
    description: "[Dành cho Quản trị] Xem thống kê tổng quan hệ thống quản trị",
    parameters: [],
    handler: async () => {
      try {
        const stats = await adminFetchStats();
        return [
          `📊 TỔNG QUAN HỆ THỐNG`,
          `- Tổng số Dự án: ${stats.totalProjects}`,
          `- Tin tức: ${stats.totalNews}`,
          `- Không gian mẫu: ${stats.totalSpaces}`,
          `- Danh mục: ${stats.totalCategories}`,
          ``,
          `🆕 Dự án mới nhất:`,
          ...stats.recentProjects.map(
            (p) => `  • ${p.title} (${p.price}) — ${p.location}`
          ),
          ``,
          isAdmin
            ? `Bạn đang ở trang admin. Dùng sidebar để quản lý từng mục.`
            : `Ghé /admin để quản lý.`,
        ].join("\n");
      } catch {
        return "Không thể lấy dữ liệu thống kê. Vui lòng thử lại.";
      }
    },
  });

  useCopilotAction({
    name: "listAllAdminProjects",
    description: "[Quản trị] Xem danh sách tất cả dự án trong hệ thống",
    parameters: [
      { name: "limit", type: "string", description: "Số lượng tối đa (mặc định 10)" },
    ],
    handler: async ({ limit }) => {
      try {
        const projects: any[] = await getProjects();
        const max = Math.min(parseInt(limit) || 10, projects.length);
        return [
          `📋 DANH SÁCH DỰ ÁN (${projects.length} tổng cộng)`,
          ...projects.slice(0, max).map(
            (p, i) =>
              `${i + 1}. [ID:${p.id}] ${p.title} — ${p.price} — ${p.location}${p.isFeatured ? " ★ NỔI BẬT" : ""}`
          ),
          projects.length > max
            ? `\n... và ${projects.length - max} dự án khác.`
            : "",
          ``,
          `Quản lý tại /admin/projects`,
        ].join("\n");
      } catch {
        return "Không thể lấy danh sách dự án.";
      }
    },
  });

  useCopilotAction({
    name: "listAllAdminNews",
    description: "[Quản trị] Xem danh sách bài viết tin tức",
    parameters: [
      { name: "limit", type: "string", description: "Số lượng tối đa (mặc định 10)" },
    ],
    handler: async ({ limit }) => {
      try {
        const news: any[] = await getNews();
        const max = Math.min(parseInt(limit) || 10, news.length);
        return [
          `📰 TIN TỨC (${news.length} bài)`,
          ...news.slice(0, max).map(
            (n, i) => `${i + 1}. [ID:${n.id}] ${n.title} (${n.category || "Chưa phân loại"})`
          ),
          news.length > max ? `\n... và ${news.length - max} bài khác.` : "",
          ``,
          `Quản lý tại /admin/news`,
        ].join("\n");
      } catch {
        return "Không thể lấy danh sách tin tức.";
      }
    },
  });

  useCopilotAction({
    name: "getAdminGuidance",
    description: "[Quản trị] Hướng dẫn sử dụng các tính năng quản trị",
    parameters: [
      { name: "topic", type: "string", description: "Chủ đề: project, news, space, category" },
    ],
    handler: async ({ topic }) => {
      const guides: Record<string, string> = {
        project: [
          "📖 HƯỚNG DẪN QUẢN LÝ DỰ ÁN",
          "1. Xem danh sách: /admin/projects",
          "2. Thêm mới: /admin/projects/new — điền form (tiêu đề, giá, địa điểm, diện tích, mô tả, ảnh)",
          "3. Sửa: Click vào dự án trong danh sách",
          "4. Xóa: Click nút xóa (có xác nhận)",
          "5. Gắn sao NỔI BẬT: Chọn isFeatured = true khi tạo/sửa",
        ].join("\n"),
        news: [
          "📖 HƯỚNG DẪN QUẢN LÝ TIN TỨC",
          "1. Xem danh sách: /admin/news",
          "2. Thêm mới: /admin/news/new",
          "3. Sửa: Click vào bài viết",
          "4. Xóa: Click nút xóa",
        ].join("\n"),
        space: [
          "📖 HƯỚNG DẪN QUẢN LÝ KHÔNG GIAN",
          "1. Xem danh sách: /admin/spaces",
          "2. Thêm mới: /admin/spaces/new",
          "3. Sửa: Click vào không gian",
          "4. Xóa: Click nút xóa",
        ].join("\n"),
        category: [
          "📖 HƯỚNG DẪN QUẢN LÝ DANH MỤC",
          "1. Xem danh sách: /admin/categories",
          "2. Thêm mới: /admin/categories/new",
          "3. Xóa: Click nút xóa",
        ].join("\n"),
      };
      const key = topic?.toLowerCase();
      return guides[key] || [
        "📖 HỆ THỐNG QUẢN TRỊ MODERN ESTATE",
        "",
        "Các mục quản lý:",
        "- Dự án (project): Bất động sản, nhà đất",
        "- Tin tức (news): Bài viết thị trường",
        "- Không gian (space): Bộ sưu tập nội thất",
        "- Danh mục (category): Phân loại BĐS",
        "",
        "Gõ getAdminGuidance với topic cụ thể để xem hướng dẫn chi tiết.",
        "VD: topic=project, topic=news, topic=space, topic=category",
      ].join("\n");
    },
  });

  useCopilotAction({
    name: "navigateToPage",
    description: "Chuyển hướng người dùng đến một trang khác trên website",
    parameters: [
      { name: "page", type: "string", description: "Tên trang: home, listing, news, projects, admin" },
      { name: "subPath", type: "string", description: "Đường dẫn con (VD: projects/new, news/5)" },
    ],
    handler: async ({ page, subPath }) => {
      const baseMap: Record<string, string> = {
        home: "/",
        listing: "/listing",
        news: "/news",
        projects: "/projects",
        admin: "/admin",
      };
      const base = baseMap[page?.toLowerCase()] || `/${page}`;
      window.location.href = subPath ? `${base}/${subPath}` : base;
    },
  });

  return null;
}
