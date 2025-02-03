import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';

const RoleProtectWrapper = ({ children, allowedRoles }) => {
  const { user } = useContext(UserDataContext);
  const location = useLocation();

  if (!allowedRoles.some(role => user.roles.includes(role))) {
    return <Navigate to="/home" replace />;
  }

  return  children;
};

export default RoleProtectWrapper;