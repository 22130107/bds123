"use client";

import { useCopilotReadable, useCopilotAction, useCopilotAdditionalInstructions } from "@copilotkit/react-core";
import { getProjects } from "../actions/project-actions";
import { getNews } from "../actions/news-actions";
import { getSpaces } from "../actions/space-actions";
import { getCategories } from "../actions/category-actions";

export function CopilotAdmin() {
  useCopilotReadable({
    description: "[ADMIN] Người dùng hiện tại đang ở trang quản trị",
    value: {
      role: "Administrator",
      permissions: ["Quản lý Dự án", "Quản lý Tin tức", "Quản lý Không gian", "Quản lý Danh mục"],
    },
  });

  useCopilotAdditionalInstructions(
    "Bạn đang hỗ trợ ADMIN. Người dùng có toàn quyền CRUD. " +
    "Hãy chủ động hỏi họ cần quản lý mục nào (dự án, tin tức, không gian, danh mục). " +
    "Khi được yêu cầu xóa, hãy xác nhận lại trước khi thực hiện."
  );

  useCopilotAction({
    name: "deleteProject",
    description: "[Admin] Xóa một dự án/bất động sản theo ID",
    parameters: [
      { name: "id", type: "string", description: "ID của dự án cần xóa" },
    ],
    handler: async ({ id }) => {
      try {
        const { deleteProject } = await import("../actions/project-actions");
        await deleteProject(parseInt(id));
        return `✅ Đã xóa dự án #${id} thành công. Trang sẽ được làm mới.`;
      } catch {
        return `❌ Không thể xóa dự án #${id}. Vui lòng thử lại từ /admin/projects.`;
      }
    },
  });

  useCopilotAction({
    name: "deleteNews",
    description: "[Admin] Xóa một bài viết tin tức theo ID",
    parameters: [
      { name: "id", type: "string", description: "ID của bài viết cần xóa" },
    ],
    handler: async ({ id }) => {
      try {
        const { deleteNews } = await import("../actions/news-actions");
        await deleteNews(parseInt(id));
        return `✅ Đã xóa tin tức #${id} thành công.`;
      } catch {
        return `❌ Không thể xóa tin tức #${id}.`;
      }
    },
  });

  useCopilotAction({
    name: "deleteSpace",
    description: "[Admin] Xóa một không gian mẫu theo ID",
    parameters: [
      { name: "id", type: "string", description: "ID của không gian cần xóa" },
    ],
    handler: async ({ id }) => {
      try {
        const { deleteSpace } = await import("../actions/space-actions");
        await deleteSpace(parseInt(id));
        return `✅ Đã xóa không gian #${id} thành công.`;
      } catch {
        return `❌ Không thể xóa không gian #${id}.`;
      }
    },
  });

  useCopilotAction({
    name: "getAllCategories",
    description: "[Admin] Xem tất cả danh mục phân loại bất động sản",
    parameters: [],
    handler: async () => {
      try {
        const categories: any[] = await getCategories();
        const grouped: Record<string, any[]> = {};
        for (const c of categories) {
          (grouped[c.group_name] = grouped[c.group_name] || []).push(c);
        }
        return [
          "📂 DANH MỤC BẤT ĐỘNG SẢN",
          ...Object.entries(grouped).map(
            ([group, items]) =>
              `\n${group}:\n${items.map((c: any) => `  • [ID:${c.id}] ${c.name}`).join("\n")}`
          ),
          `\nQuản lý tại /admin/categories`,
        ].join("\n");
      } catch {
        return "Không thể lấy danh mục.";
      }
    },
  });

  useCopilotAction({
    name: "getProjectForEditing",
    description: "[Admin] Lấy thông tin chi tiết dự án để chỉnh sửa",
    parameters: [
      { name: "id", type: "string", description: "ID dự án" },
    ],
    handler: async ({ id }) => {
      try {
        const project: any = await getProjectFromActions(parseInt(id));
        if (!project) return `Không tìm thấy dự án #${id}.`;
        return [
          `📝 CHI TIẾT DỰ ÁN #${project.id}`,
          `Tiêu đề: ${project.title}`,
          `Giá: ${project.price}`,
          `Địa điểm: ${project.location}`,
          `Diện tích: ${project.area}`,
          `Loại: ${project.type || "N/A"}`,
          `Danh mục: ${project.category || "N/A"}`,
          `Nổi bật: ${project.isFeatured ? "Có" : "Không"}`,
          `Mô tả: ${project.description?.substring(0, 300) || "N/A"}`,
          ``,
          `Chỉnh sửa tại: /admin/projects/${project.id}`,
        ].join("\n");
      } catch {
        return "Không thể lấy thông tin dự án.";
      }
    },
  });

  return null;
}

async function getProjectFromActions(id: number) {
  const { getProject } = await import("../actions/project-actions");
  return getProject(id);
}
