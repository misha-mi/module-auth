import { useEffect, useState } from 'react';
import anonum from '../../image/anonum.png';
import './chat.sass';
import getUser from '../../service/getUser';

const Chat = ({ id, userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(userId).then((res) => setUser(res.data));
  }, []);

  return (
    <div className="chat">
      <div className="chat__circle">
        <img src={anonum} alt="user" className="chat__photo" />
      </div>
      <div className="chat__wrapper1">
        <div className="chat__name">{user?.name}</div>
        <div className="chat__message">some message...</div>
      </div>
      <div className="chat__wrapper2">
        <div className="chat__data">Сегодня в 7:45</div>
        <div className="chat__circle-counter">2</div>
      </div>
    </div>
  );
};

export default Chat;
