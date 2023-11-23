import axios from 'axios';

export default async function postMessage(text, chatId) {
  const response = await axios({
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5000',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'POST',
    data: { text, chatId },
    url: 'http://localhost:5000/auth-api/createMessage',
  });

  return response;
}
