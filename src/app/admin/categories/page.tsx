import Link from "next/link";
import { getCategories, deleteCategory } from "../../../actions/category-actions";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Danh sách Danh mục</h2>
          <p className="text-gray-500 text-sm mt-1">Quản lý các thẻ phân loại bất động sản trên thanh điều hướng</p>
        </div>
        <Link 
          href="/admin/categories/new"
          className="bg-earth-brown text-white px-5 py-2.5 rounded-lg hover:bg-earth-brown/90 transition-colors flex items-center gap-2 font-medium shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Thêm danh mục
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-4 font-medium w-16">ID</th>
              <th className="px-6 py-4 font-medium">Tên danh mục</th>
              <th className="px-6 py-4 font-medium">Thuộc nhóm</th>
              <th className="px-6 py-4 font-medium w-32 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {categories.length > 0 ? categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 text-gray-500">#{cat.id}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{cat.name}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                    {cat.group_name}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <form action={async () => {
                      "use server";
                      await deleteCategory(cat.id);
                    }}>
                      <button type="submit" className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Chưa có danh mục nào. Hãy thêm danh mục mới!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
