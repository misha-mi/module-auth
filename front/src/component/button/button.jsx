import './button.sass';

const Button = ({ text, onClick, disable }) => {
  return (
    <button className="button" onClick={onClick} disabled={disable}>
      {text}
    </button>
  );
};

export default Button;
