"use client";

import { useRouter } from "next/navigation";
import { deleteCategory } from "../../../actions/category-actions";

export function DeleteButton({ id, name }: { id: number; name: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Xóa danh mục "${name}"?\n\nProject thuộc danh mục này sẽ được bỏ trống (category = null).`)) return;
    await deleteCategory(id);
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
      title="Xóa"
    >
      <span className="material-symbols-outlined text-[18px]">delete</span>
    </button>
  );
}
