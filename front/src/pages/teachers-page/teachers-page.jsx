import { useEffect, useState } from 'react';
import getTeachers from '../../service/getTeachers';
import { useDispatch } from 'react-redux';
import './teachers-page.sass';
import User from '../../component/user/user';
import Title from '../../component/title/title';
import { setIsAuth } from '../../store/slice/userSlice';

const UsersPage = () => {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  let content = 'Нет преподавателей';

  useEffect(() => {
    setIsLoading(true);
    getTeachers()
      .then((res) => setUsers(res.data))
      .then(() => setIsLoading(false))
      .catch((res) => {
        if (res.response.status === 403) {
          dispatch(setIsAuth(false));
        }
      });
  }, []);

  if (!isLoading) {
    content = users?.map((item, id) => {
      return <User name={item.name} key={id} id={item.id} />;
    });
  }

  return (
    <div className="users">
      <div className="container">
        <div className="users__title">
          <Title title={'Преподаватели'} />
        </div>
        <div className="users__wrapper">{!isLoading ? content : 'wait'}</div>
      </div>
    </div>
  );
};

export default UsersPage;
