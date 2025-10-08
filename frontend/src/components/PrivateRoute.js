import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const userInfo = localStorage.getItem('userInfo');
  // If user info exists, render the child route (Outlet). Otherwise, redirect to login.
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;