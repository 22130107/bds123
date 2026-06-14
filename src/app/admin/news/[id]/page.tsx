import Link from "next/link";
import NewsForm from "../news-form";
import { getNewsById } from "../../../../actions/news-actions";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const news = await getNewsById(parseInt(resolvedParams.id));

  if (!news) {
    return <div>Không tìm thấy bài viết</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/news" className="text-gray-500 hover:text-earth-brown text-sm flex items-center gap-2 font-medium">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Quay lại danh sách
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">Sửa Bài viết #{news.id}</h1>
      </div>

      <NewsForm initialData={news} />
    </div>
  );
}
