import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", { email, senha });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            alert("❌ Login inválido");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
            <form
                onSubmit={handleLogin}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-80"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full p-3 mb-6 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                />

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
