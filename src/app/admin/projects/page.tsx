import Link from "next/link";
import { getProjects } from "../../../actions/project-actions";
import DeleteButton from "./delete-button";

export default async function ProjectsAdminPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Dự án</h1>
        <Link 
          href="/admin/projects/new" 
          className="bg-earth-brown text-white px-4 py-2 rounded shadow hover:bg-earth-brown/90 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Thêm Dự án mới
        </Link>
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
              <th className="p-4 w-24 text-center">Link</th>
              <th className="p-4 w-32 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
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
      </div>
    </div>
  );
}
