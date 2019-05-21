import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    params: { jwt: process.env.KONG_JWT }
});

instance.interceptors.request.use(request => {
    return request;
}, error => {
    Promise.reject(error);
});

export default instance;