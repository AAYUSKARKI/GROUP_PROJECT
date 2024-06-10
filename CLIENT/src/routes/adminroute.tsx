import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface AdminRouteProps {
  children?: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = () => {
  const { user } = useSelector((state: any) => state.user);

  return user?.user?.role === 'admin' ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
