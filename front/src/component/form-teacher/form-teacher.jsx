import Input from '../input/input';
import './form-teacher.sass';
import Button from '../button/button';
import { Controller, useFieldArray } from 'react-hook-form';

const FormTeacher = ({ isOwner, register, handleSubmit, control }) => {
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'positions', // unique name for your Field Array
  });
  return (
    <>
      {isOwner ? (
        <div className="formTeacher__inputs">
          <Input placeholder={'Имя'} register={register('name')} />
          <Input placeholder={'Фамилия'} register={register('surname')} />
          <Input placeholder={'Отчество'} register={register('patronymic')} />
          <ul>
            {fields.map((item, index) => (
              <li key={item.id}>
                <Controller
                  render={({ field }) => <Input register={field} />}
                  name={`positions.${index}`}
                  control={control}
                />
                <button type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => append('')}>
            append
          </button>
          <input type="submit" />
          <Input placeholder={'E-mail'} register={register('email')} />
          <Input placeholder={'Телефон'} register={register('tell')} />

          <Button text={'push'} onClick={handleSubmit(console.log)} />
        </div>
      ) : (
        <div className="formTeacher">
          <div className="formTeacher_fs50">Павел Павлов Павлович</div>
          <div className="formTeacher_fs35">Профессор кафедры ИБ</div>
          <div className="formTeacher_fs35">И вообще супер человека</div>
          <div className="formTeacher_fs25">
            <span>E-mail: </span>
            misha@misha.ru
          </div>
          <div className="formTeacher_fs25">
            <span>Телефон: </span>
            8-888-888-88-88
          </div>
        </div>
      )}
    </>
  );
};

export default FormTeacher;
