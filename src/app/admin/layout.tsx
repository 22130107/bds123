import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900" style={{ alignItems: 'flex-start' }}>
      <aside className="w-64 bg-earth-brown text-white shadow-xl flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-display-lg font-bold tracking-widest text-antique-gold">QUẢN TRỊ</h1>
          <p className="text-xs text-white/50 mt-1">BATDONGSAN CMS</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 font-body-md text-sm">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Tổng quan
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[20px]">real_estate_agent</span>
            Quản lý Dự án
          </Link>
          <Link href="/admin/spaces" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[20px]">architecture</span>
            Quản lý Không gian
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[20px]">category</span>
            Quản lý Danh mục
          </Link>
          <Link href="/admin/news" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[20px]">newspaper</span>
            Quản lý Tin tức
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[20px]">contact_phone</span>
            Cài đặt Liên hệ
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-antique-gold">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Về trang chủ
          </Link>
        </div>
      </aside>

      <main className="flex-1 min-h-screen">
        <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-lg font-bold text-gray-700">Hệ thống quản trị</h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-earth-brown rounded-full flex items-center justify-center text-white font-bold text-xs">
              AD
            </div>
            <span className="text-sm font-medium">Administrator</span>
          </div>
        </header>

        <div className="p-8 pb-24">
          {children}
        </div>
      </main>
    </div>
  );
}
