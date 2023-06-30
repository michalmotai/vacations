import axios from 'axios';
import { BASE_API_URL } from '../config';

const axiosCustomInstance = axios.create({
  baseURL: BASE_API_URL,
});

// axios interceptors
// 1. request
// 2.response

axiosCustomInstance.interceptors.request.use(
  (reponse) => {
    return reponse;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosCustomInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosCustomInstance;
