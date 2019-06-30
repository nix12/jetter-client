import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  params: { jwt: process.env.KONG_JWT }
});

instance.interceptors.request.use(
  request => {
    request.headers.Authorization = `Bearer ${cookies.get('token')}`;
    return request;
  },
  error => {
    Promise.reject(error);
  }
);

export default instance;
