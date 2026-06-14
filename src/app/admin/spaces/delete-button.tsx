"use client";
import { deleteSpace } from "../../../actions/space-actions";

export default function DeleteButton({ id }: { id: number }) {
  return (
    <button 
      onClick={async () => {
        if(confirm('Bạn có chắc muốn xóa không gian này?')) {
          await deleteSpace(id);
        }
      }}
      className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
      title="Xóa"
    >
      <span className="material-symbols-outlined text-[16px]">delete</span>
    </button>
  );
}
