import Input from '../input/input';
import './form-student.sass';
import Button from '../button/button';

const FormStudent = ({ isOwner, register, handleSubmit }) => {
  return (
    <>
      {isOwner ? (
        <div className="formStudent__inputs">
          <Input placeholder={'Имя'} register={register('name')} />
          <Input placeholder={'Фамилия'} register={register('surname')} />
          <Input placeholder={'Отчество'} register={register('patronymic')} />
          <Input placeholder={'Номер групы'} register={register('group')} />
          <Input
            placeholder={'Наименование образовательной программы'}
            register={register('direction')}
          />
          <Input placeholder={'E-mail'} register={register('email')} />
          <Input placeholder={'Телефон'} register={register('tell')} />

          <Button text={'push'} onClick={handleSubmit(console.log)} />
        </div>
      ) : (
        <div className="formStudent">
          <div className="formStudent_fs50">Павел Павлов Павлович</div>
          <div className="formStudent_fs35">Студент группы 28Т</div>
          <div className="formStudent_fs35">Направления такого-то</div>
          <div className="formStudent_fs25">
            <span>E-mail: </span>
            misha@misha.ru
          </div>
          <div className="formStudent_fs25">
            <span>Телефон: </span>
            8-888-888-88-88
          </div>
        </div>
      )}
    </>
  );
};

export default FormStudent;
