import { useEffect, useState } from 'react';
import getUsers from '../../service/getUsers';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../../store/userSlice';
import './users-page.sass';
import User from '../../component/user/user';
import Title from '../../component/title/title';

const UsersPage = () => {
  const [users, setUsers] = useState();
  const dispatch = useDispatch();
  const content = [];

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res.data))
      .catch(() => dispatch(setIsAuth(false)));
  }, []);

  if (users) {
    users.map((item, id) => {
      content.push(<User name={item.name} key={id} id={item.id} />);
    });
  }

  return (
    <div className="users">
      <div className="container">
        <div className="users__title">
          <Title title={'Преподаватели'} />
        </div>
        <div className="users__wrapper">{content.length ? content : 'wait'}</div>
      </div>
    </div>
  );
};

export default UsersPage;
