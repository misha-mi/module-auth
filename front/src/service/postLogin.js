import axios from 'axios';

export default async function postLogIn(authData) {
  const response = await axios({
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5000',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    },
    method: 'POST',
    url: 'http://localhost:5000/auth-api/login',
    data: authData,
  });

  return response;
}
