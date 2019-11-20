import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const instance = axios.create({
  baseURL: 'https://kong-api-gateway-55921.herokuapp.com',
  params: { jwt: process.env.PRODUCTION_KONG_JWT }
});

instance.interceptors.request.use(
  request => {
    request.headers.Authorization = `Bearer ${cookies.get('token')}`;
    request.headers['Content-Type'] = 'application/json';
    request.headers.Resources = 'dry-badlands-14292.herokuapp.com';
    return request;
  },
  error => {
    Promise.reject(error);
  }
);

export default instance;
