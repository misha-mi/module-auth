import './message.sass';

const Message = ({ time, text, positionRight }) => {
  return (
    <div className={'message' + (positionRight ? ' message_right' : '')}>
      <div className="message__text">{text}</div>
      <div className="message__time">{time}</div>
    </div>
  );
};

export default Message;
