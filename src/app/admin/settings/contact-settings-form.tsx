"use client";

import { useState } from "react";
import { updateAgentInfo } from "../../../actions/settings-actions";

export function ContactSettingsForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const result = await updateAgentInfo(formData);
    
    if (result.success) {
      setMessage("Cập nhật thành công!");
    } else {
      setMessage("Cập nhật thất bại. Vui lòng thử lại.");
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div className={`p-4 rounded-lg text-sm ${message.includes("thành công") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {message}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên đại diện</label>
          <input
            type="text"
            name="name"
            defaultValue={initialData.name || ""}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-earth-brown focus:border-transparent outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chức danh</label>
          <input
            type="text"
            name="title"
            defaultValue={initialData.title || ""}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-earth-brown focus:border-transparent outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại (Gọi ngay)</label>
          <input
            type="text"
            name="phone"
            defaultValue={initialData.phone || ""}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-earth-brown focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại/Link Zalo</label>
          <input
            type="text"
            name="zalo"
            defaultValue={initialData.zalo || ""}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-earth-brown focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh đại diện (Avatar)</label>
          <div className="space-y-3">
            <input
              type="file"
              name="avatarFile"
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-earth-brown/10 file:text-earth-brown hover:file:bg-earth-brown/20"
            />
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Hoặc nhập URL ảnh:</span>
            </div>
            <input
              type="text"
              name="avatar"
              defaultValue={initialData.avatar || ""}
              placeholder="https://..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-earth-brown focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isOnline"
            value="true"
            defaultChecked={initialData.isOnline ?? true}
            className="w-4 h-4 text-earth-brown border-gray-300 rounded focus:ring-earth-brown"
          />
          <label className="text-sm font-medium text-gray-700">Trạng thái Online (Dấu chấm xanh)</label>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-earth-brown text-white px-6 py-2 rounded-lg font-medium hover:bg-earth-brown/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>
    </form>
  );
}
