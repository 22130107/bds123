"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateCategory } from "../../../../actions/category-actions";

export function EditCategoryForm({ category, groups }: { category: any; groups: string[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: category.name,
    group_name: category.group_name,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("group_name", formData.group_name);
      await updateCategory(category.id, data);
      router.push("/admin/categories");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên Danh mục</label>
          <input
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded outline-none focus:border-earth-brown transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nhóm (Group)</label>
          <select
            name="group_name"
            value={formData.group_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded outline-none focus:border-earth-brown bg-white transition-colors"
          >
            {groups.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="pt-4 flex gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 bg-earth-brown text-white rounded hover:bg-earth-brown/90 transition-colors disabled:opacity-50"
          >
            {isPending ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
        </div>
      </div>
    </form>
  );
}
