import { getProjects } from "@/actions/project-actions";
import { getSpaces } from "@/actions/space-actions";
import { getNews } from "@/actions/news-actions";

export default async function AdminDashboard() {
  const projects = await getProjects();
  const spaces = await getSpaces();
  const news = await getNews();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Stats Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-earth-brown/10 flex items-center justify-center text-earth-brown">
            <span className="material-symbols-outlined">real_estate_agent</span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Tổng số Dự án</p>
            <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-antique-gold/10 flex items-center justify-center text-antique-gold">
            <span className="material-symbols-outlined">architecture</span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Không gian thư viện</p>
            <p className="text-2xl font-bold text-gray-900">{spaces.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
            <span className="material-symbols-outlined">newspaper</span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Bài viết Tin tức</p>
            <p className="text-2xl font-bold text-gray-900">{news.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Dự án mới cập nhật</h2>
        {projects.length === 0 ? (
          <p className="text-gray-500 text-sm">Chưa có dự án nào.</p>
        ) : (
          <div className="space-y-4">
            {projects.slice(0, 5).map((p: any) => (
              <div key={p.id} className="flex items-center justify-between border-b border-gray-50 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden">
                    {p.mainImg ? (
                      <img src={p.mainImg} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">image</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 line-clamp-1">{p.title}</p>
                    <p className="text-xs text-gray-500">{p.location} • {p.price}</p>
                  </div>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded">
                  {p.badge || 'N/A'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
