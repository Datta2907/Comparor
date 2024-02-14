import axios from 'axios';

const api = axios.create({
  baseURL: 'https://phone-comparor-app.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;