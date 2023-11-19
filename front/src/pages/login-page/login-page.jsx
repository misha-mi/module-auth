import { useForm } from 'react-hook-form';
import './login-page.sass';
import postLogIn from '../../service/postLogin';
import { useNavigate } from 'react-router-dom';
import Title from '../../component/title/title';
import Input from '../../component/input/input';
import Button from '../../component/button/button';
import { useState } from 'react';

const LoginPage = () => {
  const { handleSubmit, register } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onLogin = (data) => {
    postLogIn(data)
      .then((res) => navigate('/confirm', { state: res.data }))
      .catch((res) => setError(res.response.data.message));
  };

  return (
    <div className="login">
      <Title title="Авторизация" />
      <form className="login__form">
        <Input register={register('email')} placeholder={'email'} />
        <Input register={register('password')} placeholder={'password'} />
        {error ? <div className="login__error">{error}</div> : null}
        <Button text={'Авторизоваться'} onClick={handleSubmit(onLogin)} />
      </form>
    </div>
  );
};

export default LoginPage;
