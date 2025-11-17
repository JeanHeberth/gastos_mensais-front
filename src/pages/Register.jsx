import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!nome || !email || !senha) {
            toast.error("Preencha todos os campos.");
            return;
        }

        try {
            await api.post("/usuarios/criar", { nome, email, senha });
            toast.success("Conta criada com sucesso!");

            setTimeout(() => navigate("/login"), 1500);
        } catch (error) {
            toast.error(error.response?.data?.message || "Erro ao criar conta.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Toaster position="top-right" />
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">

                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
                    Criar Conta ✨
                </h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                    >
                        Criar Conta
                    </button>
                </form>

                <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-300">
                    Já tem conta?{" "}
                    <a href="/login" className="text-blue-600 hover:underline dark:text-blue-400">
                        Entre aqui
                    </a>
                </p>
            </div>
        </div>
    );
}
