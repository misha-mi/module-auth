import './chats-page.sass';
import Chat from '../../component/chat/chat';
import Messager from '../../component/messager/messager';
import Title from '../../component/title/title';
import { useEffect, useState } from 'react';
import getChats from '../../service/getChats';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenChat, setChats } from '../../store/slice/chatsSlice';
import { setIsAuth } from '../../store/slice/userSlice';

const ChatsPage = () => {
  const dispatch = useDispatch();
  const chats = useSelector((store) => store.chats.chats);
  const [loadingChats, setLoadingChats] = useState(true);

  useEffect(() => {
    getChats()
      .then((res) => {
        if (res.data.chats?.length) {
          dispatch(setChats(res.data.chats));
          dispatch(setOpenChat(res.data.chats[0]));
        }
      }) // захер slice то создал?
      .then(() => setLoadingChats(false))
      .catch(() => dispatch(setIsAuth(false)));
  }, []);

  const handlerChooseChat = (chatData) => {
    dispatch(setOpenChat(chatData));
  };

  return (
    <div className="chats">
      <div className="container">
        <div className="chats__wrapper">
          <div className="chats__users">
            <Title title={'Чаты'} />
            {loadingChats
              ? 'Загрузка'
              : chats.map(({ id, userId }) => (
                  <div key={id} onClick={() => handlerChooseChat({ id, userId })}>
                    <Chat id={id} userId={userId} />
                  </div>
                ))}
          </div>
          <div className="chats__messager">
            <Messager />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;
