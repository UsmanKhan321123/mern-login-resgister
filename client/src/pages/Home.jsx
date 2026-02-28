import { Link, Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-6 text-center text-slate-700">Loading...</div>;
  }

  if (user) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-cyan-50 via-white to-emerald-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center">
        <h1 className="text-3xl font-bold text-slate-900">Healthcare Role Portal</h1>
        <p className="mt-3 text-slate-600">
          Sign up or login to access your role-specific dashboard.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/login"
            className="px-5 py-2.5 rounded-md bg-slate-900 text-white font-medium hover:bg-slate-800"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 rounded-md border border-slate-300 text-slate-800 font-medium hover:bg-slate-50"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

