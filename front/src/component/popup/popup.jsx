import Button from '../button/button';
import Input from '../input/input';
import { useForm } from 'react-hook-form';
import './popup.sass';

const Popup = ({ isOpen, onClose, onCreate }) => {
  const { handleSubmit, register } = useForm();

  const handlerCreate = async (data) => {
    console.log(data.name);
    await onCreate(data.name);
    onClose();
  };

  return (
    <>
      {isOpen ? (
        <div className="popup">
          <form className="popup__wrapper">
            <div className="popup__header">
              <div className="popup__title">Создать новую папку</div>
              <button onClick={onClose}>X</button>
            </div>
            <Input register={register('name')} placeholder={'Имя папки'} />
            <Button text={'Создать папку'} onClick={handleSubmit(handlerCreate)} />
          </form>
        </div>
      ) : null}
    </>
  );
};

export default Popup;
