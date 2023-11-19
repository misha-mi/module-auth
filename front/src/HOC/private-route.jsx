import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import getUserByToken from '../service/getUserByToken';
import { setUser, setIsAuth } from '../store/slice';

// Надо написать на бэк isValid;

const PrivateRoute = ({ forAuthorized }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const isAuth = useSelector((state) => state.user.isAuth);
  const to = forAuthorized ? '/login' : '/users';

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserByToken()
        .then((res) => dispatch(setUser(res.data)))
        .then(() => dispatch(setIsAuth(true)))
        .catch(() => dispatch(setIsAuth(false)))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Checking auth...</div>;
  }
  if (!(isAuth ^ forAuthorized)) {
    return <Outlet />;
  } else {
    return <Navigate to={to} />;
  }
};

export default PrivateRoute;