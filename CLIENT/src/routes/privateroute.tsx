import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
  const { user } = useSelector((state: any) => state.user);

  return user?.user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
