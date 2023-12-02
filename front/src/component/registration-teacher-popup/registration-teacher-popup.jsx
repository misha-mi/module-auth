import { useForm } from 'react-hook-form';
import Button from '../button/button';
import Input from '../input/input';
import './registration-teacher-popup.sass';
import { useState } from 'react';
import postRegistrationTeacher from '../../service/postRegistrationTeacher';

const RegistrationTeacherPopup = ({ isOpen, onClose, setTeachers }) => {
  const { handleSubmit, register } = useForm();
  const [status, setStatus] = useState('');

  const onRegister = (data) => {
    postRegistrationTeacher(data)
      .then((res) => {
        onClose();
        setTeachers((state) => [res.data, ...state]);
      })
      .catch((res) => setStatus(res.response.data.message));
  };

  return (
    <>
      {isOpen ? (
        <div className="registrationTeacherPopup">
          <div className="registrationTeacherPopup__wrapper">
            <div className="popup__header">
              <div className="registrationTeacherPopup__title">Зарегистрировать преподавателя</div>
              <button onClick={onClose}>X</button>
            </div>
            <form className="registration__form">
              <Input register={register('name')} placeholder={'name'} />
              <Input register={register('patronymic')} placeholder={'patronymic'} />
              <Input register={register('surname')} placeholder={'surname'} />
              <Input register={register('email')} placeholder={'email'} />
              <Input register={register('password')} placeholder={'password'} />
              <Button text={'Зарегистрировать'} onClick={handleSubmit(onRegister)} />
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RegistrationTeacherPopup;
