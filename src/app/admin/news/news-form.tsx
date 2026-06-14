"use client";
import { useState } from "react";
import { createNews, updateNews } from "../../../actions/news-actions";
import { useRouter } from "next/navigation";

export default function NewsForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    img: initialData?.img || "",
    category: initialData?.category || "TIN TỨC THỊ TRƯỜNG",
    date: initialData?.date || new Date().toLocaleDateString("vi-VN"),
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData?.id) {
        await updateNews(initialData.id, formData);
      } else {
        await createNews(formData);
      }
      router.push("/admin/news");
    } catch (error) {
      alert("Có lỗi xảy ra: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề bài viết (Title) *</label>
          <input required name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên mục (Category)</label>
          <input required name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đăng (Date)</label>
          <input required name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none" />
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn (Excerpt) *</label>
          <textarea required name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none" />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Đường dẫn Ảnh đại diện (Cover Image URL)</label>
          <input name="img" value={formData.img} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded outline-none" placeholder="https://..." />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung chi tiết (Content - HTML)</label>
          <textarea name="content" value={formData.content} onChange={handleChange} rows={10} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none font-mono text-sm" placeholder="<p>Bài viết của bạn ở đây...</p>" />
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
