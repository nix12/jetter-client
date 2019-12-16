import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://172.22.0.11:8000/auth'
      : 'https://kong-api-gateway-55921.herokuapp.com/auth',
  params: {
    jwt:
      process.env.NODE_ENV === 'development'
        ? process.env.KONG_JWT
        : process.env.PRODUCTION_KONG_JWT
  },
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${cookies.get('token')}`
  }
});

instance.interceptors.request.use(
  request => {
    // request.headers.Resources = 'dry-badlands-14292.herokuapp.com';
    return request;
  },
  error => {
    Promise.reject(error);
  }
);

export default instance;
