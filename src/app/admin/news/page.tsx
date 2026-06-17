import Link from "next/link";
import { getNewsPaginated } from "../../../actions/news-actions";
import DeleteButton from "./delete-button";

export default async function NewsAdminPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
  const date = typeof searchParams.date === 'string' ? searchParams.date : undefined;
  const page = searchParams.page ? parseInt(searchParams.page as string, 10) : 1;

  const newsResult = await getNewsPaginated({ search, date, page, limit: 10 });
  const newsList = newsResult.data;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Tin tức</h1>
        <Link 
          href="/admin/news/new" 
          className="bg-earth-brown text-white px-4 py-2 rounded shadow hover:bg-earth-brown/90 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Thêm Bài viết
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <form method="GET" action="/admin/news" className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm</label>
            <input 
              type="text" 
              name="search" 
              defaultValue={search || ""} 
              placeholder="Tiêu đề, tóm tắt..." 
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-earth-brown"
            />
          </div>
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đăng</label>
            <input 
              type="date" 
              name="date" 
              defaultValue={date || ""} 
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-earth-brown h-[42px]"
            />
          </div>
          <button 
            type="submit" 
            className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors h-[42px] flex items-center justify-center font-medium"
          >
            Lọc
          </button>
          {(search || date) && (
            <Link 
              href="/admin/news"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors h-[42px] flex items-center justify-center font-medium"
            >
              Xóa lọc
            </Link>
          )}
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
              <th className="p-4 w-16 text-center">ID</th>
              <th className="p-4 w-24 text-center">Ảnh nổi bật</th>
              <th className="p-4 w-32">Chuyên mục</th>
              <th className="p-4">Tiêu đề bài viết</th>
              <th className="p-4 w-32 text-center">Ngày đăng</th>
              <th className="p-4 w-32 text-center">Trạng thái</th>
              <th className="p-4 w-24 text-center">Link</th>
              <th className="p-4 w-32 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {newsList.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
                  Chưa có dữ liệu. Bấm "Thêm Bài viết" để bắt đầu.
                </td>
              </tr>
            ) : (
              newsList.map((n) => (
                <tr key={n.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 text-center font-medium text-gray-500">#{n.id}</td>
                  <td className="p-4 text-center">
                    {n.img ? (
                      <img src={n.img} alt={n.title} className="w-16 h-12 object-cover rounded shadow-sm border border-gray-100 mx-auto" />
                    ) : (
                      <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400 mx-auto">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-label-caps text-xs font-bold text-earth-brown">{n.category}</td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{n.title}</div>
                    <div className="text-[11px] text-gray-400 mt-1 flex gap-2">
                      <span>({n.title.length} ký tự</span>
                      <span>•</span>
                      <span>{n.title.trim() === "" ? 0 : n.title.trim().split(/\s+/).length} từ)</span>
                    </div>
                  </td>
                  <td className="p-4 text-center text-gray-500">{n.date}</td>
                  <td className="p-4 text-center">
                    {n.status === 'published' ? (
                      <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">Hiển thị</span>
                    ) : n.status === 'draft' ? (
                      <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-full border border-gray-200">Nháp</span>
                    ) : (
                      <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">Ẩn</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <Link 
                      href={`/news/${n.id}`} 
                      target="_blank" 
                      className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors mx-auto"
                      title="Xem bài viết"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                    </Link>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link 
                        href={`/admin/news/${n.id}`}
                        className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                        title="Sửa"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </Link>
                      <DeleteButton id={n.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {newsResult.totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
            <span className="text-sm text-gray-500">
              Hiển thị trang <span className="font-medium text-gray-900">{newsResult.page}</span> / <span className="font-medium text-gray-900">{newsResult.totalPages}</span> (Tổng {newsResult.total} bài viết)
            </span>
            <div className="flex gap-1">
              {Array.from({ length: newsResult.totalPages }).map((_, i) => {
                const p = i + 1;
                const urlParams = new URLSearchParams();
                if (search) urlParams.set('search', search);
                if (date) urlParams.set('date', date);
                urlParams.set('page', p.toString());
                return (
                  <Link
                    key={p}
                    href={`/admin/news?${urlParams.toString()}`}
                    className={`w-8 h-8 flex items-center justify-center rounded text-sm transition-colors ${p === newsResult.page ? 'bg-earth-brown text-white font-medium' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'}`}
                  >
                    {p}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
