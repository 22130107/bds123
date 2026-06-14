"use client";
import { useState } from "react";
import { createSpace, updateSpace } from "../../../actions/space-actions";
import { useRouter } from "next/navigation";

export default function SpaceForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Xử lý images (JSON array) thành string cách nhau bởi dấu xuống dòng
  const initialImages = initialData?.images ? (Array.isArray(initialData.images) ? initialData.images.join('\n') : initialData.images) : "";

  const [formData, setFormData] = useState({
    collection: initialData?.collection || "SAIGON",
    category: initialData?.category || "Ngoại thất",
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    images: initialImages,
    gridClass: initialData?.gridClass || "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    // Chuyển string thành mảng
    const imagesArray = formData.images.split('\n').map((url: string) => url.trim()).filter((url: string) => url !== "");

    const payload = {
      ...formData,
      images: imagesArray
    };

    try {
      if (initialData?.id) {
        await updateSpace(initialData.id, payload);
      } else {
        await createSpace(payload);
      }
      router.push("/admin/spaces");
    } catch (error) {
      alert("Có lỗi xảy ra: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bộ sưu tập (Collection)</label>
          <select name="collection" value={formData.collection} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded outline-none bg-white">
            <option value="SAIGON">Sài Gòn (SAIGON)</option>
            <option value="HANOI">Hà Nội (HANOI)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục phòng (Category)</label>
          <input required name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none" placeholder="VD: Ngoại thất, Bếp, Phòng khách..." />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề (Title)</label>
          <input required name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none" />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả phụ (Subtitle)</label>
          <input name="subtitle" value={formData.subtitle} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none" />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Danh sách Hình ảnh (Mỗi link 1 dòng)</label>
          <textarea required name="images" value={formData.images} onChange={handleChange} rows={6} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none" placeholder="https://image1.jpg&#10;https://image2.jpg" />
          <p className="text-xs text-gray-500 mt-1">Dòng đầu tiên là ảnh chính. Các dòng sau là ảnh đổi khi hover hoặc trình chiếu.</p>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">CSS Lưới (Tùy chọn - VD: md:col-span-2 md:row-span-2)</label>
          <input name="gridClass" value={formData.gridClass} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded outline-none" />
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t border-gray-100 pt-6">
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-medium transition-colors">
          Hủy
        </button>
        <button type="submit" disabled={loading} className="px-6 py-2 bg-earth-brown text-white rounded font-medium hover:bg-earth-brown/90 transition-colors disabled:opacity-50">
          {loading ? "Đang lưu..." : "Lưu Không gian"}
        </button>
      </div>
    </form>
  );
}
