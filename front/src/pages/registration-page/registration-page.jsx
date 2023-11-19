import './registration-page.sass';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import postRegistration from '../../service/postRegistration';
import Title from '../../component/title/title';
import Input from '../../component/input/input';
import Button from '../../component/button/button';
import { useState } from 'react';

const RegistrationPage = () => {
  const { handleSubmit, register } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onRegister = (data) => {
    postRegistration(data)
      .then((res) => localStorage.setItem('token', res.data.accessToken))
      .then(() => navigate('/activate'))
      .catch((res) => setError(res.response.data.message));
  };

  return (
    <div className="registration">
      <Title title={'Регистрация'} />
      <form className="registration__form">
        <Input register={register('name')} placeholder={'name'} />
        <Input register={register('email')} placeholder={'email'} />
        <Input register={register('password')} placeholder={'password'} />
        {error ? <div className="login__error">{error}</div> : null}
        <Button text={'Зарегистрироваться'} onClick={handleSubmit(onRegister)} />
      </form>
    </div>
  );
};

export default RegistrationPage;
