import axios from 'axios';
import { BASE_API_URL } from '../config';

const axiosCustomInstance = axios.create({
    baseURL: BASE_API_URL
});




export default axiosCustomInstance;