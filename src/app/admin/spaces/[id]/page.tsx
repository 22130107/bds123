import Link from "next/link";
import SpaceForm from "../space-form";
import { getSpace } from "../../../../actions/space-actions";

export default async function EditSpacePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const space = await getSpace(parseInt(resolvedParams.id));

  if (!space) {
    return <div>Không tìm thấy không gian</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/spaces" className="text-gray-500 hover:text-earth-brown text-sm flex items-center gap-2 font-medium">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Quay lại danh sách
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">Sửa Không gian #{space.id}</h1>
      </div>

      <SpaceForm initialData={space} />
    </div>
  );
}
