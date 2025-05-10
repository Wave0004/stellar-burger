import { Navigate, useLocation } from 'react-router-dom';
import { FC, ReactElement } from 'react';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: ReactElement;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const location = useLocation();
  if (isAuth === null) {
    return <Preloader />;
  }
  if (onlyUnAuth && isAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
