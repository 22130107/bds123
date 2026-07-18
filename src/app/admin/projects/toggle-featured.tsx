"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleFeatured } from "../../../actions/project-actions";

export function ToggleFeatured({ id, isFeatured }: { id: number; isFeatured: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      onClick={() => startTransition(async () => { await toggleFeatured(id); router.refresh(); })}
      disabled={isPending}
      className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
        isFeatured ? "bg-green-50 text-green-600 hover:bg-green-100" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
      }`}
      title={isFeatured ? "Bỏ nổi bật" : "Đánh dấu nổi bật"}
    >
      <span className="material-symbols-outlined text-[18px]">
        {isFeatured ? "star" : "star_outline"}
      </span>
    </button>
  );
}
