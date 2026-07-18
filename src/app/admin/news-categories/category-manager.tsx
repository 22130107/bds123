"use client";

import { useState, useTransition, useEffect } from "react";
import { renameNewsCategory, deleteNewsCategory } from "../../../actions/news-category-actions";
import { useRouter } from "next/navigation";

export function NewsCategoryManager({ category }: { category: any }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(category.name);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => { setValue(category.name); }, [category.name]);

  const handleSave = () => {
    if (!value.trim() || value === category.name) { setEditing(false); return; }
    startTransition(async () => {
      await renameNewsCategory(category.id, value.trim());
      setEditing(false);
      router.refresh();
    });
  };

  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      <td className="px-6 py-4 text-gray-500">#{category.id}</td>
      <td className="px-6 py-4">
        {editing ? (
          <div className="flex items-center gap-2">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") { setEditing(false); setValue(category.name); } }}
              autoFocus
              className="px-3 py-1.5 border border-earth-brown rounded outline-none text-sm w-64"
            />
            <button onClick={handleSave} disabled={isPending} className="text-green-600 hover:text-green-700 text-sm font-medium">
              {isPending ? "..." : "Lưu"}
            </button>
            <button onClick={() => { setEditing(false); setValue(category.name); }} className="text-gray-400 hover:text-gray-600 text-sm">
              Hủy
            </button>
          </div>
        ) : (
          <span className="font-medium text-gray-800">{category.name}</span>
        )}
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setEditing(true)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            title="Sửa tên"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <form action={async () => {
            if (confirm(`Xóa danh mục "${category.name}"?\n\nBài viết thuộc danh mục này sẽ bỏ trống chuyên mục.`)) {
              await deleteNewsCategory(category.id);
              router.refresh();
            }
          }}>
            <button type="submit" className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors" title="Xóa">
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </form>
        </div>
      </td>
    </tr>
  );
}
