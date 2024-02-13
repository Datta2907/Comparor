import axios from 'axios';

const api = axios.create({
  baseURL: 'https://phone-comparor-app.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;