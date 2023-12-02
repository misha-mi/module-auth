import './round-button.sass';

const RoundButton = ({ icon, alt }) => {
  return (
    <button className="roundButton">
      <img src={icon} alt={alt} />
    </button>
  );
};

export default RoundButton;
