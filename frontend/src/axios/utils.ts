import axios from './index';

export const setAuthHeader = (token: string) => {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
}

