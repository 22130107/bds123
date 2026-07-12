"use client";

import { useState, useTransition } from "react";
import { updateSiteTheme } from "../../../actions/settings-actions";
import { useRouter } from "next/navigation";

export function ThemeSettingsForm({ initialData }: { initialData: any }) {
  const [primaryColor, setPrimaryColor] = useState(initialData?.primaryColor || "#C55A1B");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await updateSiteTheme(primaryColor);
      if (res.success) {
        setMessage("Lưu cấu hình màu sắc thành công!");
        router.refresh();
      } else {
        setMessage(res.error || "Có lỗi xảy ra.");
      }
    });
  };

  const handleReset = async () => {
    startTransition(async () => {
      setPrimaryColor("#C85A17");
      const res = await updateSiteTheme("#C85A17");
      if (res.success) {
        setMessage("Đã khôi phục màu mặc định!");
        router.refresh();
      } else {
        setMessage(res.error || "Có lỗi xảy ra.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-earth-brown border-b pb-4">Cài đặt Màu sắc Giao diện (Theme)</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Màu chủ đạo (Primary Color)</label>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-12 h-12 p-0.5 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none uppercase font-mono"
            placeholder="#HEXCODE"
            pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
            required
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">Mã màu này sẽ ghi đè biến <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">--color-earth-brown</code>, áp dụng cho thanh Header, nút bấm, và các thành phần chính trên website.</p>
      </div>

      {message && (
        <div className={`p-3 rounded text-sm font-medium ${message.includes("thành công") || message.includes("khôi phục") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {message}
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-earth-brown text-white rounded font-medium hover:bg-earth-brown/90 transition-colors disabled:opacity-50"
        >
          {isPending ? "Đang xử lý..." : "Lưu thay đổi"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={isPending || primaryColor === "#C85A17"}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 border border-gray-200"
        >
          Khôi phục mặc định
        </button>
      </div>
    </form>
  );
}
