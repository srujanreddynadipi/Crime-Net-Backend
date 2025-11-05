export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-yellow-50 to-lime-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">Admin Dashboard</h1>
          <a href="/" className="text-sm text-indigo-600 hover:underline">Go Home</a>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur border border-slate-200 rounded-xl p-4">
            <h2 className="text-slate-700 font-medium">Overview</h2>
            <p className="text-slate-500 text-sm mt-1">This is a placeholder admin dashboard.</p>
          </div>
          <div className="bg-white/80 backdrop-blur border border-slate-200 rounded-xl p-4">
            <h2 className="text-slate-700 font-medium">Users</h2>
            <p className="text-slate-500 text-sm mt-1">Manage users and roles.</p>
          </div>
          <div className="bg-white/80 backdrop-blur border border-slate-200 rounded-xl p-4">
            <h2 className="text-slate-700 font-medium">Settings</h2>
            <p className="text-slate-500 text-sm mt-1">Configure system options.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
