import Link from "next/link";
import NewsForm from "../news-form";

export default function NewNewsPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/news" className="text-gray-500 hover:text-earth-brown text-sm flex items-center gap-2 font-medium">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Quay lại danh sách
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">Thêm Bài viết mới</h1>
      </div>

      <NewsForm />
    </div>
  );
}
