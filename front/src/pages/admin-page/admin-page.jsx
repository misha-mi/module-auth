import './admin-page.sass';
import Title from '../../component/title/title';
import Button from '../../component/button/button';
import Input from '../../component/input/input';
import TeachersCardAdmin from '../../component/teachers-card-admin/teachers-card-admin';
import RegistrationTeacherPopup from '../../component/registration-teacher-popup/registration-teacher-popup';
import { useEffect, useState } from 'react';
import getTeachers from '../../service/getTeachers';

const AdminPage = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    getTeachers()
      .then((res) => setTeachers(res.data))
      .then(() => setIsLoading(false))
      .catch(console.log);
  }, []);

  return (
    <div className="adminPage">
      <div className="container">
        <div className="adminPage__title">
          <Title title={'Страница администратора'} />
        </div>
        <div className="adminPage__wrapper">
          <div className="adminPage__search">
            <Input placeholder="Поиск" />
          </div>
          <div className="adminPage__button">
            <Button
              text={'Создать учетную запись преподавателя'}
              onClick={() => setIsOpenPopup(true)}
            />
          </div>
        </div>
        <div className="adminPage__teachers">
          <Title title={'Учетные записи преподавателей'} />
          {isLoading
            ? 'Загрузка'
            : teachers?.map(({ id, name, surname, patronymic }) => (
                <TeachersCardAdmin key={id} name={`${surname} ${name} ${patronymic}`} id={id} />
              ))}
        </div>
        <RegistrationTeacherPopup
          isOpen={isOpenPopup}
          onClose={() => setIsOpenPopup(false)}
          setTeachers={setTeachers}
        />
      </div>
    </div>
  );
};

export default AdminPage;
