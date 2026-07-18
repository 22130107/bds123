"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { createNews, updateNews } from "../../../actions/news-actions";
import { getNewsCategories } from "../../../actions/news-category-actions";
import { useRouter } from "next/navigation";

const QuillEditor = dynamic(() => import("../../../components/QuillEditor"), { ssr: false });

// Hàm sinh slug phía client (mirror của server)
function clientSlugify(str: string): string {
  if (!str) return '';
  const map: Record<string, string> = {
    'à':'a','á':'a','ả':'a','ã':'a','ạ':'a','ă':'a','ằ':'a','ắ':'a','ẳ':'a','ẵ':'a','ặ':'a',
    'â':'a','ầ':'a','ấ':'a','ẩ':'a','ẫ':'a','ậ':'a','đ':'d',
    'è':'e','é':'e','ẻ':'e','ẽ':'e','ẹ':'e','ê':'e','ề':'e','ế':'e','ể':'e','ễ':'e','ệ':'e',
    'ì':'i','í':'i','ỉ':'i','ĩ':'i','ị':'i',
    'ò':'o','ó':'o','ỏ':'o','õ':'o','ọ':'o','ô':'o','ồ':'o','ố':'o','ổ':'o','ỗ':'o','ộ':'o',
    'ơ':'o','ờ':'o','ớ':'o','ở':'o','ỡ':'o','ợ':'o',
    'ù':'u','ú':'u','ủ':'u','ũ':'u','ụ':'u','ư':'u','ừ':'u','ứ':'u','ử':'u','ữ':'u','ự':'u',
    'ỳ':'y','ý':'y','ỷ':'y','ỹ':'y','ỵ':'y',
    'À':'a','Á':'a','Ả':'a','Ã':'a','Ạ':'a','Ă':'a','Ằ':'a','Ắ':'a','Ẳ':'a','Ẵ':'a','Ặ':'a',
    'Â':'a','Ầ':'a','Ấ':'a','Ẩ':'a','Ẫ':'a','Ậ':'a','Đ':'d',
    'È':'e','É':'e','Ẻ':'e','Ẽ':'e','Ẹ':'e','Ê':'e','Ề':'e','Ế':'e','Ể':'e','Ễ':'e','Ệ':'e',
    'Ì':'i','Í':'i','Ỉ':'i','Ĩ':'i','Ị':'i',
    'Ò':'o','Ó':'o','Ỏ':'o','Õ':'o','Ọ':'o','Ô':'o','Ồ':'o','Ố':'o','Ổ':'o','Ỗ':'o','Ộ':'o',
    'Ơ':'o','Ờ':'o','Ớ':'o','Ở':'o','Ỡ':'o','Ợ':'o',
    'Ù':'u','Ú':'u','Ủ':'u','Ũ':'u','Ụ':'u','Ư':'u','Ừ':'u','Ứ':'u','Ử':'u','Ữ':'u','Ự':'u',
    'Ỳ':'y','Ý':'y','Ỷ':'y','Ỹ':'y','Ỵ':'y',
  };
  let slug = '';
  for (const char of str) { slug += map[char] || char; }
  return slug.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').replace(/^-+|-+$/g,'');
}

export default function NewsForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string>(initialData?.img || "");
  const [fileError, setFileError] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!initialData?.slug);
  const [newsCategories, setNewsCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    meta_description: initialData?.meta_description || "",
    content: initialData?.content || "",
    schema_markup: initialData?.schema_markup || "",
    img: initialData?.img || "",
    category: initialData?.category || "TIN TỨC THỊ TRƯỜNG",
    date: initialData?.date || new Date().toLocaleDateString("vi-VN"),
    status: initialData?.status || "published",
  });

  // Auto-generate slug from title khi user chưa chỉnh tay
  useEffect(() => {
    if (!slugManuallyEdited && formData.title) {
      setFormData(prev => ({ ...prev, slug: clientSlugify(prev.title) }));
    }
  }, [formData.title, slugManuallyEdited]);

  useEffect(() => {
    getNewsCategories().then(setNewsCategories).catch(() => {});
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'slug') {
      setSlugManuallyEdited(true);
    }
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

  const handleResetSlug = () => {
    setSlugManuallyEdited(false);
    setFormData(prev => ({ ...prev, slug: clientSlugify(prev.title) }));
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

        {/* Slug URL */}
        <div className="col-span-1 md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug URL
            <span className="text-xs text-gray-400 font-normal ml-2">(tự động sinh từ tiêu đề, có thể chỉnh sửa)</span>
          </label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-earth-brown overflow-hidden">
              <span className="px-3 py-2 bg-gray-50 text-gray-500 text-sm border-r border-gray-300 whitespace-nowrap">/news/</span>
              <input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="slug-bai-viet"
                className="flex-1 px-3 py-2 outline-none text-sm"
              />
            </div>
            {slugManuallyEdited && (
              <button
                type="button"
                onClick={handleResetSlug}
                className="px-3 py-2 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
                title="Sinh lại slug từ tiêu đề"
              >
                ↻ Tự sinh lại
              </button>
            )}
          </div>
        </div>

        {/* Meta Description cho SEO */}
        <div className="col-span-1 md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Description (SEO)
            <span className="text-xs text-gray-400 font-normal ml-2">(Mô tả hiển thị trên Google, nên 150-160 ký tự)</span>
          </label>
          <textarea
            name="meta_description"
            value={formData.meta_description}
            onChange={handleChange}
            rows={2}
            placeholder="Nhập mô tả SEO cho bài viết. Nếu để trống sẽ dùng Excerpt."
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none"
          />
          <div className="flex gap-4 text-xs mt-1">
            <span className={`${formData.meta_description.length > 160 ? 'text-red-500' : 'text-gray-500'}`}>
              {formData.meta_description.length}/160 ký tự
              {formData.meta_description.length > 160 && ' ⚠ Quá dài'}
            </span>
            {!formData.meta_description && <span className="text-amber-500">Sẽ dùng Excerpt làm meta description</span>}
          </div>
        </div>

        {/* Schema Markup / Script / Raw HTML */}
        <div className="col-span-1 md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mã HTML/Script tùy chỉnh (Schema, Tracking, Custom JS/CSS)
            <span className="text-xs text-gray-400 font-normal ml-2">(Sẽ render trực tiếp vào mã nguồn HTML)</span>
          </label>
          <textarea
            name="schema_markup"
            value={formData.schema_markup}
            onChange={handleChange}
            rows={6}
            placeholder={'<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "Tiêu đề bài viết"\n}\n</script>\n\n<h1>Thẻ tùy chỉnh</h1>'}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none font-mono text-sm bg-gray-50"
            style={{ tabSize: 2 }}
          />
          <p className="text-xs text-gray-400 mt-1">
            Nhập mã HTML/Script tự do. Nếu là Schema JSON-LD, bạn vui lòng tự nhập cả thẻ <code className="bg-gray-100 px-1 rounded">&lt;script type="application/ld+json"&gt;</code> bao bọc bên ngoài.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên mục</label>
          <select required name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none bg-white">
            {newsCategories.length === 0 && <option>TIN TỨC THỊ TRƯỜNG</option>}
            {newsCategories.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
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
