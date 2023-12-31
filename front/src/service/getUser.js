import axios from 'axios';

export default async function getUser(userId) {
  const response = await axios({
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5000',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'POST',
    data: { userId },
    url: 'http://localhost:5000/auth-api/user',
  });

  return response;
}
