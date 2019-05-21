import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    params: { jwt: process.env.KONG_JWT }
});

instance.interceptors.request.use(request => {
    request.headers['Authorization'] = `Bearer ${ sessionStorage.getItem('token') }` 
    return request;
}, error => {
    Promise.reject(error);
});

export default instance;
