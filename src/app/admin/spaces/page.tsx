import Link from "next/link";
import { getSpaces } from "../../../actions/space-actions";
import DeleteButton from "./delete-button";

export default async function SpacesAdminPage() {
  const spaces = await getSpaces();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Không gian</h1>
        <Link 
          href="/admin/spaces/new" 
          className="bg-earth-brown text-white px-4 py-2 rounded shadow hover:bg-earth-brown/90 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Thêm Không gian
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
              <th className="p-4 w-16 text-center">ID</th>
              <th className="p-4 w-32">Bộ sưu tập</th>
              <th className="p-4 w-40">Danh mục</th>
              <th className="p-4">Tiêu đề</th>
              <th className="p-4 w-24 text-center">Số ảnh</th>
              <th className="p-4 w-32 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {spaces.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  Chưa có dữ liệu. Bấm "Thêm Không gian" để bắt đầu.
                </td>
              </tr>
            ) : (
              spaces.map((s) => {
                const imgCount = Array.isArray(s.images) ? s.images.length : 0;
                return (
                  <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="p-4 text-center font-medium text-gray-500">#{s.id}</td>
                    <td className="p-4 font-bold text-earth-brown">{s.collection}</td>
                    <td className="p-4 font-medium">{s.category}</td>
                    <td className="p-4 text-gray-900">{s.title}</td>
                    <td className="p-4 text-center font-medium">{imgCount}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link 
                          href={`/admin/spaces/${s.id}`}
                          className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                          title="Sửa"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                        </Link>
                        <DeleteButton id={s.id} />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
