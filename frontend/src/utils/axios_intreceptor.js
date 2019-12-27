import axios from 'axios/index';
import Cookies from 'js-cookie';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(config => {
    config.headers.authentication = Cookies.get('token');
    return config;
});

export default axiosInstance;