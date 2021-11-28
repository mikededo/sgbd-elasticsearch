import axios from 'axios';

export const userApi = axios.create({ baseURL: 'http://localhost:3000/user' });

export const playersApi = axios.create({
  baseURL: 'http://localhost:3000/players'
});
