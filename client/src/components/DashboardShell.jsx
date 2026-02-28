import { useAuth } from "../context/AuthContext";

const DashboardShell = ({ title, children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mb-5">
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="text-slate-600 mt-1">
            Signed in as {user?.username} ({user?.role})
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardShell;

