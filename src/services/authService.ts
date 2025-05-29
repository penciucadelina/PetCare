import axios from 'axios';
import { AUTH_ENDPOINTS } from './api';

interface RegisterData {
    username: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
}

interface LoginData {
    username: string;
    password: string;
}

export const register = (data: RegisterData) => {
    return axios.post(AUTH_ENDPOINTS.REGISTER, data);
};

export const login = (data: LoginData) => {
    return axios.post(AUTH_ENDPOINTS.LOGIN, data);
};
