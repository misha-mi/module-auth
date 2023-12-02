import './teachers-card-admin.sass';
import Button from '../button/button';

const TeachersCardAdmin = ({ name, id }) => {
  return (
    <div className="teachersCardAdmin">
      <div className="teachersCardAdmin__name">{name}</div>
      <div className="teachersCardAdmin__buttons">
        <Button text={'Удалить'} />
      </div>
    </div>
  );
};

export default TeachersCardAdmin;
