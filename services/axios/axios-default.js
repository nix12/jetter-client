import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://kong-api-gateway-99521.herokuapp.com',
  params: { jwt: process.env.KONG_JWT }
});

instance.interceptors.request.use(
  request => {
    return request;
  },
  error => {
    Promise.reject(error);
  }
);

export default instance;
