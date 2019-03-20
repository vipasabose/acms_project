import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

export const loginAPI = async (requestData) => {
    return await axios.post(`${BASE_URL}/login`, requestData);
};

export const createUserAPI = async (requestData) => {
    return await axios.post(`${BASE_URL}/createuser`, requestData);
};