"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "../../../actions/category-actions";

export default function CategoryForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    group_name: "MUA BÁN NHÀ ĐẤT",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("group_name", formData.group_name);

    await createCategory(data);
    router.push("/admin/categories");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Thêm Danh mục mới</h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên Danh mục (VD: BÁN NHÀ RIÊNG)</label>
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
            <option value="MUA BÁN NHÀ ĐẤT">MUA BÁN NHÀ ĐẤT</option>
            <option value="CHO THUÊ NHÀ ĐẤT">CHO THUÊ NHÀ ĐẤT</option>
            <option value="DỰ ÁN">DỰ ÁN</option>
          </select>
        </div>

        <div className="pt-4 flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-earth-brown text-white rounded hover:bg-earth-brown/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Đang lưu..." : "Lưu danh mục"}
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
