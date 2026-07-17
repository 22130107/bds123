"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleCategory } from "../../../actions/category-actions";

export function ToggleButton({ id, isActive }: { id: number; isActive: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      onClick={() => startTransition(async () => { await toggleCategory(id); router.refresh(); })}
      disabled={isPending}
      className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
        isActive ? "bg-green-50 text-green-600 hover:bg-green-100" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
      }`}
      title={isActive ? "Ẩn danh mục" : "Hiện danh mục"}
    >
      <span className="material-symbols-outlined text-[18px]">
        {isActive ? "visibility" : "visibility_off"}
      </span>
    </button>
  );
}
