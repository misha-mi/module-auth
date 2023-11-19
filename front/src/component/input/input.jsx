import './input.sass';

const Input = ({ register, placeholder }) => {
  return <input className="input" {...register} placeholder={placeholder} />;
};

export default Input;
