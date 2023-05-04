import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { accessToken } = useSelector((state) => state.authSlice);

  if (!accessToken) {
    return <Navigate to="/" replace={true} />;
  }
  return <Outlet />;
}
