import './profile-page.sass';
import { useLocation } from 'react-router-dom';
import ProfileImg from '../../component/profile-img/profile-img';
import { useForm } from 'react-hook-form';
import FormStudent from '../../component/form-student/form-student';
import Button from '../../component/button/button';
import FormTeacher from '../../component/form-teacher/form-teacher';

const ProfilePage = ({ isOwner }) => {
  const lokation = useLocation().pathname.split('/profile/')[1];
  const { handleSubmit, register, control } = useForm();

  return (
    <div className="profile">
      <div className="container">
        <form className="profile__wrapper">
          <div className="profile__title">
            <ProfileImg isOwner={isOwner} register={register('avatar')} />
          </div>
          <div>
            {/* <FormStudent isOwner={isOwner} register={register} handleSubmit={handleSubmit} /> */}
            <FormTeacher
              isOwner={isOwner}
              register={register}
              handleSubmit={handleSubmit}
              control={control}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
