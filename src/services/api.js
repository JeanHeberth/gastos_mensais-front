// services/api.js
import axios from "axios";
import {API_URL} from "../config/apiConfig.js";

// URL base da sua API Spring Boot
const api = axios.create({
    baseURL: API_URL, // ajuste se necessário
});

// Interceptor para adicionar o token automaticamente
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

// Interceptor para capturar erros (ex: token expirado)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.warn("Token inválido ou expirado. Redirecionando para login...");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
