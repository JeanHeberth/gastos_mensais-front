import axios from "axios";
import { API_URL } from "../config/apiConfig.js";


// 🧠 Cria a instância do Axios
const api = axios.create({
    baseURL: API_URL ,
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔐 Interceptor para incluir o token JWT automaticamente
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

// ⚠️ Interceptor para lidar com erros de autenticação
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("⚠️ Token expirado ou inválido. Redirecionando para login...");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
