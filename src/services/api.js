import axios from "axios";
import {API_URL} from "../config/apiConfig.js";


const api = axios.create({
    baseURL: API_URL,
});

// Intercepta todas as requisições para adicionar o token JWT
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
