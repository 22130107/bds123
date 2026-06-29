"use client";
import { useState, useEffect, useMemo } from "react";
import { createProject, updateProject } from "../../../actions/project-actions";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

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

export default function ProjectForm({ initialData, categories = [] }: { initialData?: any, categories?: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>(initialData?.images || []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!initialData?.slug);

  const allPreviews = [
    ...existingImages.map((url, i) => ({ type: 'url', src: url, index: i })),
    ...newFiles.map((file, i) => ({ type: 'file', src: URL.createObjectURL(file), index: i }))
  ];

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    meta_description: initialData?.meta_description || "",
    schema_markup: initialData?.schema_markup || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    area: initialData?.area || 0,
    bedrooms: initialData?.bedrooms || 0,
    bathrooms: initialData?.bathrooms || 0,
    badge: initialData?.badge || "",
    category: initialData?.category || "",
    isFeatured: initialData?.isFeatured ? true : false,
    type: initialData?.type || "listing",
    status: initialData?.status || "published",
    // Thông tin khác
    width: initialData?.width || "",
    length: initialData?.length || "",
    direction: initialData?.direction || "",
    frontRoad: initialData?.frontRoad || "",
    legal: initialData?.legal || "",
    floors: initialData?.floors || "",
    hasKitchen: initialData?.hasKitchen ? true : false,
    hasDiningRoom: initialData?.hasDiningRoom ? true : false,
    hasTerrace: initialData?.hasTerrace ? true : false,
    hasParking: initialData?.hasParking ? true : false,
  });

  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);

  const initialLocParts = (initialData?.location || "").split(',').map((s: string) => s.trim());
  const initialProvince = initialLocParts.length > 2 ? initialLocParts[initialLocParts.length - 1] : "";
  const initialDistrict = initialLocParts.length > 2 ? initialLocParts[initialLocParts.length - 2] : "";
  const initialStreet = initialLocParts.length > 2 ? initialLocParts.slice(0, initialLocParts.length - 2).join(', ') : (initialData?.location || "");

  const [selectedProvince, setSelectedProvince] = useState(initialProvince);
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [street, setStreet] = useState(initialStreet);

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/?depth=2')
      .then(res => res.json())
      .then(data => {
        setProvinces(data);
        if (initialProvince) {
          // Cố gắng tìm tỉnh cũ để render ra danh sách huyện
          const p = data.find((x: any) => x.name === initialProvince || x.name.includes(initialProvince) || initialProvince.includes(x.name));
          if (p) setDistricts(p.districts);
        }
      });
  }, [initialProvince]);

  // Auto-generate slug from title khi user chưa chỉnh tay
  useEffect(() => {
    if (!slugManuallyEdited && formData.title) {
      setFormData(prev => ({ ...prev, slug: clientSlugify(prev.title) }));
    }
  }, [formData.title, slugManuallyEdited]);

  const handleProvinceChange = (e: any) => {
    const pName = e.target.value;
    setSelectedProvince(pName);
    setSelectedDistrict("");
    const p = provinces.find((x: any) => x.name === pName);
    if (p) setDistricts(p.districts);
    else setDistricts([]);
  };

  const handleDistrictChange = (e: any) => {
    setSelectedDistrict(e.target.value);
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (name === 'slug') {
      setSlugManuallyEdited(true);
    }
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleResetSlug = () => {
    setSlugManuallyEdited(false);
    setFormData(prev => ({ ...prev, slug: clientSlugify(prev.title) }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormData(prev => ({ ...prev, description: value }));
  };



  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files) as File[];
    setNewFiles(prev => [...prev, ...files]);
    e.target.value = '';
  };

  const removeImage = (item: { type: string, src: string, index: number }) => {
    if (item.type === 'url') {
      setExistingImages(prev => prev.filter((_, i) => i !== item.index));
    } else {
      setNewFiles(prev => prev.filter((_, i) => i !== item.index));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data = new FormData(e.target);
      
      data.delete('imageFiles');
      newFiles.forEach(file => {
        data.append('imageFiles', file);
      });

      // Gửi danh sách ảnh cũ lên server để bảo toàn
      data.append('existingImages', JSON.stringify(existingImages));

      if (initialData?.id) {
        await updateProject(initialData.id, data);
      } else {
        await createProject(data);
      }
      router.push("/admin/projects");
    } catch (error) {
      alert("Có lỗi xảy ra: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên dự án *</label>
          <input required name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown focus:border-transparent outline-none" />
          <div className="flex gap-4 text-xs text-gray-500 mt-1">
            <span>Đã nhập: <strong className="text-gray-700">{formData.title.length}</strong> ký tự</span>
            <span>•</span>
            <span><strong className="text-gray-700">{formData.title.trim() === "" ? 0 : formData.title.trim().split(/\s+/).length}</strong> từ</span>
          </div>
        </div>

        {/* Slug URL */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug URL
            <span className="text-xs text-gray-400 font-normal ml-2">(tự động sinh từ tiêu đề, có thể chỉnh sửa)</span>
          </label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-earth-brown overflow-hidden">
              <span className="px-3 py-2 bg-gray-50 text-gray-500 text-sm border-r border-gray-300 whitespace-nowrap">/detail/</span>
              <input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="slug-du-an"
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
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Description (SEO)
            <span className="text-xs text-gray-400 font-normal ml-2">(Mô tả hiển thị trên Google, nên 150-160 ký tự)</span>
          </label>
          <textarea
            name="meta_description"
            value={formData.meta_description}
            onChange={handleChange}
            rows={2}
            placeholder="Nhập mô tả SEO cho dự án. Nếu để trống sẽ dùng Description."
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none"
          />
          <div className="flex gap-4 text-xs mt-1">
            <span className={`${formData.meta_description.length > 160 ? 'text-red-500' : 'text-gray-500'}`}>
              {formData.meta_description.length}/160 ký tự
              {formData.meta_description.length > 160 && ' ⚠ Quá dài'}
            </span>
            {!formData.meta_description && <span className="text-amber-500">Sẽ dùng Description làm meta description</span>}
          </div>
        </div>

        {/* Schema Markup / Script / Raw HTML */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mã HTML/Script tùy chỉnh (Schema, Tracking, Custom JS/CSS)
            <span className="text-xs text-gray-400 font-normal ml-2">(Sẽ render trực tiếp vào mã nguồn HTML)</span>
          </label>
          <textarea
            name="schema_markup"
            value={formData.schema_markup}
            onChange={handleChange}
            rows={6}
            placeholder={'<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "Product",\n  "name": "Tên dự án"\n}\n</script>\n\n<h1>Thẻ tùy chỉnh</h1>'}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none font-mono text-sm bg-gray-50"
            style={{ tabSize: 2 }}
          />
          <p className="text-xs text-gray-400 mt-1">
            Nhập mã HTML/Script tự do. Nếu là Schema JSON-LD, bạn vui lòng tự nhập cả thẻ <code className="bg-gray-100 px-1 rounded">&lt;script type="application/ld+json"&gt;</code> bao bọc bên ngoài.
          </p>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
          <div className="border border-gray-300 rounded focus-within:ring-2 focus-within:ring-earth-brown">
            <input type="hidden" name="description" value={formData.description} />
            <QuillEditor
              value={formData.description}
              onChange={handleDescriptionChange}
              className="bg-white min-h-[250px] rounded"
            />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Vị trí (Location) *</label>
          </div>
          <div>
            <select value={selectedProvince} onChange={handleProvinceChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none bg-white">
              <option value="">Chọn Tỉnh/Thành phố</option>
              {provinces.map(p => <option key={p.code} value={p.name}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <select value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedProvince} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed">
              <option value="">Chọn Quận/Huyện</option>
              {districts.map(d => <option key={d.code} value={d.name}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <input required placeholder="Số nhà, tên đường..." value={street} onChange={e => setStreet(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none" />
          </div>
          {/* Trường ẩn để gửi data dưới dạng 1 chuỗi lên Server */}
          <input type="hidden" name="location" value={[street, selectedDistrict, selectedProvince].filter(Boolean).join(', ')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán (VD: 21 Tỷ VNĐ) *</label>
          <input required name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Diện tích (m2)</label>
          <input type="number" name="area" value={formData.area} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số phòng ngủ</label>
            <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số phòng tắm</label>
            <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded outline-none" />
          </div>
        </div>

        {/* Khu vực Upload Ảnh */}
        <div className="col-span-1 md:col-span-2 p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
          <label className="block text-sm font-medium text-gray-900 mb-2">Tải ảnh lên Local (Nhiều ảnh)</label>
          <input 
            type="file" 
            multiple 
            accept="image/*"
            onChange={handleFileChange}
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-earth-brown file:text-white hover:file:bg-earth-brown/90 cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-2">Bạn có thể quét chọn nhiều ảnh cùng lúc từ máy tính. Ảnh tải lên sẽ được lưu tự động vào Server.</p>
          
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
                    {i === 0 ? "MAIN IMG" : `SIDE IMG ${i}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục (Category)</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded outline-none bg-white">
            <option value="">-- Chọn danh mục --</option>
            {Array.from(new Set(categories.map(c => c.group_name))).map(groupName => (
              <optgroup key={groupName as string} label={groupName as string}>
                {categories.filter(c => c.group_name === groupName).map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nhãn (Badge - VD: MỚI NHẤT)</label>
          <input name="badge" value={formData.badge} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loại hiển thị</label>
          <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded outline-none bg-white">
            <option value="listing">Danh sách thông thường (Listing)</option>
            <option value="tailored">Đề xuất cá nhân hóa (Tailored)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái *</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded outline-none bg-white">
            <option value="published">Xuất bản (Hiển thị)</option>
            <option value="draft">Lưu nháp (Bản nháp)</option>
            <option value="unpublished">Tạm hạ bài (Ẩn)</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2 flex items-center gap-2 mt-4">
          <input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-5 h-5 text-earth-brown rounded focus:ring-earth-brown" />
          <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">Hiển thị nổi bật ở Trang chủ (Dự án nổi bật)</label>
        </div>

        {/* Các thông tin khác */}
        <div className="col-span-1 md:col-span-2 border-t border-gray-100 pt-6 mt-4">
          <h3 className="text-sm font-semibold text-white bg-earth-brown px-4 py-2.5 rounded shadow-sm mb-6">Các thông tin khác</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Cột 1: Chiều ngang, Hướng, Pháp lý */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chiều ngang</label>
                <div className="relative flex items-center">
                  <input type="number" step="any" name="width" value={formData.width} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none pr-8 bg-white" />
                  <span className="absolute right-3 text-gray-400 text-sm">m</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hướng</label>
                <select name="direction" value={formData.direction} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none bg-white">
                  <option value="">Không xác định</option>
                  <option value="Đông">Đông</option>
                  <option value="Tây">Tây</option>
                  <option value="Nam">Nam</option>
                  <option value="Bắc">Bắc</option>
                  <option value="Đông Nam">Đông Nam</option>
                  <option value="Đông Bắc">Đông Bắc</option>
                  <option value="Tây Nam">Tây Nam</option>
                  <option value="Tây Bắc">Tây Bắc</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pháp lý</label>
                <select name="legal" value={formData.legal} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none bg-white">
                  <option value="">Chọn</option>
                  <option value="Sổ đỏ">Sổ đỏ</option>
                  <option value="Sổ hồng">Sổ hồng</option>
                  <option value="Hợp đồng mua bán">Hợp đồng mua bán</option>
                  <option value="Đang chờ sổ">Đang chờ sổ</option>
                </select>
              </div>
            </div>

            {/* Cột 2: Chiều dài, Đường trước nhà, Số lầu */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chiều dài</label>
                <div className="relative flex items-center">
                  <input type="number" step="any" name="length" value={formData.length} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none pr-8 bg-white" />
                  <span className="absolute right-3 text-gray-400 text-sm">m</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Đường trước nhà</label>
                <div className="relative flex items-center">
                  <input type="number" step="any" name="frontRoad" value={formData.frontRoad} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none pr-8 bg-white" />
                  <span className="absolute right-3 text-gray-400 text-sm">m</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số lầu</label>
                <input type="number" name="floors" value={formData.floors} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-earth-brown outline-none bg-white" />
              </div>
            </div>

            {/* Cột 3: Tiện ích khác */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tiện ích khác</label>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 space-y-3.5">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" name="hasKitchen" checked={formData.hasKitchen} onChange={handleChange} className="w-5 h-5 text-earth-brown border-gray-300 rounded focus:ring-earth-brown accent-earth-brown" />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium">Nhà bếp</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" name="hasDiningRoom" checked={formData.hasDiningRoom} onChange={handleChange} className="w-5 h-5 text-earth-brown border-gray-300 rounded focus:ring-earth-brown accent-earth-brown" />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium">Phòng ăn</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" name="hasTerrace" checked={formData.hasTerrace} onChange={handleChange} className="w-5 h-5 text-earth-brown border-gray-300 rounded focus:ring-earth-brown accent-earth-brown" />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium">Sân thượng</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" name="hasParking" checked={formData.hasParking} onChange={handleChange} className="w-5 h-5 text-earth-brown border-gray-300 rounded focus:ring-earth-brown accent-earth-brown" />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium">Chỗ để xe hơi</span>
                </label>
              </div>
            </div>
        </div>
      </div>
    </div>

      <div className="flex justify-end gap-4 border-t border-gray-100 pt-6">
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-medium transition-colors">
          Hủy
        </button>
        <button type="submit" disabled={loading} className="px-6 py-2 bg-earth-brown text-white rounded font-medium hover:bg-earth-brown/90 transition-colors disabled:opacity-50">
          {loading ? "Đang xử lý..." : "Lưu Dự án"}
        </button>
      </div>
    </form>
  );
}
