import { notFound } from "next/navigation";
import { getCategoryById, getCategoryGroups } from "../../../../actions/category-actions";
import { EditCategoryForm } from "./edit-form";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await getCategoryById(parseInt(id));
  if (!category) notFound();

  const groups = await getCategoryGroups();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Sửa Danh mục</h2>
        <p className="text-gray-500 text-sm mt-1">Chỉnh sửa thông tin danh mục</p>
      </div>

      <EditCategoryForm category={category} groups={groups} />
    </div>
  );
}
