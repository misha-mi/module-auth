import { useForm } from 'react-hook-form';
import './confirm-page.sass';
import postConfirm from '../../service/postConfirm';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../component/button/button';
import Input from '../../component/input/input';
import { useDispatch } from 'react-redux';
import { setIsAuth, setUser } from '../../store/slice';
import getUserByToken from '../../service/getUserByToken';

const ConfirmPage = () => {
  const { handleSubmit, register } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUser = () => {
    getUserByToken()
      .then((res) => dispatch(setUser(res.data)))
      .then(() => dispatch(setIsAuth(true)))
      .then(() => navigate('/users'))
      .catch(() => dispatch(setIsAuth(false)));
  };

  const onConfirm = ({ code }) => {
    postConfirm({
      code,
      confirmId: location.state.confirmId,
      userId: location.state.userId,
    })
      .then((res) => {
        localStorage.setItem('token', res.data.accessToken);
        dispatch(setUser(res.data.user));
      })
      .then(getUser)
      .catch(console.log);
  };

  return (
    <div className="confirm">
      <div className="container">
        <div className="confirm__wrapper">
          <div className="confirm__text">На почту отправлен код подтвержения</div>
          <form className="confirm__form">
            <Input placeholder={'Код подтверждения'} register={register('code')} />
            <Button text={'Подтвердить'} onClick={handleSubmit(onConfirm)} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
