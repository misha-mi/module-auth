import axios from 'axios';

export default async function getUsers() {
  const response = await axios({
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5000',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'GET',
    url: 'http://localhost:5000/auth-api/users',
  });

  return response;
}
