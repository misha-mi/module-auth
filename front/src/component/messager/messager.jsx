import './messager.sass';
import Input from '../input/input';
import Button from '../button/button';
import Message from '../message/message';
import { useDispatch, useSelector } from 'react-redux';
import postMessage from '../../service/postMessage';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import io from 'socket.io-client';
import { pushMessage, setMessages } from '../../store/slice/chatsSlice';
import getMessages from '../../service/getMessages';
import { setIsAuth } from '../../store/slice/userSlice';

const socket = io.connect('http://localhost:5000');

const Messager = () => {
  const { handleSubmit, register } = useForm();

  const authUserId = useSelector((state) => state.user.user.id);
  const { id, userId } = useSelector((state) => state.chats.openChat);
  const messages = useSelector((state) => state.chats.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    getMessages(id)
      .then((res) => {
        dispatch(setMessages(res.data));
      })
      .catch(console.log);
  }, [id]);

  useEffect(() => {
    // перенести функционал на верхний уровень
    socket.emit('addNewUser', authUserId);

    socket.emit('getOnlineUsers');

    socket.on('getOnlineUsers', (res) => {
      console.log(res);
    });

    socket.on('sendMessage', (res) => {
      dispatch(pushMessage(res));
    });

    return () => {
      socket.disconnect(authUserId);
    };
  }, [socket]);

  const messageComponents = messages?.map((item, id) => {
    return (
      <Message
        text={item.text}
        time={'10.06.2022'}
        key={id}
        positionRight={item.senderId === authUserId}
      />
    );
  });

  const handlerSend = ({ text }) => {
    postMessage(text, id)
      .then(console.log)
      .catch(() => dispatch(setIsAuth(false)));
    socket.emit('sendMessage', { text, userId });
    dispatch(pushMessage({ text, senderId: authUserId })); // Пяткой писал? + настрой длину сообщения в Prisma
  };

  return (
    <div className="messager">
      <div className="messager__header">Pasha</div>
      <div className="messager__messages">
        {messageComponents?.length ? (
          messageComponents
        ) : (
          <div className="messager__empty">Чат пустой</div>
        )}
      </div>
      <div className="messager__input">
        <Input placeholder={'Введите сообщение'} register={register('text')} />
        <div className="messager__send">
          <Button text={'Отправить'} onClick={handleSubmit(handlerSend)} />
        </div>
      </div>
    </div>
  );
};

export default Messager;
