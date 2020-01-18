import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'production'
      ? `http://${
          typeof window !== 'undefined' ? document.location.hostname : 'kong'
        }:8000/auth`
      : 'https://kong-api-gateway-55921.herokuapp.com/auth',
  params: {
    jwt:
      process.env.NODE_ENV !== 'production'
        ? process.env.KONG_JWT
        : process.env.PRODUCTION_KONG_JWT
  },
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${cookies.get('token')}`
  }
});

instance.interceptors.request.use(
  request => request,
  error => Promise.reject(error)
);

export default instance;
