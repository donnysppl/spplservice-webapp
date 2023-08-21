import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRouteProps {
  auth: boolean;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ auth }) => {
  console.log(auth);
  return auth ? <Outlet /> : <Navigate to={'/'} />;
};

export default ProtectedRoute;
