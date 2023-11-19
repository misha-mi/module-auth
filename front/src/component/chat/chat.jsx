import anonum from '../../image/anonum.png';
import './chat.sass';

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat__circle">
        <img src={anonum} alt="user" className="chat__photo" />
      </div>
      <div className="chat__name">Pasha</div>
      <div className="chat__data">Сегодня в 7:45</div>
    </div>
  );
};

export default Chat;
