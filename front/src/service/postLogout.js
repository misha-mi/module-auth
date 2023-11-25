import axios from 'axios';

export default async function postLogout() {
  const response = await axios({
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5000',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    },
    withCredentials: true,
    method: 'POST',
    url: 'http://localhost:5000/auth-api/logout',
  });

  return response;
}
