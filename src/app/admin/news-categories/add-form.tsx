"use client";

import { useState, useTransition } from "react";
import { addNewsCategory } from "../../../actions/news-category-actions";
import { useRouter } from "next/navigation";

export function AddNewsCategoryForm() {
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return;
    startTransition(async () => {
      const res = await addNewsCategory(name);
      if (res.success) { setName(""); router.refresh(); }
      else setError(res.error || "");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-base font-semibold text-gray-800 mb-4">Thêm danh mục mới</h3>
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">Tên danh mục</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="VD: TIN TỨC THỊ TRƯỜNG, PHONG THỦY..."
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={isPending || !name.trim()}
          className="px-5 py-2 bg-earth-brown text-white rounded hover:bg-earth-brown/90 transition-colors disabled:opacity-50 font-medium whitespace-nowrap"
        >
          {isPending ? "..." : "Thêm"}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
}
