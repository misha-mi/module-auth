import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import getUser from '../service/getUser';
import { setUser, setIsAuth } from '../store/userSlice';
import refresh from '../service/refresh';

// Надо написать на бэк isValid;

const PrivateRoute = ({ forAuthorized }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const isAuth = useSelector((state) => state.user.isAuth);
  const to = forAuthorized ? '/login' : '/';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const id = JSON.parse(atob(token.split('.')[1])).id;
      getUser(id)
        .then((res) => dispatch(setUser(res.data)))
        .then(() => dispatch(setIsAuth(true)))
        .catch(() => {
          refresh()
            .then((res) => {
              dispatch(setUser(res.data.user));
              localStorage.setItem('token', res.data.accessToken);
            })
            .then(() => dispatch(setIsAuth(true)))
            .catch(console.log);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [isAuth]);

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
