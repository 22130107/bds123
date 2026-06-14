"use client";
import { deleteNews } from "../../../actions/news-actions";

export default function DeleteButton({ id }: { id: number }) {
  return (
    <button 
      onClick={async () => {
        if(confirm('Bạn có chắc muốn xóa bài viết này?')) {
          await deleteNews(id);
        }
      }}
      className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
      title="Xóa"
    >
      <span className="material-symbols-outlined text-[16px]">delete</span>
    </button>
  );
}
