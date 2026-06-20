"use client";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { createNews, updateNews } from "../../../actions/news-actions";
import { useRouter } from "next/navigation";

const QuillEditor = dynamic(() => import("../../../components/QuillEditor"), { ssr: false });

export default function NewsForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string>(initialData?.img || "");
  const [fileError, setFileError] = useState("");
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    img: initialData?.img || "",
    category: initialData?.category || "TIN TỨC THỊ TRƯỜNG",
    date: initialData?.date || new Date().toLocaleDateString("vi-VN"),
    status: initialData?.status || "published",
  });



  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value: string) => {
    setFormData(prev => ({ ...prev, content: value }));
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    setFileError("");
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setFileError("Ảnh quá lớn! Vui lòng chọn ảnh dưới 5MB.");
      e.target.value = "";
      return;
    }
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData(e.target);
      if (initialData?.id) {
        await updateNews(initialData.id, data);
      } else {
        await createNews(data);
      }
      router.push("/admin/news");
    } catch (error) {
      alert("Có lỗi xảy ra: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề bài viết *</label>
          <input required name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none" />
          <div className="flex gap-4 text-xs text-gray-500 mt-1">
            <span>Đã nhập: <strong className="text-gray-700">{formData.title.length}</strong> ký tự</span>
            <span>•</span>
            <span><strong className="text-gray-700">{formData.title.trim() === "" ? 0 : formData.title.trim().split(/\s+/).length}</strong> từ</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên mục</label>
          <input required name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đăng</label>
          <input required name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái *</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none bg-white">
            <option value="published">Xuất bản (Hiển thị)</option>
            <option value="draft">Lưu nháp (Bản nháp)</option>
            <option value="unpublished">Tạm hạ bài (Ẩn)</option>
          </select>
        </div>

        {/* Upload Ảnh bìa */}
        <div className="col-span-1 md:col-span-3 p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
          <label className="block text-sm font-medium text-gray-900 mb-2">Ảnh bìa (Cover Image)</label>
          <input
            type="file"
            name="imageFiles"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-earth-brown file:text-white hover:file:bg-earth-brown/90 cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-2">Tải ảnh từ máy tính lên (tối đa 5MB). Ảnh sẽ được lưu vào Server.</p>
          {fileError && <p className="text-sm text-red-600 mt-1">{fileError}</p>}
          <input type="hidden" name="img" value={formData.img} />

          {(coverPreview || initialData?.img) && (
            <div className="mt-4 max-w-md rounded overflow-hidden border border-gray-200">
              <img src={coverPreview || initialData?.img} className="w-full h-48 object-cover" alt="Preview" />
            </div>
          )}
        </div>

        <div className="col-span-1 md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn (Excerpt) *</label>
          <textarea required name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none" />
        </div>

        <div className="col-span-1 md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung chi tiết</label>
          <div className="border border-gray-300 rounded focus-within:ring-2 focus-within:ring-earth-brown">
            <input type="hidden" name="content" value={formData.content} />
            <QuillEditor
              value={formData.content}
              onChange={handleContentChange}
              placeholder="Nhập nội dung bài viết..."
              style={{ minHeight: "300px" }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t border-gray-100 pt-6">
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-medium transition-colors">
          Hủy
        </button>
        <button type="submit" disabled={loading} className="px-6 py-2 bg-earth-brown text-white rounded font-medium hover:bg-earth-brown/90 transition-colors disabled:opacity-50">
          {loading ? "Đang lưu..." : "Lưu Bài viết"}
        </button>
      </div>
    </form>
  );
}
