import Link from "next/link";
import ProjectForm from "../project-form";
import { getProject } from "../../../../actions/project-actions";
import { getCategories } from "../../../../actions/category-actions";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = await getProject(parseInt(resolvedParams.id));
  const categories = await getCategories();

  if (!project) {
    return <div>Không tìm thấy dự án</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/projects" className="text-gray-500 hover:text-earth-brown text-sm flex items-center gap-2 font-medium">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Quay lại danh sách
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">Sửa Dự án #{project.id}</h1>
      </div>

      <ProjectForm initialData={project} categories={categories} />
    </div>
  );
}
