"use client";
import { useState } from "react";
import { createSpace, updateSpace } from "../../../actions/space-actions";
import { useRouter } from "next/navigation";

export default function SpaceForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>(initialData?.images || []);

  const initialImagesStr = initialData?.images
    ? (Array.isArray(initialData.images) ? initialData.images.join('\n') : initialData.images)
    : "";

  const [formData, setFormData] = useState({
    collection: initialData?.collection || "SAIGON",
    category: initialData?.category || "01 / NGOẠI THẤT",
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    images: initialImagesStr,
    gridClass: initialData?.gridClass || "",
  });

  const [newFiles, setNewFiles] = useState<File[]>([]);

  const parsedTextUrls = formData.images
    .split('\n')
    .map(u => u.trim())
    .filter(u => u !== '');
  
  const allPreviews = [
    ...parsedTextUrls.map((url, i) => ({ type: 'url', src: url, index: i })),
    ...newFiles.map((file, i) => ({ type: 'file', src: URL.createObjectURL(file), index: i }))
  ];

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files) as File[];
    setNewFiles(prev => [...prev, ...files]);
    e.target.value = '';
  };

  const removeImage = (item: { type: string, src: string, index: number }) => {
    if (item.type === 'url') {
      const newUrls = parsedTextUrls.filter((_, i) => i !== item.index);
      setFormData(prev => ({ ...prev, images: newUrls.join('\n') }));
    } else {
      setNewFiles(prev => prev.filter((_, i) => i !== item.index));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData(e.target);
      
      // Clean up empty imageFiles that might be picked up by the form if name attribute existed
      data.delete('imageFiles');
      data.delete('images');

      // Append selected files manually
      newFiles.forEach(file => {
        data.append('imageFiles', file);
      });

      // Append text URL existing images
      data.append('existingImages', JSON.stringify(parsedTextUrls));

      if (initialData?.id) {
        await updateSpace(initialData.id, data);
      } else {
        await createSpace(data);
      }
      router.push("/admin/spaces");
    } catch (error) {
      alert("Có lỗi xảy ra: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl space-y-6">
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
          <select required name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none bg-white">
            <option value="01 / NGOẠI THẤT">01 / NGOẠI THẤT</option>
            <option value="02 / PHÒNG BẾP">02 / PHÒNG BẾP</option>
            <option value="03 / PHÒNG KHÁCH">03 / PHÒNG KHÁCH</option>
            <option value="04 / PHÒNG TẮM">04 / PHÒNG TẮM</option>
            <option value="05 / NGOÀI TRỜI">05 / NGOÀI TRỜI</option>
            <option value="06 / PHÒNG NGỦ">06 / PHÒNG NGỦ</option>
            <option value="KHÁC">KHÁC</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề (Title)</label>
          <input required name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none" />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả phụ (Subtitle)</label>
          <input name="subtitle" value={formData.subtitle} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none" />
        </div>

        {/* Upload Ảnh từ Local */}
        <div className="col-span-1 md:col-span-2 p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
          <label className="block text-sm font-medium text-gray-900 mb-2">Tải ảnh lên từ máy tính (Nhiều ảnh)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-earth-brown file:text-white hover:file:bg-earth-brown/90 cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-2">Có thể chọn nhiều ảnh cùng lúc. Ảnh sẽ được lưu vào Server.</p>

          {allPreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {allPreviews.map((item, i) => (
                <div key={i} className="relative aspect-video rounded overflow-hidden border border-gray-200 group">
                  <img src={item.src} className="w-full h-full object-cover" alt={`Preview ${i}`} />
                  
                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => removeImage(item)}
                    className="absolute top-1 right-1 bg-red-600/90 hover:bg-red-700 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-sm"
                  >
                    <span className="material-symbols-outlined" style={{fontSize: "14px", fontWeight: "bold"}}>close</span>
                  </button>

                  <div className="absolute top-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-bold tracking-widest">
                    {i === 0 ? "MAIN" : `IMG ${i}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* URL Ảnh (giữ lại cho trường hợp muốn paste link) */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Hoặc nhập link ảnh (mỗi link 1 dòng)</label>
          <textarea name="images" value={formData.images} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none" placeholder="https://image1.jpg&#10;https://image2.jpg" />
          <p className="text-xs text-gray-500 mt-1">Dòng đầu là ảnh chính. Sẽ tự động đồng bộ với danh sách ảnh phía trên.</p>
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
