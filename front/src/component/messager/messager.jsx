import './messager.sass';
import Input from '../input/input';
import Button from '../button/button';

const Messager = () => {
  return (
    <div className="messager">
      <div className="messager__header">Pasha</div>
      <div className="messager__messages"></div>
      <div className="messager__input">
        <Input placeholder={'Введите сообщение'} />
        <div className="messager__send">
          <Button text={'Отправить'} />
        </div>
      </div>
    </div>
  );
};

export default Messager;
