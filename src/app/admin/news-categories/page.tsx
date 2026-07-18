import { getNewsCategories } from "../../../actions/news-category-actions";
import { NewsCategoryManager } from "./category-manager";
import { AddNewsCategoryForm } from "./add-form";

export default async function NewsCategoriesPage() {
  const categories = await getNewsCategories();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Danh mục Tin tức</h2>
          <p className="text-gray-500 text-sm mt-1">Quản lý các chuyên mục tin tức hiển thị trên website</p>
        </div>
      </div>

      <AddNewsCategoryForm />

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-4 font-medium w-16">ID</th>
              <th className="px-6 py-4 font-medium">Tên danh mục</th>
              <th className="px-6 py-4 font-medium w-40 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {categories.length > 0 ? categories.map((cat) => (
              <NewsCategoryManager key={cat.id} category={cat} />
            )) : (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  Chưa có danh mục nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
