import { getCategoryGroups } from "../../../../actions/category-actions";
import CategoryForm from "../category-form";

export default async function NewCategoryPage() {
  const groups = await getCategoryGroups();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Thêm Danh mục mới</h2>
        <p className="text-gray-500 text-sm mt-1">Quản lý các danh mục phân loại bất động sản</p>
      </div>

      <CategoryForm groups={groups} />
    </div>
  );
}
