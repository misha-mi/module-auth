import { useEffect, useState } from 'react';
import getUsers from '../../service/getUser';
import postLogout from '../../service/postLogout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../../store/slice';

const Users = () => {
  const [users, setUsers] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const content = [];

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res.data))
      .catch(() => dispatch(setIsAuth(false)));
  }, []);

  if (users) {
    users.map((item, id) => {
      content.push(
        <div key={id}>
          Пользователь {item.email} по id {item.id} со статусом активации:
          {item.isActivated.toString()}
        </div>,
      );
    });
  }

  return (
    <div className="">
      <div>{content.length ? content : 'wait'}</div>
    </div>
  );
};

export default Users;
