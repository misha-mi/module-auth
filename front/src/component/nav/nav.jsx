import { useDispatch, useSelector } from 'react-redux';
import './nav.sass';
import { Link, useNavigate } from 'react-router-dom';
import postLogout from '../../service/postLogout';
import { logout } from '../../store/userSlice';

const Nav = () => {
  const name = useSelector((state) => state.user.user.name);
  const isAuth = useSelector((state) => state.user.isAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () =>
    postLogout()
      .then(() => localStorage.removeItem('token'))
      .then(() => dispatch(logout()))
      .then(() => navigate('/login'))
      .catch(console.log);

  return (
    <div className="nav">
      <div className="container">
        <div className="nav__wrapper">
          <div className="nav__title">MyChat</div>
          {isAuth ? <div className="nav__name">{name}</div> : null}
          <ul className="nav__links">
            {!isAuth ? (
              <>
                <li className="nav__link">
                  <Link to="/login">Авторизоваться</Link>
                </li>
                <li className="nav__link">
                  <Link to="/registration">Зарегистрироваться</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav__link">
                  <Link to="/chats">Чаты</Link>
                </li>
                <li className="nav__link">
                  <Link to="/">Все пользователи</Link>
                </li>
                <li className="nav__link">
                  <Link to="/my-profile">Мой профиль</Link>
                </li>
                <li className="nav__link" onClick={onLogout}>
                  Выйти
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
