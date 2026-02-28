import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const PublicOnlyRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-6 text-center text-slate-600">Loading...</div>;
  }

  if (user) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;

