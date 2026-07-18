"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { cycleStatus } from "../../../actions/project-actions";

const labels: Record<string, { text: string; style: string }> = {
  published: { text: "Hiển thị", style: "bg-green-50 text-green-700 border-green-200" },
  draft: { text: "Nháp", style: "bg-gray-50 text-gray-600 border-gray-200" },
  unpublished: { text: "Ẩn", style: "bg-amber-50 text-amber-700 border-amber-200" },
};

export function CycleStatus({ id, status }: { id: number; status: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const current = labels[status] || labels.draft;

  return (
    <button
      onClick={() => startTransition(async () => { await cycleStatus(id); router.refresh(); })}
      disabled={isPending}
      className={`px-2.5 py-1 text-xs font-semibold rounded-full border cursor-pointer transition-opacity ${current.style} ${isPending ? "opacity-50" : "hover:opacity-80"}`}
      title={`Click để chuyển: ${status} → ${({published:"draft",draft:"unpublished",unpublished:"published"} as any)[status] || "published"}`}
    >
      {current.text}
    </button>
  );
}
