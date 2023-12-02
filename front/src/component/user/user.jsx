import './user.sass';
import noPhoto from '../../image/no_photo.jpg';
import Button from '../button/button';
import postFindChat from '../../service/postFindChat';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = ({ id, name }) => {
  const authUserID = useSelector((state) => state.user.user.id);
  const navigate = useNavigate();
  const handlerFindChat = () => {
    postFindChat(id)
      .then((res) => navigate(`/chats?id=${res.data.id}`))
      .catch(console.log);
  };

  return (
    <div className="user">
      <img src={noPhoto} alt="avatar" className="user__photo" />
      <p className="user__name">{name}</p>
      <Button text={'Перейти к чату'} onClick={handlerFindChat} disable={id === authUserID} />
      <Button
        text={'Посмотреть профиль'}
        onClick={() => navigate(`/profile/${id}`)}
        disable={id === authUserID}
      />
    </div>
  );
};

export default User;
