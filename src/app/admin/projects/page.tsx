import Link from "next/link";
import { getProjectsPaginated, getAllLocations } from "../../../actions/project-actions";
import DeleteButton from "./delete-button";

export default async function ProjectsAdminPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
  const location = typeof searchParams.location === 'string' ? searchParams.location : undefined;
  const page = searchParams.page ? parseInt(searchParams.page as string, 10) : 1;

  const [projectsResult, locations] = await Promise.all([
    getProjectsPaginated({ search, location, page, limit: 10 }),
    getAllLocations()
  ]);
  const projects = projectsResult.data;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Dự án</h1>
        <Link 
          href="/admin/projects/new" 
          className="bg-earth-brown text-white px-4 py-2 rounded shadow hover:bg-earth-brown/90 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Thêm Dự án mới
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <form method="GET" action="/admin/projects" className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm</label>
            <input 
              type="text" 
              name="search" 
              defaultValue={search || ""} 
              placeholder="Tên, vị trí, mô tả..." 
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-earth-brown"
            />
          </div>
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm</label>
            <select 
              name="location" 
              defaultValue={location || ""} 
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-earth-brown bg-white"
            >
              <option value="">Tất cả</option>
              {locations.map((loc) => (
                <option key={loc.name} value={loc.name}>{loc.name}</option>
              ))}
            </select>
          </div>
          <button 
            type="submit" 
            className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors h-[42px] flex items-center justify-center font-medium"
          >
            Lọc
          </button>
          {(search || location) && (
            <Link 
              href="/admin/projects"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors h-[42px] flex items-center justify-center font-medium"
            >
              Xóa lọc
            </Link>
          )}
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
              <th className="p-4 w-16 text-center">ID</th>
              <th className="p-4 w-24 text-center">Ảnh nổi bật</th>
              <th className="p-4">Tên Dự án</th>
              <th className="p-4 w-48">Vị trí</th>
              <th className="p-4 w-32">Giá</th>
              <th className="p-4 w-24 text-center">Nổi bật</th>
              <th className="p-4 w-32 text-center">Trạng thái</th>
              <th className="p-4 w-24 text-center">Link</th>
              <th className="p-4 w-32 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-gray-500">
                  Chưa có dữ liệu. Bấm "Thêm Dự án mới" để bắt đầu.
                </td>
              </tr>
            ) : (
              projects.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 text-center font-medium text-gray-500">#{p.id}</td>
                  <td className="p-4 text-center">
                    {p.mainImg ? (
                      <img src={p.mainImg} alt={p.title} className="w-16 h-12 object-cover rounded shadow-sm border border-gray-100 mx-auto" />
                    ) : (
                      <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400 mx-auto">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-medium text-gray-900">{p.title}</td>
                  <td className="p-4 text-gray-500 truncate max-w-[200px]">{p.location}</td>
                  <td className="p-4 font-medium text-earth-brown">{p.price}</td>
                  <td className="p-4 text-center">
                    {p.isFeatured ? (
                      <span className="material-symbols-outlined text-green-500 text-[20px]">check_circle</span>
                    ) : (
                      <span className="material-symbols-outlined text-gray-300 text-[20px]">cancel</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {p.status === 'published' ? (
                      <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">Hiển thị</span>
                    ) : p.status === 'draft' ? (
                      <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-full border border-gray-200">Nháp</span>
                    ) : (
                      <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">Ẩn</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <Link 
                      href={`/detail/${p.id}`} 
                      target="_blank" 
                      className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors mx-auto"
                      title="Xem dự án"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                    </Link>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link 
                        href={`/admin/projects/${p.id}`}
                        className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                        title="Sửa"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </Link>
                      <DeleteButton id={p.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        {projectsResult.totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
            <span className="text-sm text-gray-500">
              Hiển thị trang <span className="font-medium text-gray-900">{projectsResult.page}</span> / <span className="font-medium text-gray-900">{projectsResult.totalPages}</span> (Tổng {projectsResult.total} dự án)
            </span>
            <div className="flex gap-1">
              {Array.from({ length: projectsResult.totalPages }).map((_, i) => {
                const p = i + 1;
                const urlParams = new URLSearchParams();
                if (search) urlParams.set('search', search);
                if (location) urlParams.set('location', location);
                urlParams.set('page', p.toString());
                return (
                  <Link
                    key={p}
                    href={`/admin/projects?${urlParams.toString()}`}
                    className={`w-8 h-8 flex items-center justify-center rounded text-sm transition-colors ${p === projectsResult.page ? 'bg-earth-brown text-white font-medium' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'}`}
                  >
                    {p}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
