import { Link } from 'react-router-dom';
import './activate-page.sass';

const ActivatePage = () => {
  return (
    <div className="activate">
      <div className="activate__text">
        Пожалуйста подтвердите регистрацию, перейдя по ссылке отправленной на вашу почту
      </div>
      <div className="activate__text">
        После подтверждения перейдите по ссылке ниже, чтобы авторизоваться.
      </div>
      <div className="activate__link">
        <Link to="/login">Авторизация</Link>
      </div>
    </div>
  );
};

export default ActivatePage;
