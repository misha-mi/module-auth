import './chats-page.sass';
import Chat from '../../component/chat/chat';
import Messager from '../../component/messager/messager';
import Title from '../../component/title/title';

const ChatsPage = () => {
  return (
    <div className="chats">
      <div className="container">
        <div className="chats__wrapper">
          <div className="chats__users">
            <Title title={'Чаты'} />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
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
