import axios from 'axios';

export default async function deleteFile(id) {
  const response = await axios({
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5000',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'DELETE',
    url: `http://localhost:5000/auth-api/deleteFile/${id}`,
  });

  return response;
}
