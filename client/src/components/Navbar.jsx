import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-slate-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-wide">
          Med Portal
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                to={`/dashboard/${user.role}`}
                className="rounded-md px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 transition"
              >
                Dashboard
              </Link>
              <span className="text-slate-200 text-sm hidden sm:block">
                {user.username} ({user.role})
              </span>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-rose-600 text-sm font-medium hover:bg-rose-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-200 font-medium hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

