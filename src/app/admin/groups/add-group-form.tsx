"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addGroup } from "../../../actions/group-actions";

export function AddGroupForm() {
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setError("");
    startTransition(async () => {
      const res = await addGroup(name.trim());
      if (res.success) {
        setName("");
        router.refresh();
      } else {
        setError(res.error || "Có lỗi xảy ra");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Thêm nhóm mới</h3>
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên nhóm</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="VD: MUA BÁN NHÀ ĐẤT"
            className="w-full px-4 py-2 border border-gray-300 rounded outline-none focus:border-earth-brown transition-colors"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-earth-brown text-white rounded hover:bg-earth-brown/90 transition-colors disabled:opacity-50 shrink-0"
        >
          {isPending ? "Đang thêm..." : "Thêm nhóm"}
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        Khi thêm nhóm mới, một category mặc định sẽ được tạo tự động. Bạn có thể vào Quản lý Danh mục để thêm category con.
      </p>
    </form>
  );
}
