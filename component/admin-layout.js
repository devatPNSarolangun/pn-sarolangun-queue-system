import LogoutButton from "./logout-button";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col shrink-0">
        <div className="p-4 text-xl font-bold border-b bg-green-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2 text-lg font-semibold">
          <a
            href="/pidana"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Pidana
          </a>
          <a
            href="/perdata"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Perdata
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-gray-100 px-6 py-4 border-b flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pengadilan Negeri Sarolangun</h1>
          <LogoutButton />
        </header>

        <main className="p-6 overflow-auto flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
