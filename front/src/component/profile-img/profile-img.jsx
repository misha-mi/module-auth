import './profile-img.sass';
import noPhoto from '../../image/no_photo.jpg';
// import folderPng from '../../image/folder.png';
// import RoundButton from '../round-button/round-button';

const ProfileImg = ({ isOwner, register, getAvatar }) => {
  return (
    <div className="profileImg">
      <img src={noPhoto} alt="user" className="profileImg__img" />
      {isOwner ? (
        <div className="profileImg__button">
          {/* <RoundButton icon={folderPng} alt={'change'} /> */}
          <input type="file" accept=".png,.jpg,.jpeg" {...register} />
        </div>
      ) : null}
    </div>
  );
};

export default ProfileImg;
